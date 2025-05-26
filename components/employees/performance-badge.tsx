import { cn } from "@/lib/utils";

interface PerformanceBadgeProps {
  rating: number;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function PerformanceBadge({
  rating,
  showText = true,
  size = "md",
  className
}: PerformanceBadgeProps) {
  const getLabel = () => {
    if (rating >= 4.5) return "Outstanding";
    if (rating >= 3.5) return "Excellent";
    if (rating >= 2.5) return "Good";
    if (rating >= 1.5) return "Average";
    return "Needs Improvement";
  };

  const getColorClass = () => {
    if (rating >= 4.5) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100";
    if (rating >= 3.5) return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100";
    if (rating >= 2.5) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100";
    if (rating >= 1.5) return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100";
    return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100";
  };

  const getSizeClass = () => {
    switch (size) {
      case "sm": return "px-2 py-0.5 text-xs";
      case "lg": return "px-4 py-1.5 text-base";
      default: return "px-3 py-1 text-sm";
    }
  };

  return (
    <span className={cn(
      "inline-flex items-center font-medium rounded-full",
      getColorClass(),
      getSizeClass(),
      className
    )}>
      {showText ? getLabel() : `${rating.toFixed(1)}`}
    </span>
  );
}