"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import InfiniteScroll from "react-infinite-scroll-component";
import { Employee } from "@/types/employee";
import EmployeeCard from "@/components/employees/employee-card";
import { useSearch, FilterOptions } from "@/hooks/use-search";
import SearchBar from "@/components/employees/search-bar";
import { Loader2 } from "lucide-react";

interface EmployeeListProps {
  employees: Employee[];
}

export default function EmployeeList({ employees }: EmployeeListProps) {
  const [displayCount, setDisplayCount] = useState(8);
  const {
    searchTerm,
    filterOptions,
    filteredEmployees,
    updateSearchTerm,
    updateFilterOptions,
    resetFilters,
    availableDepartments,
    availableRatings
  } = useSearch(employees);

  const displayedEmployees = filteredEmployees.slice(0, displayCount);
  const hasMore = displayCount < filteredEmployees.length;

  const loadMore = () => {
    setDisplayCount(prev => Math.min(prev + 8, filteredEmployees.length));
  };

  // Reset display count when filters change
  useEffect(() => {
    setDisplayCount(8);
  }, [searchTerm, filterOptions]);

  return (
    <div className="space-y-6">
      <SearchBar
        searchTerm={searchTerm}
        filterOptions={filterOptions}
        onSearch={updateSearchTerm}
        onFilterChange={updateFilterOptions}
        onReset={resetFilters}
        availableDepartments={availableDepartments}
        availableRatings={availableRatings}
      />
      
      {filteredEmployees.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center p-8 text-center"
        >
          <p className="text-lg font-medium">No employees found</p>
          <p className="text-muted-foreground">
            Try adjusting your search or filters to find what you're looking for.
          </p>
        </motion.div>
      ) : (
        <InfiniteScroll
          dataLength={displayedEmployees.length}
          next={loadMore}
          hasMore={hasMore}
          loader={
            <div className="flex justify-center py-4">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          }
          endMessage={
            <p className="text-center text-muted-foreground py-4">
              No more employees to load
            </p>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <AnimatePresence mode="popLayout">
              {displayedEmployees.map((employee, index) => (
                <motion.div
                  key={employee.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <EmployeeCard employee={employee} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
}