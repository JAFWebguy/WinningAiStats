import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LLMMetrics } from "@shared/data";

interface LLMMetricsGridProps {
  data: Array<{
    name: string;
    parameters: number;
    trainingTokens: number | string;
    inferenceSpeed: number;
    costPerToken: number | string;
    releaseDate: string;
  }>;
}

export function LLMMetricsGrid({ data }: LLMMetricsGridProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-6 gap-4">
        <div className="font-medium">Model</div>
        <div className="font-medium">Parameters</div>
        <div className="font-medium">Training Tokens</div>
        <div className="font-medium">Inference Speed</div>
        <div className="font-medium">Cost/Token</div>
        <div className="font-medium">Release Date</div>
      </div>
      {data.map((model) => (
        <div key={model.name} className="grid grid-cols-6 gap-4">
          <div>{model.name}</div>
          <div>{model.parameters}B</div>
          <div>{typeof model.trainingTokens === 'number' ? `${(model.trainingTokens / 1000000000).toFixed(1)}B` : model.trainingTokens}</div>
          <div>{model.inferenceSpeed}ms</div>
          <div>{typeof model.costPerToken === 'number' ? `$${model.costPerToken.toFixed(4)}` : model.costPerToken}</div>
          <div>{model.releaseDate}</div>
        </div>
      ))}
    </div>
  );
}