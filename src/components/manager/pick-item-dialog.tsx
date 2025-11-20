
"use client";

import { useState, useEffect } from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

type PickItemDialogProps = {
  item: {
    id: string;
    name: string;
    quantity: number;
  };
  onConfirm: (picked: number, substitute: number, outOfStock: number) => void;
};

export function PickItemDialog({ item, onConfirm }: PickItemDialogProps) {
  const [picked, setPicked] = useState(item.quantity);
  const [substitute, setSubstitute] = useState(0);
  const [outOfStock, setOutOfStock] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const total = picked + substitute + outOfStock;
    if (total > item.quantity) {
      // If user increases a value, decrease 'picked' first.
      const diff = total - item.quantity;
      setPicked(Math.max(0, picked - diff));
    }
  }, [picked, substitute, outOfStock, item.quantity]);


  const handleConfirm = () => {
    const total = picked + substitute + outOfStock;
    if (total !== item.quantity) {
      toast({
        variant: "destructive",
        title: "數量錯誤",
        description: `總數量 (${total}) 必須等於原始數量 (${item.quantity})。`,
      });
      return;
    }
    onConfirm(picked, substitute, outOfStock);
    // You might want to close the dialog here. The parent component can control the `open` state.
  };

  const handleNumberChange = (setter: React.Dispatch<React.SetStateAction<number>>, value: string) => {
    const num = parseInt(value, 10);
    if (!isNaN(num) && num >= 0) {
      setter(num);
    } else if (value === '') {
      setter(0);
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>撿貨: {item.name}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <p className="text-sm text-muted-foreground">
          總數量: {item.quantity}
        </p>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="picked-qty">撿貨數量</Label>
            <Input
              id="picked-qty"
              type="number"
              value={picked}
              onChange={(e) => handleNumberChange(setPicked, e.target.value)}
              min="0"
              max={item.quantity}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="substitute-qty">替代品數量</Label>
            <Input
              id="substitute-qty"
              type="number"
              value={substitute}
              onChange={(e) => handleNumberChange(setSubstitute, e.target.value)}
              min="0"
              max={item.quantity}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="outofstock-qty">缺貨數量</Label>
            <Input
              id="outofstock-qty"
              type="number"
              value={outOfStock}
              onChange={(e) => handleNumberChange(setOutOfStock, e.target.value)}
              min="0"
              max={item.quantity}
            />
          </div>
        </div>
         <p className="text-sm font-medium text-right">
            剩餘未分配: {item.quantity - (picked + substitute + outOfStock)}
        </p>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline">
            取消
          </Button>
        </DialogClose>
        <Button type="button" onClick={handleConfirm}>
          確認
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
