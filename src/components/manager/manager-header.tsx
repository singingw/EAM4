"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Settings, Moon, User } from "lucide-react";
import { useState, useEffect } from "react";
import { Logo } from "../logo";

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
    <header className="flex h-16 shrink-0 items-center justify-between bg-primary px-4 lg:px-6 z-30 fixed top-0 w-full">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground" />
        <h2 className="text-xl font-semibold text-primary-foreground">[系統名稱]-管理系統</h2>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-primary-foreground/80 hidden md:inline-block">
          {formattedDate} {formattedTime}
        </span>
        <Button variant="ghost" size="icon" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary/90">
          <Settings className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary/90">
          <Moon className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary/90">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
