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

const StepCard = ({ title, imageUrl, imageHint, description, annotation, period }: { title: string; imageUrl: string; imageHint: string; description?: string; annotation?: string, period: string }) => (
  <div className="flex-1 flex flex-col items-center text-center">
    <div className="relative w-full">
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-xs font-semibold text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600">
        {period}
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 pt-8 border border-gray-200 dark:border-gray-700 h-full flex flex-col justify-between">
        <div>
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
        {annotation && <p className="text-xs text-muted-foreground/80 mt-2">{annotation}</p>}
      </div>
    </div>
  </div>
);


export function CheckInInstructionsDialog() {
    const getImage = (id: string) => PlaceHolderImages.find(img => img.id === id) || { imageUrl: 'https://picsum.photos/seed/placeholder/200/200', imageHint: 'placeholder', id: '', description: '' };

    return (
    <DialogContent className="max-w-4xl">
      <DialogHeader>
        <DialogTitle className="text-center text-xl sm:text-2xl">使用工作人員手機掃描來賓 QR Code 報到</DialogTitle>
      </DialogHeader>
      <div className="space-y-8 py-4">
        {/* Staff Flow */}
        <div className="space-y-4">
            <div className="bg-primary/90 text-primary-foreground rounded-md px-4 py-2 text-center font-semibold">
                ▶ 工作人員持手機掃描來賓 QR Code 報到流程
            </div>
            <div className="flex flex-col sm:flex-row items-stretch justify-center gap-4 sm:gap-2">
                <StepCard
                    period="活動前"
                    title="拿起你的手機掃描下方 QR Code 進入【活動執行頁】"
                    imageUrl={getImage('staff-scan-qr').imageUrl}
                    imageHint={getImage('staff-scan-qr').imageHint}
                    annotation="(若掃描失敗，請由此網址進入)"
                />
                <div className="flex items-center">
                    <ArrowRight className="h-8 w-8 text-muted-foreground shrink-0 my-4 sm:my-0 rotate-90 sm:rotate-0" />
                </div>
                <StepCard
                    period="活動前"
                    title="輸入啟動碼登入【活動執行頁】"
                    imageUrl={getImage('staff-login').imageUrl}
                    imageHint={getImage('staff-login').imageHint}
                    annotation="(登入後記得開啟手機攝影機權限)"
                />
                 <div className="flex items-center">
                    <ArrowRight className="h-8 w-8 text-muted-foreground shrink-0 my-4 sm:my-0 rotate-90 sm:rotate-0" />
                </div>
                <StepCard
                    period="活動中"
                    title="掃描來賓 QR Code"
                    imageUrl={getImage('staff-scan-guest').imageUrl}
                    imageHint={getImage('staff-scan-guest').imageHint}
                />
            </div>
        </div>

        {/* Guest Flow */}
        <div className="space-y-4">
            <div className="bg-primary/90 text-primary-foreground rounded-md px-4 py-2 text-center font-semibold">
                ▶ 來賓報到流程
            </div>
            <div className="flex flex-col sm:flex-row items-stretch justify-center gap-4 sm:gap-2">
                 <StepCard
                    period="活動中"
                    title="來賓出示 QR Code"
                    imageUrl={getImage('guest-show-qr').imageUrl}
                    imageHint={getImage('guest-show-qr').imageHint}
                />
                 <div className="flex items-center">
                    <ArrowRight className="h-8 w-8 text-muted-foreground shrink-0 my-4 sm:my-0 rotate-90 sm:rotate-0" />
                </div>
                <StepCard
                    period="活動中"
                    title="工作人員使用手機掃描來賓 QR Code"
                    imageUrl={getImage('staff-scanning-guest-qr').imageUrl}
                    imageHint={getImage('staff-scanning-guest-qr').imageHint}
                />
                 <div className="flex items-center">
                    <ArrowRight className="h-8 w-8 text-muted-foreground shrink-0 my-4 sm:my-0 rotate-90 sm:rotate-0" />
                </div>
                <div className="flex-1 flex flex-col justify-end">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700 text-center">
                        <h3 className="font-semibold text-foreground">來賓報到成功入場</h3>
                    </div>
                </div>
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
