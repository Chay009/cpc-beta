"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ChartData } from "@/types/calculator";

interface Props {
  data: ChartData[];
  conversionRate: number;
  averageOrderValue: number;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <p className="text-sm font-medium">ACOS: {label}</p>
        <p className="text-sm font-bold text-primary">
          Max CPC: ${payload[0].value.toFixed(2)}
        </p>
      </div>
    );
  }
  return null;
};

export function AcosChart({ data, conversionRate, averageOrderValue }: Props) {
  // Calculate the ACOS range from the data
  const acosValues = data.map(d => parseFloat(d.name.replace(/[^0-9.]/g, '')));
  const minAcos = Math.min(...acosValues);
  const maxAcos = Math.max(...acosValues);

  return (
    <Card className="h-full w-full">
      <CardHeader className="pb-2">
        <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm sm:text-base gap-2">
          <span>Max CPC Range</span>
          <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1 sm:gap-2">
            <span className="text-xs sm:text-sm font-normal text-muted-foreground">
              By Target ACOS %
            </span>
            <span className="text-xs sm:text-sm font-medium text-muted-foreground">
              (CVR: {conversionRate}%, AOV: ${averageOrderValue}, ACOS: {minAcos}% - {maxAcos}%)
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[calc(100%-4rem)] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart 
            data={data} 
            margin={{ 
              top: 10, 
              right: 5, 
              bottom: 20, 
              ...window?.innerWidth < 640 ? { left: -20 } : { left: 10 }
            }}
          >
            <defs>
              <linearGradient id="colorAcos" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgb(59, 130, 246)" stopOpacity={0.9}/>
                <stop offset="95%" stopColor="rgb(59, 130, 246)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false}
              stroke="hsl(var(--muted-foreground))"
              opacity={0.2}
            />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ 
                fill: 'hsl(var(--muted-foreground))',
                fontSize: window?.innerWidth < 640 ? 10 : 12
              }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ 
                fill: 'hsl(var(--muted-foreground))',
                fontSize: window?.innerWidth < 640 ? 10 : 12
              }}
              tickFormatter={(value) => `$${value.toFixed(2)}`}
              dx={-10}
              width={60}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="acos"
              stroke="rgb(59, 130, 246)"
              strokeWidth={2}
              fill="url(#colorAcos)"
              animationDuration={1500}
              animationEasing="ease-in-out"
              dot={{ 
                r: window?.innerWidth < 640 ? 2 : 4, 
                fill: "hsl(var(--background))", 
                strokeWidth: 2 
              }}
              activeDot={{ 
                r: window?.innerWidth < 640 ? 4 : 6, 
                fill: "rgb(59, 130, 246)",
                strokeWidth: 0
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}