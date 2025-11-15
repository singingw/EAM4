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
import { Plus, Search, Trash, Copy, History } from "lucide-react";
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

const users = [
  {
    id: "1",
    name: "Max",
    email: "max.sixdots@gmail.com",
    role: "系統管理員",
    suspensionTime: "-",
    status: "On",
  },
  {
    id: "2",
    name: "林美玲",
    email: "linml@example.com",
    role: "業務",
    suspensionTime: "-",
    status: "On",
  },
  {
    id: "3",
    name: "王大明",
    email: "wangdm@example.com",
    role: "財務",
    suspensionTime: "-",
    status: "On",
  },
  {
    id: "4",
    name: "陳小華",
    email: "chenxh@example.com",
    role: "一般使用者",
    suspensionTime: "-",
    status: "On",
  },
];

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">帳號管理</h1>
        <Button className="bg-blue-500 text-white hover:bg-blue-600">
          <Plus className="mr-2 h-4 w-4" />
          新增
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
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
                    <SelectValue placeholder="系統管理員" />
                  </SelectTrigger>
                  <SelectContent>
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
                    <SelectValue placeholder="On" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="on">On</SelectItem>
                    <SelectItem value="off">Off</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-center">
              <Button>
                <Search className="mr-2 h-4 w-4" />
                查詢
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
                  <TableHead>功能</TableHead>
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
                      <Badge variant={user.status === "On" ? "default" : "secondary"}
                       className={user.status === "On" ? "bg-green-500 hover:bg-green-500/80" : ""}
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="space-x-1">
                      <Button variant="outline" size="sm" className="bg-green-500 text-white hover:bg-green-600 hover:text-white">編輯</Button>
                      <Button variant="destructive" size="sm">刪除</Button>
                      <Button variant="outline" size="sm" className="bg-blue-500 text-white hover:bg-blue-600 hover:text-white">複製</Button>
                      <Button variant="outline" size="sm" className="bg-orange-500 text-white hover:bg-orange-600 hover:text-white">異動記錄</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <div className="p-4 border-t">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
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
