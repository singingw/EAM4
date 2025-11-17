
"use client";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Template = {
    id: string;
    name: string;
    imageUrl: string;
}

type PrintBadgeDialogProps = {
    templates: Template[];
}

export function PrintBadgeDialog({ templates }: PrintBadgeDialogProps) {
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>列印選項</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="space-y-2">
            <Label htmlFor="template">選擇模板</Label>
            <Select>
                <SelectTrigger id="template">
                    <SelectValue placeholder="請選擇一個模板" />
                </SelectTrigger>
                <SelectContent>
                    {templates.map(template => (
                        <SelectItem key={template.id} value={template.id}>{template.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
        <div className="space-y-2">
            <Label>列印顏色</Label>
            <RadioGroup defaultValue="color" className="flex items-center gap-4">
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="color" id="color" />
                    <Label htmlFor="color" className="font-normal">彩色</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bw" id="bw" />
                    <Label htmlFor="bw" className="font-normal">黑白</Label>
                </div>
            </RadioGroup>
        </div>
      </div>
      <DialogFooter className="justify-end">
        <DialogClose asChild>
          <Button type="button" variant="outline">
            取消
          </Button>
        </DialogClose>
        <Button type="submit">列印</Button>
      </DialogFooter>
    </DialogContent>
  );
}
