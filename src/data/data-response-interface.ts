export default interface DataResponse {
  _id: string;
  timestamp: string;

  data: {
    temperature: number;
    motion_detected: number;
    is_raining: number;
    active_led: number;
  };
}
