
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Save, RefreshCw } from "lucide-react";

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
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "../ui/separator";

const permissionsSchema = z.record(z.boolean());

const EditRoleSchema = z.object({
  name: z.string().min(1, {
    message: "角色名稱為必填欄位",
  }),
  status: z.string(),
  permissions: z.record(permissionsSchema),
});

type EditRoleFormValues = z.infer<typeof EditRoleSchema>;

const permissionStructure = {
  systemManagement: {
    label: "系統管理",
    subItems: {
      systemFeatures: { label: "系統功能管理", actions: ["新增", "編輯", "刪除", "檢視", "複製", "異動紀錄"] },
      menuManagement: { label: "後台選單管理", actions: ["新增", "編輯", "刪除", "檢視", "複製", "異動紀錄"] },
    }
  },
  permissionManagement: {
    label: "權限管理",
    subItems: {
      userManagement: { label: "後台帳號管理", actions: ["新增", "編輯", "刪除", "檢視", "複製", "異動紀錄", "登入/登出紀錄", "觀察模式"] },
      roleManagement: { label: "角色管理", actions: ["新增", "編輯", "刪除", "檢視", "複製", "異動紀錄"] },
    }
  },
  badge: {
    label: "識別證",
    subItems: {
      badgeDesign: { label: "識別證設計(第二階段)", actions: ["儲存", "預覽"] },
      badgeTemplates: { label: "識別證模板", actions: ["新增模板", "列印", "編輯", "複製", "刪除"] },
    }
  },
  attendeeList: {
    label: "名單管理",
    subItems: {
      attendees: { 
        label: "參加者名單", 
        actions: [
          "全部寄送通知", "全部匯出 QRCode", "匯入", "匯出", "欄位設定", "批次寄送通知", 
          "批次匯出 QRCode", "新增參加者", "編輯", "刪除", "行前通知", "QR Code", "檢視", "異動紀錄"
        ] 
      },
      qrcode: { label: "QRCode 下載紀錄", actions: ["查詢", "匯出"] },
    }
  }
};

const getInitialPermissions = (roleData: any) => {
    const permissions: Record<string, Record<string, boolean>> = {};
    Object.entries(permissionStructure).forEach(([groupKey, groupValue]) => {
      permissions[groupKey] = {};
      Object.entries(groupValue.subItems).forEach(([itemKey, itemValue]) => {
        const hasSubItemPermission = roleData.permissions[groupKey]?.[itemKey] ?? false;
        permissions[groupKey][itemKey] = hasSubItemPermission;
        itemValue.actions.forEach(action => {
           permissions[groupKey][`${itemKey}-${action}`] = roleData.permissions[groupKey]?.[`${itemKey}-${action}`] ?? false;
        });
      });
    });
    return permissions;
};


// Mock data for an existing role
const existingRoleData = {
    name: "系統管理員",
    status: "enabled",
    permissions: {
        systemManagement: {
            systemFeatures: true,
            "systemFeatures-新增": true,
            "systemFeatures-編輯": true,
            "systemFeatures-刪除": true,
            "systemFeatures-檢視": true,
            "systemFeatures-複製": true,
            "systemFeatures-異動紀錄": true,
            menuManagement: true,
            "menuManagement-新增": true,
            "menuManagement-編輯": true,
            "menuManagement-刪除": true,
            "menuManagement-檢視": true,
            "menuManagement-複製": true,
            "menuManagement-異動紀錄": true,
        },
        permissionManagement: {
            userManagement: true,
            "userManagement-新增": true,
            "userManagement-編輯": true,
            "userManagement-刪除": true,
            "userManagement-檢視": true,
            "userManagement-複製": true,
            "userManagement-異動紀錄": true,
            "userManagement-登入/登出紀錄": true,
            "userManagement-觀察模式": true,
            roleManagement: true,
            "roleManagement-新增": true,
            "roleManagement-編輯": true,
            "roleManagement-刪除": true,
            "roleManagement-檢視": true,
            "roleManagement-複製": true,
            "roleManagement-異動紀錄": true,
        },
        badge: {
            badgeDesign: true,
            "badgeDesign-儲存": true,
            "badgeDesign-預覽": true,
            badgeTemplates: true,
            "badgeTemplates-新增模板": true,
            "badgeTemplates-列印": true,
            "badgeTemplates-編輯": true,
            "badgeTemplates-複製": true,
            "badgeTemplates-刪除": true,
        },
        attendeeList: {
            attendees: true,
            "attendees-全部寄送通知": true,
            "attendees-全部匯出 QRCode": true,
            "attendees-匯入": true,
            "attendees-匯出": true,
            "attendees-欄位設定": true,
            "attendees-批次寄送通知": true,
            "attendees-批次匯出 QRCode": true,
            "attendees-新增參加者": true,
            "attendees-編輯": true,
            "attendees-刪除": true,
            "attendees-行前通知": true,
            "attendees-QR Code": true,
            "attendees-檢視": true,
            "attendees-異動紀錄": true,
            qrcode: true,
            "qrcode-查詢": true,
            "qrcode-匯出": true,
        }
    }
}


