
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
import { Card, CardContent } from "@/components/ui/card";
import { Search, Download, Edit } from "lucide-react";
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
import Link from "next/link";

const shippingData = [
  {
    quoteId: "ORD001",
    status: "待放行",
    lastModified: "2024/08/22 10:00",
    handler: "人員A",
  },
  {
    quoteId: "ORD002",
    status: "已轉檔",
    lastModified: "2024/08/21 15:30",
    handler: "系統",
  },
  {
    quoteId: "ORD003",
    status: "待檢貨",
    lastModified: "2024/08/20 11:00",
    handler: "人員B",
  },
  {
    quoteId: "ORD004",
    status: "撿貨處理中",
    lastModified: "2024/08/19 18:00",
    handler: "人員C",
  },
  {
    quoteId: "ORD005",
    status: "已完成",
    lastModified: "2024/08/18 14:00",
    handler: "系統",
  },
];

const statusMap: { [key: string]: { label: string; className: string } } = {
  已轉檔: { label: "已轉檔", className: "bg-blue-100 text-blue-800" },
  待放行: { label: "待放行", className: "bg-yellow-100 text-yellow-800" },
  待檢貨: { label: "待檢貨", className: "bg-orange-100 text-orange-800" },
  撿貨處理中: { label: "撿貨處理中", className: "bg-purple-100 text-purple-800" },
  已完成: { label: "已完成", className: "bg-green-100 text-green-800" },
};

export default function ShippingDetailsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">出貨明細表</h1>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
              <div className="space-y-2">
                <label htmlFor="quoteId" className="text-sm font-medium">報價單號</label>
                <Input id="quoteId" placeholder="輸入報價單號" />
              </div>
              <div className="space-y-2">
                <label htmlFor="status" className="text-sm font-medium">出貨狀態</label>
                <Select>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="全部" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部</SelectItem>
                    {Object.keys(statusMap).map(status => (
                      <SelectItem key={status} value={status}>{statusMap[status].label}</SelectItem>
                    ))}
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
        <CardContent className="pt-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>報價單號</TableHead>
                  <TableHead>狀態</TableHead>
                  <TableHead>目前處理人員</TableHead>
                  <TableHead>最後更新時間</TableHead>
                  <TableHead>編輯</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shippingData.map((item) => (
                  <TableRow key={item.quoteId}>
                    <TableCell className="font-medium">{item.quoteId}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusMap[item.status as keyof typeof statusMap]?.className || ""}>
                        {statusMap[item.status as keyof typeof statusMap]?.label || item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.handler}</TableCell>
                    <TableCell>{item.lastModified}</TableCell>
                    <TableCell>
                      <Button asChild variant="outline" size="icon" className="h-8 w-8">
                         <Link href="/Manager/shipping-details/edit">
                           <Edit className="h-4 w-4" />
                         </Link>
                      </Button>
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
