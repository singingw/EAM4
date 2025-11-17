
"use client";

import { useState, useRef, useCallback } from "react";
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
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  GripVertical,
  User,
  QrCode as QrCodeIcon,
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
  Trash2,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Element {
  id: string;
  type: 'text' | 'qrcode' | 'image' | 'field';
  content: string;
  originalContent?: string;
  style: React.CSSProperties;
  zIndex: number;
}

const initialElements: Element[] = [
    { id: 'name', type: 'text', content: '{{name}}', style: { top: '60px', left: '50px', fontSize: '24px', fontWeight: 'bold', textAlign: 'center', width: '100%' }, zIndex: 1 },
    { id: 'qr-code', type: 'qrcode', content: 'https://placehold.co/100x100/png?text=QR', style: { top: '120px', left: '63px', width: '100px', height: '100px' }, zIndex: 2 },
];


const ComponentItem = ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => (
  <div onClick={onClick} className="flex items-center p-2 rounded-md hover:bg-muted cursor-pointer text-sm">
    {children}
  </div>
);

const PropertiesPanel = ({ element, onUpdate, onRemove, onLayerChange }: { element: Element | null; onUpdate: (id: string, style: React.CSSProperties) => void; onRemove: (id: string) => void; onLayerChange: (id: string, direction: 'up' | 'down') => void }) => {
  if (!element) return null;

  const [style, setStyle] = useState(element.style);

  const handleStyleChange = (prop: keyof React.CSSProperties, value: string | number) => {
    const newStyle = { ...style, [prop]: value };
    setStyle(newStyle);
    onUpdate(element.id, newStyle);
  };
  
  const handleTextAlign = (alignment: 'left' | 'center' | 'right') => {
    handleStyleChange('textAlign', alignment);
    handleStyleChange('width', '100%');
    handleStyleChange('left', '0px');
  }

  return (
      <div className="bg-background border-t p-4 space-y-4">
          <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold">屬性設定</h3>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-transparent" onClick={() => onRemove(element.id)}>
                  <Trash2 className="h-4 w-4" />
              </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pos-x" className="text-xs">X 座標</Label>
                <Input id="pos-x" type="number" value={parseInt(style.left as string, 10) || 0} onChange={(e) => handleStyleChange('left', `${e.target.value}px`)} className="h-8" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pos-y" className="text-xs">Y 座標</Label>
                <Input id="pos-y" type="number" value={parseInt(style.top as string, 10) || 0} onChange={(e) => handleStyleChange('top', `${e.target.value}px`)} className="h-8" />
              </div>
            </div>

          {element.type === 'text' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="font-size" className="text-xs">字體大小</Label>
                    <Input id="font-size" type="number" value={parseInt(style.fontSize as string, 10) || 24} onChange={(e) => handleStyleChange('fontSize', `${e.target.value}px`)} className="h-8" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="font-family" className="text-xs">字體</Label>
                    <Select value={style.fontFamily || 'noto-sans'} onValueChange={(value) => handleStyleChange('fontFamily', value)}>
                      <SelectTrigger id="font-family" className="h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="'Noto Sans TC', sans-serif">思源黑體</SelectItem>
                        <SelectItem value="Arial, sans-serif">Arial</SelectItem>
                        <SelectItem value="'Times New Roman', serif">Times New Roman</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">樣式</Label>
                  <div className="flex items-center gap-1">
                    <Button variant={style.fontWeight === 'bold' ? 'secondary': 'outline'} size="icon" className="h-8 w-8" onClick={() => handleStyleChange('fontWeight', style.fontWeight === 'bold' ? 'normal' : 'bold')}><Bold className="h-4 w-4" /></Button>
                    <Button variant={style.fontStyle === 'italic' ? 'secondary': 'outline'} size="icon" className="h-8 w-8" onClick={() => handleStyleChange('fontStyle', style.fontStyle === 'italic' ? 'normal' : 'italic')}><Italic className="h-4 w-4" /></Button>
                    <Button variant={style.textDecoration === 'underline' ? 'secondary': 'outline'} size="icon" className="h-8 w-8" onClick={() => handleStyleChange('textDecoration', style.textDecoration === 'underline' ? 'none' : 'underline')}><Underline className="h-4 w-4" /></Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs">對齊</Label>
                  <div className="flex items-center gap-1">
                    <Button variant={style.textAlign === 'left' ? 'secondary': 'outline'} size="icon" className="h-8 w-8" onClick={() => handleTextAlign('left')}><AlignLeft className="h-4 w-4" /></Button>
                    <Button variant={style.textAlign === 'center' ? 'secondary': 'outline'} size="icon" className="h-8 w-8" onClick={() => handleTextAlign('center')}><AlignCenter className="h-4 w-4" /></Button>
                    <Button variant={style.textAlign === 'right' ? 'secondary': 'outline'} size="icon" className="h-8 w-8" onClick={() => handleTextAlign('right')}><AlignRight className="h-4 w-4" /></Button>
                  </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="font-color" className="text-xs">顏色</Label>
                    <Input id="font-color" type="color" value={(style.color as string) || '#000000'} onChange={(e) => handleStyleChange('color', e.target.value)} className="h-8 p-1" />
                </div>
              </>
          )}

          {(element.type === 'qrcode' || element.type === 'image') && (
              <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="element-width" className="text-xs">寬</Label>
                    <Input id="element-width" type="number" value={parseInt(style.width as string, 10) || 100} onChange={(e) => handleStyleChange('width', `${e.target.value}px`)} className="h-8" />
                  </div>
                   <div className="space-y-2">
                    <Label htmlFor="element-height" className="text-xs">高</Label>
                    <Input id="element-height" type="number" value={parseInt(style.height as string, 10) || 100} onChange={(e) => handleStyleChange('height', `${e.target.value}px`)} className="h-8" />
                  </div>
              </div>
          )}
          
          <div className="space-y-2">
            <Label className="text-xs">圖層順序</Label>
             <TooltipProvider>
                <div className="flex items-center gap-1">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => onLayerChange(element.id, 'up')}>
                                <ArrowUp className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>上移一層</p>
                        </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => onLayerChange(element.id, 'down')}>
                                <ArrowDown className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>下移一層</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            </TooltipProvider>
          </div>
      </div>
  );
};


