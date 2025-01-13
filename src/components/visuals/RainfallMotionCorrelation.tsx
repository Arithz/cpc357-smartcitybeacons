import { rainfallMotionCorrelationData } from "@/data/dummyvisuals";
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

export default function RainfaillMotionCorrelation() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rainfall & Motion Correlation</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={rainfallMotionCorrelationData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
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
