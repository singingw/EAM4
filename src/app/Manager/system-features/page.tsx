
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
import { Plus, Search, CheckCircle, XCircle, MoreVertical } from "lucide-react";
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
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const features = [
    { id: "1", name: "系統功能管理", status: true },
    { id: "2", name: "後台選單管理", status: true },
    { id: "3", name: "後台帳號管理", status: true },
    { id: "4-role", name: "角色管理", status: true },
    { id: "5-badge-design", name: "識別證設計", status: true },
    { id: "6-badge-template", name: "識別證模板", status: true },
    { id: "7-attendees", name: "參加者名單", status: true },
    { id: "8-qrcode", name: "QR Code 下載紀錄", status: true },
    { id: "9", name: "獎項", status: false },
    { id: "10", name: "抽獎", status: false },
    { id: "11", name: "點卷", status: false },
];

export default function SystemFeaturesPage() {
  const [showFunctions, setShowFunctions] = useState(true);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">系統功能管理</h1>
        <Button asChild className="bg-blue-500 text-white hover:bg-blue-600">
          <Link href="/Manager/system-features/add">
            <Plus className="mr-2 h-4 w-4" />
            新增
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">標題</label>
                <Input id="title" placeholder="輸入標題" />
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
            <div className="flex items-center justify-between">
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
            </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-4/12">標題</TableHead>
                  <TableHead className="w-2/12">狀態</TableHead>
                  <TableHead className="w-6/12">
                    <div className="flex items-center gap-2">
                      <span>功能</span>
                      <Switch checked={showFunctions} onCheckedChange={setShowFunctions} />
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {features.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>
                      <Badge variant={item.status ? "default" : "secondary"}
                       className={item.status ? "bg-green-100 text-green-800 border-green-200 hover:bg-green-100/80" : "bg-red-100 text-red-800 border-red-200 hover:bg-red-100/80"}
                      >
                        {item.status ? <CheckCircle className="mr-1 h-3 w-3" /> : <XCircle className="mr-1 h-3 w-3" />}
                        {item.status ? '啟用' : '停用'}
                      </Badge>
                    </TableCell>
                    <TableCell className="space-x-1">
                      {showFunctions ? (
                        <>
                          <Button asChild variant="outline" size="sm" className="bg-green-500 text-white hover:bg-green-600 hover:text-white">
                            <Link href="/Manager/system-features/edit">編輯</Link>
                          </Button>
                          <Button variant="destructive" size="sm">刪除</Button>
                          <Button asChild variant="outline" size="sm" className="bg-blue-500 text-white hover:bg-blue-600 hover:text-white">
                            <Link href="/Manager/system-features/view">檢視</Link>
                          </Button>
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
                                <Link href="/Manager/system-features/edit" className="text-green-600">編輯</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">刪除</DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link href="/Manager/system-features/view">檢視</Link>
                            </DropdownMenuItem>
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
            <p className="text-sm text-muted-foreground whitespace-nowrap">顯示第 1 至 11 項結果，共 11 項</p>
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
