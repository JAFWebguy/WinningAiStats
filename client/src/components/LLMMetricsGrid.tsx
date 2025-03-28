import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatNumber } from "@/lib/utils";

export interface LLMMetrics {
  name: string;
  parameters: number;
  trainingTokens: number;
  inferenceSpeed: number;
  costPerToken: number;
  releaseDate: string;
}

export interface LLMMetricsGridProps {
  data: LLMMetrics[];
}

export function LLMMetricsGrid({ data }: LLMMetricsGridProps) {
  const [gridData, setGridData] = useState<LLMMetrics[]>(data);

  // Always ensure we have data to display, even if empty array is passed
  useEffect(() => {
    if (data && data.length > 0) {
      setGridData(data);
    } else {
      // Fallback data if no data is provided
      setGridData([
        {
          name: "GPT-4",
          parameters: 175,
          trainingTokens: 1500000000,
          inferenceSpeed: 500,
          costPerToken: 0.03,
          releaseDate: "2023-03-14"
        },
        {
          name: "Claude 3",
          parameters: 400,
          trainingTokens: 1200000000,
          inferenceSpeed: 450,
          costPerToken: 0.028,
          releaseDate: "2023-07-14"
        },
        {
          name: "Gemini",
          parameters: 785,
          trainingTokens: 2000000000,
          inferenceSpeed: 400,
          costPerToken: 0.025,
          releaseDate: "2023-05-10"
        }
      ]);
    }
  }, [data]);

  // Helper function to format parameters (billions)
  const formatParameters = (value: number) => {
    return `${value}B`;
  };

  // Helper function to format training tokens (trillions)
  const formatTrainingTokens = (value: number) => {
    return `${(value / 1000000000).toFixed(1)}T`;
  };

  // Helper function to format inference speed (tokens per second)
  const formatInferenceSpeed = (value: number) => {
    return `${value} tokens/s`;
  };

  // Helper function to format cost per token (USD)
  const formatCostPerToken = (value: number) => {
    return `$${value.toFixed(3)}`;
  };

  return (
    <div className="overflow-x-auto">
      <Table className="w-full">
        <TableHeader>
          <TableRow className="hover:bg-muted/5">
            <TableHead className="w-[180px]">Model</TableHead>
            <TableHead>Parameters</TableHead>
            <TableHead>Training Tokens</TableHead>
            <TableHead>Inference Speed</TableHead>
            <TableHead>Cost Per Token</TableHead>
            <TableHead>Release Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {gridData.map((model, index) => (
            <TableRow 
              key={index} 
              className="hover:bg-primary/5 transition-colors"
            >
              <TableCell className="font-medium">{model.name}</TableCell>
              <TableCell>{formatParameters(model.parameters)}</TableCell>
              <TableCell>{formatTrainingTokens(model.trainingTokens)}</TableCell>
              <TableCell>{formatInferenceSpeed(model.inferenceSpeed)}</TableCell>
              <TableCell>{formatCostPerToken(model.costPerToken)}</TableCell>
              <TableCell>{model.releaseDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}