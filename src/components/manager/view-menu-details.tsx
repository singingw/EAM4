
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function ViewMenuDetails() {
  const router = useRouter();

  // In a real app, you would fetch the menu data here based on an ID.
  const [menu] = useState({
    title: "系統管理",
    status: "enabled",
    sort: 1,
    systemFeatures: ["系統功能管理", "後台選單管理"],
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">檢視選單</h1>
        <Button
          variant="outline"
          className="bg-gray-500 text-white hover:bg-gray-600"
          asChild
        >
          <Link href="/Manager/menu-management">
            <RefreshCw className="mr-2 h-4 w-4" />
            返回列表
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-1">
              <Label>標題</Label>
              <p className="text-foreground">{menu.title}</p>
            </div>
            <div className="space-y-1">
              <Label>狀態</Label>
              <div>
                <Badge
                  variant={menu.status === 'enabled' ? "default" : "secondary"}
                  className={
                    menu.status === 'enabled'
                      ? "bg-green-100 text-green-800 border-green-200 hover:bg-green-100/80"
                      : "bg-red-100 text-red-800 border-red-200 hover:bg-red-100/80"
                  }
                >
                  {menu.status === 'enabled' ? (
                    <CheckCircle className="mr-1 h-3 w-3" />
                  ) : (
                    <XCircle className="mr-1 h-3 w-3" />
                  )}
                  {menu.status === 'enabled' ? '啟用' : '停用'}
                </Badge>
              </div>
            </div>
             <div className="space-y-1">
              <Label>排序</Label>
              <p className="text-foreground">{menu.sort}</p>
            </div>
          </div>
          
          <Separator />

          <div>
            <Label className="text-base font-semibold">系統功能選單</Label>
            <div className="mt-4 flex flex-wrap gap-2">
              {menu.systemFeatures.length > 0 ? (
                menu.systemFeatures.map((feature) => (
                  <Badge key={feature} variant="secondary" className="font-normal bg-gray-200 text-gray-800">
                    {feature}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">未選擇任何系統功能</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
