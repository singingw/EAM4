"use client";

import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const cannedMessages = {
  checkIn: "親愛的來賓，提醒您活動即將開始，請準備您的報到 QR Code，我們期待您的蒞臨。",
  reminder: "親愛的來賓，溫馨提醒您，[活動名稱] 將於 [日期] [時間] 在 [地點] 舉行，請準時參加。",
  custom: "",
};

export function PreEventNotificationDialog() {
  const [message, setMessage] = useState("");

  const handleCannedMessageChange = (value: keyof typeof cannedMessages) => {
    setMessage(cannedMessages[value]);
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>寄送行前通知</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <Label>選擇寄送方式</Label>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Checkbox id="send-email" />
              <Label htmlFor="send-email" className="font-normal">Email</Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="send-sms" />
              <Label htmlFor="send-sms" className="font-normal">簡訊</Label>
            </div>
          </div>
        </div>
        <div className="space-y-2">
            <Label htmlFor="canned-message">罐頭訊息</Label>
            <Select onValueChange={(value: keyof typeof cannedMessages) => handleCannedMessageChange(value)}>
                <SelectTrigger id="canned-message">
                    <SelectValue placeholder="選擇一個罐頭訊息" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="checkIn">報到通知</SelectItem>
                    <SelectItem value="reminder">貼心提醒行前通知</SelectItem>
                    <SelectItem value="custom">自訂</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="message-content">訊息內容</Label>
          <Textarea
            id="message-content"
            placeholder="請在此輸入您的訊息..."
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
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
