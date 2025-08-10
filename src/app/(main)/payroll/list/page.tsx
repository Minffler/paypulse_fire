import { PayrollTable } from "@/components/payroll/PayrollTable";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function PayrollListPage() {
  return (
    <div className="space-y-6">
       <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
                <FileText className="h-7 w-7"/>
                급여대장 목록
            </h1>
            <p className="text-muted-foreground">월별 급여대장을 확인하고 관리합니다.</p>
        </div>
      <Card>
        <CardHeader>
          <CardTitle>2024년 7월 급여대장</CardTitle>
          <CardDescription>
            총 152명의 급여 정보가 포함되어 있습니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PayrollTable />
        </CardContent>
      </Card>
    </div>
  );
}
