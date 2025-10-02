import type { ReactNode } from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { ManagerSidebar } from "@/components/manager/manager-sidebar";
import { ManagerHeader } from "@/components/manager/manager-header";

type ManagerLayoutProps = {
  children: ReactNode;
};

export default function ManagerLayout({ children }: ManagerLayoutProps) {
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
