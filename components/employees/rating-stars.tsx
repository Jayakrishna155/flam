"use client";

import { Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  showEmpty?: boolean;
  className?: string;
}

export default function RatingStars({
  rating,
  max = 5,
  size = "md",
  showEmpty = true,
  className
}: RatingStarsProps) {
  // Calculate sizes based on the size prop
  const getSize = () => {
    switch (size) {
      case "sm": return "h-3 w-3";
      case "lg": return "h-6 w-6";
      default: return "h-4 w-4";
    }
  };

  // Helper function to get the appropriate star component for a given position
  const getStarForPosition = (position: number) => {
    if (position <= rating - 0.5) {
      return (
        <Star 
          key={position} 
          className={cn(getSize(), "fill-yellow-400 text-yellow-400")} 
        />
      );
    } else if (position === Math.ceil(rating) && rating % 1 !== 0) {
      return (
        <StarHalf 
          key={position} 
          className={cn(getSize(), "fill-yellow-400 text-yellow-400")} 
        />
      );
    } else if (showEmpty) {
      return (
        <Star 
          key={position} 
          className={cn(getSize(), "text-muted-foreground")} 
        />
      );
    }
    return null;
  };

  return (
    <div className={cn("flex", className)}>
      {Array.from({ length: max }, (_, i) => getStarForPosition(i + 1))}
    </div>
  );
}