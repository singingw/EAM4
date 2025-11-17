"use client";

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight } from "lucide-react";

const StepCard = ({ title, imageUrl, imageHint, description }: { title: string; imageUrl: string; imageHint: string; description?: string; }) => (
  <div className="flex-1 flex flex-col items-center text-center">
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700 h-full flex flex-col justify-start">
        <h3 className="font-semibold text-foreground mb-2">{title}</h3>
        <div className="relative aspect-video w-3/4 mx-auto mb-2">
            <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-contain"
            data-ai-hint={imageHint}
            />
        </div>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
    </div>
  </div>
);


export function BadgePrintingInstructionsDialog() {
    const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id) || { imageUrl: 'https://picsum.photos/seed/placeholder/200/200', imageHint: 'placeholder', id: '', description: '' };

    return (
    <DialogContent className="max-w-4xl">
      <DialogHeader>
        <DialogTitle className="text-center text-xl sm:text-2xl">識別證印製說明</DialogTitle>
      </DialogHeader>
      <div className="space-y-8 py-4">
        <div className="space-y-4">
            <div className="bg-primary/90 text-primary-foreground rounded-md px-4 py-2 text-center font-semibold">
                ▶ 識別證印製流程
            </div>
            <div className="flex flex-col sm:flex-row items-stretch justify-center gap-4 sm:gap-2">
                <StepCard
                    title="1. 點擊頂部列印按鈕"
                    imageUrl={getImage('print-button-click').imageUrl}
                    imageHint={getImage('print-button-click').imageHint}
                    description="在識別證模板頁面，點擊右上方的印表機圖示按鈕。"
                />
                <div className="flex items-center">
                    <ArrowRight className="h-8 w-8 text-muted-foreground shrink-0 my-4 sm:my-0 rotate-90 sm:rotate-0" />
                </div>
                <StepCard
                    title="2. 選擇模板與顏色"
                    imageUrl={getImage('print-options').imageUrl}
                    imageHint={getImage('print-options').imageHint}
                    description="在彈出的對話框中，選擇您要使用的識別證模板，並選擇彩色列印或黑白列印。"
                />
                 <div className="flex items-center">
                    <ArrowRight className="h-8 w-8 text-muted-foreground shrink-0 my-4 sm:my-0 rotate-90 sm:rotate-0" />
                </div>
                <StepCard
                    title="3. 點擊列印"
                    imageUrl={getImage('print-dialog-action').imageUrl}
                    imageHint={getImage('print-dialog-action').imageHint}
                    description="設定完成後，點擊對話框右下角的「列印」按鈕。"
                />
                 <div className="flex items-center">
                    <ArrowRight className="h-8 w-8 text-muted-foreground shrink-0 my-4 sm:my-0 rotate-90 sm:rotate-0" />
                </div>
                 <StepCard
                    title="4. 開始列印"
                    imageUrl={getImage('printer-printing').imageUrl}
                    imageHint={getImage('printer-printing').imageHint}
                    description="系統將會產生列印預覽，確認無誤後即可開始列印您的識別證。"
                />
            </div>
        </div>
      </div>
      <DialogFooter className="sm:justify-center">
        <DialogClose asChild>
          <Button type="button" variant="outline">
            關閉
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
