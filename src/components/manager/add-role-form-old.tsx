

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";

const AddRoleSchema = z.object({
  name: z.string().min(1, {
    message: '角色名稱為必填欄位',
  }),
  permissions: z.array(z.string()).refine(value => value.some(item => item), {
    message: "至少需選擇一個權限",
  }),
});

const allPermissions = ["系統管理", "權限管理", "識別證", "名單管理", "抽獎", "點卷"];

export function AddRoleForm() {
  const [isPending, setIsPending] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof AddRoleSchema>>({
    resolver: zodResolver(AddRoleSchema),
    defaultValues: {
      name: "",
      permissions: [],
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const onSubmit = (values: z.infer<typeof AddRoleSchema>) => {
    setIsPending(true);
    setTimeout(() => {
      console.log(values);
      toast({
        title: "角色已新增",
        description: `角色 "${values.name}" 已被成功建立。`,
      });
      setIsPending(false);
      router.push('/Manager/roles');
    }, 1000);
  };
  
  const togglePermission = (permission: string) => {
    const currentPermissions = form.getValues("permissions");
    const newPermissions = currentPermissions.includes(permission)
      ? currentPermissions.filter((p) => p !== permission)
      : [...currentPermissions, permission];
    form.setValue("permissions", newPermissions, { shouldValidate: true });
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">新增角色</h1>
        <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
                <Link href="/Manager/roles">
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
                        name="name"
                        render={({ field }) => (
                        <FormItem>
                            <Label>角色名稱</Label>
                            <FormControl>
                            <Input
                                {...field}
                                disabled={isPending}
                                placeholder="請輸入角色名稱"
                            />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <FormField
                      control={form.control}
                      name="permissions"
                      render={({ field }) => (
                        <FormItem>
                            <Label>權限</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                    <div className="flex min-h-10 w-full items-center gap-1 flex-wrap rounded-md border border-input bg-transparent px-3 py-2 text-sm">
                                        {field.value.length > 0 ? (
                                            field.value.map(permission => (
                                                <Badge key={permission} variant="secondary" className="font-normal bg-gray-200 text-gray-800">
                                                    {permission}
                                                    <button onClick={(e) => { e.stopPropagation(); togglePermission(permission); }} className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2">
                                                        <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                                                    </button>
                                                </Badge>
                                            ))
                                        ) : (
                                            <span className="text-muted-foreground">請點擊以選擇權限</span>
                                        )}
                                    </div>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                                    <Command>
                                        <CommandInput placeholder="搜尋權限..." />
                                        <CommandList>
                                            <CommandEmpty>找不到權限</CommandEmpty>
                                            <CommandGroup>
                                                {allPermissions.map(permission => (
                                                    <CommandItem
                                                        key={permission}
                                                        onSelect={() => togglePermission(permission)}
                                                        className="flex items-center justify-between"
                                                    >
                                                        <span>{permission}</span>
                                                        {field.value.includes(permission) && <Check className="h-4 w-4" />}
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
