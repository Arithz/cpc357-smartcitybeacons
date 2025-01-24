import "./App.css";
import LiveSystemStatus from "./components/LiveSystemStatus";
import MotionDetectionTimeline from "./components/visuals/MotionDetectionTimeline";
import RainfallIntensity from "./components/visuals/RainfallIntensity";
import StreetlightBrightness from "./components/visuals/StreetlightEnergy";
import RainfaillMotionCorrelation from "./components/visuals/RainfallMotionCorrelation";
import { useState, useEffect } from "react";
import DataResponse from "./data/data-response-interface";
import {
  ProcessLiveSystemStatus,
  ProcessMotionDetectionTimeline,
  ProcessRainfallIntensity,
  ProcessRainfallMotionCorrelation,
  ProcessStreetlightBrightness,
} from "./data/processed-data";
import { processAllData } from "./lib/process";

function App() {
  const [data, setData] = useState([] as DataResponse[]);

  const [liveSystemStatusData, setLiveSystemStatusData] = useState(
    {} as ProcessLiveSystemStatus
  );
  const [motionDetectionTimelinedata, setMotionDetectionTimelinedata] =
    useState([] as ProcessMotionDetectionTimeline[]);
  const [rainfallIntensityData, setRainfallIntensityData] = useState(
    [] as ProcessRainfallIntensity[]
  );
  const [streetlightBrightnessData, setStreetlightBrightnessData] = useState(
    [] as ProcessStreetlightBrightness[]
  );
  const [rainfallMotionCorrelationData, setRainfallMotionCorrelationData] =
    useState([] as ProcessRainfallMotionCorrelation[]);

  useEffect(() => {
    // Fetch data function
    const fetchData = async () => {
      const url = "http://localhost:5000/data";
      const response = await fetch(url);
      const dataResponse: DataResponse[] = await response.json();
      console.log(dataResponse);
      setData(dataResponse);
    };

    // Process data function
    const processData = () => {
      if (data.length === 0) return;
      const processedData = processAllData(data);
      setMotionDetectionTimelinedata(processedData.motionDetectionTimeline);
      setRainfallIntensityData(processedData.rainfallIntensity);
      setStreetlightBrightnessData(processedData.streetlightBrightness);
      setRainfallMotionCorrelationData(processedData.rainfallMotionCorrelation);
      setLiveSystemStatusData(processedData.liveSystemStatus);
    };

    // Initial fetch and process
    fetchData();
    processData();

    // Set up interval to fetch data every 2 seconds
    const intervalId = setInterval(() => {
      fetchData();
      processData();
    }, 2000); // 2000ms = 2 seconds

    // Cleanup interval on unmount
    return () => clearInterval(intervalId);
  }, [data]); // Re-run whenever `data` is updated

  return (
    <>
      {data.length === 0 && (
        <div className="z-10 bg-black/80 fixed top-0 left-0 w-screen h-screen flex justify-center">
          <div className="mt-5 h-fit relative px-4 py-2 text-center rounded shadow-lg animate-slideUp bg-[#fafafa] flex gap-1 items-center">
            <svg
              aria-hidden="true"
              className="w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-orange-400"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <p className="text-cs-black2 text-sm md:text-base font-bold">
              Loading data...
            </p>
          </div>
        </div>
      )}

      <div className="container mx-auto p-4">
        {/* Title and theme buttons */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Smart Streetlight Dashboard</h1>
        </div>

        {/* Live System Status */}
        <LiveSystemStatus data={liveSystemStatusData} />

        {/* Visualisations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 pt-4">
          <MotionDetectionTimeline data={motionDetectionTimelinedata} />
          <RainfallIntensity data={rainfallIntensityData} />
          <StreetlightBrightness data={streetlightBrightnessData} />
          <RainfaillMotionCorrelation data={rainfallMotionCorrelationData} />
        </div>
      </div>
    </>
  );
}

export default App;
