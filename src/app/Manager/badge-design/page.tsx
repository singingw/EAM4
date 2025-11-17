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
import { Input } from "@/components/ui/input";
import {
  GripVertical,
  User,
  QrCode,
  Type,
  Image as ImageIcon,
  Info,
  Eye,
  Edit,
  Save,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";

const ComponentItem = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center p-2 rounded-md hover:bg-muted cursor-pointer text-sm">
    {children}
  </div>
);

const TextProperties = () => (
  <div className="bg-background border-t p-4 space-y-4">
    <h3 className="text-sm font-semibold">屬性設定</h3>
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="font-size" className="text-xs">字體大小</Label>
        <Input id="font-size" type="number" defaultValue="24" className="h-8" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="font-family" className="text-xs">字體</Label>
        <Select defaultValue="noto-sans">
          <SelectTrigger id="font-family" className="h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="noto-sans">思源黑體</SelectItem>
            <SelectItem value="arial">Arial</SelectItem>
            <SelectItem value="times-new-roman">Times New Roman</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
    <div className="space-y-2">
      <Label className="text-xs">樣式</Label>
      <div className="flex items-center gap-1">
        <Button variant="outline" size="icon" className="h-8 w-8"><Bold className="h-4 w-4" /></Button>
        <Button variant="outline" size="icon" className="h-8 w-8"><Italic className="h-4 w-4" /></Button>
        <Button variant="outline" size="icon" className="h-8 w-8"><Underline className="h-4 w-4" /></Button>
      </div>
    </div>
    <div className="space-y-2">
      <Label className="text-xs">對齊</Label>
      <div className="flex items-center gap-1">
        <Button variant="outline" size="icon" className="h-8 w-8"><AlignLeft className="h-4 w-4" /></Button>
        <Button variant="outline" size="icon" className="h-8 w-8"><AlignCenter className="h-4 w-4" /></Button>
        <Button variant="outline" size="icon" className="h-8 w-8"><AlignRight className="h-4 w-4" /></Button>
      </div>
    </div>
     <div className="space-y-2">
        <Label htmlFor="font-color" className="text-xs">顏色</Label>
        <Input id="font-color" type="color" defaultValue="#000000" className="h-8 p-1" />
      </div>
  </div>
);


export default function BadgeDesignPage() {
  const [showCenterLine, setShowCenterLine] = useState(true);
  const [isEditing, setIsEditing] = useState(true);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);

  const handleSelectElement = (elementId: string) => {
    if (isEditing) {
      setSelectedElement(elementId);
    }
  };

  return (
    <div className="flex h-full w-full bg-muted/30">
      {/* Left Sidebar */}
      {isEditing && (
        <div className="w-60 bg-background border-r flex flex-col">
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
          {selectedElement && isEditing && <TextProperties />}
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col" onClick={() => setSelectedElement(null)}>
        <div className="p-4 border-b bg-background flex items-center justify-between gap-4 h-[65px]">
            <div className="flex items-center gap-4">
                {isEditing && (
                  <>
                    <div className="space-y-1">
                        <Label className="text-xs font-semibold flex items-center gap-1">
                            識別證標籤尺寸 <Info className="h-3 w-3 text-muted-foreground" />
                        </Label>
                        <Select defaultValue="custom-1">
                            <SelectTrigger className="w-[180px] h-8">
                            <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="custom-1">90mm x 54mm (名片)</SelectItem>
                              <SelectItem value="custom-2">70mm x 100mm</SelectItem>
                              <SelectItem value="custom-3">100mm x 70mm</SelectItem>
                              <SelectItem value="custom-4">85mm x 110mm</SelectItem>
                              <SelectItem value="custom-5">105mm x 148mm (A6)</SelectItem>
                              <SelectItem value="custom-6">210mm x 148mm (A5)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center space-x-2 pt-5">
                        <Switch id="center-line" checked={showCenterLine} onCheckedChange={setShowCenterLine} />
                        <Label htmlFor="center-line" className="text-sm font-semibold flex items-center gap-1">
                            開啟中心線 <Info className="h-3 w-3 text-muted-foreground" />
                        </Label>
                    </div>
                  </>
                )}
                {!isEditing && (
                  <h2 className="text-base font-semibold">預覽模式</h2>
                )}
            </div>
            <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  onClick={(e) => { 
                    e.stopPropagation();
                    setIsEditing(false); 
                    setSelectedElement(null); 
                  }}
                  disabled={!isEditing}
                  className={!isEditing ? "hidden" : ""}
                >
                    <Eye className="mr-2 h-4 w-4" />
                    預覽
                </Button>
                <Button 
                  className={isEditing ? "bg-green-500 text-white hover:bg-green-600" : "bg-blue-500 text-white hover:bg-blue-600"}
                  onClick={(e) => {
                    e.stopPropagation();
                    const newIsEditing = !isEditing;
                    setIsEditing(newIsEditing);
                    if (!newIsEditing) {
                      setSelectedElement(null);
                    }
                  }}
                >
                    {isEditing ? <Save className="mr-2 h-4 w-4" /> : <Edit className="mr-2 h-4 w-4" />}
                    {isEditing ? "儲存" : "編輯"}
                </Button>
            </div>
        </div>
        <div className="flex-1 flex items-center justify-center p-8 bg-muted/60">
          <div
            className="relative bg-white shadow-lg"
            style={{ width: "227px", height: "302px" }}
          >
            {showCenterLine && isEditing && (
              <>
                <div className="absolute top-0 left-1/2 w-px h-full bg-gray-300 border-l border-dashed"></div>
                <div className="absolute top-1/2 left-0 h-px w-full bg-gray-300 border-t border-dashed"></div>
              </>
            )}
            <div className="absolute inset-0 p-4">
                <div 
                  className={`p-2 cursor-pointer ${selectedElement === 'name' ? 'ring-2 ring-blue-500' : ''}`}
                  onClick={(e) => { e.stopPropagation(); handleSelectElement('name'); }}
                >
                  <p className="text-2xl font-bold text-center">{`{{name}}`}</p>
                </div>
                <div 
                  className={`p-2 mt-2 cursor-pointer ${selectedElement === 'id' ? 'ring-2 ring-blue-500' : ''}`}
                  onClick={(e) => { e.stopPropagation(); handleSelectElement('id'); }}
                >
                  <p className="text-sm text-gray-500 text-center">{`{{ID}}`}</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
