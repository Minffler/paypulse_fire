"use client"

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"

const data = [
  { month: "1월", total: 45000 },
  { month: "2월", total: 46200 },
  { month: "3월", total: 47100 },
  { month: "4월", total: 48000 },
  { month: "5월", total: 49500 },
  { month: "6월", total: 51000 },
  { month: "7월", total: 50500 },
  { month: "8월", total: 52300 },
  { month: "9월", total: 53100 },
  { month: "10월", total: 54000 },
  { month: "11월", total: 55500 },
  { month: "12월", total: 58000 },
];

const chartConfig = {
  total: {
    label: "Total",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function MonthlyCostChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>월별 총 인건비</CardTitle>
        <CardDescription>지난 12개월간의 인건비 추이입니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
            <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} tickFormatter={(value) => `${value / 1000}k`} />
            <Tooltip
                cursor={{ stroke: 'hsl(var(--border))', strokeWidth: 2, strokeDasharray: '3 3' }}
                content={<ChartTooltipContent indicator="dot" />}
            />
            <Line type="monotone" dataKey="total" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, fill: 'hsl(var(--primary))' }} activeDot={{ r: 8 }} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
