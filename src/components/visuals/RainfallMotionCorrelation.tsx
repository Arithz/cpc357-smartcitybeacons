import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  LineChart,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { ProcessRainfallMotionCorrelation } from "@/data/processed-data";

export default function RainfaillMotionCorrelation({
  data,
}: {
  data: ProcessRainfallMotionCorrelation[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rainfall & Motion Correlation</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              label={{
                value: "Time",
                position: "insideBottomRight",
                offset: -5,
              }}
            />
            <YAxis
              yAxisId="left"
              label={{
                value: "Rainfall",
                angle: -90,
                position: "insideLeft",
                offset: 20,
              }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              label={{
                value: "Motions",
                angle: 90,
                position: "insideRight",
                offset: 10,
              }}
            />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="rainfall"
              stroke="#8884d8"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="motions"
              stroke="#82ca9d"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
