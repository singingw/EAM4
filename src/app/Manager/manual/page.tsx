import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Settings, Share2, Users, UserCog, ShieldCheck } from "lucide-react";

export default function ManualPage() {
  return (
    <div className="bg-muted/30 min-h-screen">
      <div className="container mx-auto py-8 lg:py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-primary tracking-tight">系統操作手冊</h1>
          <p className="mt-2 text-lg text-muted-foreground">您的後台管理系統使用指南</p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <aside className="md:col-span-1 md:sticky top-8 self-start">
                <Card>
                    <CardHeader>
                        <CardTitle>目錄</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            <li><a href="#system-management" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"><Settings className="h-4 w-4" /> 系統管理</a></li>
                            <li><a href="#permission-management" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"><Share2 className="h-4 w-4" /> 權限管理</a></li>
                        </ul>
                    </CardContent>
                </Card>
            </aside>

            <main className="md:col-span-3">
                <ScrollArea className="h-[calc(100vh-10rem)]">
                    <div className="space-y-12 pr-4">
                        <section id="system-management">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-3 text-2xl"><Settings className="h-6 w-6 text-primary" />系統管理</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div>
                                        <h3 className="font-semibold text-lg flex items-center gap-2"><UserCog className="h-5 w-5"/> 系統功能管理</h3>
                                        <p className="text-muted-foreground mt-1">此區塊允許您啟用或停用系統的各項核心功能。您可以根據活動需求，客製化後台提供的服務。</p>
                                        <ul className="list-disc list-inside mt-2 space-y-1">
                                            <li><span className="font-semibold">標題:</span> 功能的顯示名稱。</li>
                                            <li><span className="font-semibold">狀態:</span> 透過切換開關來「啟用」或「停用」該功能。</li>
                                            <li><span className="font-semibold">功能按鈕:</span> 提供編輯、刪除、檢視等快速操作。</li>
                                        </ul>
                                    </div>
                                    <Separator />
                                    <div>
                                        <h3 className="font-semibold text-lg flex items-center gap-2"><Users className="h-5 w-5"/> 後台選單管理</h3>
                                        <p className="text-muted-foreground mt-1">您可以自訂後台側邊欄的選單結構，調整選單項目的顯示、順序與層級，以符合您的管理習慣。</p>
                                        <ul className="list-disc list-inside mt-2 space-y-1">
                                            <li><span className="font-semibold">新增:</span> 點擊右上角的「新增」按鈕來建立新的選單項目。</li>
                                            <li><span className="font-semibold">編輯/刪除:</span> 對現有的選單項目進行修改或移除。</li>
                                            <li><span className="font-semibold">狀態管理:</span> 同樣可以「啟用」或「停用」特定的選單，停用後將不會顯示於側邊欄。</li>
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>
                        </section>

                        <section id="permission-management">
                             <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-3 text-2xl"><Share2 className="h-6 w-6 text-primary" />權限管理</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div>
                                        <h3 className="font-semibold text-lg flex items-center gap-2"><Users className="h-5 w-5"/> 後台帳號管理</h3>
                                        <p className="text-muted-foreground mt-1">管理所有可以登入後台系統的使用者帳號。您可以新增、編輯或停用使用者。</p>
                                         <ul className="list-disc list-inside mt-2 space-y-1">
                                            <li><span className="font-semibold">新增/匯入:</span> 透過「新增」按鈕手動建立單一帳號，或使用「匯入」功能批次建立多個帳號。</li>
                                            <li><span className="font-semibold">查詢與匯出:</span> 使用上方的篩選器快速找到特定帳號，並可將列表匯出為檔案。</li>
                                            <li><span className="font-semibold">狀態控制:</span> 可將帳號設為「啟用」或「停用」，停用後的帳號將無法登入系統。</li>
                                        </ul>
                                    </div>
                                    <Separator />
                                    <div>
                                        <h3 className="font-semibold text-lg flex items-center gap-2"><ShieldCheck className="h-5 w-5"/> 角色管理</h3>
                                        <p className="text-muted-foreground mt-1">透過角色來定義一組權限，並將角色指派給使用者。這讓權限管理更加系統化且有效率。</p>
                                        <ul className="list-disc list-inside mt-2 space-y-1">
                                            <li><span className="font-semibold">新增角色:</span> 建立新的角色，例如「活動小幫手」、「財務人員」等。</li>
                                            <li><span className="font-semibold">權限分配:</span> 為每個角色勾選其可存取的功能模組，例如「名單管理」、「報價單管理」等。</li>
                                            <li><span className="font-semibold">指派給使用者:</span> 在「後台帳號管理」頁面，您可以為每一位使用者指派一個或多個角色。</li>
                                        </ul>
                                    </div>
                                </CardContent>
                            </Card>
                        </section>
                    </div>
                </ScrollArea>
            </main>
        </div>
      </div>
    </div>
  );
}
