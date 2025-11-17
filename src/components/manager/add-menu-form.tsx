
"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Save, X, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AddMenuSchema } from "@/lib/schemas";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";

const allFeatures = ["會員管理", "活動報名", "電子報發送", "數據分析儀表板", "線上支付 (串接中)", "權限控管", "抽獎", "點卷"];


export function AddMenuForm() {
  const [isPending, setIsPending] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const isEditing = pathname.includes('/edit');

  const form = useForm<z.infer<typeof AddMenuSchema>>({
    resolver: zodResolver(AddMenuSchema),
    defaultValues: {
      title: isEditing ? "系統管理" : "",
      status: isEditing ? "enabled" : "enabled",
      sort: isEditing ? 1 : 1,
      systemFeatures: isEditing ? ["系統功能管理", "後台選單管理"] : [],
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const onSubmit = (values: z.infer<typeof AddMenuSchema>) => {
    setIsPending(true);
    setTimeout(() => {
      console.log(values);
      toast({
        title: isEditing ? "選單已更新" : "選單已新增",
        description: `"${values.title}" 已被成功${isEditing ? '更新' : '加入選單中'}。`,
      });
      setIsPending(false);
      router.push('/Manager/menu-management');
    }, 1000);
  };
  
  const toggleFeature = (feature: string) => {
    const currentFeatures = form.getValues("systemFeatures");
    const newFeatures = currentFeatures.includes(feature)
      ? currentFeatures.filter((f) => f !== feature)
      : [...currentFeatures, feature];
    form.setValue("systemFeatures", newFeatures, { shouldValidate: true });
  };


  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{isEditing ? "編輯選單" : "新增選單"}</h1>
        <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
                <Link href="/Manager/menu-management">
                    <X className="mr-2 h-4 w-4" />
                    取消
                </Link>
            </Button>
            <Button onClick={form.handleSubmit(onSubmit)} disabled={isPending}>
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
                                placeholder="請輸入選單標題"
                            />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="sort"
                        render={({ field }) => (
                        <FormItem>
                            <Label>排序</Label>
                            <FormControl>
                            <Input
                                {...field}
                                type="number"
                                disabled={isPending}
                                placeholder="請輸入排序"
                                onChange={e => field.onChange(parseInt(e.target.value, 10))}
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
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="選擇狀態" />
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
                      name="systemFeatures"
                      render={({ field }) => (
                        <FormItem>
                            <Label>系統功能選單</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                    <div className="flex min-h-10 w-full items-center gap-1 flex-wrap rounded-md border border-input bg-transparent px-3 py-2 text-sm">
                                        {field.value.length > 0 ? (
                                            field.value.map(feature => (
                                                <Badge key={feature} variant="secondary" className="font-normal bg-gray-200 text-gray-800">
                                                    {feature}
                                                    <button onClick={(e) => { e.stopPropagation(); toggleFeature(feature); }} className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2">
                                                        <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                                                    </button>
                                                </Badge>
                                            ))
                                        ) : (
                                            <span className="text-muted-foreground">請點擊以選擇功能</span>
                                        )}
                                    </div>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                                    <Command>
                                        <CommandInput placeholder="搜尋功能..." />
                                        <CommandList>
                                            <CommandEmpty>找不到功能</CommandEmpty>
                                            <CommandGroup>
                                                {allFeatures.map(feature => (
                                                    <CommandItem
                                                        key={feature}
                                                        onSelect={() => toggleFeature(feature)}
                                                        className="flex items-center justify-between"
                                                    >
                                                        <span>{feature}</span>
                                                        {field.value.includes(feature) && <Check className="h-4 w-4" />}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                      )}
                    />
                </div>
            </form>
            </Form>
        </CardContent>
       </Card>
    </>
  );
}
