"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Users, Bookmark, BarChart3, Home } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Dashboard", icon: Home },
    { href: "/bookmarks", label: "Bookmarks", icon: Bookmark },
    { href: "/analytics", label: "Analytics", icon: BarChart3 },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex items-center gap-2">
          <Users className="h-6 w-6" />
          <span className="hidden font-bold md:inline-block">HR Dashboard</span>
        </div>
        <nav className="flex items-center gap-1 md:gap-2 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <Button 
                  variant={pathname === item.href ? "default" : "ghost"} 
                  className={cn(
                    "h-9 px-2 md:px-4",
                    pathname === item.href ? "bg-primary text-primary-foreground" : ""
                  )}
                  size="sm"
                >
                  <Icon className="h-4 w-4 mr-2" />
                  <span>{item.label}</span>
                </Button>
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}