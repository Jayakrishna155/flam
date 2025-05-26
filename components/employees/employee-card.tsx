"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { Bookmark, BookmarkCheck, Star, Eye, ArrowUpRightSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Employee } from "@/types/employee";
import { useBookmarks } from "@/context/bookmarks-context";
import RatingStars from "@/components/employees/rating-stars";

interface EmployeeCardProps {
  employee: Employee;
}

export default function EmployeeCard({ employee }: EmployeeCardProps) {
  const router = useRouter();
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();
  const [promoting, setPromoting] = useState(false);

  const handleViewClick = () => {
    router.push(`/employee/${employee.id}`);
  };

  const handleBookmarkToggle = () => {
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

  return (
    <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardHeader className="p-4">
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-12 overflow-hidden rounded-full">
            <Image
              src={employee.image}
              alt={`${employee.firstName} ${employee.lastName}`}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold leading-none tracking-tight truncate">
              {employee.firstName} {employee.lastName}
            </h3>
            <p className="text-sm text-muted-foreground truncate">{employee.email}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="grid gap-1">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Age</span>
            <span className="text-sm text-muted-foreground">{employee.age}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Department</span>
            <span className="text-sm text-muted-foreground">{employee.department}</span>
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm font-medium">Performance</span>
            <RatingStars rating={employee.performance.current} size="sm" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 grid grid-cols-3 gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleViewClick}
          className="w-full"
        >
          <Eye className="h-3.5 w-3.5 mr-1" /> View
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleBookmarkToggle}
          className={`w-full ${isBookmarked(employee.id) ? 'text-yellow-600 dark:text-yellow-400' : ''}`}
        >
          {isBookmarked(employee.id) ? (
            <>
              <BookmarkCheck className="h-3.5 w-3.5 mr-1" /> Saved
            </>
          ) : (
            <>
              <Bookmark className="h-3.5 w-3.5 mr-1" /> Save
            </>
          )}
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handlePromote}
          disabled={promoting}
          className="w-full"
        >
          <ArrowUpRightSquare className="h-3.5 w-3.5 mr-1" /> 
          {promoting ? "Promoting..." : "Promote"}
        </Button>
      </CardFooter>
    </Card>
  );
}