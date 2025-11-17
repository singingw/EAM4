"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  GripVertical,
  User,
  QrCode,
  Type,
  Image as ImageIcon,
  Info,
  Eye,
} from "lucide-react";

const ComponentItem = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center p-2 rounded-md hover:bg-muted cursor-pointer text-sm">
    {children}
  </div>
);

export default function BadgeDesignPage() {
  const [showCenterLine, setShowCenterLine] = useState(true);

  return (
    <div className="flex h-full w-full bg-muted/30">
      {/* Left Sidebar */}
      <div className="w-64 bg-background border-r flex flex-col">
        <div className="p-4 border-b flex items-center h-[65px]">
          <h2 className="text-base font-semibold flex items-center gap-2">
            <GripVertical className="h-5 w-5" />
            識別證元件
            <Info className="h-4 w-4 text-muted-foreground" />
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          <Accordion type="multiple" defaultValue={["item-1", "item-2", "item-3", "item-4"]} className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-sm font-medium py-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>名單欄位</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-2">
                <div className="flex flex-col gap-1 pl-4">
                  <ComponentItem>ID</ComponentItem>
                  <ComponentItem>姓名/Name</ComponentItem>
                  <ComponentItem>信箱/Email</ComponentItem>
                  <ComponentItem>手機/Cellphone</ComponentItem>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-sm font-medium py-2">
                <div className="flex items-center gap-2">
                  <QrCode className="h-4 w-4" />
                  <span>QR Code</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-2">
                 <div className="flex flex-col gap-1 pl-4">
                  <ComponentItem>來賓ID</ComponentItem>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-sm font-medium py-2">
                <div className="flex items-center gap-2">
                  <Type className="h-4 w-4" />
                  <span>文字</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-2">
                <div className="flex flex-col gap-1 pl-4">
                  <ComponentItem>單行文字</ComponentItem>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-sm font-medium py-2">
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  <span>圖片</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-2">
                <div className="flex flex-col gap-1 pl-4">
                  <ComponentItem>上傳圖片</ComponentItem>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b bg-background flex items-center justify-between gap-4 h-[65px]">
            <div className="flex items-center gap-4">
                <div className="space-y-1">
                    <Label className="text-xs font-semibold flex items-center gap-1">
                        識別證標籤尺寸 <Info className="h-3 w-3 text-muted-foreground" />
                    </Label>
                    <Select defaultValue="60x80">
                        <SelectTrigger className="w-[180px] h-8">
                        <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="60x80">60mm * 80mm</SelectItem>
                        <SelectItem value="80x60">80mm * 60mm</SelectItem>
                        <SelectItem value="80x90">80mm * 90mm</SelectItem>
                        <SelectItem value="90x80">90mm * 80mm</SelectItem>
                        <SelectItem value="90x120">90mm * 120mm</SelectItem>
                        <SelectItem value="90x130">90mm * 130mm</SelectItem>
                        <SelectItem value="78x130">78mm * 130mm</SelectItem>
                        <SelectItem value="a4-portrait">A4(直向)</SelectItem>
                        <SelectItem value="a4-landscape">A4(橫向)</SelectItem>
                        <SelectItem value="a5-portrait">A5(直向)</SelectItem>
                        <SelectItem value="a5-landscape">A5(橫向)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center space-x-2 pt-5">
                    <Switch id="center-line" checked={showCenterLine} onCheckedChange={setShowCenterLine} />
                    <Label htmlFor="center-line" className="text-sm font-semibold flex items-center gap-1">
                        開啟中心線 <Info className="h-3 w-3 text-muted-foreground" />
                    </Label>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Button variant="outline">
                    <Eye className="mr-2 h-4 w-4" />
                    預覽
                </Button>
                <Button className="bg-green-500 text-white hover:bg-green-600">儲存</Button>
            </div>
        </div>
        <div className="flex-1 flex items-center justify-center p-8 bg-muted/60">
          <div
            className="relative bg-white shadow-lg"
            style={{ width: "227px", height: "302px" }}
          >
            {showCenterLine && (
              <>
                <div className="absolute top-0 left-1/2 w-px h-full bg-gray-300 border-l border-dashed"></div>
                <div className="absolute top-1/2 left-0 h-px w-full bg-gray-300 border-t border-dashed"></div>
              </>
            )}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <p className="text-2xl font-bold">{`{{name}}`}</p>
                <p className="text-sm text-gray-500 mt-2">{`{{ID}}`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
