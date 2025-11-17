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
          {/* Add your badge design editing components here */}
        </div>
      ) : (
        <div>
          <p>預覽模式</p>
          {/* Add your badge preview components here */}
        </div>
      )}
    </div>
  );
}
