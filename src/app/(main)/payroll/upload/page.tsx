"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileStep } from "@/components/payroll/upload/FileStep";
import { MappingStep } from "@/components/payroll/upload/MappingStep";
import { ValidationStep } from "@/components/payroll/upload/ValidationStep";
import { SummaryStep } from "@/components/payroll/upload/SummaryStep";
import { cn } from "@/lib/utils";
import { FileUp } from "lucide-react";

const steps = [
  { id: 1, name: "파일 선택" },
  { id: 2, name: "컬럼 매핑" },
  { id: 3, name: "검증" },
  { id: 4, name: "요약/커밋" },
];

export default function PayrollUploadPage() {
  const [stage, setStage] = useState(1);
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setStage(2);
  };
  
  const handleNext = () => setStage(prev => Math.min(prev + 1, 4));
  const handleBack = () => setStage(prev => Math.max(prev - 1, 1));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
            <FileUp className="h-7 w-7"/>
            급여 파일 업로드
        </h1>
        <p className="text-muted-foreground">Excel/CSV 파일을 업로드하여 급여 데이터를 시스템에 반영합니다.</p>
      </div>
      
      <nav aria-label="Progress">
        <ol role="list" className="flex items-center">
          {steps.map((step, stepIdx) => (
            <li key={step.name} className={cn("relative", stepIdx !== steps.length - 1 ? "pr-8 sm:pr-20 flex-1" : "")}>
              {step.id < stage ? (
                <>
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="h-0.5 w-full bg-primary" />
                  </div>
                  <button
                    onClick={() => setStage(step.id)}
                    className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <span className="sr-only">{step.name}</span>
                  </button>
                </>
              ) : step.id === stage ? (
                <>
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="h-0.5 w-full bg-gray-200" />
                  </div>
                  <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-background" aria-current="step">
                    <span className="h-2.5 w-2.5 rounded-full bg-primary" aria-hidden="true" />
                    <span className="sr-only">{step.name}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="h-0.5 w-full bg-gray-200" />
                  </div>
                  <div className="group relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-background hover:border-gray-400">
                    <span className="sr-only">{step.name}</span>
                  </div>
                </>
              )}
               <p className="absolute -bottom-6 text-xs font-medium text-center w-max -translate-x-1/2 left-1/2">{step.name}</p>
            </li>
          ))}
        </ol>
      </nav>

      <div className="pt-4">
        {stage === 1 && <FileStep onFileSelect={handleFileSelect} />}
        {stage === 2 && <MappingStep />}
        {stage === 3 && <ValidationStep />}
        {stage === 4 && <SummaryStep />}
      </div>

      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={handleBack} disabled={stage === 1}>
          이전
        </Button>
        {stage < 4 ? (
          <Button onClick={handleNext} disabled={stage === 1 && !file}>다음</Button>
        ) : (
          <Button>커밋</Button>
        )}
      </div>
    </div>
  );
}
