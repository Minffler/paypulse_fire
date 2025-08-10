"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Copy } from "lucide-react"
import { toast } from "sonner"

export function InsuranceCalculator() {
  const [salary, setSalary] = useState(0)
  const [results, setResults] = useState({
    nationalPension: 0,
    healthInsurance: 0,
    employmentInsurance: 0,
    industrialAccident: 0,
    total: 0,
  })

  const calculate = () => {
    if (salary > 0) {
      const nationalPension = salary * 0.045
      const healthInsurance = salary * 0.03545
      const employmentInsurance = salary * 0.009
      const industrialAccident = salary * 0.0075 // Placeholder rate
      const total = nationalPension + healthInsurance + employmentInsurance + industrialAccident
      setResults({ nationalPension, healthInsurance, employmentInsurance, industrialAccident, total })
    }
  }

  const handleCopy = () => {
    const textToCopy = `총계: ${results.total.toFixed(0)}\n국민연금: ${results.nationalPension.toFixed(0)}\n건강보험: ${results.healthInsurance.toFixed(0)}\n고용보험: ${results.employmentInsurance.toFixed(0)}\n산재보험: ${results.industrialAccident.toFixed(0)}`;
    navigator.clipboard.writeText(textToCopy);
    toast.success("결과가 클립보드에 복사되었습니다.");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>4대보험 계산기</CardTitle>
        <CardDescription>월 기본급을 입력하여 4대보험료를 계산합니다.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="baseSalary">기본급 (월)</Label>
          <Input id="baseSalary" type="number" placeholder="예: 3000000" onChange={(e) => setSalary(Number(e.target.value))} />
        </div>
        <Button onClick={calculate} className="w-full">계산하기</Button>
        {results.total > 0 && (
          <div className="pt-4 space-y-4">
            <div className="flex items-center justify-between">
                <Label>계산 결과 (근로자 부담분)</Label>
                <Button variant="outline" size="icon" onClick={handleCopy}>
                    <Copy className="h-4 w-4" />
                </Button>
            </div>
            <div className="rounded-md border p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>국민연금</span>
                <span>{results.nationalPension.toLocaleString("ko-KR", { maximumFractionDigits: 0 })} 원</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>건강보험</span>
                <span>{results.healthInsurance.toLocaleString("ko-KR", { maximumFractionDigits: 0 })} 원</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>고용보험</span>
                <span>{results.employmentInsurance.toLocaleString("ko-KR", { maximumFractionDigits: 0 })} 원</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>산재보험</span>
                <span>{results.industrialAccident.toLocaleString("ko-KR", { maximumFractionDigits: 0 })} 원</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-md">
                <span>합계</span>
                <span>{results.total.toLocaleString("ko-KR", { maximumFractionDigits: 0 })} 원</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
