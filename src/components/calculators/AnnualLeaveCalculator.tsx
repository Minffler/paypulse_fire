"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy } from "lucide-react"
import { toast } from "sonner"

export function AnnualLeaveCalculator() {
  const [baseSalary, setBaseSalary] = useState(0)
  const [serviceYears, setServiceYears] = useState(0)
  const [allowance, setAllowance] = useState(0)

  const calculate = () => {
    if (baseSalary > 0 && serviceYears > 0) {
      // This is a simplified placeholder calculation.
      const dailyWage = baseSalary / 209 * 8;
      const leaveDays = 15 + Math.floor((serviceYears - 1) / 2);
      const calculatedAllowance = dailyWage * leaveDays;
      setAllowance(calculatedAllowance);
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(allowance.toFixed(0));
    toast.success("결과가 클립보드에 복사되었습니다.");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>연차수당 계산기</CardTitle>
        <CardDescription>기본급과 근속연수를 기반으로 예상 연차수당을 계산합니다.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="baseSalary-al">기본급 (월)</Label>
            <Input id="baseSalary-al" type="number" placeholder="예: 3000000" onChange={(e) => setBaseSalary(Number(e.target.value))} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="serviceYears">근속연수</Label>
            <Input id="serviceYears" type="number" placeholder="예: 3" onChange={(e) => setServiceYears(Number(e.target.value))} />
          </div>
        </div>
        <Button onClick={calculate} className="w-full">계산하기</Button>
        {allowance > 0 && (
          <div className="pt-4 space-y-2">
            <Label>계산 결과</Label>
            <div className="flex items-center justify-between rounded-md border p-4">
              <div>
                <p className="text-sm text-muted-foreground">예상 연차수당</p>
                <p className="text-2xl font-bold">₩ {allowance.toLocaleString("ko-KR", { maximumFractionDigits: 0 })}</p>
              </div>
              <Button variant="outline" size="icon" onClick={handleCopy}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
