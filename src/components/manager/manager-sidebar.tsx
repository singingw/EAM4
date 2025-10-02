"use client";

import {
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuButton,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from "@/components/ui/sidebar";
import {
  Settings,
  Share2,
  MessageSquare,
  LayoutGrid,
  ChevronUp
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"


const menuItems = [
    {
      label: "系統管理",
      icon: Settings,
      subItems: ["系統功能管理", "後台選單管理"],
    },
    {
      label: "權限管理",
      icon: Share2,
      subItems: ["後台帳號管理", "角色管理"],
    },
    {
      label: "文章管理",
      icon: MessageSquare,
      subItems: ["文章內容管理", "文章分類管理"],
    },
    {
      label: "功能模板",
      icon: LayoutGrid,
      subItems: ["動態表單一"],
    },
];


export function ManagerSidebar() {
  return (
    <div className="flex flex-col h-full bg-sidebar-background pt-16">
      <SidebarContent className="flex-1 p-4">
        <SidebarMenu>
          {menuItems.map((item) => (
            <Collapsible key={item.label} className="w-full">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton 
                    className="flex items-center gap-2 w-full justify-start text-base font-semibold text-sidebar-foreground/80 hover:text-sidebar-accent-foreground group"
                    tooltip={item.label}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="flex-1 text-left">{item.label}</span>
                    <ChevronUp className="h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=closed]:rotate-180" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.subItems.map((subItem) => (
                      <SidebarMenuSubItem key={subItem}>
                        <SidebarMenuSubButton className="text-sidebar-foreground/80 hover:text-sidebar-accent-foreground">{subItem}</SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </div>
  );
}