"use client";

import { useState } from "react";
import Link from "next/link";
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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ForgotPasswordSchema } from "@/lib/schemas";
import { useToast } from "@/hooks/use-toast";

export function ForgotPasswordForm() {
  const [isPending, setIsPending] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ForgotPasswordSchema>) => {
    setIsPending(true);
    // Simulate API call
    setTimeout(() => {
      console.log(values);
      toast({
        title: "Check Your Email",
        description: "A password reset link has been sent to your email address.",
      });
      setIsPending(false);
    }, 2000);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>帳號 / 電子郵件</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder=""
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center justify-between">
           <Button
              size="sm"
              variant="link"
              asChild
              className="px-0 font-normal text-primary"
            >
              <Link href="/Manager/Login">返回登入</Link>
            </Button>
        </div>
        <Button disabled={isPending} type="submit" className="w-full">
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          送出
        </Button>
      </form>
    </Form>
  );
}
