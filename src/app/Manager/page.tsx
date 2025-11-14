
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { RadialBarChart, RadialBar, PolarGrid } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export default function ManagerPage() {
  const [stats, setStats] = useState({
    activityName: "日本宇治茶道體驗",
    checkIns: 890,
    totalParticipants: 1200,
  });

  const [checkInRate, setCheckInRate] = useState(0);

  useEffect(() => {
    if (stats.totalParticipants > 0) {
      setCheckInRate((stats.checkIns / stats.totalParticipants) * 100);
    }
  }, [stats]);

  const chartData = [{ name: "checkin", value: checkInRate, fill: "hsl(var(--primary))" }];

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex items-center justify-center mb-6">
        <h1 className="text-5xl font-bold text-foreground">
          {stats.activityName}
        </h1>
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
        <Card className="bg-white/80 dark:bg-slate-900/80 flex flex-col items-center justify-center">
          <CardHeader className="items-center pb-2">
            <CardTitle className="text-sm font-medium">報到率</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={{
                value: {
                  label: "報到率",
                  color: "hsl(var(--primary))",
                },
              }}
              className="mx-auto aspect-square h-full w-full"
            >
              <RadialBarChart
                data={chartData}
                startAngle={-90}
                endAngle={-450}
                innerRadius="80%"
                outerRadius="100%"
                barSize={12}
                cy="45%"
              >
                <PolarGrid
                  gridType="circle"
                  radialLines={false}
                  stroke="none"
                  className="fill-muted"
                />
                <RadialBar dataKey="value" background cornerRadius={5} />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <text
                  x="50%"
                  y="45%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-foreground text-3xl font-bold"
                >
                  {checkInRate.toFixed(1)}%
                </text>
              </RadialBarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

