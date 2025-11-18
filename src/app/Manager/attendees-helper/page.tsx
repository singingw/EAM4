
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
import { Plus, Search, CheckCircle, XCircle, Download, Upload, Mail, MessageSquare, MoreVertical, Settings, Eye, QrCode } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FieldSettingsDialog } from "@/components/manager/field-settings-dialog";
import Image from "next/image";
import { PreEventNotificationDialog } from "@/components/manager/pre-event-notification-dialog";
import Link from "next/link";
import { ImportDialog } from "@/components/manager/import-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const attendees = [
  {
    id: "1",
    name: "陳曉明",
    email: "chen.hm@example.com",
    phone: "0912-345-678",
    status: "checked-in",
    checkInTime: "2024/08/15 14:05:22",
    emailCount: 2,
    smsCount: 1,
    qrCodeUrl: "https://placehold.co/200x200/png?text=QR+Code+1",
  },
  {
    id: "2",
    name: "林美麗",
    email: "mei.li.lin@example.com",
    phone: "0928-765-432",
    status: "not-checked-in",
    checkInTime: "-",
    emailCount: 1,
    smsCount: 0,
    qrCodeUrl: "https://placehold.co/200x200/png?text=QR+Code+2",
  },
  {
    id: "3",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "0988-111-222",
    status: "checked-in",
    checkInTime: "2024/08/15 14:10:11",
    emailCount: 2,
    smsCount: 2,
    qrCodeUrl: "https://placehold.co/200x200/png?text=QR+Code+3",
  },
  {
    id: "4",
    name: "張偉",
    email: "wei.chang@example.com",
    phone: "0933-555-888",
    status: "not-checked-in",
    checkInTime: "-",
    emailCount: 0,
    smsCount: 0,
    qrCodeUrl: "https://placehold.co/200x200/png?text=QR+Code+4",
  },
   {
    id: "5",
    name: "Emily White",
    email: "emily.white@example.com",
    phone: "0966-999-000",
    status: "checked-in",
    checkInTime: "2024/08/15 14:20:00",
    emailCount: 3,
    smsCount: 1,
    qrCodeUrl: "https://placehold.co/200x200/png?text=QR+Code+5",
  },
];

export default function AttendeesHelperPage() {
  const [showFunctions, setShowFunctions] = useState(true);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">參加者名單 (小幫手)</h1>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4">
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  <div className="space-y-2">
                    <label htmlFor="id-search" className="text-sm font-medium">ID</label>
                    <Input id="id-search" placeholder="輸入ID" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">姓名</label>
                    <Input id="name" placeholder="輸入姓名" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="status" className="text-sm font-medium">報到狀態</label>
                    <Select>
                        <SelectTrigger id="status">
                        <SelectValue placeholder="全部" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="all">全部</SelectItem>
                        <SelectItem value="checked-in">已報到</SelectItem>
                        <SelectItem value="not-checked-in">未報到</SelectItem>
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
                <div className="flex items-center gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="bg-teal-500 text-white hover:bg-teal-600 hover:text-white">批次寄送通知</Button>
                    </DialogTrigger>
                    <PreEventNotificationDialog />
                  </Dialog>
                  <Button variant="outline" className="bg-orange-400 text-white hover:bg-orange-500 hover:text-white">批次匯出 QRCode</Button>
                  <Button asChild className="bg-blue-500 text-white hover:bg-blue-600">
                    <Link href="/Manager/attendees/add">
                      <Plus className="mr-2 h-4 w-4" />
                      新增參加者
                    </Link>
                  </Button>
                </div>
            </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="w-10">
                     <Checkbox />
                  </TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>姓名</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>手機</TableHead>
                  <TableHead>報到狀態</TableHead>
                  <TableHead>報到時間</TableHead>
                  <TableHead>Email通知</TableHead>
                  <TableHead>簡訊通知</TableHead>
                  <TableHead>
                    <div className="flex items-center gap-2">
                      <span>功能</span>
                      <Switch checked={showFunctions} onCheckedChange={setShowFunctions} />
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendees.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                        <Checkbox />
                    </TableCell>
                    <TableCell>{item.id}</TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell>
                      <Badge variant={item.status === 'checked-in' ? "default" : "secondary"}
                       className={item.status === 'checked-in' ? "bg-green-100 text-green-800 border-green-200 hover:bg-green-100/80" : "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100/80"}
                      >
                        {item.status === 'checked-in' ? <CheckCircle className="mr-1 h-3 w-3" /> : <XCircle className="mr-1 h-3 w-3" />}
                        {item.status === 'checked-in' ? '已報到' : '未報到'}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.checkInTime}</TableCell>
                    <TableCell>{item.emailCount}</TableCell>
                    <TableCell>{item.smsCount}</TableCell>
                    <TableCell className="space-x-1">
                      {showFunctions ? (
                        <div className="flex flex-wrap gap-1">
                          <Button asChild variant="outline" size="sm" className="bg-green-500 text-white hover:bg-green-600 hover:text-white">
                            <Link href="/Manager/attendees/edit">編輯</Link>
                          </Button>
                          <Button variant="destructive" size="sm">刪除</Button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" className="bg-teal-500 text-white hover:bg-teal-600 hover:text-white">行前通知</Button>
                            </DialogTrigger>
                            <PreEventNotificationDialog />
                          </Dialog>
                           <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" className="bg-orange-400 text-white hover:bg-orange-500 hover:text-white">QR Code</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[250px]">
                              <DialogHeader>
                                <DialogTitle>QR Code 預覽</DialogTitle>
                              </DialogHeader>
                              <div className="flex items-center justify-center p-4">
                                 <Image src={item.qrCodeUrl} alt={`QR Code for ${item.name}`} width={200} height={200} />
                              </div>
                            </DialogContent>
                          </Dialog>
                           <Button asChild variant="outline" size="sm" className="bg-blue-500 text-white hover:bg-blue-600 hover:text-white">
                             <Link href="/Manager/attendees/view">檢視</Link>
                          </Button>
                          <Button asChild variant="outline" size="sm" className="bg-orange-500 text-white hover:bg-orange-600 hover:text-white">
                            <Link href="/Manager/history">異動紀錄</Link>
                          </Button>
                        </div>
                      ) : (
                        <Dialog>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem asChild>
                                <Link href="/Manager/attendees/edit" className="text-green-600">編輯</Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">刪除</DropdownMenuItem>
                              <DialogTrigger asChild>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-teal-600">行前通知</DropdownMenuItem>
                              </DialogTrigger>
                              <DialogTrigger asChild>
                                <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-orange-500">QR Code</DropdownMenuItem>
                              </DialogTrigger>
                              <DropdownMenuItem asChild>
                                  <Link href="/Manager/attendees/view" className="text-blue-600">檢視</Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                  <Link href="/Manager/history" className="text-orange-600">異動紀錄</Link>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </Dialog>
                      )}
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
