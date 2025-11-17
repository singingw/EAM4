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
import { Search, Download, Eye } from "lucide-react";
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
import { Progress } from "@/components/ui/progress";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const qrCodeRecords = [
  {
    id: "1",
    name: "陳曉明",
    email: "chen.hm@example.com",
    phone: "0912-345-678",
    progress: 100,
    completionTime: "2024/08/16 10:30:15",
    lastDownloadTime: "2024/08/16 10:30:15",
    imageUrl: "https://placehold.co/200x200/png?text=QR+Code+1",
  },
  {
    id: "2",
    name: "林美麗",
    email: "mei.li.lin@example.com",
    phone: "0928-765-432",
    progress: 50,
    completionTime: "-",
    lastDownloadTime: "2024/08/16 09:45:00",
    imageUrl: "https://placehold.co/200x200/png?text=QR+Code+2",
  },
  {
    id: "3",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "0988-111-222",
    progress: 100,
    completionTime: "2024/08/16 11:05:22",
    lastDownloadTime: "2024/08/16 11:05:22",
    imageUrl: "https://placehold.co/200x200/png?text=QR+Code+3",
  },
  {
    id: "4",
    name: "張偉",
    email: "wei.chang@example.com",
    phone: "0933-555-888",
    progress: 0,
    completionTime: "-",
    lastDownloadTime: "-",
    imageUrl: "https://placehold.co/200x200/png?text=QR+Code+4",
  },
   {
    id: "5",
    name: "Emily White",
    email: "emily.white@example.com",
    phone: "0966-999-000",
    progress: 75,
    completionTime: "-",
    lastDownloadTime: "2024/08/16 12:00:00",
    imageUrl: "https://placehold.co/200x200/png?text=QR+Code+5",
  },
];

export default function QrCodePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">QR Code 下載紀錄(不做)</h1>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4">
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div className="space-y-2">
                    <label htmlFor="id" className="text-sm font-medium">ID</label>
                    <Input id="id" placeholder="輸入ID" />
                </div>
                <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">姓名</label>
                    <Input id="name" placeholder="輸入姓名" />
                </div>
                <div className="space-y-2">
                    <label htmlFor="progress" className="text-sm font-medium">下載進度</label>
                    <Select>
                        <SelectTrigger id="progress">
                        <SelectValue placeholder="全部" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="all">全部</SelectItem>
                        <SelectItem value="completed">已完成</SelectItem>
                        <SelectItem value="in-progress">進行中</SelectItem>
                        <SelectItem value="not-started">未開始</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <Input id="email" placeholder="輸入Email" />
                </div>
                <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">手機</label>
                    <Input id="phone" placeholder="輸入手機號碼" />
                </div>
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
                  <TableHead>ID</TableHead>
                  <TableHead>姓名</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>手機</TableHead>
                  <TableHead>下載進度</TableHead>
                  <TableHead>完成時間</TableHead>
                  <TableHead>最後下載時間</TableHead>
                  <TableHead>圖檔</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {qrCodeRecords.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell>
                        <div className="flex items-center gap-2">
                            <Progress value={item.progress} className="w-[100px]" />
                            <span>{item.progress}%</span>
                        </div>
                    </TableCell>
                    <TableCell>{item.completionTime}</TableCell>
                    <TableCell>{item.lastDownloadTime}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon" className="h-8 w-8" disabled={!item.imageUrl || item.progress === 0}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[250px]">
                          <DialogHeader>
                            <DialogTitle>QR Code 預覽</DialogTitle>
                          </DialogHeader>
                          <div className="flex items-center justify-center p-4">
                             <Image src={item.imageUrl} alt={`QR Code for ${item.name}`} width={200} height={200} />
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
         <div className="p-4 border-t flex justify-between items-center">
            <p className="text-sm text-muted-foreground whitespace-nowrap">顯示第 1 至 5 項結果，共 5 項</p>
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
