"use client";

import { useBookmarks } from "@/context/bookmarks-context";
import EmployeeCard from "@/components/employees/employee-card";
import { Bookmark, AlertCircle } from "lucide-react";
import { useSearch } from "@/hooks/use-search";
import SearchBar from "@/components/employees/search-bar";

export default function BookmarksPage() {
  const { bookmarks } = useBookmarks();
  
  const {
    searchTerm,
    filterOptions,
    filteredEmployees,
    updateSearchTerm,
    updateFilterOptions,
    resetFilters,
    availableDepartments,
    availableRatings
  } = useSearch(bookmarks);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Bookmarked Employees</h1>
        <p className="text-muted-foreground">
          Your saved list of employees for quick access
        </p>
      </div>
      
      {bookmarks.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center bg-muted/40 rounded-lg">
          <Bookmark className="h-12 w-12 mb-4 text-muted-foreground" />
          <h2 className="text-xl font-medium mb-2">No bookmarked employees</h2>
          <p className="text-muted-foreground max-w-md">
            Bookmark employees from the dashboard to add them to this list for quick access.
          </p>
        </div>
      ) : (
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
            <div className="flex items-center justify-center p-8 text-center bg-muted/40 rounded-lg">
              <AlertCircle className="h-6 w-6 mr-2 text-muted-foreground" />
              <p className="text-muted-foreground">
                No bookmarks match your current filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredEmployees.map((employee) => (
                <EmployeeCard key={employee.id} employee={employee} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}