
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, RefreshCw, AlertTriangle, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "../ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const mockData = {
  quoteId: "ORD001",
  status: "已轉檔",
  picker: "",
  materialRequestNo: 'MRN001',
  siteName: '中山機房',
  siteAddress: '台北市中山區中山北路二段48巷7號',
  siteCategory: 'indoor',
  classificationName: 'flagship',
  equipmentType: 'TSP-flagship',
  surveyorName: '王小明',
  maintenanceStation: '泰山站',
  panelStandardForm: 'formA',
  panelAdditionalItems: 'itemB',
  dispatchPanelVendor: '百訊',
  yuanChuangRequirement: true,
  panelDispatchPersonnel: '李大維',
  psopMaterialRequestNote: 'PSOP 物料需求單備註內容',
  psopQuoteNote: 'PSOP 報價單備註內容',
  note: '一般備註',
  deviceSupplyType: '類型A',
  salesTypeChinese: '銷售類型一',
  siteCode: 'SITE001',
  materialRequestDate: new Date(),
  shippingDate: new Date(),
  devices: [
    { id: "1", partNumber: 'PN001', name: "Laptop A", warehouse: "TPE-A", quantity: 1, serialNumber: "SN001", note: "備註A", location: "A-01", inventoryStatus: "存貨" as const, deviceSerialNumberS: "SN001", status: "已撿貨" as const },
    { id: "2", partNumber: 'PN002', name: "Laptop B", warehouse: "TPE-A", quantity: 2, serialNumber: "SN002", note: "", location: "A-02", inventoryStatus: "存貨" as const, deviceSerialNumberS: "SN002", status: "已撿貨" as const },
    { id: "3", partNumber: 'PN003', name: "Monitor C", warehouse: "TPE-B", quantity: 1, serialNumber: "SPARE001", note: "備品優先", location: "B-01", inventoryStatus: "備品" as const, deviceSerialNumberS: "", status: "已撿貨" as const },
    { id: "4", partNumber: 'PN004', name: "Laptop D", warehouse: "KHH-A", quantity: 3, serialNumber: "", note: "", location: "C-05", inventoryStatus: "缺貨" as const, deviceSerialNumberS: "", status: "尚未撿貨" as const },
  ],
};

const statusMap: { [key: string]: { label: string; className: string } } = {
  尚未撿貨: { label: "尚未撿貨", className: "bg-gray-200 text-gray-800" },
  已撿貨: { label: "已撿貨", className: "bg-yellow-100 text-yellow-800" },
  已出貨: { label: "已出貨", className: "bg-green-100 text-green-800" },
};

const inventoryStatusMap: { [key: string]: { label: string; className: string } } = {
  存貨: { label: "存貨", className: "bg-blue-100 text-blue-800" },
  備品: { label: "備品", className: "bg-purple-100 text-purple-800" },
  缺貨: { label: "缺貨", className: "bg-red-100 text-red-800" },
};

const mainStatusOptions = ["已轉檔", "待放行", "待撿貨", "撿貨處理中", "已完成"];


