
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
import { Upload, Download, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";

const historyData = [
  { id: 1, date: "2024/08/23 10:00", partNumber: "PN001", productName: "Laptop A", action: "出貨", quantity: -1, handler: "人員A", note: "報價單 ORD001" },
  { id: 2, date: "2024/08/23 09:30", partNumber: "PN002", productName: "Laptop B", action: "出貨", quantity: -2, handler: "人員A", note: "報價單 ORD001" },
  { id: 3, date: "2024/08/22 14:00", partNumber: "PN005", productName: "Keyboard", action: "入庫", quantity: 10, handler: "倉管B", note: "新品採購" },
  { id: 4, date: "2024/08/22 11:00", partNumber: "PN003", productName: "Monitor C", action: "領用", quantity: -1, handler: "工程師C", note: "內部測試用" },
  { id: 5, date: "2024/08/21 16:00", partNumber: "PN001", productName: "Laptop A", action: "盤點調整", quantity: 1, handler: "系統", note: "庫存修正" },
];

export default function InventoryHistoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">庫存歷程</h1>
        <div className="flex items-center gap-2">
            <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                匯入
            </Button>
            <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                匯出
            </Button>
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              <div className="space-y-2">
                <label htmlFor="partNumber" className="text-sm font-medium">料號</label>
                <Input id="partNumber" placeholder="輸入料號" />
              </div>
              <div className="space-y-2">
                <label htmlFor="productName" className="text-sm font-medium">品名</label>
                <Input id="productName" placeholder="輸入品名" />
              </div>
              <div className="space-y-2">
                <label htmlFor="handler" className="text-sm font-medium">處理人員</label>
                <Input id="handler" placeholder="輸入處理人員" />
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
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>項次</TableHead>
                  <TableHead>異動日期</TableHead>
                  <TableHead>料號</TableHead>
                  <TableHead>品名</TableHead>
                  <TableHead>異動內容</TableHead>
                  <TableHead>異動數量</TableHead>
                  <TableHead>處理人員</TableHead>
                  <TableHead>備註</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {historyData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>
                      <Link href={`/Manager/inventory-history/${item.partNumber}`} className="text-blue-600 hover:underline">
                        {item.partNumber}
                      </Link>
                    </TableCell>
                    <TableCell>{item.productName}</TableCell>
                    <TableCell>{item.action}</TableCell>
                    <TableCell className={item.quantity > 0 ? "text-green-600" : "text-red-600"}>
                      {item.quantity}
                    </TableCell>
                    <TableCell>{item.handler}</TableCell>
                    <TableCell>{item.note}</TableCell>
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
