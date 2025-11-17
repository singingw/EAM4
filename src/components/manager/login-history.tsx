
"use client";

import { useRouter } from "next/navigation";
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
import { RefreshCw } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const loginHistory = [
  {
    id: "1",
    user: "Max",
    action: "登入",
    time: "2025/09/26 14:30:15",
    ip: "192.168.1.1",
    status: "成功",
  },
  {
    id: "2",
    user: "Max",
    action: "登出",
    time: "2025/09/26 18:00:42",
    ip: "192.168.1.1",
    status: "成功",
  },
  {
    id: "3",
    user: "林美玲",
    action: "登入",
    time: "2025/09/26 09:05:11",
    ip: "10.0.0.5",
    status: "成功",
  },
  {
    id: "4",
    user: "王大明",
    action: "登入",
    time: "2025/09/25 10:00:00",
    ip: "172.16.0.10",
    status: "失敗",
  },
];

export function LoginHistory() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">登入/登出記錄</h1>
        <Button
          variant="outline"
          className="bg-gray-500 text-white hover:bg-gray-600"
          onClick={() => router.back()}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          返回列表
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>使用者</TableHead>
                  <TableHead>動作</TableHead>
                  <TableHead>時間</TableHead>
                  <TableHead>IP位置</TableHead>
                  <TableHead>狀態</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loginHistory.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>{log.user}</TableCell>
                    <TableCell>{log.action}</TableCell>
                    <TableCell>{log.time}</TableCell>
                    <TableCell>{log.ip}</TableCell>
                    <TableCell
                      className={
                        log.status === "成功"
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {log.status}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <div className="p-4 border-t flex justify-between items-center">
            <p className="text-sm text-muted-foreground whitespace-nowrap">顯示第 1 至 4 項結果，共 4 項</p>
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

    