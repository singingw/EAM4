"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, Percent } from "lucide-react";
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
                  innerRadius="80%"
                  outerRadius="100%"
                  startAngle={90}
                  endAngle={450}
                  barSize={12}
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
                      className="fill-foreground text-3xl font-bold"
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
