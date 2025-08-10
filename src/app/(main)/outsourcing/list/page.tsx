import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Filter, PlusCircle, MoreHorizontal } from "lucide-react";
import Link from "next/link";

const contracts = [
  { id: 'c1', companyName: "스마트 컨설팅", category: "IT 개발", task: "ERP 고도화", grade: "고급", headcount: 3, monthlyCost: 21000000, period: "2024.01-2024.12" },
  { id: 'c2', companyName: "디자인팩토리", category: "디자인", task: "UX/UI 개선", grade: "중급", headcount: 2, monthlyCost: 12000000, period: "2024.03-2024.08" },
  { id: 'c3', companyName: "마케팅 브로스", category: "마케팅", task: "퍼포먼스 마케팅", grade: "초급", headcount: 1, monthlyCost: 4500000, period: "2024.06-2024.12" },
];

export default function OutsourcingListPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
                <Users className="h-7 w-7"/>
                외주인력 계약 목록
            </h1>
            <p className="text-muted-foreground">외주/프리랜서 계약을 관리합니다.</p>
        </div>
        <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            신규 계약 등록
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>계약 목록</CardTitle>
          <CardDescription>
            <div className="flex flex-col md:flex-row gap-4 mt-2">
                <Input placeholder="업체명 검색..." className="max-w-xs" />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="flex items-center gap-2">
                            <Filter className="h-4 w-4" />
                            필터
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>등급: 고급</DropdownMenuItem>
                        <DropdownMenuItem>등급: 중급</DropdownMenuItem>
                        <DropdownMenuItem>계약기간: 진행중</DropdownMenuItem>
                        <DropdownMenuItem>계약기간: 만료</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md">
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>업체명</TableHead>
                    <TableHead>업무</TableHead>
                    <TableHead>등급</TableHead>
                    <TableHead>인원</TableHead>
                    <TableHead>월급액</TableHead>
                    <TableHead>계약기간</TableHead>
                    <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {contracts.map((contract) => (
                    <TableRow key={contract.id}>
                    <TableCell className="font-medium">{contract.companyName}</TableCell>
                    <TableCell>{contract.task}</TableCell>
                    <TableCell>{contract.grade}</TableCell>
                    <TableCell>{contract.headcount}명</TableCell>
                    <TableCell>₩{contract.monthlyCost.toLocaleString()}</TableCell>
                    <TableCell>{contract.period}</TableCell>
                    <TableCell>
                        <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild><Link href={`/outsourcing/${contract.id}`}>상세 보기</Link></DropdownMenuItem>
                            <DropdownMenuItem>계약 수정</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">계약 종료</DropdownMenuItem>
                        </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
