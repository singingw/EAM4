"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Settings, Moon, User } from "lucide-react";
import { useState, useEffect } from "react";

export function ManagerHeader() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = dateTime.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  const formattedTime = dateTime.toLocaleTimeString('zh-TW', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  return (
    <header className="flex h-16 shrink-0 items-center justify-between bg-sidebar-background px-4 lg:px-6 z-30 fixed top-0 w-full">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <h2 className="text-lg font-semibold text-primary">[系統名稱]-管理系統</h2>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-foreground/80 hidden md:inline-block">
          {formattedDate} {formattedTime}
        </span>
        <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10 h-8 w-8">
          <Settings className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10 h-8 w-8">
          <Moon className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-foreground/60 hover:bg-primary/10 h-8 w-8">
          <div className="bg-foreground/10 rounded-full p-1">
            <User className="h-5 w-5 text-foreground/80" />
          </div>
        </Button>
      </div>
    </header>
  );
}