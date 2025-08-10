"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"

const data = [
  { name: "엔지니어링", "인원": 40, "평균급여": 7500 },
  { name: "디자인", "인원": 15, "평균급여": 6800 },
  { name: "마케팅", "인원": 25, "평균급여": 6500 },
  { name: "영업", "인원": 30, "평균급여": 7200 },
  { name: "인사", "인원": 10, "평균급여": 6000 },
  { name: "재무", "인원": 12, "평균급여": 7100 },
]

const chartConfig = {
  "인원": {
    label: "인원 (명)",
    color: "hsl(var(--chart-1))",
  },
  "평균급여": {
    label: "평균급여 (만원)",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function DepartmentDistributionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>부서별 인원/평균급여</CardTitle>
        <CardDescription>현재 활성 인력 기준입니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
            <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--primary))" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
            <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--accent))" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
            <Tooltip
              cursor={{ fill: "hsla(var(--muted), 0.5)" }}
              content={<ChartTooltipContent />}
            />
            <Legend />
            <Bar yAxisId="left" dataKey="인원" fill="hsl(var(--primary))" name="인원 (명)" radius={[4, 4, 0, 0]} />
            <Bar yAxisId="right" dataKey="평균급여" fill="hsl(var(--accent))" name="평균급여 (만원)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
