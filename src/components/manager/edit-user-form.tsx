
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { RefreshCw, Save, X, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

const allRoles = ["系統管理員", "業務", "財務", "一般使用者"];

export function EditUserForm() {
  const router = useRouter();

  // In a real app, you would fetch user data based on an ID
  const [user, setUser] = useState({
    name: "Max",
    email: "max.sixdots@gmail.com",
    roles: ["系統管理員"],
    status: "enabled",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUser((prev) => ({ ...prev, [id]: value }));
  };

  const handleStatusChange = (value: string) => {
     setUser((prev) => ({ ...prev, status: value }));
  }

  const toggleRole = (role: string) => {
    setUser((prev) => {
      const roles = prev.roles.includes(role)
        ? prev.roles.filter((r) => r !== role)
        : [...prev.roles, role];
      return { ...prev, roles };
    });
  };
  
  const handleSave = () => {
    // Logic to save the user data
    console.log("Saving user:", user);
    router.push("/Manager/users");
  };

  return (
    <div className="space-y-4">
       <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">編輯使用者</h1>
        <div className="flex items-center gap-2">
            <Button variant="outline" className="bg-gray-500 text-white hover:bg-gray-600" asChild>
                <Link href="/Manager/users">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    返回列表
                </Link>
            </Button>
            <Button className="bg-green-500 text-white hover:bg-green-600" onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                儲存
            </Button>
        </div>
      </div>

      <Card>
        <CardContent className="space-y-6 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">使用者名稱</Label>
              <Input id="name" value={user.name} onChange={handleInputChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">帳號 / 電子郵件</Label>
              <Input id="email" type="email" value={user.email} onChange={handleInputChange} />
            </div>
             <div className="space-y-2">
              <Label htmlFor="status">狀態</Label>
              <Select value={user.status} onValueChange={handleStatusChange}>
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
              <Label htmlFor="roles">角色</Label>
              <Popover>
                <PopoverTrigger asChild>
                    <div className="flex min-h-10 w-full items-center gap-2 rounded-md border border-input bg-transparent px-3 py-2 text-sm flex-wrap">
                        {user.roles.length > 0 ? user.roles.map(role => (
                            <Badge key={role} variant="secondary" className="font-normal bg-gray-200 text-gray-800">
                                {role}
                                <button onClick={(e) => { e.stopPropagation(); toggleRole(role); }} className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2">
                                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                                </button>
                            </Badge>
                        )) : <span className="text-muted-foreground">請點擊以選擇角色</span>}
                    </div>
                </PopoverTrigger>
                <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                    <Command>
                        <CommandInput placeholder="搜尋角色..." />
                        <CommandList>
                            <CommandEmpty>找不到角色</CommandEmpty>
                            <CommandGroup>
                                {allRoles.map(role => (
                                    <CommandItem
                                        key={role}
                                        onSelect={() => toggleRole(role)}
                                        className="flex items-center justify-between"
                                    >
                                        <span>{role}</span>
                                        {user.roles.includes(role) && <Check className="h-4 w-4" />}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>
      
    </div>
  );
}
