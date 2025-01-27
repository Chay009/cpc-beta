"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AcosChart } from "./Chart_Acos";
import { CpcChart } from "./Chart_Cpc";

export function CPCResults({ results }: any) {
  return (
    <div className="grid grid-rows-[auto_1fr] h-full gap-4 sm:gap-8">
      {/* Top section with CPC and Details in a grid */}
      <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
        {/* Max CPC Card */}
        <div className="bg-muted/50 rounded-lg p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-medium text-muted-foreground mb-2">
            Maximum Cost Per Click
          </h3>
          <p className="text-3xl sm:text-4xl font-bold text-primary">
            ${results.maxCPC.toFixed(2)}
          </p>
          <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-muted-foreground">
            Maximum bid to maintain target metrics.
          </p>
        </div>

        {/* Calculation Details Card */}
        <div className="bg-muted/50 rounded-lg p-4 sm:p-6">
          <p className="font-medium mb-2 sm:mb-3">Calculation Details</p>
          <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Formula:</span>
              <span className="font-medium">{results.calculation.formula}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">CVR:</span>
              <span className="font-medium">{results.calculation.conversionRate}%</span>
            </div>
            {results.calculation.targetCPA && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Target CPA:</span>
                <span className="font-medium">${results.calculation.targetCPA}</span>
              </div>
            )}
            {results.calculation.targetACOS && (
              <>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Target ACOS:</span>
                  <span className="font-medium">{results.calculation.targetACOS}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Avg Order Value:</span>
                  <span className="font-medium">${results.calculation.averageOrderValue}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Chart section */}
      {results.chartData && (
        <div className={`grid gap-4 sm:gap-6 ${
          results.calculation.targetACOS ? '' : 'md:grid-cols-2'
        }`}>
          {/* Show ACOS chart if targetACOS exists */}
          {results.calculation.targetACOS && (
            <div className="h-[250px] sm:h-[350px] lg:h-[400px] w-full">
              <AcosChart 
                data={results.chartData} 
                conversionRate={results.calculation.conversionRate}
                averageOrderValue={results.calculation.averageOrderValue}
              />
            </div>
          )}
          
          {/* Show CPC charts if targetCPA exists */}
          {results.calculation.targetCPA && results.chartData.conversion && (
            <>
              <div className="h-[250px] sm:h-[350px] lg:h-[400px] w-full">
                <CpcChart 
                  data={results.chartData.conversion} 
                  variation="conversion" 
                  fixedValue={results.calculation.targetCPA}
                />
              </div>
              <div className="h-[250px] sm:h-[350px] lg:h-[400px] w-full">
                <CpcChart 
                  data={results.chartData.cpa} 
                  variation="cpa" 
                  fixedValue={results.calculation.conversionRate}
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
