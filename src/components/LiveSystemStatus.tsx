import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";

export default function LiveSystemStatus() {
  const [motionDetected, setMotionDetected] = useState(true);
  const [rainDetected, setRainDetected] = useState(false);

  const [motionCount, setMotionCount] = useState(42);
  const [lastRainfall, setLastRainfall] = useState("2 days ago");
  const [brightness, setBrightness] = useState(75);
  const [totalEnergy, setTotalEnergy] = useState(120);

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
              <Badge variant={motionDetected ? "default" : "secondary"}>
                {motionDetected ? "Yes" : "No"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Rain Detected:</span>
              <Badge variant={rainDetected ? "default" : "secondary"}>
                {rainDetected ? "Yes" : "No"}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Light Brightness:</span>
              <Progress value={brightness} className="w-1/2" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>Motions Detected Today:</span>
              <span className="font-bold">{motionCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Last Rainfall:</span>
              <span className="font-bold">{lastRainfall}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Total Energy Used:</span>
              <span className="font-bold">{totalEnergy} kWh</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
