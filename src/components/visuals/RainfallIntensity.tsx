import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  BarChart,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { ProcessRainfallIntensity } from "@/data/processed-data";

export default function RainfallIntensity({
  data,
}: {
  data: ProcessRainfallIntensity[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Rainfall Count Detected</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="intensity" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
