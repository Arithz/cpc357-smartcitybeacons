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
import apiFetch from "@/lib/fetch";
import { useState, useEffect } from "react";

export default function RainfallIntensity() {
  const [data, setData] = useState([]);

  useEffect(() => {
    apiFetch.get("rainfallIntensityData").then((data) => {
      setData(data);
    });
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rainfall Intensity</CardTitle>
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
