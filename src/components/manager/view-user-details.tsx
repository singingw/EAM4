"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, CheckCircle, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export function ViewUserDetails() {
  const router = useRouter();

  // In a real app, you would fetch the user data here based on an ID.
  const [user] = useState({
    id: "1",
    name: "Max",
    email: "max.sixdots@gmail.com",
    role: "系統管理員",
    suspensionTime: "-",
    status: "enabled",
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">檢視使用者</h1>
        <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
                <Link href="/Manager/users">
                    <X className="mr-2 h-4 w-4" />
                    返回
                </Link>
            </Button>
        </div>
      </div>
       <Card>
        <CardContent className="pt-6">
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-1">
                        <Label>使用者名稱</Label>
                        <p className="text-foreground">{user.name}</p>
                    </div>
                    <div className="space-y-1">
                        <Label>帳號 / 電子郵件</Label>
                        <p className="text-foreground">{user.email}</p>
                    </div>
                    <div className="space-y-1">
                        <Label>角色</Label>
                        <p className="text-foreground">{user.role}</p>
                    </div>
                    <div className="space-y-1">
                        <Label>停權時間</Label>
                        <p className="text-foreground">{user.suspensionTime}</p>
                    </div>
                     <div className="space-y-1">
                        <Label>狀態</Label>
                        <div>
                             <Badge variant={user.status === 'enabled' ? "default" : "secondary"}
                                className={user.status === 'enabled' ? "bg-green-100 text-green-800 border-green-200 hover:bg-green-100/80" : "bg-red-100 text-red-800 border-red-200 hover:bg-red-100/80"}
                                >
                                {user.status === 'enabled' ? <CheckCircle className="mr-1 h-3 w-3" /> : <XCircle className="mr-1 h-3 w-3" />}
                                {user.status === 'enabled' ? '啟用' : '停用'}
                            </Badge>
                        </div>
                    </div>
                </div>
            </div>
        </CardContent>
       </Card>
    </>
  );
}
