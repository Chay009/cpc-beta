"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CalculationResults } from "@/types/calculator";

interface Props {
  results: CalculationResults | null;
}

export function ResultsDisplay({ results }: Props) {
  if (!results) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Results</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold">Total Revenue</h3>
            <p className="text-2xl">${results.maxCPC.toFixed(2)}</p>
          </div>
   
        </div>
      </CardContent>
    </Card>
  );
}