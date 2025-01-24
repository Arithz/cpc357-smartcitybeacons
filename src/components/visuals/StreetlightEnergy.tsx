import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { ProcessStreetlightBrightness } from "@/data/processed-data";

export default function ({ data }: { data: ProcessStreetlightBrightness[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Energy Used Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            {/* Y-Axis for total energy used */}
            <YAxis />
            <Tooltip />
            <Legend />

            {/* Line for total energy used */}
            <Line
              type="monotone"
              dataKey="energyUsage"
              stroke="#8884d8"
              name="Total Energy Used (kWh)"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
