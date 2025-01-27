import { CpcChart } from "@/components/calculator/Chart_Cpc";

export const calculateCPCByACOS = (data: CPCByACOSInputs): CPCCalculationResults => {
  const maxCPC = (data.conversionRate / 100) * data.averageOrderValue * (data.targetACOS / 100);
  
  // Generate chart data points
  const chartData = generateACOSChartData(data.targetACOS, data.conversionRate, data.averageOrderValue);
  
  return {
    maxCPC,
    calculation: {
      maxCPC,
      conversionRate: data.conversionRate,
      targetACOS: data.targetACOS,
      averageOrderValue: data.averageOrderValue,
      formula: 'Max CPC = (CVR / 100) × AOV × (Target ACOS / 100)'
    },
    chartData
  };
};

export const calculateCPCByCPA = (data: CPCByCPAInputs): CPCCalculationResults => {
  const maxCPC = (data.conversionRate / 100) * data.targetCPA;
  
  // Generate both conversion and CPA variation chart data
  const conversionChartData = generateCPCChartData(data.targetCPA, data.conversionRate, 'conversion');
  const cpaChartData = generateCPCChartData(data.targetCPA, data.conversionRate, 'cpa');

  return {
    maxCPC,
    calculation: {
      maxCPC,
      conversionRate: data.conversionRate,
      targetCPA: data.targetCPA,
      formula: 'Max CPC = (CVR / 100) × Target CPA'
    },
    chartData: {
      conversion: conversionChartData,
      cpa: cpaChartData
    }
  };
};

function generateACOSChartData(targetACOS: number, conversionRate: number, aov: number): ChartData[] {
  const minACOS = Math.max(targetACOS - 10, 1);
  const maxACOS = targetACOS + 10;
  const step = (maxACOS - minACOS) / 5;
  
  return Array.from({ length: 6 }, (_, i) => {
    const acos = minACOS + (step * i);
    return {
      name: `${acos.toFixed(1)}%`,
      acos: (conversionRate / 100) * aov * (acos / 100)
    };
  });
}

function generateCPCChartData(targetCPA: number, conversionRate: number, variation: 'conversion' | 'cpa'): ChartData[] {
  if (variation === 'conversion') {
    // Generate data points for conversion rate variations (±5% from current rate)
    const minRate = Math.max(conversionRate - 5, 0);
    const maxRate = Math.min(conversionRate + 5, 100);
    const step = (maxRate - minRate) / 5;

    return Array.from({ length: 6 }, (_, i) => {
      const rate = minRate + (step * i);
      return {
        name: `${rate.toFixed(1)}%`,
        cpc: (targetCPA * rate) / 100
      };
    });
  } else {
    // Generate data points for CPA variations (±20% from target)
    const minCPA = targetCPA * 0.8;
    const maxCPA = targetCPA * 1.2;
    const step = (maxCPA - minCPA) / 5;

    return Array.from({ length: 6 }, (_, i) => {
      const cpa = minCPA + (step * i);
      return {
        name: `$${cpa.toFixed(0)}`,
        cpc: (cpa * conversionRate) / 100
      };
    });
  }
}