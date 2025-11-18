
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Save, RefreshCw, AlertTriangle } from "lucide-react";
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

const deviceSchema = z.object({
  id: z.string(),
  name: z.string(),
  serialNumber: z.string(),
  status: z.enum(["尚未撿貨", "已撿貨", "已出貨"]),
});

const EditShippingDetailSchema = z.object({
  quoteId: z.string().min(1, { message: "報價單號為必填" }),
  status: z.string(),
  picker: z.string().optional(),
  devices: z.array(deviceSchema),
});

type EditShippingDetailValues = z.infer<typeof EditShippingDetailSchema>;

// Mock data
const mockData: EditShippingDetailValues = {
  quoteId: "ORD001",
  status: "已轉檔",
  picker: "",
  devices: [
    { id: "1", name: "Laptop A", serialNumber: "", status: "尚未撿貨" },
    { id: "2", name: "Laptop B", serialNumber: "SN-B-456", status: "已撿貨" },
    { id: "3", name: "Monitor C", serialNumber: "SN-C-789", status: "已出貨" },
    { id: "4", name: "Laptop D", serialNumber: "", status: "尚未撿貨" },
  ],
};

const statusMap: { [key: string]: { label: string; className: string } } = {
  尚未撿貨: { label: "尚未撿貨", className: "bg-gray-200 text-gray-800" },
  已撿貨: { label: "已撿貨", className: "bg-yellow-100 text-yellow-800" },
  已出貨: { label: "已出貨", className: "bg-green-100 text-green-800" },
};

const mainStatusOptions = ["已轉檔", "待放行", "待檢貨", "撿貨處理中", "已完成"];

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
        if (device.serialNumber && originalDevice.status === "尚未撿貨") {
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
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
                <CardTitle>設備列表</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>項次</TableHead>
                    <TableHead>設備名稱</TableHead>
                    <TableHead>設備序號</TableHead>
                    <TableHead>設備狀態</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {fields.map((field, index) => (
                    <TableRow key={field.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{field.name}</TableCell>
                      <TableCell>
                        <FormField
                            control={form.control}
                            name={`devices.${index}.serialNumber`}
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
                        {field.status === '已撿貨' ? (
                             <Select 
                                defaultValue={field.status} 
                                onValueChange={(value) => {
                                    const newStatus = value as "尚未撿貨" | "已撿貨" | "已出貨";
                                    update(index, { ...field, status: newStatus });
                                }}
                                disabled={isPending || !canStartPicking}
                            >
                                <SelectTrigger className="w-32">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="已撿貨">已撿貨</SelectItem>
                                    <SelectItem value="已出貨">已出貨</SelectItem>
                                </SelectContent>
                            </Select>
                        ) : (
                             <Badge variant="outline" className={statusMap[field.status].className}>{statusMap[field.status].label}</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </form>
      </Form>
    </>
  );
}
