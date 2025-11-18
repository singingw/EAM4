
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
import { RefreshCw, Boxes } from "lucide-react";
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
    { id: 1, date: "2024/08/23 10:00", partNumber: "PN001", productName: "Laptop A", serialNumber: "SN-A001", quoteId: "ORD001", action: "出貨", quantity: -1, handler: "人員A", note: "報價單 ORD001" },
    { id: 2, date: "2024/08/23 09:30", partNumber: "PN002", productName: "Laptop B", serialNumber: "SN-B001, SN-B002", quoteId: "ORD001", action: "出貨", quantity: -2, handler: "人員A", note: "報價單 ORD001" },
    { id: 3, date: "2024/08/22 14:00", partNumber: "PN005", productName: "Keyboard", serialNumber: "", quoteId: "", action: "入庫", quantity: 10, handler: "倉管B", note: "新品採購" },
    { id: 4, date: "2024/08/22 11:00", partNumber: "PN003", productName: "Monitor C", serialNumber: "SN-M001", quoteId: "", action: "領用", quantity: -1, handler: "工程師C", note: "內部測試用" },
    { id: 5, date: "2024/08/21 16:00", partNumber: "PN001", productName: "Laptop A", serialNumber: "SN-A002", quoteId: "", action: "入庫", quantity: 5, handler: "倉管B", note: "新品採購" },
    { id: 6, date: "2024/08/24 11:00", partNumber: "PN001", productName: "Laptop A", serialNumber: "SN-A002, SN-A004", quoteId: "ORD002", action: "出貨", quantity: -2, handler: "人員A", note: "報價單 ORD002" },
    { id: 7, date: "2024/08/25 09:00", partNumber: "PN001", productName: "Laptop A", serialNumber: "", quoteId: "", action: "入庫", quantity: 10, handler: "倉管B", note: "新品採購" },
    { id: 8, date: "2024/08/26 14:30", partNumber: "PN001", productName: "Laptop A", serialNumber: "SN-A001", quoteId: "", action: "盤點調整", quantity: 1, handler: "系統", note: "庫存修正" },
    { id: 9, date: "2024/08/27 10:00", partNumber: "PN001", productName: "Laptop A", serialNumber: "SN-A003, SN-A005, SN-A006, SN-A007, SN-A008", quoteId: "ORD003", action: "出貨", quantity: -5, handler: "人員C", note: "報價單 ORD003" },
];

export default function DeviceHistoryPage() {
  const params = useParams();
  const partNumber = params.partNumber as string;
  
  const historyData = allHistoryData.filter(item => item.partNumber === partNumber).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const device = historyData.length > 0 ? historyData[0] : null;

  const totalQuantity = historyData.reduce((sum, item) => {
    // This is a simplified calculation. A real app might start with an initial quantity.
    if (item.action === '入庫' || item.action === '盤點調整') {
        return sum + item.quantity;
    }
     if (item.action === '出貨' || item.action === '領用') {
        return sum + item.quantity;
    }
    return sum;
  }, 20); // Starting with a mock initial quantity


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
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">目前總數量</CardTitle>
          <Boxes className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalQuantity}</div>
          <p className="text-xs text-muted-foreground">
            根據所有異動紀錄計算
          </p>
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
                  <TableHead>報價單號</TableHead>
                  <TableHead>移轉說明</TableHead>
                  <TableHead>異動數量</TableHead>
                  <TableHead>備註</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {historyData.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>
                      {item.quoteId ? (
                         <Link href={`/Manager/shipping-details/view?quoteId=${item.quoteId}`} className="text-blue-600 hover:underline">
                            {item.quoteId}
                         </Link>
                      ) : '-'}
                    </TableCell>
                    <TableCell>
                      {item.action}
                      {item.serialNumber && (
                        <div className="text-xs text-muted-foreground">
                          (序號: {item.serialNumber})
                        </div>
                      )}
                    </TableCell>
                    <TableCell className={item.quantity > 0 ? "text-green-600" : "text-red-600"}>
                      {item.quantity > 0 ? `+${item.quantity}`: item.quantity}
                    </TableCell>
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
