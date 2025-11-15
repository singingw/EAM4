"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Plus, ArrowUp, ArrowDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

const menuItems = [
  {
    id: "1",
    name: "系統管理",
    icon: "Settings",
    path: "-",
    status: true,
    subItems: [
      { id: "1-1", name: "系統功能管理", icon: "-", path: "/Manager/system-features", status: true },
      { id: "1-2", name: "後台選單管理", icon: "-", path: "/Manager/menu-management", status: true },
    ],
  },
  {
    id: "2",
    name: "權限管理",
    icon: "Share2",
    path: "-",
    status: true,
    subItems: [
        { id: "2-1", name: "後台帳號管理", icon: "-", path: "/Manager/users", status: true },
        { id: "2-2", name: "角色管理", icon: "-", path: "/Manager/roles", status: true },
    ],
  },
  {
    id: "3",
    name: "名單管理",
    icon: "MessageSquare",
    path: "-",
    status: false,
    subItems: [],
  },
];

export default function MenuManagementPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">後台選單管理</h1>
        <div>
            <Button variant="outline" className="mr-2">儲存</Button>
            <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                新增
            </Button>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-1/12"></TableHead>
                  <TableHead className="w-2/12">選單名稱</TableHead>
                  <TableHead className="w-1/12">Icon</TableHead>
                  <TableHead className="w-3/12">路徑</TableHead>
                  <TableHead className="w-1/12">狀態</TableHead>
                  <TableHead className="w-1/12">排序</TableHead>
                  <TableHead className="w-3/12">功能</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {menuItems.map((item, index) => (
                  <>
                    <TableRow key={item.id} className="font-semibold bg-slate-50 dark:bg-slate-800">
                      <TableCell></TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.icon}</TableCell>
                      <TableCell>{item.path}</TableCell>
                      <TableCell>
                        <Switch defaultChecked={item.status} />
                      </TableCell>
                      <TableCell className="space-x-1">
                        <Button variant="ghost" size="icon" disabled={index === 0}>
                            <ArrowUp className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" disabled={index === menuItems.length - 1}>
                            <ArrowDown className="h-4 w-4" />
                        </Button>
                      </TableCell>
                      <TableCell className="space-x-1">
                        <Button variant="outline" size="sm" className="bg-blue-500 text-white hover:bg-blue-600 hover:text-white">
                            新增子選單
                        </Button>
                        <Button variant="destructive" size="sm">
                          刪除
                        </Button>
                      </TableCell>
                    </TableRow>
                    {item.subItems.map((subItem, subIndex) => (
                         <TableRow key={subItem.id}>
                            <TableCell></TableCell>
                            <TableCell className="pl-12">{subItem.name}</TableCell>
                            <TableCell>{subItem.icon}</TableCell>
                            <TableCell>{subItem.path}</TableCell>
                            <TableCell>
                                <Switch defaultChecked={subItem.status} />
                            </TableCell>
                            <TableCell className="space-x-1">
                                <Button variant="ghost" size="icon" disabled={subIndex === 0}>
                                    <ArrowUp className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" disabled={subIndex === item.subItems.length - 1}>
                                    <ArrowDown className="h-4 w-4" />
                                </Button>
                            </TableCell>
                            <TableCell className="space-x-1">
                                <Button variant="destructive" size="sm">
                                刪除
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                  </>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
