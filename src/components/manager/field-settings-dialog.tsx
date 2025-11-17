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
import { Input } from "@/components/ui/input";
import { Lock, Settings, Trash2, PlusCircle } from "lucide-react";

type Field = {
  id: number;
  name: string;
  isLocked: boolean;
  isCustom: boolean;
};

const initialFields: Field[] = [
  { id: 1, name: "ID", isLocked: true, isCustom: false },
  { id: 2, name: "姓名", isLocked: true, isCustom: false },
  { id: 3, name: "信箱", isLocked: true, isCustom: false },
  { id: 4, name: "手機", isLocked: true, isCustom: false },
  { id: 5, name: "", isLocked: false, isCustom: true },
];

export function FieldSettingsDialog() {
  const [fields, setFields] = useState<Field[]>(initialFields);

  const handleAddField = () => {
    const newId = fields.length > 0 ? Math.max(...fields.map(f => f.id)) + 1 : 1;
    setFields([...fields, { id: newId, name: "", isLocked: false, isCustom: true }]);
  };

  const handleRemoveField = (id: number) => {
    setFields(fields.filter((field) => field.id !== id));
  };
  
  const handleFieldNameChange = (id: number, newName: string) => {
    setFields(fields.map(field => field.id === id ? { ...field, name: newName } : field));
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>欄位設定</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="space-y-3">
          {fields.map((field) => (
            <div key={field.id} className="flex items-center gap-2">
              {field.isLocked ? (
                <Lock className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-transparent" onClick={() => handleRemoveField(field.id)}>
                    <Trash2 className="h-4 w-4" />
                </Button>
              )}
              <Input 
                value={field.name} 
                onChange={(e) => handleFieldNameChange(field.id, e.target.value)}
                readOnly={field.isLocked}
                className={field.isLocked ? "bg-muted/50 cursor-not-allowed" : ""}
              />
              {!field.isLocked && (
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Settings className="h-4 w-4" />
                </Button>
              )}
               {field.isLocked && (
                 <div className="w-8 h-8"/> // Placeholder for alignment
               )}
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center justify-center gap-2 text-center">
            <Button variant="ghost" size="icon" onClick={handleAddField} className="rounded-full h-9 w-9">
                <PlusCircle className="h-6 w-6" />
            </Button>
            <p className="text-sm text-muted-foreground">總數: {fields.length}</p>
        </div>
      </div>
      <DialogFooter className="justify-end">
        <DialogClose asChild>
          <Button type="button" variant="outline">
            關閉
          </Button>
        </DialogClose>
        <Button type="submit">更新</Button>
      </DialogFooter>
    </DialogContent>
  );
}
