
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RefreshCw } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";
import { useParams } from "next/navigation";

const allHistoryData = [
  { id: 1, date: "2024/08/23 10:00", partNumber: "PN001", productName: "Laptop A", action: "出貨", quantity: -1, handler: "人員A", note: "報價單 ORD001" },
  { id: 2, date: "2024/08/23 09:30", partNumber: "PN002", productName: "Laptop B", action: "出貨", quantity: -2, handler: "人員A", note: "報價單 ORD001" },
  { id: 3, date: "2024/08/22 14:00", partNumber: "PN005", productName: "Keyboard", action: "入庫", quantity: 10, handler: "倉管B", note: "新品採購" },
  { id: 4, date: "2024/08/22 11:00", partNumber: "PN003", productName: "Monitor C", action: "領用", quantity: -1, handler: "工程師C", note: "內部測試用" },
  { id: 5, date: "2024/08/21 16:00", partNumber: "PN001", productName: "Laptop A", action: "盤點調整", quantity: 1, handler: "系統", note: "庫存修正" },
];

export default function DeviceHistoryPage() {
  const params = useParams();
  const partNumber = params.partNumber as string;
  const historyData = allHistoryData.filter(item => item.partNumber === partNumber);
  const device = historyData.length > 0 ? historyData[0] : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">設備異動紀錄</h1>
          {device && <p className="text-muted-foreground">{device.productName} ({device.partNumber})</p>}
        </div>
        <Button variant="outline" asChild>
          <Link href="/Manager/inventory-history">
            <RefreshCw className="mr-2 h-4 w-4" />
            返回庫存歷程
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>項次</TableHead>
                  <TableHead>異動日期</TableHead>
                  <TableHead>異動內容</TableHead>
                  <TableHead>異動數量</TableHead>
                  <TableHead>處理人員</TableHead>
                  <TableHead>備註</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {historyData.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.date}</TableCell>
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
            <p className="text-sm text-muted-foreground whitespace-nowrap">顯示第 1 至 {historyData.length} 項結果，共 {historyData.length} 項</p>
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
