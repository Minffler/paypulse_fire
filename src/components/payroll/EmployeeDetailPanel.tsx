import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ResponsiveContainer, AreaChart, Area, Tooltip, YAxis, XAxis } from "recharts";
import { Badge } from "@/components/ui/badge";

type Employee = {
    id: string;
    name: string;
    department: string;
    position: string;
    hireDate: string;
    baseSalary: number;
    netPay: number;
};

const sparklineData = [
  { month: 'Jan', value: 480 },
  { month: 'Feb', value: 485 },
  { month: 'Mar', value: 510 },
  { month: 'Apr', value: 505 },
  { month: 'May', value: 520 },
  { month: 'Jun', value: 530 },
  { month: 'Jul', value: 525 },
];

export function EmployeeDetailPanel({ employee, open, onOpenChange }: { employee: Employee | null; open: boolean; onOpenChange: (open: boolean) => void }) {
  if (!employee) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg w-[90vw] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl">{employee.name}</SheetTitle>
          <SheetDescription>
            {employee.department} / {employee.position} (사번: {employee.id})
          </SheetDescription>
        </SheetHeader>
        <div className="py-6 space-y-6">
            <div>
                <h4 className="text-sm font-semibold mb-2">최근 12개월 급여 추이 (실지급액)</h4>
                <div className="h-[100px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={sparklineData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <defs>
                            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4}/>
                                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <Tooltip 
                            contentStyle={{ background: 'hsl(var(--background))', border: '1px solid hsl(var(--border))' }}
                            labelFormatter={(label) => `${label}월`}
                            formatter={(value: number) => [`${(value * 10000).toLocaleString()}원`, "실지급액"]}
                        />
                        <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorUv)" />
                        <YAxis hide domain={['dataMin - 50', 'dataMax + 50']} />
                        <XAxis dataKey="month" hide />
                    </AreaChart>
                </ResponsiveContainer>
                </div>
            </div>

            <Separator />
            
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <h4 className="text-sm font-semibold mb-2">수당 항목</h4>
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm"><span className="text-muted-foreground">기본급</span><span>₩2,800,000</span></div>
                        <div className="flex justify-between text-sm"><span className="text-muted-foreground">직책수당</span><span>₩200,000</span></div>
                        <div className="flex justify-between text-sm"><span className="text-muted-foreground">식대(비과세)</span><span>₩200,000</span></div>
                        <div className="flex justify-between text-sm font-bold"><span >총 지급액</span><span>₩3,200,000</span></div>
                    </div>
                </div>
                 <div>
                    <h4 className="text-sm font-semibold mb-2">공제 항목</h4>
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm"><span className="text-muted-foreground">국민연금</span><span>-₩135,000</span></div>
                        <div className="flex justify-between text-sm"><span className="text-muted-foreground">건강보험</span><span>-₩106,350</span></div>
                        <div className="flex justify-between text-sm"><span className="text-muted-foreground">소득세</span><span>-₩65,230</span></div>
                        <div className="flex justify-between text-sm font-bold"><span >총 공제액</span><span>-₩306,580</span></div>
                    </div>
                </div>
            </div>

            <Separator />

             <div>
                <h4 className="text-sm font-semibold mb-2">추가 정보</h4>
                <div className="space-y-2 text-sm">
                   <div className="flex justify-between"><span className="text-muted-foreground">입사일</span><span>{employee.hireDate}</span></div>
                   <div className="flex justify-between"><span className="text-muted-foreground">총 과세</span><span>₩3,000,000</span></div>
                   <div className="flex justify-between"><span className="text-muted-foreground">총 비과세</span><span>₩200,000</span></div>
                </div>
             </div>

             <div>
                <h4 className="text-sm font-semibold mb-2">태그 및 노트</h4>
                <div className="flex gap-2 mb-2">
                    <Badge variant="secondary">신규입사</Badge>
                    <Badge variant="secondary">스톡옵션</Badge>
                </div>
                <div className="p-3 text-sm bg-muted rounded-md border">
                    2024년 7월분부터 스톡옵션 행사 관련 세금 처리 필요.
                </div>
             </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
