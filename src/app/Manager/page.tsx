
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Users, UserCheck, Percent } from "lucide-react";
import { useState, useEffect } from "react";

export default function ManagerPage() {
  const [stats, setStats] = useState({
    activityName: "2024 AI 開發者大會",
    checkIns: 890,
    totalParticipants: 1200,
  });

  const [checkInRate, setCheckInRate] = useState(0);

  useEffect(() => {
    if (stats.totalParticipants > 0) {
      setCheckInRate((stats.checkIns / stats.totalParticipants) * 100);
    }
  }, [stats]);


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">
          {stats.activityName}
        </h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">報到總人數</CardTitle>
            <UserCheck className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{stats.checkIns}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">總參加人數</CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{stats.totalParticipants}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">報到率</CardTitle>
            <Percent className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{checkInRate.toFixed(1)}%</div>
            <Progress value={checkInRate} className="mt-2 h-2" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
