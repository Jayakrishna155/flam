"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { DummyJsonUser, Employee } from "@/types/employee";
import { enrichEmployeeData } from "@/lib/data";
import DepartmentChart from "@/components/analytics/department-chart";
import BookmarkChart from "@/components/analytics/bookmark-chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useBookmarks } from "@/context/bookmarks-context";

export default function AnalyticsPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { bookmarks } = useBookmarks();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://dummyjson.com/users?limit=20");
        
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }
        
        const data = await response.json();
        const enrichedEmployees = data.users.map((user: DummyJsonUser) => 
          enrichEmployeeData(user)
        );
        
        setEmployees(enrichedEmployees);
      } catch (err) {
        console.error("Error fetching employees:", err);
        setError("Failed to load employees. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin mb-4" />
        <p className="text-lg">Loading analytics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="bg-destructive/10 text-destructive p-4 rounded-md mb-4">
          <p>{error}</p>
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
        >
          Retry
        </button>
      </div>
    );
  }

  // Calculate overall stats
  const totalEmployees = employees.length;
  const avgPerformance = employees.reduce((sum, emp) => sum + emp.performance.current, 0) / totalEmployees;
  const totalBookmarks = bookmarks.length;
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          View performance metrics and trends across departments
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEmployees}</div>
            <p className="text-xs text-muted-foreground">Across all departments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgPerformance.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Out of 5.0 rating</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Bookmarked</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBookmarks}</div>
            <p className="text-xs text-muted-foreground">
              {((totalBookmarks / totalEmployees) * 100).toFixed(1)}% of employees
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DepartmentChart employees={employees} />
        <BookmarkChart />
      </div>
    </div>
  );
}