import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import Link from "next/link";

const uploads = [
  { id: "up1", file: "2024년 7월 급여대장.xlsx", status: "completed", rows: 152, user: "급여담당자A", time: "5분 전" },
  { id: "up2", file: "2024년 6월 보너스.csv", status: "completed", rows: 50, user: "급여담당자B", time: "2시간 전" },
  { id: "up3", file: "2024년 6월 급여대장_v2.xlsx", status: "failed", rows: 148, user: "급여담당자A", time: "1일 전" },
  { id: "up4", file: "2024년 5월 급여대장.xlsx", status: "completed", rows: 145, user: "급여담당자A", time: "1달 전" },
  { id: "up5", file: "임시_테스트_데이터.csv", status: "warning", rows: 5, user: "개발자", time: "1달 전" },
];

const statusConfig = {
    completed: { icon: CheckCircle, color: "bg-green-500", label: "완료" },
    failed: { icon: XCircle, color: "bg-red-500", label: "실패" },
    warning: { icon: AlertTriangle, color: "bg-yellow-500", label: "경고" },
};

export function RecentUploads() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>최근 업로드</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1">
        {uploads.map((upload) => {
            const statusInfo = statusConfig[upload.status as keyof typeof statusConfig] || statusConfig.warning;
            return (
                <Link href="/payroll/upload" key={upload.id} className="block rounded-md transition-colors hover:bg-muted/50">
                    <div className="flex items-center space-x-4 p-3">
                        <div className="relative">
                            <Avatar className="h-9 w-9">
                                <AvatarImage src={`https://i.pravatar.cc/150?u=${upload.user}`} />
                                <AvatarFallback>{upload.user.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className={cn("absolute -bottom-1 -right-1 block rounded-full p-0.5", statusInfo.color)}>
                               <statusInfo.icon className="h-3 w-3 text-white" />
                            </span>
                        </div>
                        <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none truncate">{upload.file}</p>
                            <p className="text-sm text-muted-foreground">{upload.user} · {upload.time}</p>
                        </div>
                        <div className="text-right">
                            <Badge variant={upload.status === 'failed' ? 'destructive' : 'secondary'}>{statusInfo.label}</Badge>
                            <p className="text-sm text-muted-foreground">{upload.rows} 행</p>
                        </div>
                    </div>
                </Link>
            )
        })}
      </CardContent>
    </Card>
  );
}
