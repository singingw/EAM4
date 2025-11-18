
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Save, RefreshCw, AlertTriangle, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
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

const deviceSchema = z.object({
  id: z.string(),
  partNumber: z.string(),
  name: z.string(),
  quantity: z.number(),
  serialNumber: z.string(),
  note: z.string(),
  location: z.string(),
  inventoryStatus: z.enum(["存貨", "備品", "缺貨", ""]),
  deviceSerialNumberS: z.string(),
  deviceSerialNumberSpare: z.string(),
  status: z.enum(["尚未撿貨", "已撿貨", "已出貨"]),
});

const EditShippingDetailSchema = z.object({
  quoteId: z.string().min(1, { message: "報價單號為必填" }),
  status: z.string(),
  picker: z.string().optional(),
  materialRequestNo: z.string().optional(),
  siteName: z.string().optional(),
  siteAddress: z.string().optional(),
  siteCategory: z.string().optional(),
  classificationName: z.string().optional(),
  equipmentType: z.string().optional(),
  surveyorName: z.string().optional(),
  maintenanceStation: z.string().optional(),
  panelStandardForm: z.string().optional(),
  panelAdditionalItems: z.string().optional(),
  dispatchPanelVendor: z.string().optional(),
  yuanChuangRequirement: z.boolean().optional(),
  panelDispatchPersonnel: z.string().optional(),
  psopMaterialRequestNote: z.string().optional(),
  psopQuoteNote: z.string().optional(),
  note: z.string().optional(),
  deviceSupplyType: z.string().optional(),
  salesTypeChinese: z.string().optional(),
  siteCode: z.string().optional(),
  materialRequestDate: z.date().optional(),
  shippingDate: z.date().optional(),
  devices: z.array(deviceSchema),
});

type EditShippingDetailValues = z.infer<typeof EditShippingDetailSchema>;

