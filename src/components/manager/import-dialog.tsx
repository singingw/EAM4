
"use client";

import { useState, useRef } from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";

export function ImportDialog() {
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName("");
    }
  };

  const handleSelectFileClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>匯入</DialogTitle>
      </DialogHeader>
      <div className="space-y-6 py-4">
        <div className="space-y-2">
            <Label htmlFor="error-handling">錯誤處理方式</Label>
            <Select defaultValue="cancel">
                <SelectTrigger id="error-handling">
                    <SelectValue placeholder="選擇處理方式" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="cancel">錯誤時取消</SelectItem>
                    <SelectItem value="skip">錯誤時跳過</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>上傳匯入檔</Label>
              <Button variant="link" className="p-0 h-auto text-sm">下載範例檔</Button>
            </div>
            <div className="flex">
                <Button variant="outline" type="button" onClick={handleSelectFileClick} className="rounded-r-none">
                    選擇檔案
                </Button>
                <Input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                />
                <div className="flex-1 border border-input rounded-r-md px-3 py-2 text-sm text-muted-foreground flex items-center">
                    {fileName || "未選擇任何檔案"}
                </div>
            </div>
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" className="w-full" disabled={!fileName}>
          <Upload className="mr-2 h-4 w-4" />
          {fileName ? "匯入" : "請上傳檔案"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
