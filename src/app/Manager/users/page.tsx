"use client";

import { useState } from "react";
import Link from "next/link";
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
import { Plus, Search, CheckCircle, XCircle, Download, Upload, MoreVertical } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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

const users = [
  {
    id: "1",
    name: "Max",
    email: "max.sixdots@gmail.com",
    role: "系統管理員",
    suspensionTime: "-",
    status: "enabled",
  },
  {
    id: "2",
    name: "林美玲",
    email: "linml@example.com",
    role: "業務",
    suspensionTime: "-",
    status: "enabled",
  },
  {
    id: "3",
    name: "王大明",
    email: "wangdm@example.com",
    role: "財務",
    suspensionTime: "-",
    status: "enabled",
  },
  {
    id: "4",
    name: "陳小華",
    email: "chenxh@example.com",
    role: "一般使用者",
    suspensionTime: "2025/12/31 23:59:59",
    status: "disabled",
  },
];

export default function UsersPage() {
  const [showFunctions, setShowFunctions] = useState(true);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">帳號管理</h1>
        <div className="flex items-center gap-2">
            <Button className="bg-blue-500 text-white hover:bg-blue-600">
                <Plus className="mr-2 h-4 w-4" />
                新增
            </Button>
            <Button className="bg-blue-500 text-white hover:bg-blue-600">
                <Upload className="mr-2 h-4 w-4" />
                匯入
            </Button>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div className="space-y-2">
                <label htmlFor="userName" className="text-sm font-medium">使用者名稱</label>
                <Input id="userName" placeholder="輸入使用者名稱" />
              </div>
              <div className="space-y-2">
                <label htmlFor="account" className="text-sm font-medium">帳號</label>
                <Input id="account" placeholder="輸入帳號" />
              </div>
              <div className="space-y-2">
                <label htmlFor="role" className="text-sm font-medium">角色</label>
                <Select>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="全部" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部</SelectItem>
                    <SelectItem value="admin">系統管理員</SelectItem>
                    <SelectItem value="business">業務</SelectItem>
                    <SelectItem value="finance">財務</SelectItem>
                    <SelectItem value="user">一般使用者</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="status" className="text-sm font-medium">狀態</label>
                <Select>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="全部" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部</SelectItem>
                    <SelectItem value="enabled">啟用</SelectItem>
                    <SelectItem value="disabled">停用</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-center gap-2">
              <Button>
                <Search className="mr-2 h-4 w-4" />
                查詢
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                匯出
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

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
                  <TableHead>使用者名稱</TableHead>
                  <TableHead>帳號</TableHead>
                  <TableHead>角色</TableHead>
                  <TableHead>停權時間</TableHead>
                  <TableHead>狀態</TableHead>
                  <TableHead>
                    <div className="flex items-center justify-center gap-2">
                      <span>功能</span>
                      <Switch checked={showFunctions} onCheckedChange={setShowFunctions} />
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.suspensionTime}</TableCell>
                    <TableCell>
                      <Badge variant={user.status === "enabled" ? "default" : "secondary"}
                       className={user.status === "enabled" ? "bg-green-100 text-green-800 border-green-200 hover:bg-green-100/80" : "bg-red-100 text-red-800 border-red-200 hover:bg-red-100/80"}
                      >
                        {user.status === "enabled" ? <CheckCircle className="mr-1 h-3 w-3" /> : <XCircle className="mr-1 h-3 w-3" />}
                        {user.status === "enabled" ? '啟用' : '停用'}
                      </Badge>
                    </TableCell>
                    <TableCell className="space-x-1 text-center">
                      {showFunctions ? (
                        <>
                          <Button asChild variant="outline" size="sm" className="bg-green-500 text-white hover:bg-green-600 hover:text-white">
                            <Link href="/Manager/users/edit">編輯</Link>
                          </Button>
                          <Button variant="destructive" size="sm">刪除</Button>
                          <Button variant="outline" size="sm" className="bg-blue-500 text-white hover:bg-blue-600 hover:text-white">檢視</Button>
                          <Button variant="secondary" size="sm">複製</Button>
                          <Button variant="outline" size="sm" className="bg-orange-500 text-white hover:bg-orange-600 hover:text-white">異動紀錄</Button>
                          <Button variant="outline" size="sm" className="bg-blue-600 text-white hover:bg-blue-700 hover:text-white">登入/登出記錄</Button>
                          <Button variant="outline" size="sm" className="bg-cyan-500 text-white hover:bg-cyan-600 hover:text-white">觀察模式</Button>
                        </>
                      ) : (
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
         <div className="p-4 border-t flex justify-between items-center">
            <p className="text-sm text-muted-foreground">顯示第 1 至 4 項結果，共 4 項</p>
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

    