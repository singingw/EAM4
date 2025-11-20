
"use client";

import { useState } from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const { toast } = useToast();

  const handleConfirm = () => {
    onConfirm(picked, 0, item.quantity - picked);
  };

  const handleNumberChange = (value: string) => {
    const num = parseInt(value, 10);
    if (!isNaN(num)) {
      setPicked(num);
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
        <div className="space-y-2">
            <Label htmlFor="picked-qty">撿貨數量</Label>
             <Select onValueChange={handleNumberChange} defaultValue={String(picked)}>
                <SelectTrigger id="picked-qty">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {Array.from({ length: item.quantity }, (_, i) => i + 1).map(num => (
                        <SelectItem key={num} value={String(num)}>{num}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
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
