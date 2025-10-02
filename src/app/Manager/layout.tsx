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

  // Don't show the sidebar on the forgot password page.
  if (pathname === "/Manager/ForgotPassword" || pathname === "/Manager/Login") {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <ManagerSidebar />
      </Sidebar>
      <div className="flex flex-1 flex-col">
        <ManagerHeader />
        <main className="flex-1 p-4 lg:p-6 bg-gray-100/30">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
