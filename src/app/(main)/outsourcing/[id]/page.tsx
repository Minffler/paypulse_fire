import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, FileText, Calendar, Edit } from "lucide-react";

export default function OutsourcingDetailPage({ params }: { params: { id: string } }) {
  // Mock data for a single contract
  const contract = {
    id: params.id,
    companyName: "스마트 컨설팅",
    category: "IT 개발",
    task: "사내 ERP 시스템 고도화",
    okdGrade: "고급",
    headcount: 3,
    monthlyCost: 21000000,
    annualCost: 252000000,
    contractStart: "2024-01-01",
    contractEnd: "2024-12-31",
    status: "active",
  };

  const monthlyCosts = [
    { month: 1, cost: 21000000, status: "지급완료" },
    { month: 2, cost: 21000000, status: "지급완료" },
    { month: 3, cost: 21000000, status: "지급완료" },
    { month: 4, cost: 21000000, status: "지급완료" },
    { month: 5, cost: 21000000, status: "지급완료" },
    { month: 6, cost: 21000000, status: "지급완료" },
    { month: 7, cost: 21000000, status: "예정" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
            <FileText className="h-7 w-7" />
            {contract.companyName} 계약 상세
          </h1>
          <p className="text-muted-foreground">계약 ID: {contract.id}</p>
        </div>
        <Button><Edit className="mr-2 h-4 w-4" /> 편집</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>계약 요약</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="space-y-1">
                <p className="text-muted-foreground">업체명</p>
                <p className="font-medium">{contract.companyName}</p>
            </div>
            <div className="space-y-1">
                <p className="text-muted-foreground">업무</p>
                <p className="font-medium">{contract.task}</p>
            </div>
            <div className="space-y-1">
                <p className="text-muted-foreground">등급/인원</p>
                <p className="font-medium">{contract.okdGrade} / {contract.headcount}명</p>
            </div>
            <div className="space-y-1">
                <p className="text-muted-foreground">계약기간</p>
                <p className="font-medium">{contract.contractStart} ~ {contract.contractEnd}</p>
            </div>
             <div className="space-y-1">
                <p className="text-muted-foreground">월 비용</p>
                <p className="font-medium text-blue-600">₩{contract.monthlyCost.toLocaleString()}</p>
            </div>
             <div className="space-y-1">
                <p className="text-muted-foreground">연간 비용 (추정)</p>
                <p className="font-medium text-blue-600">₩{contract.annualCost.toLocaleString()}</p>
            </div>
             <div className="space-y-1">
                <p className="text-muted-foreground">상태</p>
                <div className="font-medium">
                    <Badge variant={contract.status === 'active' ? 'default' : 'secondary'}>
                        {contract.status === 'active' ? '진행중' : '종료'}
                    </Badge>
                </div>
            </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>월별 비용</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>월</TableHead>
                <TableHead>비용</TableHead>
                <TableHead>상태</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {monthlyCosts.map((item) => (
                <TableRow key={item.month}>
                  <TableCell>{item.month}월</TableCell>
                  <TableCell>₩{item.cost.toLocaleString()}</TableCell>
                  <TableCell><Badge variant={item.status === "지급완료" ? "outline" : "secondary"}>{item.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
    </div>
  );
}
