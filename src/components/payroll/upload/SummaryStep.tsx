import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, AlertCircle, ArrowRightCircle } from "lucide-react";

export function SummaryStep() {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">총 처리 건수</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">150 건</div>
          <p className="text-xs text-muted-foreground">파일에서 인식된 총 행 수</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">신규/업데이트</CardTitle>
          <ArrowRightCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">148 건</div>
          <p className="text-xs text-muted-foreground">삽입: 5 건 / 업데이트: 143 건</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">무시/오류</CardTitle>
          <AlertCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2 건</div>
          <p className="text-xs text-muted-foreground">처리되지 않고 무시될 행 수</p>
        </CardContent>
      </Card>
    </div>
  );
}
