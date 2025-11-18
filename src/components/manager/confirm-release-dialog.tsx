
"use client";

import { useState, useRef } from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Upload, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

export function ConfirmReleaseDialog() {
  const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setFileName("");
      setPreview(null);
    }
  };

  const handleSelectFileClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>已確認客戶放行</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 py-4">
        {preview ? (
            <div className="relative w-full aspect-video rounded-md border bg-muted overflow-hidden">
                <Image src={preview} alt="Image preview" layout="fill" objectFit="contain" />
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-md bg-muted/50">
                <ImageIcon className="h-12 w-12 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mt-2">圖片預覽</p>
            </div>
        )}
        <div className="space-y-2">
            <Label>上傳簽收單</Label>
            <div className="flex">
                <Button variant="outline" type="button" onClick={handleSelectFileClick} className="rounded-r-none">
                    選擇檔案
                </Button>
                <Input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/*"
                />
                <div className="flex-1 border border-input rounded-r-md px-3 py-2 text-sm text-muted-foreground flex items-center truncate">
                    {fileName || "未選擇任何檔案"}
                </div>
            </div>
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" className="w-full" disabled={!fileName}>
          <Upload className="mr-2 h-4 w-4" />
          {fileName ? "上傳並確認" : "請上傳檔案"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
