"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation';
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
      subItems: [
        { label: "系統功能管理", href: "/Manager/system-features" },
        { label: "後台選單管理", href: "/Manager/menu-management" },
      ],
    },
    {
      label: "權限管理",
      icon: Share2,
      subItems: [
        { label: "後台帳號管理", href: "/Manager/users" },
        { label: "角色管理", href: "/Manager/roles" },
      ],
    },
    {
      label: "名單管理",
      icon: MessageSquare,
      subItems: [
        { label: "參加者名單", href: "/Manager/attendees" },
        { label: "QR Code 下載", href: "/Manager/qrcode" },
      ],
    },
    {
      label: "識別證管理",
      icon: LayoutGrid,
      subItems: [
        { label: "識別證列印", href: "/Manager/badge-printing" },
      ],
    },
];


export function ManagerSidebar() {
  const pathname = usePathname();
  const defaultOpenItems = menuItems.map(item => item.subItems.some(sub => pathname.startsWith(sub.href)) ? item.label : null).filter(Boolean);

  return (
    <div className="flex flex-col h-full bg-sidebar-background pt-16">
      <SidebarContent className="flex-1 p-4">
        <SidebarMenu>
          {menuItems.map((item) => (
            <Collapsible key={item.label} className="w-full" defaultOpen={defaultOpenItems.includes(item.label)}>
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
                      <SidebarMenuSubItem key={subItem.label}>
                        <Link href={subItem.href} passHref>
                          <SidebarMenuSubButton 
                            isActive={pathname === subItem.href}
                            className="text-sidebar-foreground/80 hover:text-sidebar-accent-foreground"
                          >
                            {subItem.label}
                          </SidebarMenuSubButton>
                        </Link>
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
