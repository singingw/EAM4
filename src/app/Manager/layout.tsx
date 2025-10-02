"use client";

import type { ReactNode } from "react";
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
} from "@/components/ui/sidebar";
import { ManagerSidebar } from "@/components/manager/manager-sidebar";
import { ManagerHeader } from "@/components/manager/manager-header";

type ManagerLayoutProps = {
  children: ReactNode;
};

export default function ManagerLayout({ children }: ManagerLayoutProps) {
  const pathname = usePathname();

  if (pathname === "/Manager/ForgotPassword" || pathname === "/Manager/Login") {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full flex-col">
        <ManagerHeader />
        <div className="flex flex-1 overflow-hidden pt-16">
          <Sidebar>
            <ManagerSidebar />
          </Sidebar>
          <main className="flex-1 p-4 lg:p-6 overflow-y-auto bg-background">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
