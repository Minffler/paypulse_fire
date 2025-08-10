import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { History } from "lucide-react";

const auditLogs = [
  { user: "admin@paywise.ai", action: "UPDATE", target: "rates/2024", before: "{...}", after: "{...}", timestamp: "2024-07-21 10:05:14" },
  { user: "payroll@paywise.ai", action: "CREATE", target: "payroll/2024-07-emp123", before: "null", after: "{...}", timestamp: "2024-07-21 09:33:01" },
  { user: "payroll@paywise.ai", action: "UPLOAD", target: "uploads/xyz123", before: "null", after: "{ fileName: '7월급여.xlsx' }", timestamp: "2024-07-21 09:30:45" },
  { user: "admin@paywise.ai", action: "GRANT_ROLE", target: "users/new-user@paywise.ai", before: "{ role: 'guest' }", after: "{ role: 'payroll' }", timestamp: "2024-07-20 15:12:30" },
];

const badgeVariant: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  UPDATE: "secondary",
  CREATE: "default",
  UPLOAD: "outline",
  GRANT_ROLE: "default",
  DELETE: "destructive",
};

export default function AuditLogPage() {
  return (
    <div className="space-y-6">
       <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
                <History className="h-7 w-7"/>
                감사로그
            </h1>
            <p className="text-muted-foreground">시스템 내 주요 변경 이력을 추적합니다.</p>
        </div>
      <Card>
        <CardHeader>
          <CardTitle>최근 30일 변경 이력</CardTitle>
          <CardDescription>
            주요 데이터 생성, 수정, 삭제 및 권한 변경 이력을 확인할 수 있습니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>일시</TableHead>
                <TableHead>사용자</TableHead>
                <TableHead>행동</TableHead>
                <TableHead>대상</TableHead>
                <TableHead className="text-right">변경 내용</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditLogs.map((log, index) => (
                <TableRow key={index}>
                  <TableCell>{log.timestamp}</TableCell>
                  <TableCell className="font-medium">{log.user}</TableCell>
                  <TableCell>
                    <Badge variant={badgeVariant[log.action] || "default"}>{log.action}</Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs">{log.target}</TableCell>
                  <TableCell className="text-right font-mono text-xs">
                    <span className="text-red-500">{log.before}</span> → <span className="text-green-500">{log.after}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
