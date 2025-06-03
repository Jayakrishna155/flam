"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Bookmark, BookmarkCheck, ArrowUpRightSquare, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DummyJsonUser, Employee } from "@/types/employee";
import { enrichEmployeeData } from "@/lib/data";
import { useBookmarks } from "@/context/bookmarks-context";
import RatingStars from "@/components/employees/rating-stars";
import PerformanceBadge from "@/components/employees/performance-badge";
import EmployeeTabs from "@/components/employees/employee-tabs";

interface EmployeePageProps {
  params: { id: string };
}

export default function EmployeePage({ params }: EmployeePageProps) {
  const router = useRouter();
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [promoting, setPromoting] = useState(false);

  const employeeId = parseInt(params.id);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://dummyjson.com/users/${employeeId}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Employee not found");
          }
          throw new Error(`Failed to fetch: ${response.status}`);
        }
        
        const user: DummyJsonUser = await response.json();
        const enrichedEmployee = enrichEmployeeData(user);
        setEmployee(enrichedEmployee);
      } catch (err) {
        console.error("Error fetching employee:", err);
        setError(err instanceof Error ? err.message : "Failed to load employee data");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [employeeId]);

  const handleBookmarkToggle = () => {
    if (!employee) return;
    
    if (isBookmarked(employee.id)) {
      removeBookmark(employee.id);
    } else {
      addBookmark(employee);
    }
  };

  const handlePromote = () => {
    setPromoting(true);
    setTimeout(() => setPromoting(false), 1000);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin mb-4" />
        <p className="text-lg">Loading employee data...</p>
      </div>
    );
  }

  if (error || !employee) {
    return (
      <div className="space-y-6">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="gap-1"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        
        <div className="flex flex-col items-center justify-center py-12">
          <div className="bg-destructive/10 text-destructive p-4 rounded-md mb-4 flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <p>{error || "Employee not found"}</p>
          </div>
          <Button 
            onClick={() => router.push("/")}
            className="mt-4"
          >
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="gap-1"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3 lg:w-1/4">
          <div className="sticky top-20 space-y-4">
            <div className="flex flex-col items-center p-6 bg-card rounded-lg shadow-sm border">
              <div className="relative h-32 w-32 overflow-hidden rounded-full mb-4">
                <Image
                  src={employee.image}
                  alt={`${employee.firstName} ${employee.lastName}`}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              
              <h1 className="text-2xl font-bold text-center">
                {employee.firstName} {employee.lastName}
              </h1>
              
              <div className="flex flex-col items-center mt-1 mb-2">
                <p className="text-sm text-muted-foreground">{employee.company.title}</p>
                <p className="text-sm font-medium">{employee.department}</p>
              </div>
              
              <div className="flex items-center gap-2 mt-2 mb-4">
                <RatingStars rating={employee.performance.current} size="md" />
                <PerformanceBadge rating={employee.performance.current} />
              </div>
              
              <div className="grid grid-cols-2 gap-2 w-full">
                <Button 
                  variant="outline" 
                  onClick={handleBookmarkToggle}
                  className={`w-full ${isBookmarked(employee.id) ? 'text-yellow-600 dark:text-yellow-400' : ''}`}
                >
                  {isBookmarked(employee.id) ? (
                    <>
                      <BookmarkCheck className="h-4 w-4 mr-2" /> Saved
                    </>
                  ) : (
                    <>
                      <Bookmark className="h-4 w-4 mr-2" /> Save
                    </>
                  )}
                </Button>
                
                <Button 
                  variant="outline"
                  onClick={handlePromote}
                  disabled={promoting}
                  className="w-full"
                >
                  <ArrowUpRightSquare className="h-4 w-4 mr-2" />
                  {promoting ? "Promoting..." : "Promote"}
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:w-2/3 lg:w-3/4">
          <EmployeeTabs employee={employee} />
        </div>
      </div>
    </div>
  );
}