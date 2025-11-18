
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

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


const roleData = {
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


export function ViewRoleDetails() {
  const [role] = useState(roleData);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">檢視角色</h1>
        <Button
          variant="outline"
          className="bg-gray-500 text-white hover:bg-gray-600"
          asChild
        >
          <Link href="/Manager/roles">
            <RefreshCw className="mr-2 h-4 w-4" />
            返回列表
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                <Label>角色名稱</Label>
                <p className="text-foreground">{role.name}</p>
                </div>
                <div className="space-y-1">
                <Label>狀態</Label>
                <div>
                    <Badge
                    variant={role.status === 'enabled' ? "default" : "secondary"}
                    className={
                        role.status === 'enabled'
                        ? "bg-green-100 text-green-800 border-green-200 hover:bg-green-100/80"
                        : "bg-red-100 text-red-800 border-red-200 hover:bg-red-100/80"
                    }
                    >
                    {role.status === 'enabled' ? (
                        <CheckCircle className="mr-1 h-3 w-3" />
                    ) : (
                        <XCircle className="mr-1 h-3 w-3" />
                    )}
                    {role.status === 'enabled' ? '啟用' : '停用'}
                    </Badge>
                </div>
                </div>
            </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6 space-y-6">
            <div className="flex items-center space-x-2">
                <Label className="font-bold">權限</Label>
            </div>
            
            {Object.entries(permissionStructure).map(([groupKey, group]) => {
                const groupPermissions = role.permissions[groupKey as keyof typeof role.permissions] || {};
                const hasGroupPermission = Object.values(groupPermissions).some(v => v);

                if (!hasGroupPermission) return null;

                return (
                    <Card key={groupKey} className="bg-muted/30">
                        <CardContent className="pt-6 space-y-4">
                            <div className="flex items-center gap-2">
                                <Label className="text-base font-semibold">{group.label}</Label>
                            </div>
                            <Separator />
                            {Object.entries(group.subItems).map(([itemKey, item]) => {
                                const hasSubItemPermission = item.actions.some(action => groupPermissions[`${itemKey}-${action}`]);
                                if (!hasSubItemPermission) return null;
                                
                                return (
                                <div key={itemKey} className="pl-6 space-y-3">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-2 pt-1">
                                            <Label className="font-medium">{item.label}</Label>
                                        </div>
                                        <div className="flex items-center gap-x-4 gap-y-2 flex-wrap max-w-4xl justify-end">
                                            {item.actions.map(action => {
                                                const hasActionPermission = groupPermissions[`${itemKey}-${action}`];
                                                if (!hasActionPermission) return null;

                                                return (
                                                    <div key={action} className="flex items-center gap-2">
                                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                                        <Label className="font-normal text-sm">{action}</Label>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                             )})}
                        </CardContent>
                    </Card>
                )
            })}
        </CardContent>
      </Card>
    </div>
  );
}
