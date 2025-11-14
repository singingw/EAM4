"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, Percent, Clock, FileText } from "lucide-react";
import { useState, useEffect } from "react";
import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from "recharts";
import {
  ChartContainer,
} from "@/components/ui/chart";

export default function ManagerPage() {
  const [stats, setStats] = useState({
    activityName: "日本宇治茶道體驗",
    checkIns: 890,
    totalParticipants: 1200,
    activityTime: "2024/08/15 14:00 - 16:00",
    activityLocation: "台北市信義區信義路五段7號 (台北101)",
    activityDescription: "本次活動旨在讓參與者深入體驗日本宇治茶道的精髓。我們將邀請專業的茶道老師，從茶葉的選擇、沖泡的技巧，到品茗的禮儀，進行詳盡的解說與示範。參與者不僅能品嚐到最正宗的宇治抹茶，還能親手體驗打抹茶的樂趣。",
  });

  const [checkInRate, setCheckInRate] = useState(0);

  useEffect(() => {
    if (stats.totalParticipants > 0) {
      const rate = (stats.checkIns / stats.totalParticipants) * 100;
      setCheckInRate(rate);
    }
  }, [stats]);

  const chartData = [{ name: 'check-in', value: checkInRate, fill: "hsl(var(--primary))" }];
  const chartConfig = {
    value: {
      label: "報到率",
    },
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-center mb-6">
        <h1 className="text-5xl font-bold text-foreground">
          {stats.activityName}
        </h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
          <Card className="bg-white/80 dark:bg-slate-900/80">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                活動資訊
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-base">
              <div className="flex items-center gap-4">
                <p className="font-semibold w-16 shrink-0">時間:</p>
                <p>{stats.activityTime}</p>
              </div>
              <div className="flex items-center gap-4">
                <p className="font-semibold w-16 shrink-0">地點:</p>
                <p>{stats.activityLocation}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 dark:bg-slate-900/80">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                活動說明
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base leading-relaxed">{stats.activityDescription}</p>
            </CardContent>
          </Card>
        </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-white/80 dark:bg-slate-900/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">總參加人數</CardTitle>
            <div className="p-2 bg-blue-100 rounded-md">
              <Users className="h-5 w-5 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{stats.totalParticipants}</div>
          </CardContent>
        </Card>
        <Card className="bg-white/80 dark:bg-slate-900/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">報到總人數</CardTitle>
            <div className="p-2 bg-green-100 rounded-md">
              <UserCheck className="h-5 w-5 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{stats.checkIns}</div>
          </CardContent>
        </Card>
        <Card className="bg-white/80 dark:bg-slate-900/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">報到率</CardTitle>
             <div className="p-2 bg-primary/20 rounded-md">
                <Percent className="h-5 w-5 text-primary" />
              </div>
          </CardHeader>
          <CardContent className="h-[120px] flex items-center justify-center">
            <ChartContainer
              config={chartConfig}
              className="w-full h-full aspect-square"
            >
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  data={chartData}
                  innerRadius="88%"
                  outerRadius="100%"
                  startAngle={90}
                  endAngle={450}
                  barSize={10}
                >
                  <PolarAngleAxis
                    type="number"
                    domain={[0, 100]}
                    angleAxisId={0}
                    tick={false}
                  />
                  <RadialBar
                    background={{ fill: 'hsl(var(--muted))' }}
                    dataKey="value"
                    cornerRadius={10}
                  />
                   <g>
                    <text
                      x="50%"
                      y="50%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="fill-foreground text-2xl font-bold"
                    >
                      {checkInRate.toFixed(1)}%
                    </text>
                  </g>
                </RadialBarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
