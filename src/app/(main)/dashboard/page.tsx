import { DepartmentDistributionChart } from "@/components/dashboard/DepartmentDistributionChart";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { MonthlyCostChart } from "@/components/dashboard/MonthlyCostChart";
import { RecentUploads } from "@/components/dashboard/RecentUploads";
import { Button } from "@/components/ui/button";
import { Users, DollarSign, Wallet, AlertCircle } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">대시보드</h1>
            <p className="text-muted-foreground">오늘의 인건비 현황을 요약합니다.</p>
        </div>
        <Button>급여 파일 업로드</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="총 인원"
          value="152 명"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
          trend={1.5}
          href="/payroll/list"
        />
        <KpiCard
          title="총 인건비 (월)"
          value="₩ 875,230,000"
          icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          trend={2.1}
           href="/payroll/list"
        />
        <KpiCard
          title="외주 월비용"
          value="₩ 56,800,000"
          icon={<Wallet className="h-4 w-4 text-muted-foreground" />}
          trend={-0.5}
           href="/outsourcing/list"
        />
        <KpiCard
          title="업로드 오류"
          value="3 건"
          icon={<AlertCircle className="h-4 w-4 text-muted-foreground" />}
          trend={-10.0}
          href="/payroll/upload"
        />
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <MonthlyCostChart />
          </div>
          <div className="lg:col-span-1">
             <RecentUploads />
          </div>
      </div>
      
      <div className="grid grid-cols-1">
        <DepartmentDistributionChart />
      </div>

    </div>
  );
}
