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
import apiFetch from "@/lib/fetch";
import { useState, useEffect } from "react";

export default function MotionDetectionTimeline() {
  const [data, setData] = useState([]);

  useEffect(() => {
    apiFetch.get("motionTimelineData").then((data) => {
      setData(data);
    });
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Motion Detection Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={200}>
          {data.length === 0 ? (
            <div>Loading...</div>
          ) : (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="motions" stroke="#8884d8" />
            </LineChart>
          )}
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
