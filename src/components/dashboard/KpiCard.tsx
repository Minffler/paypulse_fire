import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

type KpiCardProps = {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: number;
  trendLabel?: string;
  href?: string;
};

export function KpiCard({ title, value, icon, trend, trendLabel = "지난달 대비", href }: KpiCardProps) {
  const isPositive = trend >= 0;

  const CardContentComponent = (
     <Card className="transition-all hover:shadow-md">
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
                {isPositive ? '+' : ''}{trend.toFixed(2)}%
            </span>
            <span className="ml-1">{trendLabel}</span>
        </p>
      </CardContent>
    </Card>
  );

  if (href) {
    return (
      <Link href={href}>
        {CardContentComponent}
      </Link>
    );
  }

  return CardContentComponent;
}
