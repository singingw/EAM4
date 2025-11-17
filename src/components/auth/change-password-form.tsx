"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChangePasswordSchema } from "@/lib/schemas";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";

export function ChangePasswordForm() {
  const [isPending, setIsPending] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const onSubmit = (values: z.infer<typeof ChangePasswordSchema>) => {
    setIsPending(true);
    // Simulate API call
    setTimeout(() => {
      console.log(values);
      toast({
        title: "密碼已更新",
        description: "您的密碼已成功變更，請使用新密碼重新登入。",
      });
      setIsPending(false);
      router.push('/Manager/Login');
    }, 1000);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <Label>舊密碼</Label>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder=""
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <Label>新密碼</Label>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder=""
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <Label>確認新密碼</Label>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder=""
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center justify-end gap-2 pt-4">
            <Button variant="outline" type="button" onClick={() => router.back()}>
                取消
            </Button>
            <Button disabled={isPending} type="submit">
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                儲存
            </Button>
        </div>
      </form>
    </Form>
  );
}
