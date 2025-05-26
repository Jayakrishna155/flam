"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Employee } from "@/types/employee";

type BookmarksContextType = {
  bookmarks: Employee[];
  addBookmark: (employee: Employee) => void;
  removeBookmark: (employeeId: number) => void;
  isBookmarked: (employeeId: number) => boolean;
};

const BookmarksContext = createContext<BookmarksContextType | undefined>(undefined);

export function BookmarksProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<Employee[]>([]);

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem("bookmarks");
    if (savedBookmarks) {
      try {
        setBookmarks(JSON.parse(savedBookmarks));
      } catch (error) {
        console.error("Failed to parse bookmarks:", error);
      }
    }
  }, []);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (employee: Employee) => {
    if (!isBookmarked(employee.id)) {
      setBookmarks((prev) => [...prev, employee]);
    }
  };

  const removeBookmark = (employeeId: number) => {
    setBookmarks((prev) => prev.filter((emp) => emp.id !== employeeId));
  };

  const isBookmarked = (employeeId: number) => {
    return bookmarks.some((emp) => emp.id === employeeId);
  };

  return (
    <BookmarksContext.Provider value={{ bookmarks, addBookmark, removeBookmark, isBookmarked }}>
      {children}
    </BookmarksContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarksContext);
  if (context === undefined) {
    throw new Error("useBookmarks must be used within a BookmarksProvider");
  }
  return context;
}