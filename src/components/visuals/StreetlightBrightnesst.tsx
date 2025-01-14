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
import apiFetch from "@/lib/fetch";
import { useState, useEffect } from "react";

export default function () {
  const [data, setData] = useState([]);

  useEffect(() => {
    apiFetch.get("brightnessDistributionData").then((data) => {
      setData(data);
    });
  }, []);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Brightness Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          <ComposedChart data={data}>
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
