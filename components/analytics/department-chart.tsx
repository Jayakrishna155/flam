"use client";

import { 
  Bar, 
  BarChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  Legend 
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Employee, Department } from "@/types/employee";
import { getDepartmentAnalytics } from "@/lib/data";

interface DepartmentChartProps {
  employees: Employee[];
}

export default function DepartmentChart({ employees }: DepartmentChartProps) {
  const departmentData = getDepartmentAnalytics(employees);
  
  // Convert data for chart
  const chartData = Object.entries(departmentData).map(([dept, data]) => ({
    name: dept,
    "Average Rating": data.avgRating,
    "Employee Count": data.count,
  }));

  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle>Department Performance</CardTitle>
        <CardDescription>
          Average performance ratings by department
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis domain={[0, 5]} />
            <Tooltip 
              formatter={(value: number) => [value.toFixed(2), ""]}
              labelStyle={{ fontWeight: "bold" }}
            />
            <Legend />
            <Bar
              dataKey="Average Rating"
              fill="hsl(var(--chart-1))"
              name="Average Rating"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}