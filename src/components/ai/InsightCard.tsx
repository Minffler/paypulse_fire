import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, TrendingUp, BarChart2, CheckCircle } from 'lucide-react';

interface Insight {
  title: string;
  summary: string;
  supportingData: string[];
}

export function InsightCard({ insight }: { insight: Insight }) {
  const icons = [<TrendingUp key="1" />, <BarChart2 key="2" />, <CheckCircle key="3" />];

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-start gap-3">
            <Lightbulb className="h-6 w-6 text-yellow-400 mt-1" />
            <div className="flex-1">
                <CardTitle>{insight.title}</CardTitle>
                <CardDescription className="mt-1">{insight.summary}</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between">
        <div>
            <h4 className="text-sm font-semibold mb-2 text-foreground/80">주요 데이터</h4>
            <ul className="space-y-2">
            {insight.supportingData.map((data, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="text-primary mt-1">{icons[index % icons.length]}</span>
                    <span>{data}</span>
                </li>
            ))}
            </ul>
        </div>
      </CardContent>
    </Card>
  );
}
