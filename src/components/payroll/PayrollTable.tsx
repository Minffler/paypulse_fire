"use client";
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Filter, Star, ChevronDown, ArrowUpDown } from "lucide-react";
import { EmployeeDetailPanel } from "./EmployeeDetailPanel";

type Employee = {
    id: string;
    name: string;
    department: string;
    position: string;
    hireDate: string;
    baseSalary: number;
    netPay: number;
};

const payrollData: Employee[] = [
  { id: 'EMP001', name: '홍길동', department: '엔지니어링', position: '시니어 개발자', hireDate: '2020-03-15', baseSalary: 5000000, netPay: 4200000 },
  { id: 'EMP002', name: '김영희', department: '디자인', position: '프로덕트 디자이너', hireDate: '2021-08-01', baseSalary: 4200000, netPay: 3500000 },
  { id: 'EMP003', name: '이철수', department: '마케팅', position: '퍼포먼스 마케터', hireDate: '2022-01-20', baseSalary: 3800000, netPay: 3200000 },
  { id: 'EMP004', name: '박하나', department: '엔지니어링', position: '주니어 개발자', hireDate: '2023-05-10', baseSalary: 3500000, netPay: 3000000 },
];

export function PayrollTable() {
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    const handleRowClick = (employee: Employee) => {
        setSelectedEmployee(employee);
        setIsPanelOpen(true);
    };

    return (
        <>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
                <Input placeholder="기간(월) 선택..." className="max-w-xs" type="month" defaultValue="2024-07" />
                <Input placeholder="부서, 직급 검색..." className="max-w-xs" />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            컬럼 표시 <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuCheckboxItem checked>사번</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem checked>성명</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>총과세</DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem>총비과세</DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    필터
                </Button>
            </div>
            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead><Button variant="ghost" size="sm"><ArrowUpDown className="mr-2 h-4 w-4" />사번</Button></TableHead>
                            <TableHead><Button variant="ghost" size="sm"><ArrowUpDown className="mr-2 h-4 w-4" />성명</Button></TableHead>
                            <TableHead>부서</TableHead>
                            <TableHead>직급</TableHead>
                            <TableHead>입사일</TableHead>
                            <TableHead className="text-right"><Button variant="ghost" size="sm"><ArrowUpDown className="mr-2 h-4 w-4" />기본급</Button></TableHead>
                            <TableHead className="text-right"><Button variant="ghost" size="sm"><ArrowUpDown className="mr-2 h-4 w-4" />실지급액</Button></TableHead>
                            <TableHead className="text-center">액션</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {payrollData.map((emp) => (
                            <TableRow key={emp.id} onClick={() => handleRowClick(emp)} className="cursor-pointer">
                                <TableCell className="font-medium">{emp.id}</TableCell>
                                <TableCell>{emp.name}</TableCell>
                                <TableCell>{emp.department}</TableCell>
                                <TableCell>{emp.position}</TableCell>
                                <TableCell>{emp.hireDate}</TableCell>
                                <TableCell className="text-right">₩{emp.baseSalary.toLocaleString()}</TableCell>
                                <TableCell className="text-right font-semibold">₩{emp.netPay.toLocaleString()}</TableCell>
                                <TableCell className="text-center">
                                    <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                                        <Star className="h-4 w-4 text-muted-foreground hover:text-yellow-400 hover:fill-yellow-400" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <EmployeeDetailPanel employee={selectedEmployee} open={isPanelOpen} onOpenChange={setIsPanelOpen} />
        </>
    );
}
