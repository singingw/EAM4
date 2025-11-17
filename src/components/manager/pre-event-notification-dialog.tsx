
"use client";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function PreEventNotificationDialog() {
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>寄發行前通知</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="space-y-2">
            <Label>選擇寄送方式</Label>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <Checkbox id="send-email" />
                    <Label htmlFor="send-email">Email</Label>
                </div>
                 <div className="flex items-center gap-2">
                    <Checkbox id="send-sms" />
                    <Label htmlFor="send-sms">簡訊</Label>
                </div>
            </div>
        </div>
        <div className="space-y-2">
            <Label htmlFor="message-content">訊息內容</Label>
            <Textarea id="message-content" placeholder="請在此輸入您的訊息..." rows={6} />
        </div>
      </div>
      <DialogFooter className="justify-end">
        <DialogClose asChild>
          <Button type="button" variant="outline">
            取消
          </Button>
        </DialogClose>
        <Button type="submit">送出</Button>
      </DialogFooter>
    </DialogContent>
  );
}