export default function BadgeDesignPage() {
  const [showCenterLine, setShowCenterLine] = useState(true);
  const [isEditing, setIsEditing] = useState(true);
  const [elements, setElements] = useState<Element[]>(initialElements);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);

  const handleSelectElement = (elementId: string) => {
    if (isEditing) {
      setSelectedElementId(elementId);
    }
  };

  const addElement = (type: 'text' | 'qrcode' | 'image' | 'field', content: string) => {
    const newId = `${type}-${Date.now()}`;
    const newZIndex = elements.length > 0 ? Math.max(...elements.map(e => e.zIndex)) + 1 : 1;
    let newElement: Element;

    const baseStyle = { top: '10px', left: '10px' };

    if (type === 'qrcode' || type === 'image') {
        newElement = { id: newId, type, content, style: { ...baseStyle, width: '100px', height: '100px' }, zIndex: newZIndex };
    } else {
        newElement = { id: newId, type, content, style: { ...baseStyle, fontSize: '16px' }, zIndex: newZIndex };
    }
    setElements(prev => [...prev, newElement]);
    setSelectedElementId(newId);
  }

  const updateElementStyle = (id: string, newStyle: React.CSSProperties) => {
    setElements(prev => prev.map(el => el.id === id ? {...el, style: newStyle} : el));
  }
  
  const removeElement = (id: string) => {
    setElements(prev => prev.filter(el => el.id !== id));
    setSelectedElementId(null);
  }

  const handleLayerChange = (id: string, direction: 'up' | 'down') => {
    setElements(prevElements => {
      const newElements = [...prevElements];
      const currentIndex = newElements.findIndex(el => el.id === id);
      if (currentIndex === -1) return newElements;

      const currentElement = newElements[currentIndex];
      
      if (direction === 'up') {
        const nextElement = newElements.find(el => el.zIndex === currentElement.zIndex + 1);
        if (nextElement) {
          newElements[currentIndex] = { ...currentElement, zIndex: currentElement.zIndex + 1 };
          const nextIndex = newElements.findIndex(el => el.id === nextElement.id);
          newElements[nextIndex] = { ...nextElement, zIndex: nextElement.zIndex - 1 };
        }
      } else { // down
        const prevElement = newElements.find(el => el.zIndex === currentElement.zIndex - 1);
        if (prevElement) {
          newElements[currentIndex] = { ...currentElement, zIndex: currentElement.zIndex - 1 };
          const prevIndex = newElements.findIndex(el => el.id === prevElement.id);
          newElements[prevIndex] = { ...prevElement, zIndex: prevElement.zIndex + 1 };
        }
      }
      return newElements.sort((a,b) => a.zIndex - b.zIndex);
    });
  };

  const handlePreview = () => {
    setIsEditing(false);
    setSelectedElementId(null);
    setElements(prev =>
      prev.map(el => {
        const newEl = { ...el, originalContent: el.originalContent || el.content };
        if (newEl.content === '{{name}}') {
          newEl.content = 'Singing';
        }
        return newEl;
      })
    );
  };

  const handleEdit = () => {
    setIsEditing(true);
    setElements(prev =>
      prev.map(el => ({
        ...el,
        content: el.originalContent || el.content,
        originalContent: undefined
      }))
    );
  };


  const selectedElement = elements.find(el => el.id === selectedElementId);

  const renderElement = (element: Element) => {
      const { id, type, content, style, zIndex } = element;
      const isSelected = selectedElementId === id;

      const combinedStyle: React.CSSProperties = {
        position: 'absolute',
        ...style,
        zIndex,
      };

      const elementContent = () => {
          switch (type) {
              case 'text':
              case 'field':
                  return <p className="whitespace-nowrap">{content}</p>;
              case 'qrcode':
                  return <Image src={content} alt="QR Code" width={parseInt(style.width as string, 10) || 100} height={parseInt(style.height as string, 10) || 100} style={{width: style.width, height: style.height}}/>;
              case 'image':
                   return <Image src={content} alt="Image" width={parseInt(style.width as string, 10) || 100} height={parseInt(style.height as string, 10) || 100} style={{width: style.width, height: style.height}} />;
              default:
                  return null;
          }
      };

      return (
          <div
            key={id}
            style={combinedStyle}
            onClick={(e) => { e.stopPropagation(); handleSelectElement(id); }}
            className={cn('p-1', isEditing ? 'cursor-pointer' : '', isSelected ? 'ring-2 ring-blue-500' : '')}
          >
              {elementContent()}
          </div>
      );
  };


  return (
    <div className="flex h-full w-full bg-muted/30">
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
                    <ComponentItem onClick={() => addElement('field', '{{ID}}')}>ID</ComponentItem>
                    <ComponentItem onClick={() => addElement('field', '{{姓名/Name}}')}>姓名/Name</ComponentItem>
                    <ComponentItem onClick={() => addElement('field', '{{信箱/Email}}')}>信箱/Email</ComponentItem>
                    <ComponentItem onClick={() => addElement('field', '{{手機/Cellphone}}')}>手機/Cellphone</ComponentItem>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-sm font-medium py-2">
                  <div className="flex items-center gap-2">
                    <QrCodeIcon className="h-4 w-4" />
                    <span>QR Code</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-2">
                   <div className="flex flex-col gap-1 pl-4">
                    <ComponentItem onClick={() => addElement('qrcode', 'https://placehold.co/100x100/png?text=QR')}>來賓ID</ComponentItem>
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
                    <ComponentItem onClick={() => addElement('text', '單行文字')}>單行文字</ComponentItem>
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
                    <ComponentItem onClick={() => addElement('image', 'https://placehold.co/100x50/png?text=Image')}>上傳圖片</ComponentItem>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          {isEditing && selectedElement && (
            <PropertiesPanel element={selectedElement} onUpdate={updateElementStyle} onRemove={removeElement} onLayerChange={handleLayerChange} />
          )}
        </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col" onClick={() => isEditing && setSelectedElementId(null)}>
        <div className="p-4 border-b bg-background flex items-center justify-between gap-4 h-[65px]">
            <div className="flex items-center gap-4">
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
                {!isEditing && (
                  <h2 className="text-base font-semibold">預覽模式</h2>
                )}
            </div>
            <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  onClick={(e) => { 
                    e.stopPropagation();
                    handlePreview();
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
                    if(isEditing) {
                      // Save logic here
                    } else {
                      handleEdit();
                    }
                  }}
                >
                    {isEditing ? <Save className="mr-2 h-4 w-4" /> : <Edit className="mr-2 h-4 w-4" />}
                    {isEditing ? "儲存" : "編輯"}
                </Button>
            </div>
        </div>
        <div className="flex-1 flex items-center justify-center p-8 bg-muted/60 relative overflow-hidden">
          <div
            className="relative bg-white shadow-lg"
            style={{ width: "227px", height: "302px" }}
            onClick={() => isEditing && setSelectedElementId(null)}
          >
            {showCenterLine && (
              <>
                <div className="absolute top-0 left-1/2 w-px h-full bg-gray-300 border-l border-dashed z-0"></div>
                <div className="absolute top-1/2 left-0 h-px w-full bg-gray-300 border-t border-dashed z-0"></div>
              </>
            )}
             <div className="absolute inset-0">
                {elements.map((el) => renderElement(el))}
            </div>
          </div>
          {showCenterLine && (
            <div className="absolute" style={{ width: "259px", height: "334px", pointerEvents: 'none' }}>
              {/* Crop marks */}
              <div className="absolute -top-2 -left-2 w-2 h-px bg-black"></div>
              <div className="absolute -top-2 -left-2 w-px h-2 bg-black"></div>
              <div className="absolute -top-2 -right-2 w-2 h-px bg-black"></div>
              <div className="absolute -top-2 -right-2 w-px h-2 bg-black"></div>
              <div className="absolute -bottom-2 -left-2 w-2 h-px bg-black"></div>
              <div className="absolute -bottom-2 -left-2 w-px h-2 bg-black"></div>
              <div className="absolute -bottom-2 -right-2 w-2 h-px bg-black"></div>
              <div className="absolute -bottom-2 -right-2 w-px h-2 bg-black"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

    