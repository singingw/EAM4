
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";

export function ViewAttendeeDetails() {
  const router = useRouter();

  // In a real app, you would fetch the attendee data here based on an ID.
  const [attendee] = useState({
    id: "1",
    name: "陳曉明",
    email: "chen.hm@example.com",
    phone: "0912-345-678",
    status: "checked-in",
    checkInTime: "2024/08/15 14:05:22",
    emailCount: 2,
    smsCount: 1,
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">檢視參加者</h1>
        <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
                <Link href="/Manager/attendees">
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
                        <Label>ID</Label>
                        <p className="text-foreground">{attendee.id}</p>
                    </div>
                    <div className="space-y-1">
                        <Label>姓名</Label>
                        <p className="text-foreground">{attendee.name}</p>
                    </div>
                    <div className="space-y-1">
                        <Label>Email</Label>
                        <p className="text-foreground">{attendee.email}</p>
                    </div>
                    <div className="space-y-1">
                        <Label>手機</Label>
                        <p className="text-foreground">{attendee.phone}</p>
                    </div>
                     <div className="space-y-1">
                        <Label>報到狀態</Label>
                        <div>
                             <Badge variant={attendee.status === 'checked-in' ? "default" : "secondary"}
                                className={attendee.status === 'checked-in' ? "bg-green-100 text-green-800 border-green-200 hover:bg-green-100/80" : "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100/80"}
                                >
                                {attendee.status === 'checked-in' ? <CheckCircle className="mr-1 h-3 w-3" /> : null}
                                {attendee.status === 'checked-in' ? '已報到' : '未報到'}
                            </Badge>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <Label>報到時間</Label>
                        <p className="text-foreground">{attendee.checkInTime}</p>
                    </div>
                    <div className="space-y-1">
                        <Label>Email通知次數</Label>
                        <p className="text-foreground">{attendee.emailCount}</p>
                    </div>
                    <div className="space-y-1">
                        <Label>簡訊通知次數</Label>
                        <p className="text-foreground">{attendee.smsCount}</p>
                    </div>
                </div>
            </div>
        </CardContent>
       </Card>
    </>
  );
}
