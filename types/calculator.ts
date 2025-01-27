export interface ACOSCalculatorInputs {
  targetACOS: number;
  conversionRate: number;
  averageOrderValue: number;
}

export interface CPACalculatorInputs {
  targetCPA: number;
  conversionRate: number;
}

export interface CalculationResults {
  maxCPC: number;
  calculationType: 'ACOS' | 'CPA';
}

export interface GraphDataPoint {
  name: string;
  value: number;
}

interface BaseCalculation {
  maxCPC: number;
  conversionRate: number;
  formula: string;
}

interface ACOSCalculation extends BaseCalculation {
  targetACOS: number;
  averageOrderValue: number;
}

interface CPACalculation extends BaseCalculation {
  targetCPA: number;
}

interface CPCCalculationResults {
  maxCPC: number;
  calculation: ACOSCalculation | CPACalculation;
  chartData?: ChartData[] | {
    conversion: ChartData[];
    cpa: ChartData[];
  };
}

export interface ChartData {
  name: string;
  acos?: number;  // for ACOS chart
  cpc?: number;   // for CPC chart
}