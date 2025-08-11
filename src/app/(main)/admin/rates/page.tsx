"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SlidersHorizontal, PlusCircle } from "lucide-react";

const initialRates = [
  { year: 2024, nationalPension: "4.5%", healthInsurance: "3.545%", employmentInsurance: "0.9%", industrialAccident: "0.75%", updatedBy: "admin", updatedAt: "2024-01-15" },
  { year: 2023, nationalPension: "4.5%", healthInsurance: "3.495%", employmentInsurance: "0.9%", industrialAccident: "0.75%", updatedBy: "admin", updatedAt: "2023-01-12" },
];

export default function RatesPage() {
  const [rates, setRates] = useState(initialRates);

  const handleAddYear = () => {
    const latestYear = rates.reduce((max, rate) => Math.max(max, rate.year), 0);
    const newYear = latestYear + 1;
    const newRate = {
      year: newYear,
      nationalPension: "",
      healthInsurance: "",
      employmentInsurance: "",
      industrialAccident: "",
      updatedBy: "current_user", // Placeholder
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setRates([newRate, ...rates]);
  };
  
  const handleInputChange = (year: number, field: string, value: string) => {
    setRates(rates.map(rate => 
      rate.year === year ? { ...rate, [field]: value } : rate
    ));
  };


  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
                <SlidersHorizontal className="h-7 w-7"/>
                법정 요율 테이블
            </h1>
            <p className="text-muted-foreground">연도별 법정 요율을 관리합니다.</p>
        </div>
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
            <div>
                <CardTitle>연도별 요율</CardTitle>
                <CardDescription>
                    급여 계산에 사용되는 4대보험 및 기타 요율을 관리합니다.
                </CardDescription>
            </div>
            <Button onClick={handleAddYear}>
                <PlusCircle className="mr-2 h-4 w-4" />
                새 연도 추가
            </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>연도</TableHead>
                <TableHead>국민연금</TableHead>
                <TableHead>건강보험</TableHead>
                <TableHead>고용보험</TableHead>
                <TableHead>산재보험</TableHead>
                <TableHead>수정자</TableHead>
                <TableHead>최종수정일</TableHead>
                <TableHead className="text-right">액션</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rates.map((rate) => (
                <TableRow key={rate.year}>
                  <TableCell className="font-medium">
                    <Input 
                      type="number" 
                      value={rate.year} 
                      onChange={(e) => handleInputChange(rate.year, 'year', e.target.value)} 
                      className="h-8 w-24"
                    />
                  </TableCell>
                  <TableCell><Input value={rate.nationalPension} onChange={(e) => handleInputChange(rate.year, 'nationalPension', e.target.value)} className="h-8" /></TableCell>
                  <TableCell><Input value={rate.healthInsurance} onChange={(e) => handleInputChange(rate.year, 'healthInsurance', e.target.value)} className="h-8" /></TableCell>
                  <TableCell><Input value={rate.employmentInsurance} onChange={(e) => handleInputChange(rate.year, 'employmentInsurance', e.target.value)} className="h-8" /></TableCell>
                  <TableCell><Input value={rate.industrialAccident} onChange={(e) => handleInputChange(rate.year, 'industrialAccident', e.target.value)} className="h-8" /></TableCell>
                  <TableCell>{rate.updatedBy}</TableCell>
                  <TableCell>{rate.updatedAt}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">저장</Button>
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