// Mock data
const mockData: EditShippingDetailValues = {
  quoteId: "ORD001",
  status: "已轉檔",
  picker: "",
  materialRequestNo: 'MRN001',
  siteName: '中山機房',
  siteAddress: '台北市中山區中山北路二段48巷7號',
  siteCategory: '',
  classificationName: '',
  equipmentType: '',
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
  deviceSupplyType: '',
  salesTypeChinese: '',
  siteCode: '',
  devices: [
    { id: "1", partNumber: 'PN001', name: "Laptop A", quantity: 1, serialNumber: "", note: "", location: "A-01", inventoryStatus: "存貨", deviceSerialNumberS: "", deviceSerialNumberSpare: "", status: "尚未撿貨" },
    { id: "2", partNumber: 'PN002', name: "Laptop B", quantity: 2, serialNumber: "", note: "", location: "A-02", inventoryStatus: "存貨", deviceSerialNumberS: "", deviceSerialNumberSpare: "", status: "尚未撿貨" },
    { id: "3", partNumber: 'PN003', name: "Monitor C", quantity: 1, serialNumber: "", note: "", location: "B-01", inventoryStatus: "備品", deviceSerialNumberS: "", deviceSerialNumberSpare: "", status: "尚未撿貨" },
    { id: "4", partNumber: 'PN004', name: "Laptop D", quantity: 3, serialNumber: "", note: "", location: "C-05", inventoryStatus: "缺貨", deviceSerialNumberS: "", deviceSerialNumberSpare: "", status: "尚未撿貨" },
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

export function EditShippingDetailsForm() {
  const [isPending, setIsPending] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<EditShippingDetailValues>({
    resolver: zodResolver(EditShippingDetailSchema),
    defaultValues: mockData,
    mode: "onBlur",
  });

  const { fields, update } = useFieldArray({
    control: form.control,
    name: "devices",
  });

  const onSubmit = (values: EditShippingDetailValues) => {
    setIsPending(true);

    let updatedValues = { ...values };
    
    // Logic for state transition
    if (values.status === "已轉檔") {
        updatedValues.status = "待放行";
    }

    // Auto-update device status if serial number is added
    updatedValues.devices.forEach((device, index) => {
        const originalDevice = mockData.devices[index];
        if (device.deviceSerialNumberS && originalDevice.status === "尚未撿貨") {
            device.status = "已撿貨";
        }
    });

    const allDevicesShipped = updatedValues.devices.every(d => d.status === '已出貨');
    const anyDevicePicked = updatedValues.devices.some(d => d.status === '已撿貨' || d.status === '已出貨');

    if (allDevicesShipped) {
      updatedValues.status = "已完成";
    } else if (anyDevicePicked && updatedValues.status === '待檢貨') {
      updatedValues.status = "撿貨處理中";
    }
    
    console.log("Saving data:", updatedValues);
    toast({
      title: "出貨明細已儲存",
      description: `報價單號 ${updatedValues.quoteId} 已更新。`,
    });
    
    setTimeout(() => {
        setIsPending(false);
        router.push("/Manager/shipping-details");
    }, 1000);
  };
  
  const canStartPicking = form.watch('status') === '待檢貨' || form.watch('status') === '撿貨處理中';

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">編輯出貨明細</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="bg-gray-500 text-white hover:bg-gray-600" asChild>
            <Link href="/Manager/shipping-details">
              <RefreshCw className="mr-2 h-4 w-4" />
              返回列表
            </Link>
          </Button>
          <Button onClick={form.handleSubmit(onSubmit)} disabled={isPending} className="bg-green-500 text-white hover:bg-green-600">
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <Save className="mr-2 h-4 w-4" />
            儲存
          </Button>
        </div>
      </div>
      <Form {...form}>
        <form className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="quoteId"
                  render={({ field }) => (
                    <FormItem>
                      <Label>報價單號</Label>
                      <FormControl>
                        <Input {...field} disabled={isPending || true} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="materialRequestNo"
                  render={({ field }) => (
                    <FormItem>
                      <Label>物料需求單號</Label>
                      <FormControl>
                        <Input {...field} disabled={isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <Label>狀態</Label>
                      <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {mainStatusOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="picker"
                  render={({ field }) => (
                    <FormItem>
                      <Label>撿貨人員</Label>
                      <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending || form.watch('status') !== '待檢貨'}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="-- 請選擇 --" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                           <SelectItem value="user1">人員A</SelectItem>
                           <SelectItem value="user2">人員B</SelectItem>
                           <SelectItem value="user3">人員C</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="siteName"
                  render={({ field }) => (
                    <FormItem>
                      <Label>場站名稱</Label>
                      <FormControl>
                        <Input {...field} disabled={isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="siteAddress"
                  render={({ field }) => (
                    <FormItem>
                      <Label>場站地址</Label>
                      <FormControl>
                        <Input {...field} disabled={isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                    control={form.control}
                    name="siteCategory"
                    render={({ field }) => (
                        <FormItem>
                        <Label>案場分類</Label>
                        <Select onValueChange={field.onChange} value={field.value || ""} disabled={isPending}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="請選擇" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="outdoor">室外場</SelectItem>
                                <SelectItem value="indoor">室內場</SelectItem>
                                <SelectItem value="parking-tower">停車塔</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="classificationName"
                    render={({ field }) => (
                        <FormItem>
                        <Label>分級名稱</Label>
                        <Select onValueChange={field.onChange} value={field.value || ""} disabled={isPending}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="請選擇" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="flagship">旗艦廠</SelectItem>
                                <SelectItem value="vehicle">車辦場</SelectItem>
                                <SelectItem value="etag">eTag場</SelectItem>
                                <SelectItem value="hybrid">混合場</SelectItem>
                                <SelectItem value="roaming">漫遊場</SelectItem>
                                <SelectItem value="monthly">月租場</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="equipmentType"
                    render={({ field }) => (
                        <FormItem>
                        <Label>維運設備類型</Label>
                        <Select onValueChange={field.onChange} value={field.value || ""} disabled={isPending}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="請選擇" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                <SelectItem value="TSP-flagship">TSP旗艦型</SelectItem>
                                <SelectItem value="TSP-advanced">TSP高階型</SelectItem>
                                <SelectItem value="flagship-site">旗艦場</SelectItem>
                                <SelectItem value="advanced">高階型</SelectItem>
                                <SelectItem value="intermediate">進階型</SelectItem>
                                <SelectItem value="entry">入門場</SelectItem>
                                <SelectItem value="list-based">名單型</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                 <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="surveyorName"
                        render={({ field }) => (
                            <FormItem>
                            <Label>案場會勘人員 - 姓名</Label>
                            <FormControl>
                                <Input {...field} disabled={isPending} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="maintenanceStation"
                        render={({ field }) => (
                            <FormItem>
                            <Label>案場會勘人員 - 維運站</Label>
                             <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}>
                                <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="請選擇" />
                                </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="泰山站">泰山站</SelectItem>
                                    <SelectItem value="樹林站">樹林站</SelectItem>
                                    <SelectItem value="楊梅站">楊梅站</SelectItem>
                                    <SelectItem value="后里站">后里站</SelectItem>
                                    <SelectItem value="員林站">員林站</SelectItem>
                                    <SelectItem value="新市站">新市站</SelectItem>
                                    <SelectItem value="田寮站">田寮站</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                  control={form.control}
                  name="panelStandardForm"
                  render={({ field }) => (
                    <FormItem>
                      <Label>盤體標準形式</Label>
                      <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}>
                        <FormControl><SelectTrigger><SelectValue placeholder="請選擇" /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="formA">形式A</SelectItem>
                          <SelectItem value="formB">形式B</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="panelAdditionalItems"
                  render={({ field }) => (
                    <FormItem>
                      <Label>盤體追加項目</Label>
                      <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}>
                        <FormControl><SelectTrigger><SelectValue placeholder="請選擇" /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="itemA">項目A</SelectItem>
                          <SelectItem value="itemB">項目B</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dispatchPanelVendor"
                  render={({ field }) => (
                    <FormItem>
                      <Label>派工組盤商</Label>
                      <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isPending}>
                        <FormControl><SelectTrigger><SelectValue placeholder="請選擇" /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="百訊">百訊</SelectItem>
                          <SelectItem value="正合旭">正合旭</SelectItem>
                          <SelectItem value="三匠">三匠</SelectItem>
                          <SelectItem value="創星">創星</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="panelDispatchPersonnel"
                  render={({ field }) => (
                    <FormItem>
                      <Label>組盤派工人員</Label>
                      <FormControl><Input {...field} disabled={isPending} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center space-x-2 pt-6">
                    <FormField
                        control={form.control}
                        name="yuanChuangRequirement"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                                <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <Label>遠創需求</Label>
                            </div>
                            </FormItem>
                        )}
                    />
                </div>
                 <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                        control={form.control}
                        name="psopMaterialRequestNote"
                        render={({ field }) => (
                            <FormItem>
                            <Label>PSOP物料需求單備註</Label>
                            <FormControl><Input {...field} disabled={isPending} /></FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="psopQuoteNote"
                        render={({ field }) => (
                            <FormItem>
                            <Label>PSOP報價單備註</Label>
                            <FormControl><Input {...field} disabled={isPending} /></FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="note"
                        render={({ field }) => (
                            <FormItem>
                            <Label>備註</Label>
                            <FormControl><Input {...field} disabled={isPending} /></FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
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
                <FormField
                    control={form.control}
                    name="deviceSupplyType"
                    render={({ field }) => (
                        <FormItem>
                        <Label>設備供應(銷售型態)</Label>
                        <FormControl><Input {...field} disabled={isPending} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="salesTypeChinese"
                    render={({ field }) => (
                        <FormItem>
                        <Label>銷售類型(中文)</Label>
                        <FormControl><Input {...field} disabled={isPending} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="siteCode"
                    render={({ field }) => (
                        <FormItem>
                        <Label>場站代碼</Label>
                        <FormControl><Input {...field} disabled={isPending} /></FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                  control={form.control}
                  name="materialRequestDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <Label>物料單日期</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "yyyy/MM/dd")
                              ) : (
                                <span>選擇日期</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="shippingDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <Label>出貨日期</Label>
                       <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "yyyy/MM/dd")
                              ) : (
                                <span>選擇日期</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                            <TableHead className="w-[80px]">數量</TableHead>
                            <TableHead className="w-[120px]">序號</TableHead>
                            <TableHead className="min-w-[150px]">備註</TableHead>
                            <TableHead className="w-[120px]">放置地點</TableHead>
                            <TableHead className="w-[120px]">存貨/備品/缺貨</TableHead>
                            <TableHead className="min-w-[200px]">設備序號(S)</TableHead>
                            <TableHead className="min-w-[200px]">設備序號(備品)</TableHead>
                            <TableHead className="w-[150px]">設備狀態</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {fields.map((field, index) => (
                            <TableRow key={field.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{field.partNumber}</TableCell>
                            <TableCell>{field.name}</TableCell>
                            <TableCell>{field.quantity}</TableCell>
                            <TableCell>{[field.deviceSerialNumberS, field.deviceSerialNumberSpare].filter(Boolean).join(', ')}</TableCell>
                             <TableCell>
                                <FormField
                                    control={form.control}
                                    name={`devices.${index}.note`}
                                    render={({ field: f }) => ( <Input {...f} disabled={isPending || !canStartPicking} /> )}
                                />
                            </TableCell>
                            <TableCell>{field.location}</TableCell>
                            <TableCell>
                                 <Badge variant="outline" className={field.inventoryStatus ? inventoryStatusMap[field.inventoryStatus]?.className : ""}>{field.inventoryStatus ? inventoryStatusMap[field.inventoryStatus]?.label : ""}</Badge>
                            </TableCell>
                            <TableCell>
                                <FormField
                                    control={form.control}
                                    name={`devices.${index}.deviceSerialNumberS`}
                                    render={({ field: f }) => (
                                        <Input 
                                            {...f} 
                                            disabled={isPending || !canStartPicking || field.status !== '尚未撿貨'}
                                            placeholder={field.status === '尚未撿貨' && canStartPicking ? '請輸入或掃描序號' : ''}
                                        />
                                    )}
                                />
                            </TableCell>
                            <TableCell>
                                <FormField
                                    control={form.control}
                                    name={`devices.${index}.deviceSerialNumberSpare`}
                                    render={({ field: f }) => ( <Input {...f} disabled={isPending || !canStartPicking} /> )}
                                />
                            </TableCell>
                            <TableCell>
                                <Select
                                    defaultValue={field.status}
                                    onValueChange={(value) => {
                                        const newStatus = value as "尚未撿貨" | "已撿貨" | "已出貨";
                                        update(index, { ...field, status: newStatus });
                                    }}
                                    disabled={isPending || !canStartPicking || field.status === '尚未撿貨'}
                                >
                                    <SelectTrigger className="w-32">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="尚未撿貨">尚未撿貨</SelectItem>
                                        <SelectItem value="已撿貨">已撿貨</SelectItem>
                                        <SelectItem value="已出貨">已出貨</SelectItem>
                                    </SelectContent>
                                </Select>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </>
  );
}

