'use server';

/**
 * @fileOverview A flow to generate AI-powered insights for payroll data.
 *
 * - generateAiInsights - A function that generates AI insights based on selected time period and department.
 * - GenerateAiInsightsInput - The input type for the generateAiInsights function.
 * - GenerateAiInsightsOutput - The return type for the generateAiInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAiInsightsInputSchema = z.object({
  timePeriod: z
    .string()
    .describe('The time period for which to generate insights (e.g., monthly, quarterly, yearly).'),
  department: z.string().describe('The department for which to generate insights.'),
});
export type GenerateAiInsightsInput = z.infer<typeof GenerateAiInsightsInputSchema>;

const InsightCardSchema = z.object({
  title: z.string().describe('The title of the insight card.'),
  summary: z.string().describe('A one-sentence summary of the key trend.'),
  supportingData: z.array(z.string()).describe('Supporting data for the insight.'),
});

const GenerateAiInsightsOutputSchema = z.object({
  insights: z.array(InsightCardSchema).describe('An array of AI-generated insight cards.'),
});
export type GenerateAiInsightsOutput = z.infer<typeof GenerateAiInsightsOutputSchema>;

export async function generateAiInsights(input: GenerateAiInsightsInput): Promise<GenerateAiInsightsOutput> {
  return generateAiInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAiInsightsPrompt',
  input: {schema: GenerateAiInsightsInputSchema},
  output: {schema: GenerateAiInsightsOutputSchema},
  prompt: `You are an AI assistant helping payroll managers understand key trends in their data.
  Generate 3-5 summary cards that highlight key trends for the selected time period and department.
  Each card should have a title, a one-sentence summary, and 2-3 supporting data points.

  Time Period: {{{timePeriod}}}
  Department: {{{department}}}

  Format the output as a JSON object with an array of insight cards.
  Each insight card should have a title, a summary, and supporting data.
  The supporting data should be an array of strings.
  `,
});

const generateAiInsightsFlow = ai.defineFlow(
  {
    name: 'generateAiInsightsFlow',
    inputSchema: GenerateAiInsightsInputSchema,
    outputSchema: GenerateAiInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