export function ViewShippingDetails() {
  const router = useRouter();
  const [data] = useState(mockData);

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">檢視出貨明細</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="bg-gray-500 text-white hover:bg-gray-600" asChild>
            <Link href="/Manager/shipping-details">
              <RefreshCw className="mr-2 h-4 w-4" />
              返回列表
            </Link>
          </Button>
        </div>
      </div>
      <div className="space-y-6">
        <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-1"><Label>報價單號</Label><p className="text-foreground">{data.quoteId}</p></div>
                <div className="space-y-1"><Label>物料需求單號</Label><p className="text-foreground">{data.materialRequestNo}</p></div>
                <div className="space-y-1"><Label>狀態</Label><p className="text-foreground">{data.status}</p></div>
                <div className="space-y-1"><Label>目前處理人員</Label><p className="text-foreground">{data.picker || 'N/A'}</p></div>
                <div className="space-y-1"><Label>場站名稱</Label><p className="text-foreground">{data.siteName}</p></div>
                <div className="space-y-1"><Label>場站地址</Label><p className="text-foreground">{data.siteAddress}</p></div>
                
                <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-1"><Label>案場分類</Label><p className="text-foreground">{data.siteCategory}</p></div>
                    <div className="space-y-1"><Label>分級名稱</Label><p className="text-foreground">{data.classificationName}</p></div>
                    <div className="space-y-1"><Label>維運設備類型</Label><p className="text-foreground">{data.equipmentType}</p></div>
                </div>
                 <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1"><Label>案場會勘人員 - 姓名</Label><p className="text-foreground">{data.surveyorName}</p></div>
                    <div className="space-y-1"><Label>案場會勘人員 - 維運站</Label><p className="text-foreground">{data.maintenanceStation}</p></div>
                </div>
                <div className="space-y-1"><Label>盤體標準形式</Label><p className="text-foreground">{data.panelStandardForm}</p></div>
                <div className="space-y-1"><Label>盤體追加項目</Label><p className="text-foreground">{data.panelAdditionalItems}</p></div>
                <div className="space-y-1"><Label>派工組盤商</Label><p className="text-foreground">{data.dispatchPanelVendor}</p></div>
                <div className="space-y-1"><Label>組盤派工人員</Label><p className="text-foreground">{data.panelDispatchPersonnel}</p></div>
                <div className="flex items-center space-x-2 pt-6">
                    <Checkbox checked={data.yuanChuangRequirement} disabled />
                    <Label>遠創需求</Label>
                </div>
                 <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-1"><Label>PSOP物料需求單備註</Label><p className="text-foreground">{data.psopMaterialRequestNote}</p></div>
                    <div className="space-y-1"><Label>PSOP報價單備註</Label><p className="text-foreground">{data.psopQuoteNote}</p></div>
                    <div className="space-y-1"><Label>備註</Label><p className="text-foreground">{data.note}</p></div>
                </div>
              </div>
            </CardContent>
          </Card>

        <Card>
            <CardHeader>
                <CardTitle>存貨領用</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                <div className="space-y-1"><Label>設備供應(銷售型態)</Label><p className="text-foreground">{data.deviceSupplyType}</p></div>
                <div className="space-y-1"><Label>銷售類型(中文)</Label><p className="text-foreground">{data.salesTypeChinese}</p></div>
                <div className="space-y-1"><Label>場站代碼</Label><p className="text-foreground">{data.siteCode}</p></div>
                <div className="space-y-1"><Label>物料單日期</Label><p className="text-foreground">{data.materialRequestDate ? format(data.materialRequestDate, "yyyy/MM/dd") : '-'}</p></div>
                <div className="space-y-1"><Label>出貨日期</Label><p className="text-foreground">{data.shippingDate ? format(data.shippingDate, "yyyy/MM/dd") : '-'}</p></div>
              </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>設備列表</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <Table className="min-w-full">
                        <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">項次</TableHead>
                            <TableHead className="w-[120px]">料號</TableHead>
                            <TableHead className="min-w-[150px]">名稱</TableHead>
                            <TableHead className="w-[80px]">数量</TableHead>
                            <TableHead className="min-w-[120px]">倉庫</TableHead>
                            <TableHead className="w-[120px]">資產編號</TableHead>
                            <TableHead className="min-w-[150px]">備註</TableHead>
                            <TableHead className="w-[120px]">放置地點</TableHead>
                            <TableHead className="w-[120px]">存貨/備品/缺貨</TableHead>
                            <TableHead className="min-w-[200px]">設備序號(S)</TableHead>
                            <TableHead className="w-[150px]">管理</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {data.devices.map((device, index) => (
                            <TableRow key={device.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{device.partNumber}</TableCell>
                            <TableCell>{device.name}</TableCell>
                            <TableCell>{device.quantity}</TableCell>
                            <TableCell>{device.warehouse}</TableCell>
                            <TableCell>{[device.deviceSerialNumberS].filter(Boolean).join(', ')}</TableCell>
                            <TableCell>{device.note}</TableCell>
                            <TableCell>{device.location}</TableCell>
                            <TableCell>
                                 <Badge variant="outline" className={device.inventoryStatus ? inventoryStatusMap[device.inventoryStatus]?.className : ""}>{device.inventoryStatus ? inventoryStatusMap[device.inventoryStatus]?.label : ""}</Badge>
                            </TableCell>
                            <TableCell>{device.deviceSerialNumberS}</TableCell>
                            <TableCell>
                               <Badge variant="outline" className={statusMap[device.status]?.className || ""}>
                                 {statusMap[device.status]?.label || device.status}
                               </Badge>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
          </Card>
      </div>
    </>
  );
}
