"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { calculateCPCByCPA } from "@/lib/calculator";
// import type { CPCCalculationResults } from "@/types/calculator";

// interface Props {
//   onCalculate: (results: CPCCalculationResults) => void;
// }



// Define the validation schema
const formSchema = z.object({
  targetCPA: z
    .preprocess(
      (value) => (typeof value === 'string' && value !== '' ? Number(value) : 0), // Convert string to number, default to 0
      z.number({ required_error: "Target CPA is required" })
        .positive("CPA must be greater than 0") // Ensure CPA is greater than 0
    ),
  
  conversionRate: z
    .preprocess(
      (value) => (typeof value === 'string' && value !== '' ? Number(value) : 0), // Convert string to number, default to 0
      z.number({ required_error: "Conversion rate is required" })
        .min(0, "Conversion rate must be greater than or equal to 0") // Ensure conversion rate is at least 0
        .max(100, "Conversion rate must be at most 100") // Ensure conversion rate is at most 100
    )
});

// The form component using useForm with Zod validation
export function CPCByCPAForm({ onCalculate }: any) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      targetCPA: 0,  // Set as string '0' for default value
      conversionRate: 0  // Set as string '0' for default value
    }
  });


  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const results = calculateCPCByCPA(values);
      onCalculate(results);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Card >
      <CardHeader>
        <CardTitle>CPC Calculator by CPA Target</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="targetCPA"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Cost per Acquisition ($)</FormLabel>
                  <p className="text-sm text-gray-500 mb-2">This is the maximum amount you want to pay to acquire a customer</p>
                  <FormControl>
                    <Input 
                      type="number"
                      step="0.01"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="conversionRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Conversion Rate (%)</FormLabel>
                  <p className="text-sm text-gray-500 mb-2">This is your or your category conversion rate on ads. Conversion rate is calucated as ad orders divided by ad clicks.</p>
                  <FormControl>
                    <Input 
                      type="number"
                      step="0.01"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">Calculate</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}