"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Settings, Moon, Sun, User, LogOut, KeyRound, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { CheckInInstructionsDialog } from "@/components/manager/check-in-instructions-dialog";


export function ManagerHeader() {
  const { setTheme, theme } = useTheme();
  const [dateTime, setDateTime] = useState(new Date());
  const router = useRouter();

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

  const handleLogout = () => {
    // Perform logout logic here
    console.log("Logging out...");
    router.push('/Manager/Login');
  };

  return (
    <header className="flex h-16 shrink-0 items-center justify-between bg-sidebar-background px-4 lg:px-6 z-30 fixed top-0 w-full">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <Link href="/Manager">
          <h2 className="text-xl font-semibold text-primary">[會展活動智聯服務]-管理系統</h2>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-foreground/80 hidden md:inline-block">
          {formattedDate} {formattedTime}
        </span>
        
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10 h-8 w-8">
                <BookOpen className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
               <DropdownMenuItem>
                  <span>系統操作手冊</span>
                </DropdownMenuItem>
                <DialogTrigger asChild>
                  <DropdownMenuItem>
                    <span>報到流程說明</span>
                  </DropdownMenuItem>
                </DialogTrigger>
                <DropdownMenuItem>
                  <span>識別證印製說明</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <CheckInInstructionsDialog />
        </Dialog>

        <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10 h-8 w-8">
          <Settings className="h-5 w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-primary hover:bg-primary/10 h-8 w-8"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-foreground/60 hover:bg-primary/10 h-8 w-8">
              <div className="bg-foreground/10 rounded-full p-1">
                <User className="h-5 w-5 text-foreground/80" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none text-primary">SystemAdmin</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
               <Link href="/Manager/ChangePassword">
                  <KeyRound className="mr-2 h-4 w-4" />
                  <span>修改密碼</span>
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>登出</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </header>
  );
}
