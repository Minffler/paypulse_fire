import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const sourceHeaders = ["사번", "이름", "부서명", "월급", "보너스"];
const targetFields = ["employeeId", "name", "department", "baseSalary", "bonus", "netPay"];

export function MappingStep() {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>원본 헤더 (파일)</TableHead>
            <TableHead>목표 필드 (시스템)</TableHead>
            <TableHead>샘플 데이터</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sourceHeaders.map((header, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{header}</TableCell>
              <TableCell>
                <Select defaultValue={targetFields.includes(header.toLowerCase()) ? header.toLowerCase() : ""}>
                  <SelectTrigger>
                    <SelectValue placeholder="필드 선택..." />
                  </SelectTrigger>
                  <SelectContent>
                    {targetFields.map(field => (
                      <SelectItem key={field} value={field}>{field}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {index === 0 && "EMP001"}
                {index === 1 && "홍길동"}
                {index === 2 && "엔지니어링"}
                {index === 3 && "5,000,000"}
                {index === 4 && "1,000,000"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
