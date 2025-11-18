
"use client";

import { useState } from "react";
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
import { Plus, MoreVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const roles = [
  {
    id: "1",
    name: "系統管理員",
    permissions: ["系統管理", "權限管理", "識別證", "名單管理"],
    modifiedTime: "2025/05/13 16:30:51",
    modifiedBy: "SystemAdmin",
  },
  {
    id: "2",
    name: "業務",
    permissions: ["名單管理"],
    modifiedTime: "2025/05/12 11:20:00",
    modifiedBy: "SystemAdmin",
  },
  {
    id: "3",
    name: "財務",
    permissions: ["名單管理"],
    modifiedTime: "2025/05/11 09:00:15",
    modifiedBy: "SystemAdmin",
  },
  {
    id: "4",
    name: "一般使用者",
    permissions: ["識別證"],
    modifiedTime: "2025/05/10 14:45:30",
    modifiedBy: "SystemAdmin",
  },
];

export default function RolesPage() {
  const [showFunctions, setShowFunctions] = useState(true);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">角色管理</h1>
        <Button asChild className="bg-blue-500 text-white hover:bg-blue-600">
          <Link href="/Manager/roles/add">
            <Plus className="mr-2 h-4 w-4" />
            新增
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <span className="text-sm">顯示</span>
            <Select defaultValue="10">
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm">項結果</span>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>角色名稱</TableHead>
                  <TableHead>權限</TableHead>
                  <TableHead>修改時間</TableHead>
                  <TableHead>修改人員</TableHead>
                  <TableHead>
                    <div className="flex items-center gap-2">
                      <span>功能</span>
                      <Switch checked={showFunctions} onCheckedChange={setShowFunctions} />
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roles.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell className="font-medium">{role.name}</TableCell>
                    <TableCell className="space-x-1 max-w-xs">
                      {role.permissions.map(p => <Badge key={p} variant="outline" className="font-normal">{p}</Badge>)}
                    </TableCell>
                    <TableCell>{role.modifiedTime}</TableCell>
                    <TableCell>{role.modifiedBy}</TableCell>
                    <TableCell className="space-x-1">
                      {showFunctions ? (
                        <>
                          <Button asChild variant="outline" size="sm" className="bg-green-500 text-white hover:bg-green-600 hover:text-white">
                            <Link href="/Manager/roles/edit">編輯</Link>
                          </Button>
                          <Button variant="destructive" size="sm">刪除</Button>
                          <Button variant="outline" size="sm" className="bg-blue-500 text-white hover:bg-blue-600 hover:text-white">檢視</Button>
                          <Button variant="secondary" size="sm">複製</Button>
                          <Button asChild variant="outline" size="sm" className="bg-orange-500 text-white hover:bg-orange-600 hover:text-white">
                            <Link href="/Manager/history">異動紀錄</Link>
                          </Button>
                        </>
                      ) : (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem asChild>
                              <Link href="/Manager/roles/edit" className="text-green-600">編輯</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">刪除</DropdownMenuItem>
                            <DropdownMenuItem className="text-blue-600">檢視</DropdownMenuItem>
                            <DropdownMenuItem>複製</DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href="/Manager/history" className="text-orange-600">異動紀錄</Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
         <div className="p-4 border-t flex justify-between items-center">
            <p className="text-sm text-muted-foreground whitespace-nowrap">顯示第 1 至 4 項結果，共 4 項</p>
            <Pagination>
                <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext href="#" />
                </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
      </Card>
    </div>
  );
}
