
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

export function ViewSystemFeatureDetails() {
  const router = useRouter();

  // In a real app, you would fetch the feature data here based on an ID.
  const [feature] = useState({
    title: "我的社團_活動管理_個人活動",
    status: "enabled",
    controller: "MyClubEventRegisterSoloEnroll",
    action: "Index",
    parameters: "",
    includedFunctions: [
      { name: "編輯", controller: "MyClubEventRegisterSoloEnroll", action: "Edit" },
      { name: "檢視", controller: "MyClubEventRegisterSoloEnroll", action: "Detail" },
    ],
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">檢視功能</h1>
        <Button
          variant="outline"
          className="bg-gray-500 text-white hover:bg-gray-600"
          asChild
        >
          <Link href="/Manager/system-features">
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
              <p className="text-foreground">{feature.title}</p>
            </div>
            <div className="space-y-1">
              <Label>狀態</Label>
              <div>
                <Badge
                  variant={feature.status === 'enabled' ? "default" : "secondary"}
                  className={
                    feature.status === 'enabled'
                      ? "bg-green-100 text-green-800 border-green-200 hover:bg-green-100/80"
                      : "bg-red-100 text-red-800 border-red-200 hover:bg-red-100/80"
                  }
                >
                  {feature.status === 'enabled' ? (
                    <CheckCircle className="mr-1 h-3 w-3" />
                  ) : (
                    <XCircle className="mr-1 h-3 w-3" />
                  )}
                  {feature.status === 'enabled' ? '啟用' : '停用'}
                </Badge>
              </div>
            </div>
             <div className="space-y-1">
              <Label>Controller</Label>
              <p className="text-foreground">{feature.controller}</p>
            </div>
             <div className="space-y-1">
              <Label>Action</Label>
              <p className="text-foreground">{feature.action}</p>
            </div>
             <div className="space-y-1">
              <Label>參數</Label>
              <p className="text-foreground">{feature.parameters || "-"}</p>
            </div>
          </div>
          
          <Separator />

          <div>
            <Label className="text-base font-semibold">包含功能</Label>
            <div className="mt-4 space-y-4">
              {feature.includedFunctions.map((func, index) => (
                <Card key={index} className="p-4 bg-muted/50">
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-1">
                            <Label className="text-xs text-muted-foreground">功能名稱</Label>
                            <p className="text-foreground">{func.name}</p>
                        </div>
                         <div className="space-y-1">
                            <Label className="text-xs text-muted-foreground">Controller</Label>
                            <p className="text-foreground">{func.controller}</p>
                        </div>
                         <div className="space-y-1">
                            <Label className="text-xs text-muted-foreground">Action</Label>
                            <p className="text-foreground">{func.action}</p>
                        </div>
                   </div>
                </Card>
              ))}
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
