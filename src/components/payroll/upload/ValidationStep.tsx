import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const errors = [
  { row: 15, column: "baseSalary", message: "숫자 형식이어야 합니다.", severity: "error" },
  { row: 28, column: "hireDate", message: "유효하지 않은 날짜 형식입니다.", severity: "error" },
  { row: 55, column: "department", message: "존재하지 않는 부서입니다.", severity: "warning" },
];

export function ValidationStep() {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>행</TableHead>
            <TableHead>컬럼</TableHead>
            <TableHead>오류 메시지</TableHead>
            <TableHead>심각도</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {errors.map((error, index) => (
            <TableRow key={index}>
              <TableCell>{error.row}</TableCell>
              <TableCell className="font-mono text-xs">{error.column}</TableCell>
              <TableCell>{error.message}</TableCell>
              <TableCell>
                <Badge variant={error.severity === 'error' ? 'destructive' : 'default'}>
                    {error.severity === 'error' ? '오류' : '경고'}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
