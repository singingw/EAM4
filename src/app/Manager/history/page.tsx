
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RefreshCw, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const historyLogs = [
  {
    id: "3",
    action: "新增",
    user: "SystemAdmin",
    date: "2025.9.26",
    changes: [],
  },
  {
    id: "2",
    action: "編輯",
    user: "SystemAdmin",
    date: "2025.9.26",
    changes: [
      {
        field: "帳號",
        oldValue: "78278278",
        newValue: "78278278444",
      },
      {
        field: "更新時間",
        oldValue: "2025/9/26 上午 11:39:15",
        newValue: "2025/9/26 上午 11:39:33",
      },
    ],
  },
  {
    id: "1",
    action: "編輯",
    user: "SystemAdmin",
    date: "2025.9.26",
    changes: [
        {
            field: "帳號",
            oldValue: "78278270",
            newValue: "78278278",
        },
    ],
  },
];

export default function HistoryPage() {
  const router = useRouter();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">資料異動紀錄</h1>
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
        <CardContent className="p-4">
          <Accordion type="single" collapsible className="w-full space-y-2">
            {historyLogs.map((log) => (
              <AccordionItem value={`item-${log.id}`} key={log.id} className="border rounded-md px-4">
                <AccordionTrigger className="py-3 hover:no-underline">
                  <span className="font-medium">{log.action} - {log.date} - {log.user}</span>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-4">
                  {log.changes.length > 0 ? (
                    <div className="space-y-6">
                      {log.changes.map((change, index) => (
                        <div key={index} className="space-y-2">
                          <p className="font-semibold text-foreground">{change.field}</p>
                          <div className="flex items-center gap-4">
                            <div className="flex-1 p-2 border rounded-md bg-muted/30">
                              <p className="text-sm text-muted-foreground">{change.oldValue}</p>
                            </div>
                            <ArrowRight className="h-5 w-5 text-muted-foreground" />
                            <div className="flex-1 p-2 border rounded-md bg-background">
                                <p className="text-sm text-foreground">{change.newValue}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">無變更內容</p>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
