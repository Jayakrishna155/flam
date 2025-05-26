"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import EmployeeList from "@/components/employees/employee-list";
import { enrichEmployeeData } from "@/lib/data";
import { DummyJsonUser, Employee } from "@/types/employee";

export default function Home() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        <p className="text-lg">Loading employees...</p>
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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">HR Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your team, track performance, and make data-driven decisions.
        </p>
      </div>
      
      <EmployeeList employees={employees} />
    </div>
  );
}