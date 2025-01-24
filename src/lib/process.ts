import DataResponse from "@/data/data-response-interface";
import { subHours } from "date-fns";

function getGroupedData(
  data: DataResponse[],
  entryKey: keyof DataResponse["data"]
) {
  // 1. Find the latest timestamp in the dataset
  const latestTimestamp = new Date(
    Math.max(...data.map((entry) => new Date(entry.timestamp).getTime()))
  );

  // 2. Find the timestamp 12 hours before the latest timestamp
  const twelveHoursBefore = subHours(latestTimestamp, 12);

  // 3. Create a set of all hour keys in the last 12 hours
  const hourKeys = Array.from({ length: 13 }, (_, i) => {
    const date = new Date(latestTimestamp.getTime() - i * 60 * 60 * 1000);
    return date.toLocaleTimeString().split(":")[0]; // Get the hour part
  });

  const groupedData = data
    .filter((entry) => new Date(entry.timestamp) >= twelveHoursBefore)
    .reduce((acc, entry) => {
      const hourKey = new Date(entry.timestamp)
        .toLocaleTimeString()
        .split(":")[0];
      if (!acc[hourKey]) {
        acc[hourKey] = 0;
      }
      acc[hourKey] += entry.data[entryKey];
      return acc;
    }, {} as Record<string, number>);

  // 4. Fill in missing hours with 0
  return hourKeys.reduce((acc, hourKey) => {
    if (!acc[hourKey]) {
      acc[hourKey] = 0;
    }
    return acc;
  }, groupedData);
}

function processLiveSystemStatus(data: DataResponse[]) {
  const latestData = data[data.length - 1];
  return {
    is_motion_detected: !!latestData.data.motion_detected,
    is_raining: !!latestData.data.is_raining,
    temperature: latestData.data.temperature,
    brightness: latestData.data.active_led,
    motions_detected_today: data.reduce(
      (acc, entry) => acc + entry.data.motion_detected,
      0
    ),
    last_rainfall: new Date(
      data
        .filter((entry) => !!entry.data.is_raining)
        .reduce((acc, entry) => {
          if (new Date(entry.timestamp) > new Date(acc.timestamp)) {
            return entry;
          }
          return acc;
        }).timestamp
    ).toLocaleString("en-GB", {
      year: "numeric", // Full year
      month: "2-digit", // Two digits for the month
      day: "2-digit", // Two digits for the day
      hour: "2-digit", // Hour (2 digits)
      minute: "2-digit", // Minute (2 digits)
    }),
  };
}

export function processAllData(data: DataResponse[]) {
  // Process each type of data in one go
  const groupedDataMotion = getGroupedData(data, "motion_detected");
  const groupedDataActiveLed = getGroupedData(data, "active_led");
  const groupedDataRainfall = getGroupedData(data, "is_raining");

  // Format processed data as needed and return everything in one object
  const processedData = {
    motionDetectionTimeline: Object.entries(groupedDataMotion).map(
      ([time, motions]) => ({
        time: time.slice(0, 13) + ":00", // Format the time as "YYYY-MM-DDTHH:00"
        motions,
      })
    ),
    rainfallIntensity: Object.entries(groupedDataRainfall).map(
      ([time, intensity]) => ({
        time: time.slice(0, 13) + ":00", // Format the time as "YYYY-MM-DDTHH:00"
        intensity,
      })
    ),
    streetlightBrightness: Object.entries(groupedDataMotion).map(
      ([time, motions]) => {
        // Energy consumption formula for active LEDs
        const ledPowerConsumption = 0.1; // Power consumption of 1 LED in watts (adjust as needed)
        const activeLEDs = groupedDataActiveLed[time];

        // Energy usage in kWh (assuming the LED is on for 1 hour)
        const energyUsage = parseFloat(
          ((ledPowerConsumption * activeLEDs * 1) / 1000).toFixed(3)
        );

        return {
          time: time.slice(0, 13) + ":00", // Format the time as "YYYY-MM-DDTHH:00"
          energyUsage, // Energy usage in kWh
          motions, // Associated motion data
        };
      }
    ),

    rainfallMotionCorrelation: Object.entries(groupedDataRainfall).map(
      ([time, rainfall]) => ({
        time: time.slice(0, 13) + ":00", // Format the time as "YYYY-MM-DDTHH:00"
        motions: groupedDataMotion[time],
        rainfall,
      })
    ),
    liveSystemStatus: processLiveSystemStatus(data),
  };

  return processedData;
}
