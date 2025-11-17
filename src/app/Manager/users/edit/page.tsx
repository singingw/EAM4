"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function EditUserPage() {
  const [user, setUser] = useState({
    name: "Max",
    email: "max.sixdots@gmail.com",
    role: "系統管理員",
    status: "enabled",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUser((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (id: string, value: string) => {
     setUser((prev) => ({ ...prev, [id]: value }));
  }

  return (
    <div className="space-y-6">
       <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/Manager/users">
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">編輯帳號</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>帳號資訊</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">使用者名稱</Label>
              <Input id="name" value={user.name} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">帳號 (電子郵件)</Label>
              <Input id="email" type="email" value={user.email} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">角色</Label>
              <Select value={user.role} onValueChange={(value) => handleSelectChange('role', value)}>
                <SelectTrigger id="role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="系統管理員">系統管理員</SelectItem>
                  <SelectItem value="業務">業務</SelectItem>
                  <SelectItem value="財務">財務</SelectItem>
                  <SelectItem value="一般使用者">一般使用者</SelectItem>
                </SelectContent>
              </Select>
            </div>
             <div className="space-y-2">
              <Label htmlFor="status">狀態</Label>
              <Select value={user.status} onValueChange={(value) => handleSelectChange('status', value)}>
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="enabled">啟用</SelectItem>
                  <SelectItem value="disabled">停用</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">新密碼</Label>
              <Input id="password" type="password" value={user.password} onChange={handleInputChange} placeholder="若不變更請留白"/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">確認新密碼</Label>
              <Input id="confirmPassword" type="password" value={user.confirmPassword} onChange={handleInputChange} placeholder="請再次輸入新密碼"/>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-center gap-4">
        <Button variant="outline" asChild>
            <Link href="/Manager/users">取消</Link>
        </Button>
        <Button>儲存</Button>
      </div>
    </div>
  );
}
    