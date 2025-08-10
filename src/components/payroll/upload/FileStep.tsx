"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UploadCloud, FileSpreadsheet } from "lucide-react";

export function FileStep({ onFileSelect }: { onFileSelect: (file: File) => void }) {
  // A mock handler for now
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onFileSelect(event.target.files[0]);
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-lg text-center">
          <UploadCloud className="h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">급여 파일 선택</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            여기에 파일을 드래그 & 드롭하거나, 아래 버튼을 클릭하세요.
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            지원 파일 형식: .xlsx, .csv
          </p>
          <Button asChild className="mt-4">
            <label htmlFor="file-upload">
              파일 선택
              <input id="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".xlsx,.csv" />
            </label>
          </Button>
        </div>
        <div className="mt-4 text-center">
            <Button variant="link" asChild>
                <a href="/template.xlsx" download>
                    <FileSpreadsheet className="mr-2 h-4 w-4" />
                    샘플 템플릿 다운로드 (.xlsx)
                </a>
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
