
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

type Employee = {
    id: string;
    name: string;
    department: string;
    position: string;
    hireDate: string;
    baseSalary: number;
    netPay: number;
    error?: string; // Add error field
};

const allPayrollData: Employee[] = [
  { id: 'EMP001', name: '홍길동', department: '엔지니어링', position: '시니어 개발자', hireDate: '2020-03-15', baseSalary: 5000000, netPay: 4200000 },
  { id: 'EMP002', name: '김영희', department: '디자인', position: '프로덕트 디자이너', hireDate: '2021-08-01', baseSalary: 4200000, netPay: 3500000 },
  // Add some data with errors for demonstration
  { id: 'EMP003', name: '이철수', department: '마케팅', position: '퍼포먼스 마케터', hireDate: '2022-01-20', baseSalary: 3800000, netPay: 3200000, error: "기본급이 최소 요건보다 낮습니다." },
  { id: 'EMP004', name: '박하나', department: '엔지니어링', position: '주니어 개발자', hireDate: '2023-05-10', baseSalary: 3500000, netPay: 3000000 },
  { id: 'EMP005', name: '최민준', department: '영업', position: '영업대표', hireDate: '2019-11-01', baseSalary: 6000000, netPay: 5000000 },
  { id: 'EMP006', name: '정수빈', department: '디자인', position: 'UX 리서처', hireDate: '2022-08-15', baseSalary: 4000000, netPay: 3300000, error: "계약 유형이 올바르지 않습니다." },
];

// Extend this to include other necessary fields
const moreData: Employee[] = Array.from({ length: 200 }, (_, i) => ({
    id: `EMP${String(i + 7).padStart(3, '0')}`,
    name: `직원${i + 7}`,
    department: ['엔지니어링', '디자인', '마케팅', '영업', '인사', '재무'][i % 6],
    position: '직원',
    hireDate: `2023-01-01`,
    baseSalary: 3000000 + (i * 10000),
    netPay: 2500000 + (i * 8000),
    error: i % 50 === 0 ? "필수 정보 누락" : undefined,
}));

const mockData = [...allPayrollData, ...moreData];

export type PayrollUpload = {
  id: string;
  file: string;
  status: "completed" | "failed" | "warning";
  rows: number;
  user: string;
  time: string;
};

export function UploadDetailDialog({
  upload,
  open,
  onOpenChange,
}: {
  upload: PayrollUpload | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!upload) return null;

  // Use a slice of mock data for demonstration
  const displayData = mockData.slice(0, upload.rows);
  const showErrors = upload.status === 'failed' || upload.status === 'warning';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-full">
        <DialogHeader>
          <DialogTitle>{upload.file}</DialogTitle>
          <DialogDescription className="flex items-center gap-4">
            <span>{upload.time} by {upload.user}</span>
            <Badge variant={upload.status === 'failed' ? 'destructive' : 'secondary'}>{upload.status}</Badge>
            <span>{upload.rows} 행 처리됨</span>
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-6">
          <TooltipProvider>
            <Table>
              <TableHeader className="sticky top-0 bg-background">
                <TableRow>
                  <TableHead>사번</TableHead>
                  <TableHead>성명</TableHead>
                  <TableHead>부서</TableHead>
                  <TableHead>직급</TableHead>
                  <TableHead className="text-right">기본급</TableHead>
                  <TableHead className="text-right">실지급액</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {displayData.map((emp) => (
                  <TableRow 
                    key={emp.id} 
                    className={cn(showErrors && emp.error && "bg-destructive/10 hover:bg-destructive/20")}
                  >
                    <TableCell>
                        {showErrors && emp.error ? (
                             <Tooltip>
                                <TooltipTrigger asChild>
                                    <span className="flex items-center gap-2 text-destructive font-bold">
                                        <AlertTriangle className="h-4 w-4" />
                                        {emp.id}
                                    </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{emp.error}</p>
                                </TooltipContent>
                            </Tooltip>
                        ) : emp.id}
                    </TableCell>
                    <TableCell>{emp.name}</TableCell>
                    <TableCell>{emp.department}</TableCell>
                    <TableCell>{emp.position}</TableCell>
                    <TableCell className="text-right">₩{emp.baseSalary.toLocaleString()}</TableCell>
                    <TableCell className="text-right">₩{emp.netPay.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TooltipProvider>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
