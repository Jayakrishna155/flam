"use client";

import { 
  Line, 
  LineChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { generateBookmarkTrends } from "@/lib/data";

export default function BookmarkChart() {
  const trendData = generateBookmarkTrends();
  
  // Process data for chart format
  const chartData = trendData.labels.map((month, i) => {
    const dataPoint: Record<string, any> = { name: month };
    trendData.datasets.forEach((dataset) => {
      dataPoint[dataset.label] = dataset.data[i];
    });
    return dataPoint;
  });

  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle>Bookmark Trends</CardTitle>
        <CardDescription>
          Employee bookmarks over the last 6 months by department
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {trendData.datasets.map((dataset, index) => (
              <Line
                key={dataset.label}
                type="monotone"
                dataKey={dataset.label}
                stroke={`hsl(var(--chart-${(index % 5) + 1}))`}
                activeDot={{ r: 8 }}
                strokeWidth={2}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}