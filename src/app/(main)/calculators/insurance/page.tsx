import { InsuranceCalculator } from "@/components/calculators/InsuranceCalculator";
import { Calculator } from "lucide-react";

export default function InsurancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
          <Calculator className="h-7 w-7" />
          계산기
        </h1>
        <p className="text-muted-foreground">복잡한 인건비 항목을 빠르게 계산합니다.</p>
      </div>
      <div className="max-w-2xl mx-auto">
        <InsuranceCalculator />
      </div>
    </div>
  );
}
