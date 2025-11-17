"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, Edit } from "lucide-react";

export default function BadgeEditorPage() {
  const [isEditing, setIsEditing] = useState(true);

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{isEditing ? "編輯識別證" : "預覽識別證"}</h1>
        <Button 
          className={isEditing ? "bg-green-500 text-white hover:bg-green-600" : "bg-blue-500 text-white hover:bg-blue-600"}
          onClick={handleToggleEdit}
        >
          {isEditing ? (
            <>
              <Save className="mr-2 h-4 w-4" />
              儲存
            </>
          ) : (
            <>
              <Edit className="mr-2 h-4 w-4" />
              編輯
            </>
          )}
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{isEditing ? "識別證設計" : "識別證預覽"}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-96 border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground">
              {isEditing ? "識別證設計區域" : "識別證預覽區域"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
