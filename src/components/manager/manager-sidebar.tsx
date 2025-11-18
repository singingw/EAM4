
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
  ChevronUp,
  CreditCard,
  HelpCircle,
  Headset,
  Users
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
      label: "識別證",
      icon: CreditCard,
      subItems: [
        { label: "識別證設計(第二階段)", href: "/Manager/badge-design" },
        { label: "識別證模板", href: "/Manager/badge-templates" },
      ],
    },
    {
      label: "名單管理",
      icon: MessageSquare,
      subItems: [
        { label: "參加者名單", href: "/Manager/attendees" },
        { label: "參加者名單(小幫手)", href: "/Manager/attendees-helper" },
        { label: "QR Code 下載紀錄", href: "/Manager/qrcode" },
      ],
    },
];

const singleMenuItems = [
]

const bottomMenuItems = [
    {
        label: "常見 Q & A",
        icon: HelpCircle,
        href: "/Manager/faq",
    },
    {
        label: "客服服務",
        icon: Headset,
        href: "/Manager/support",
    }
]


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
                        <Link href={subItem.href} passHref legacyBehavior>
                          <SidebarMenuSubButton 
                            asChild
                            isActive={pathname === subItem.href}
                            className="text-sidebar-foreground/80 hover:text-sidebar-accent-foreground"
                          >
                            <a>{subItem.label}</a>
                          </SidebarMenuSubButton>
                        </Link>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ))}
           {singleMenuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                    <Link href={item.href} passHref legacyBehavior>
                        <SidebarMenuButton
                            asChild
                            isActive={pathname === item.href}
                            className="flex items-center gap-2 w-full justify-start text-base font-semibold text-sidebar-foreground/80 hover:text-sidebar-accent-foreground group"
                            tooltip={item.label}
                        >
                            <a>
                                <item.icon className="h-5 w-5" />
                                <span>{item.label}</span>
                            </a>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
             ))}
        </SidebarMenu>
      </SidebarContent>
       <div className="mt-auto p-4">
          <SidebarMenu>
             {bottomMenuItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                    <Link href={item.href} passHref legacyBehavior>
                        <SidebarMenuButton
                            asChild
                            isActive={pathname === item.href}
                            className="flex items-center gap-2 w-full justify-start text-base font-semibold text-sidebar-foreground/80 hover:text-sidebar-accent-foreground group"
                            tooltip={item.label}
                        >
                            <a>
                                <item.icon className="h-5 w-5" />
                                <span>{item.label}</span>
                            </a>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
             ))}
          </SidebarMenu>
        </div>
    </div>
  );
}
