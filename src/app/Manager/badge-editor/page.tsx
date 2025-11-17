"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save } from "lucide-react";

export default function BadgeEditorPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">編輯識別證</h1>
        <Button className="bg-green-500 text-white hover:bg-green-600">
          <Save className="mr-2 h-4 w-4" />
          儲存
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>識別證設計</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-96 border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground">識別證預覽區域</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
