
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Copy, Trash2, Pencil, Printer } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { PrintBadgeDialog } from "@/components/manager/print-badge-dialog";

const templates = [
  {
    id: "1",
    name: "標準模板",
    imageUrl: "https://placehold.co/227x302/png?text=Template+1",
  },
  {
    id: "2",
    name: "VIP 模板",
    imageUrl: "https://placehold.co/227x302/png?text=Template+2",
  },
  {
    id: "3",
    name: "工作人員模板",
    imageUrl: "https://placehold.co/227x302/png?text=Template+3",
  },
  {
    id: "4",
    name: "講者模板",
    imageUrl: "https://placehold.co/227x302/png?text=Template+4",
  },
];

export default function BadgeTemplatesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">識別證模板</h1>
        <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <Printer className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <PrintBadgeDialog templates={templates} />
            </Dialog>
            <Button asChild className="bg-blue-500 text-white hover:bg-blue-600">
              <Link href="/Manager/badge-design">
                <Plus className="mr-2 h-4 w-4" />
                新增模板
              </Link>
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {templates.map((template) => (
          <Card key={template.id} className="group relative overflow-hidden">
            <CardContent className="p-0">
              <Image
                src={template.imageUrl}
                alt={template.name}
                width={227}
                height={302}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button asChild variant="ghost" size="icon" className="text-white hover:bg-white/20 hover:text-white">
                  <Link href="/Manager/badge-design">
                    <Pencil className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 hover:text-white">
                  <Copy className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 hover:text-white">
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            </CardContent>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                <h3 className="text-sm font-semibold text-white truncate">{template.name}</h3>
            </div>
          </Card>
        ))}
      </div>
      <div className="p-4 border-t flex justify-between items-center">
            <p className="text-sm text-muted-foreground whitespace-nowrap">顯示第 1 至 4 項結果，共 4 項</p>
            <Pagination>
                <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#" isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationNext href="#" />
                </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    </div>
  );
}
