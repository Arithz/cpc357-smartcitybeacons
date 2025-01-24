export interface ProcessMotionDetectionTimeline {
  time: string;
  motions: number;
}

export interface ProcessRainfallIntensity {
  time: string;
  intensity: number;
}

export interface ProcessRainfallMotionCorrelation {
  time: string;
  rainfall: number;
  motions: number;
}

export interface ProcessStreetlightBrightness {
  time: string;
  energyUsage: number;
  motions: number;
}

export interface ProcessLiveSystemStatus {
  is_motion_detected: boolean;
  is_raining: boolean;
  temperature: number;
  brightness: number;
  motions_detected_today: number;
  last_rainfall: string;
}
