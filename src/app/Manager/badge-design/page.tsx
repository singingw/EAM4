"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function BadgeDesignPage() {
  const [isEditing, setIsEditing] = useState(true);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">識別證設計</h1>
        {isEditing ? (
          <Button
            className="bg-green-500 text-white hover:bg-green-600"
            onClick={() => setIsEditing(false)}
          >
            儲存
          </Button>
        ) : (
          <Button
            variant="outline"
            className="bg-green-500 text-white hover:bg-green-600 hover:text-white"
            onClick={() => setIsEditing(true)}
          >
            編輯
          </Button>
        )}
      </div>

      {isEditing ? (
        <div>
          <p>編輯模式</p>
          <div className="mt-4 p-8 border-dashed border-2 border-gray-400 rounded-lg min-h-[400px] flex items-center justify-center">
            <p className="text-gray-500">識別證設計區</p>
          </div>
        </div>
      ) : (
        <div>
          <p>預覽模式</p>
          <div className="mt-4 p-8 border border-gray-300 rounded-lg min-h-[400px] flex items-center justify-center bg-gray-50">
             <p className="text-gray-500">識別證預覽</p>
          </div>
        </div>
      )}
    </div>
  );
}
