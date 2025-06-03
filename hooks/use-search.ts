"use client";

import { useState, useEffect, useMemo } from "react";
import { Employee } from "@/types/employee";

export interface FilterOptions {
  departments: string[];
  ratings: number[];
}

export function useSearch(employees: Employee[], initialOptions?: FilterOptions) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    departments: initialOptions?.departments || [],
    ratings: initialOptions?.ratings || []
  });

  // Apply search and filters to employees
  const filteredEmployees = useMemo(() => {
    return employees.filter(employee => {
      // Search term filter
      const searchString = `${employee.firstName} ${employee.lastName} ${employee.email} ${employee.department}`.toLowerCase();
      const searchMatch = searchTerm === "" || searchString.includes(searchTerm.toLowerCase());
      
      // Department filter
      const departmentMatch = filterOptions.departments.length === 0 || 
                            filterOptions.departments.includes(employee.department);
      
      // Rating filter
      const ratingMatch = filterOptions.ratings.length === 0 || 
                        filterOptions.ratings.includes(employee.performance.current);
      
      return searchMatch && departmentMatch && ratingMatch;
    });
  }, [employees, searchTerm, filterOptions]);

  const updateSearchTerm = (term: string) => {
    setSearchTerm(term);
  };

  const updateFilterOptions = (options: Partial<FilterOptions>) => {
    setFilterOptions(prev => ({
      ...prev,
      ...options
    }));
  };

  const resetFilters = () => {
    setSearchTerm("");
    setFilterOptions({
      departments: [],
      ratings: []
    });
  };

  // Get unique departments from employees
  const availableDepartments = useMemo(() => {
    return Array.from(new Set(employees.map(emp => emp.department)));
  }, [employees]);

  // Available ratings are always 1-5
  const availableRatings = [1, 2, 3, 4, 5];

  return {
    searchTerm,
    filterOptions,
    filteredEmployees,
    updateSearchTerm,
    updateFilterOptions,
    resetFilters,
    availableDepartments,
    availableRatings
  };
}