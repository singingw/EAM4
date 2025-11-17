
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Save, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditAttendeeSchema } from "@/lib/schemas";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export function EditAttendeeForm() {
  const [isPending, setIsPending] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  // In a real app, you would fetch the attendee data here based on an ID.
  const [attendee, setAttendee] = useState({
    name: "陳曉明",
    email: "chen.hm@example.com",
    phone: "0912-345-678",
  });

  const form = useForm<z.infer<typeof EditAttendeeSchema>>({
    resolver: zodResolver(EditAttendeeSchema),
    defaultValues: attendee,
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const onSubmit = (values: z.infer<typeof EditAttendeeSchema>) => {
    setIsPending(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Updated values:", values);
      toast({
        title: "參加者已更新",
        description: `${values.name} 的資料已成功更新。`,
      });
      setIsPending(false);
      router.push('/Manager/attendees');
    }, 1000);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">編輯參加者</h1>
        <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
                <Link href="/Manager/attendees">
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
                        <Label>姓名</Label>
                        <FormControl>
                        <Input
                            {...field}
                            disabled={isPending}
                            placeholder="請輸入姓名"
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                    <FormItem>
                        <Label>Email</Label>
                        <FormControl>
                        <Input
                            {...field}
                            disabled={isPending}
                            placeholder="請輸入Email"
                            type="email"
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                    <FormItem>
                        <Label>手機</Label>
                        <FormControl>
                        <Input
                            {...field}
                            disabled={isPending}
                            placeholder="請輸入手機號碼"
                            type="tel"
                        />
                        </FormControl>
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
