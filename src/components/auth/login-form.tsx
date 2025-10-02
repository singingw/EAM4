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
import { LoginSchema } from "@/lib/schemas";
import { useToast } from "@/hooks/use-toast";

export function LoginForm() {
  const [isPending, setIsPending] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setIsPending(true);
    // Simulate API call
    setTimeout(() => {
      console.log(values);
      toast({
        title: "Login Successful",
        description: "Welcome back!",
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
                <FormLabel>帳號</FormLabel>
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>密碼</FormLabel>
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
        <div className="flex items-center justify-between">
           <Button
              size="sm"
              variant="link"
              asChild
              className="px-0 font-normal text-primary"
            >
              <Link href="/forgot-password">忘記密碼?</Link>
            </Button>
        </div>
        <Button disabled={isPending} type="submit" className="w-full">
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          登入
        </Button>
      </form>
    </Form>
  );
}
