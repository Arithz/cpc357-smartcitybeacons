import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { ProcessMotionDetectionTimeline } from "@/data/processed-data";

export default function MotionDetectionTimeline({
  data,
}: {
  data: ProcessMotionDetectionTimeline[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Motion Count Detection</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="motions" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