export function EditRoleForm() {
  const [isPending, setIsPending] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<EditRoleFormValues>({
    resolver: zodResolver(EditRoleSchema),
    defaultValues: {
        name: existingRoleData.name,
        status: existingRoleData.status,
        permissions: getInitialPermissions(existingRoleData)
    },
    mode: "onBlur",
  });

  const { watch, setValue } = form;
  const permissions = watch("permissions");

  const handleSelectAll = (checked: boolean) => {
    Object.keys(permissionStructure).forEach(groupKey => {
      setValue(`permissions.${groupKey}`, {}, { shouldValidate: true });
      const groupSubItems = permissionStructure[groupKey as keyof typeof permissionStructure].subItems;
      Object.keys(groupSubItems).forEach(itemKey => {
         setValue(`permissions.${groupKey}.${itemKey}`, checked, { shouldValidate: true });
         const itemActions = groupSubItems[itemKey as keyof typeof groupSubItems].actions;
         itemActions.forEach(action => {
            setValue(`permissions.${groupKey}.${itemKey}-${action}`, checked, { shouldValidate: true });
         });
      });
    });
  };

  const handleGroupSelect = (groupKey: string, checked: boolean) => {
      const groupSubItems = permissionStructure[groupKey as keyof typeof permissionStructure].subItems;
      Object.keys(groupSubItems).forEach(itemKey => {
         setValue(`permissions.${groupKey}.${itemKey}`, checked, { shouldValidate: true });
         const itemActions = groupSubItems[itemKey as keyof typeof groupSubItems].actions;
         itemActions.forEach(action => {
            setValue(`permissions.${groupKey}.${itemKey}-${action}`, checked, { shouldValidate: true });
         });
      });
  };
  
  const handleSubItemSelect = (groupKey: string, itemKey: string, checked: boolean) => {
     setValue(`permissions.${groupKey}.${itemKey}`, checked, { shouldValidate: true });
     const itemActions = permissionStructure[groupKey as keyof typeof permissionStructure].subItems[itemKey as keyof typeof permissionStructure['subItems']].actions;
     itemActions.forEach(action => {
        setValue(`permissions.${groupKey}.${itemKey}-${action}`, checked, { shouldValidate: true });
     });
  };
  
  const isAllSelected = Object.values(permissions).every(group => Object.values(group).every(v => v));
  
  const isGroupSelected = (groupKey: string) => {
    const groupPerms = permissions[groupKey];
    if (!groupPerms) return false;
    const subItemKeys = Object.keys(permissionStructure[groupKey as keyof typeof permissionStructure].subItems);
    return subItemKeys.every(itemKey => {
        const itemActions = permissionStructure[groupKey as keyof typeof permissionStructure].subItems[itemKey as keyof typeof permissionStructure['subItems']].actions;
        return groupPerms[itemKey] && itemActions.every(action => groupPerms[`${itemKey}-${action}`]);
    });
  }

  const isSubItemSelected = (groupKey: string, itemKey: string) => {
     const groupPerms = permissions[groupKey];
     if(!groupPerms) return false;
     const itemActions = permissionStructure[groupKey as keyof typeof permissionStructure].subItems[itemKey as keyof typeof permissionStructure['subItems']].actions;
     return groupPerms[itemKey] && itemActions.every(action => groupPerms[`${itemKey}-${action}`]);
  }


  const onSubmit = (values: EditRoleFormValues) => {
    setIsPending(true);
    setTimeout(() => {
      console.log(values);
      toast({
        title: "角色已更新",
        description: `角色 "${values.name}" 的權限已成功更新。`,
      });
      setIsPending(false);
      router.push('/Manager/roles');
    }, 1000);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">編輯角色</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild className="bg-gray-500 text-white hover:bg-gray-600">
            <Link href="/Manager/roles">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <Label>角色名稱</Label>
                      <FormControl>
                        <Input {...field} disabled={isPending} placeholder="" />
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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
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
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 space-y-6">
                <div className="flex items-center space-x-2">
                    <Label className="font-bold">權限</Label>
                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="select-all"
                            onCheckedChange={(checked) => handleSelectAll(checked as boolean)}
                            checked={isAllSelected}
                        />
                        <Label htmlFor="select-all" className="font-normal">全選</Label>
                    </div>
                </div>
                
                {Object.entries(permissionStructure).map(([groupKey, group]) => (
                    <Card key={groupKey} className="bg-muted/30">
                        <CardContent className="pt-6 space-y-4">
                            <div className="flex items-center gap-2">
                                <Checkbox 
                                    id={groupKey}
                                    checked={isGroupSelected(groupKey)}
                                    onCheckedChange={(checked) => handleGroupSelect(groupKey, checked as boolean)}
                                />
                                <Label htmlFor={groupKey} className="text-base font-semibold">{group.label}</Label>
                            </div>
                             <Separator />
                             {Object.entries(group.subItems).map(([itemKey, item]) => (
                                <div key={itemKey} className="pl-6 space-y-3">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-2 pt-1">
                                            <Checkbox 
                                                id={`${groupKey}-${itemKey}`}
                                                checked={isSubItemSelected(groupKey, itemKey)}
                                                onCheckedChange={(checked) => handleSubItemSelect(groupKey, itemKey, checked as boolean)}
                                            />
                                            <Label htmlFor={`${groupKey}-${itemKey}`} className="font-medium">{item.label}</Label>
                                        </div>
                                        <div className="flex items-center gap-x-4 gap-y-2 flex-wrap max-w-4xl justify-end">
                                            {item.actions.map(action => (
                                                <div key={action} className="flex items-center gap-2">
                                                    <Controller
                                                        control={form.control}
                                                        name={`permissions.${groupKey}.${itemKey}-${action}`}
                                                        render={({ field }) => (
                                                            <Checkbox
                                                                id={`${groupKey}-${itemKey}-${action}`}
                                                                checked={field.value}
                                                                onCheckedChange={field.onChange}
                                                            />
                                                        )}
                                                    />
                                                    <Label htmlFor={`${groupKey}-${itemKey}-${action}`} className="font-normal text-sm">{action}</Label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                             ))}
                        </CardContent>
                    </Card>
                ))}

            </CardContent>
          </Card>
        </form>
      </Form>
    </>
  );
}
