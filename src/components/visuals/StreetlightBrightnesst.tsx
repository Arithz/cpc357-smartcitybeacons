import { brightnessDistributionData } from "@/data/dummyvisuals";
import {
  ResponsiveContainer,
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Line,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

export default function () {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Brightness Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <ComposedChart data={brightnessDistributionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="min" fill="#8884d8" />
            <Bar dataKey="q1" fill="#82ca9d" />
            <Bar dataKey="median" fill="#ffc658" />
            <Bar dataKey="q3" fill="#ff8042" />
            <Bar dataKey="max" fill="#0088fe" />
            <Line type="monotone" dataKey="median" stroke="#ff7300" />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
