import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProcessLiveSystemStatus } from "@/data/processed-data";

export default function LiveSystemStatus({
  data,
}: {
  data: ProcessLiveSystemStatus;
}) {
  const {
    is_motion_detected,
    is_raining,
    temperature,
    brightness,
    motions_detected_today,
    last_rainfall,
  } = data;

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Live System Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>Motion Detected:</span>
              <Badge variant={is_motion_detected ? "default" : "secondary"}>
                {is_motion_detected ? "Yes" : "No"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Rain Detected:</span>
              <Badge variant={is_raining ? "default" : "secondary"}>
                {is_raining ? "Yes" : "No"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Light Brightness:</span>
              <div className="flex items-center space-x-2">
                {brightness === 0 && <Badge variant="destructive">Off</Badge>}
                {brightness === 1 && <Badge variant="default">Medium</Badge>}
                {brightness === 2 && (
                  <Badge className="bg-green-500 text-white">High</Badge>
                )}
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>Motions Detected Today:</span>
              <span className="font-bold">{motions_detected_today}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Last Rainfall:</span>
              <span className="font-bold">{last_rainfall}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Temperature:</span>
              <span className="font-bold">{temperature}°C</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
