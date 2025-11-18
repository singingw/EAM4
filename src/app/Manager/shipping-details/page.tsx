
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
import { Search, Download } from "lucide-react";
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

const shippingData = [
  {
    orderId: "ORD001",
    customer: "陳曉明",
    product: "日本宇治抹茶粉",
    quantity: 2,
    status: "shipped",
    shippingDate: "2024/08/20",
  },
  {
    orderId: "ORD002",
    customer: "林美麗",
    product: "手工茶具組",
    quantity: 1,
    status: "processing",
    shippingDate: "-",
  },
  {
    orderId: "ORD003",
    customer: "John Doe",
    product: "茶道體驗券",
    quantity: 4,
    status: "delivered",
    shippingDate: "2024/08/18",
  },
  {
    orderId: "ORD004",
    customer: "張偉",
    product: "日式和菓子禮盒",
    quantity: 1,
    status: "shipped",
    shippingDate: "2024/08/21",
  },
   {
    orderId: "ORD005",
    customer: "Emily White",
    product: "日本宇治抹茶粉",
    quantity: 3,
    status: "delivered",
    shippingDate: "2024/08/19",
  },
];

const statusMap = {
    shipped: { label: "已出貨", className: "bg-blue-100 text-blue-800" },
    processing: { label: "處理中", className: "bg-yellow-100 text-yellow-800" },
    delivered: { label: "已送達", className: "bg-green-100 text-green-800" }
}

export default function ShippingDetailsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">出貨明細表</h1>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              <div className="space-y-2">
                <label htmlFor="orderId" className="text-sm font-medium">訂單號碼</label>
                <Input id="orderId" placeholder="輸入訂單號碼" />
              </div>
              <div className="space-y-2">
                <label htmlFor="customer" className="text-sm font-medium">客戶名稱</label>
                <Input id="customer" placeholder="輸入客戶名稱" />
              </div>
              <div className="space-y-2">
                <label htmlFor="product" className="text-sm font-medium">商品名稱</label>
                <Input id="product" placeholder="輸入商品名稱" />
              </div>
              <div className="space-y-2">
                <label htmlFor="status" className="text-sm font-medium">出貨狀態</label>
                <Select>
                    <SelectTrigger id="status">
                    <SelectValue placeholder="全部" />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="all">全部</SelectItem>
                    <SelectItem value="shipped">已出貨</SelectItem>
                    <SelectItem value="processing">處理中</SelectItem>
                    <SelectItem value="delivered">已送達</SelectItem>
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
                  <TableHead>訂單號碼</TableHead>
                  <TableHead>客戶</TableHead>
                  <TableHead>商品</TableHead>
                  <TableHead>數量</TableHead>
                  <TableHead>狀態</TableHead>
                  <TableHead>出貨日期</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shippingData.map((item) => (
                  <TableRow key={item.orderId}>
                    <TableCell className="font-medium">{item.orderId}</TableCell>
                    <TableCell>{item.customer}</TableCell>
                    <TableCell>{item.product}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusMap[item.status as keyof typeof statusMap].className}>
                        {statusMap[item.status as keyof typeof statusMap].label}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.shippingDate}</TableCell>
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
