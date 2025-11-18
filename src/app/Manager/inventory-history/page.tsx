
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
import { useMemo } from "react";

const historyData = [
  { id: 1, date: "2024/08/23 10:00", partNumber: "PN001", productName: "Laptop A", serialNumber: "SN-A001", quoteId: "ORD001", action: "出貨", quantity: -1, handler: "人員A", note: "報價單 ORD001" },
  { id: 2, date: "2024/08/23 09:30", partNumber: "PN002", productName: "Laptop B", serialNumber: "SN-B001", quoteId: "ORD001", action: "出貨", quantity: -2, handler: "人員A", note: "報價單 ORD001" },
  { id: 3, date: "2024/08/22 14:00", partNumber: "PN005", productName: "Keyboard", serialNumber: "SN-K001", quoteId: "", action: "入庫", quantity: 10, handler: "倉管B", note: "新品採購" },
  { id: 4, date: "2024/08/22 11:00", partNumber: "PN003", productName: "Monitor C", serialNumber: "SN-M001", quoteId: "", action: "領用", quantity: -1, handler: "工程師C", note: "內部測試用" },
  { id: 5, date: "2024/08/21 16:00", partNumber: "PN001", productName: "Laptop A", serialNumber: "SN-A002", quoteId: "", action: "盤點調整", quantity: 1, handler: "系統", note: "庫存修正" },
  { id: 6, date: "2024/08/24 11:00", partNumber: "PN001", productName: "Laptop A", serialNumber: "SN-A002", quoteId: "ORD002", action: "出貨", quantity: -2, handler: "人員A", note: "報價單 ORD002" },
  { id: 7, date: "2024/08/25 09:00", partNumber: "PN001", productName: "Laptop A", serialNumber: "SN-A003", quoteId: "", action: "入庫", quantity: 10, handler: "倉管B", note: "新品採購" },
  { id: 8, date: "2024/08/26 14:30", partNumber: "PN001", productName: "Laptop A", serialNumber: "SN-A001", quoteId: "", action: "盤點調整", quantity: 1, handler: "系統", note: "庫存修正" },
  { id: 9, date: "2024/08/27 10:00", partNumber: "PN001", productName: "Laptop A", serialNumber: "SN-A003", quoteId: "ORD003", action: "出貨", quantity: -5, handler: "人員C", note: "報價單 ORD003" },
];

export default function InventoryHistoryPage() {
    const partNumberSummary = useMemo(() => {
    const summary: { [key: string]: { partNumber: string; productName: string; totalQuantity: number; lastModified: string; handler: string; note: string; } } = {};

    historyData.forEach(item => {
      if (!summary[item.partNumber]) {
        summary[item.partNumber] = {
          partNumber: item.partNumber,
          productName: item.productName,
          totalQuantity: 0,
          lastModified: item.date,
          handler: item.handler,
          note: item.note,
        };
      }
      summary[item.partNumber].totalQuantity += item.quantity;
      if (new Date(item.date) > new Date(summary[item.partNumber].lastModified)) {
        summary[item.partNumber].lastModified = item.date;
        summary[item.partNumber].handler = item.handler;
        summary[item.partNumber].note = item.note;
      }
    });
    return Object.values(summary);
  }, []);

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
                  <TableHead>最後異動日期</TableHead>
                  <TableHead>料號</TableHead>
                  <TableHead>品名</TableHead>
                  <TableHead>總數量</TableHead>
                  <TableHead>最後處理人員</TableHead>
                  <TableHead>最後備註</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {partNumberSummary.map((item, index) => (
                  <TableRow key={item.partNumber}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.lastModified}</TableCell>
                    <TableCell>
                      <Link href={`/Manager/inventory-history/${item.partNumber}`} className="text-blue-600 hover:underline">
                        {item.partNumber}
                      </Link>
                    </TableCell>
                    <TableCell>{item.productName}</TableCell>
                    <TableCell className={item.totalQuantity > 0 ? "text-green-600" : (item.totalQuantity < 0 ? "text-red-600" : "")}>
                      {item.totalQuantity}
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
            <p className="text-sm text-muted-foreground whitespace-nowrap">顯示第 1 至 {partNumberSummary.length} 項結果，共 {partNumberSummary.length} 項</p>
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
