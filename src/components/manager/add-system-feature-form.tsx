
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Save, RefreshCw, Plus, Trash2, GripVertical } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AddSystemFeatureSchema } from "@/lib/schemas";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export function AddSystemFeatureForm() {
  const [isPending, setIsPending] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof AddSystemFeatureSchema>>({
    resolver: zodResolver(AddSystemFeatureSchema),
    defaultValues: {
      title: "我的社團_活動管理_個人活動",
      status: "enabled",
      controller: "MyClubEventRegisterSoloEnroll",
      action: "Index",
      parameters: "",
      includedFunctions: [
        { name: "編輯", controller: "MyClubEventRegisterSoloEnroll", action: "Edit" },
        { name: "檢視", controller: "MyClubEventRegisterSoloEnroll", action: "Detail" },
      ],
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "includedFunctions",
  });


  const onSubmit = (values: z.infer<typeof AddSystemFeatureSchema>) => {
    setIsPending(true);
    // Simulate API call
    setTimeout(() => {
      console.log(values);
      toast({
        title: "功能已新增",
        description: `${values.title} 已被成功加入系統功能中。`,
      });
      setIsPending(false);
      router.push('/Manager/system-features');
    }, 1000);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">編輯</h1>
        <div className="flex items-center gap-2">
            <Button variant="outline" className="bg-gray-500 text-white hover:bg-gray-600" asChild>
                <Link href="/Manager/system-features">
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
       <Card>
        <CardContent className="pt-6">
            <Form {...form}>
            <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                        <FormItem>
                            <Label>標題</Label>
                            <FormControl>
                            <Input
                                {...field}
                                disabled={isPending}
                            />
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
                              <SelectItem value="enabled">啟用</SelectItem>
                              <SelectItem value="disabled">停用</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                        control={form.control}
                        name="controller"
                        render={({ field }) => (
                        <FormItem>
                            <Label>Controller</Label>
                            <FormControl>
                            <Input
                                {...field}
                                disabled={isPending}
                            />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="action"
                        render={({ field }) => (
                        <FormItem>
                            <Label>Action</Label>
                            <FormControl>
                            <Input
                                {...field}
                                disabled={isPending}
                            />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="parameters"
                        render={({ field }) => (
                        <FormItem className="md:col-span-2">
                            <Label>參數</Label>
                            <FormControl>
                            <Input
                                {...field}
                                disabled={isPending}
                            />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>
                <Separator />
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Label>包含功能</Label>
                        <Button type="button" variant="outline" className="bg-orange-400 text-white hover:bg-orange-500 h-8">新增預設功能</Button>
                        <Button type="button" variant="outline" className="bg-cyan-500 text-white hover:bg-cyan-600 h-8">自動偵測Action</Button>
                    </div>

                    <div className="space-y-4">
                        {fields.map((field, index) => (
                            <Card key={field.id} className="p-4 bg-muted/30">
                                <div className="flex items-start gap-2">
                                     <Button variant="ghost" size="icon" className="cursor-move h-8 w-8 mt-6">
                                        <GripVertical className="h-4 w-4" />
                                    </Button>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
                                      <FormField
                                        control={form.control}
                                        name={`includedFunctions.${index}.name`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <Label>功能名稱</Label>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                      />
                                       <FormField
                                        control={form.control}
                                        name={`includedFunctions.${index}.controller`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <Label>Controller</Label>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                      />
                                      <FormField
                                        control={form.control}
                                        name={`includedFunctions.${index}.action`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <Label>Action</Label>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                      />
                                    </div>
                                    <Button variant="destructive" size="sm" onClick={() => remove(index)} className="mt-6">
                                        <Trash2 className="h-4 w-4 mr-1" />
                                        刪除
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                    
                    <div className="flex justify-center pt-2">
                        <Button type="button" variant="outline" onClick={() => append({ name: "", controller: "", action: "" })}>
                            <Plus className="mr-2 h-4 w-4" />
                            更多
                        </Button>
                    </div>
                </div>
            </form>
            </Form>
        </CardContent>
       </Card>
    </>
  );
}
