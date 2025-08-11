
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

type KpiCardProps = {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: number;
  trendLabel?: string;
  previousValue?: string;
  currentPeriodLabel?: string;
  previousPeriodLabel?: string;
};

export function KpiCard({ 
  title, 
  value, 
  icon, 
  trend, 
  trendLabel = "지난달 대비", 
  previousValue,
  currentPeriodLabel = "이번 달",
  previousPeriodLabel = "지난 달"
}: KpiCardProps) {
  const [open, setOpen] = useState(false);
  const isPositive = trend >= 0;

  const CardContentComponent = (
     <Card className="transition-all hover:shadow-md cursor-pointer">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground flex items-center">
            <span className={cn("mr-1", isPositive ? "text-green-600" : "text-red-600")}>
                {isPositive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
            </span>
            <span className={cn("font-semibold", isPositive ? "text-green-600" : "text-red-600")}>
                {isPositive ? '+' : ''}{trend.toFixed(1)}%
            </span>
            <span className="ml-1">{trendLabel}</span>
        </p>
      </CardContent>
    </Card>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {CardContentComponent}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title} 상세</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">{previousPeriodLabel}</p>
                    <p className="text-2xl font-bold">{previousValue}</p>
                </div>
                 <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">{currentPeriodLabel}</p>
                    <p className="text-2xl font-bold">{value}</p>
                </div>
            </div>
            <div className="flex items-center justify-center text-center p-4 border rounded-lg">
                <p className="text-sm text-muted-foreground">{trendLabel}</p>
                <p className={cn("ml-2 font-bold", isPositive ? "text-green-600" : "text-red-600")}>
                    {isPositive ? '+' : ''}{trend.toFixed(1)}%
                </p>
                 <span className={cn("ml-1", isPositive ? "text-green-600" : "text-red-600")}>
                    {isPositive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                </span>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
