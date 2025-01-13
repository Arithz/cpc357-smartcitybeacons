export const motionTimelineData = [
  { time: "00:00", motions: 5 },
  { time: "03:00", motions: 2 },
  { time: "06:00", motions: 10 },
  { time: "09:00", motions: 15 },
  { time: "12:00", motions: 20 },
  { time: "15:00", motions: 18 },
  { time: "18:00", motions: 25 },
  { time: "21:00", motions: 12 },
];

// Mock data for rainfall intensity
export const rainfallData = [
  { time: "00:00", intensity: 0.5 },
  { time: "03:00", intensity: 1.2 },
  { time: "06:00", intensity: 0.8 },
  { time: "09:00", intensity: 0.3 },
  { time: "12:00", intensity: 0 },
  { time: "15:00", intensity: 0.1 },
  { time: "18:00", intensity: 0.6 },
  { time: "21:00", intensity: 1.5 },
];

// Mock data for streetlight brightness distribution
export const brightnessDistributionData = [
  { name: "Streetlight 1", min: 20, q1: 30, median: 40, q3: 50, max: 60 },
  { name: "Streetlight 2", min: 25, q1: 35, median: 45, q3: 55, max: 65 },
  { name: "Streetlight 3", min: 15, q1: 25, median: 35, q3: 45, max: 55 },
  { name: "Streetlight 4", min: 30, q1: 40, median: 50, q3: 60, max: 70 },
  { name: "Streetlight 5", min: 10, q1: 20, median: 30, q3: 40, max: 50 },
];

// Mock data for rainfall and motion correlation
export const rainfallMotionCorrelationData = [
  { time: "00:00", rainfall: 0.5, motions: 5 },
  { time: "03:00", rainfall: 1.2, motions: 2 },
  { time: "06:00", rainfall: 0.8, motions: 10 },
  { time: "09:00", rainfall: 0.3, motions: 15 },
  { time: "12:00", rainfall: 0, motions: 20 },
  { time: "15:00", rainfall: 0.1, motions: 18 },
  { time: "18:00", rainfall: 0.6, motions: 25 },
  { time: "21:00", rainfall: 1.5, motions: 12 },
];

// Mock data for system health monitoring
export const systemHealthData = [
  { name: "Operational", value: 85 },
  { name: "Maintenance", value: 10 },
  { name: "Faulty", value: 5 },
];
