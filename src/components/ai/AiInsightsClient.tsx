"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { generateAiInsights, GenerateAiInsightsOutput } from '@/ai/flows/generate-ai-insights';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { InsightCard } from './InsightCard';
import { Sparkles } from 'lucide-react';
import { toast } from "sonner";


const formSchema = z.object({
  timePeriod: z.string().min(1, '기간을 선택해주세요.'),
  department: z.string().min(1, '부서를 선택해주세요.'),
});

export function AiInsightsClient() {
  const [insights, setInsights] = useState<GenerateAiInsightsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      timePeriod: 'quarterly',
      department: 'all',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setInsights(null);
    try {
      const result = await generateAiInsights(values);
      setInsights(result);
    } catch (error) {
      console.error('Error generating AI insights:', error);
      toast.error("AI 인사이트 생성 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
        <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight flex items-center gap-2">
                <Sparkles className="h-7 w-7 text-primary"/>
                AI 인사이트
            </h1>
            <p className="text-muted-foreground">AI가 급여 데이터를 분석하여 주요 트렌드를 요약해 드립니다.</p>
        </div>

      <Card>
        <CardHeader>
          <CardTitle>인사이트 생성 조건</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
              <FormField
                control={form.control}
                name="timePeriod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>기간</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="기간 선택" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="monthly">월별</SelectItem>
                        <SelectItem value="quarterly">분기별</SelectItem>
                        <SelectItem value="yearly">연간</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>부서</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="부서 선택" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="all">전체 부서</SelectItem>
                        <SelectItem value="engineering">엔지니어링</SelectItem>
                        <SelectItem value="design">디자인</SelectItem>
                        <SelectItem value="marketing">마케팅</SelectItem>
                        <SelectItem value="sales">영업</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
                {isLoading ? '생성 중...' : '인사이트 생성'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && (
         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
             {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i}>
                    <CardHeader>
                        <Skeleton className="h-6 w-3/4" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                        <div className="space-y-2 pt-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-full" />
                        </div>
                    </CardContent>
                </Card>
             ))}
         </div>
      )}

      {insights && insights.insights.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {insights.insights.map((insight, index) => (
            <InsightCard key={index} insight={insight} />
          ))}
        </div>
      )}

      {!isLoading && !insights && (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <Sparkles className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">인사이트를 기다리고 있습니다.</h3>
            <p className="mt-1 text-sm text-muted-foreground">
                위에서 조건을 선택하고 버튼을 눌러 AI 분석을 시작하세요.
            </p>
        </div>
      )}
    </div>
  );
}
