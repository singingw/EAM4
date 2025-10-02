"use client";

import {
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  Settings,
  Share2,
  MessageSquare,
  LayoutGrid,
  ChevronUp,
  ChevronDown
} from "lucide-react";
import { useState } from "react";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";

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
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({
        "系統管理": true,
        "權限管理": true,
        "文章管理": true,
        "功能模板": true,
    });

    const toggleSection = (label: string) => {
        setOpenSections(prev => ({ ...prev, [label]: !prev[label] }));
    };

  return (
    <div className="flex flex-col h-full bg-sidebar-background pt-4">
      <SidebarContent className="flex-1 p-4">
        <SidebarMenu>
            {menuItems.map((item) => (
                <Collapsible key={item.label} open={openSections[item.label]} onOpenChange={() => toggleSection(item.label)} className="w-full">
                    <CollapsibleTrigger asChild>
                        <div className="flex items-center justify-between w-full cursor-pointer py-2">
                             <SidebarMenuButton 
                                className="flex items-center gap-2 w-full justify-start text-base font-semibold text-sidebar-foreground hover:bg-sidebar-accent"
                                tooltip={item.label}
                             >
                                <item.icon className="h-5 w-5" />
                                <span>{item.label}</span>
                            </SidebarMenuButton>
                            {openSections[item.label] ? <ChevronUp className="h-4 w-4 text-sidebar-foreground" /> : <ChevronDown className="h-4 w-4 text-sidebar-foreground" />}
                        </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                        <SidebarMenuSub className="mt-2 space-y-2">
                        {item.subItems.map((subItem) => (
                            <SidebarMenuItem key={subItem}>
                            <SidebarMenuSubButton className="text-sidebar-foreground/80 hover:text-sidebar-accent-foreground">{subItem}</SidebarMenuSubButton>
                            </SidebarMenuItem>
                        ))}
                        </SidebarMenuSub>
                    </CollapsibleContent>
              </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </div>
  );
}
