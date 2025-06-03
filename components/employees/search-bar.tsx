"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { FilterOptions } from "@/hooks/use-search";
import { useState } from "react";
import RatingStars from "@/components/employees/rating-stars";

interface SearchBarProps {
  searchTerm: string;
  filterOptions: FilterOptions;
  onSearch: (term: string) => void;
  onFilterChange: (options: Partial<FilterOptions>) => void;
  onReset: () => void;
  availableDepartments: string[];
  availableRatings: number[];
}

export default function SearchBar({
  searchTerm,
  filterOptions,
  onSearch,
  onFilterChange,
  onReset,
  availableDepartments,
  availableRatings,
}: SearchBarProps) {
  const [open, setOpen] = useState(false);
  
  const handleDepartmentToggle = (department: string) => {
    const updatedDepartments = filterOptions.departments.includes(department)
      ? filterOptions.departments.filter(d => d !== department)
      : [...filterOptions.departments, department];
    
    onFilterChange({ departments: updatedDepartments });
  };
  
  const handleRatingToggle = (rating: number) => {
    const updatedRatings = filterOptions.ratings.includes(rating)
      ? filterOptions.ratings.filter(r => r !== rating)
      : [...filterOptions.ratings, rating];
    
    onFilterChange({ ratings: updatedRatings });
  };
  
  const activeFiltersCount = 
    filterOptions.departments.length + filterOptions.ratings.length;

  return (
    <div className="flex flex-col md:flex-row gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search by name, email or department..."
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          className="pl-9"
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 p-0"
            onClick={() => onSearch("")}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear</span>
          </Button>
        )}
      </div>
      
      <div className="flex gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex gap-1.5 relative">
              <SlidersHorizontal className="h-4 w-4" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <Badge 
                  variant="secondary" 
                  className="ml-1 px-1 min-w-5 h-5 flex items-center justify-center rounded-full text-xs"
                >
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Departments</h4>
                <div className="grid grid-cols-2 gap-2">
                  {availableDepartments.map((department) => (
                    <div key={department} className="flex items-center space-x-2">
                      <Checkbox
                        id={`department-${department}`}
                        checked={filterOptions.departments.includes(department)}
                        onCheckedChange={() => handleDepartmentToggle(department)}
                      />
                      <Label 
                        htmlFor={`department-${department}`}
                        className="text-sm cursor-pointer"
                      >
                        {department}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Performance Rating</h4>
                <div className="grid grid-cols-1 gap-2">
                  {availableRatings.map((rating) => (
                    <div key={rating} className="flex items-center space-x-2">
                      <Checkbox
                        id={`rating-${rating}`}
                        checked={filterOptions.ratings.includes(rating)}
                        onCheckedChange={() => handleRatingToggle(rating)}
                      />
                      <Label 
                        htmlFor={`rating-${rating}`}
                        className="flex items-center text-sm cursor-pointer"
                      >
                        <RatingStars rating={rating} max={5} size="sm" />
                        <span className="ml-2">{rating} star{rating !== 1 ? 's' : ''}</span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => {
                    onReset();
                    setOpen(false);
                  }}
                >
                  Reset All
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => setOpen(false)}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}