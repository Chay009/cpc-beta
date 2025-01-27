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
import { calculateCPCByACOS } from "@/lib/calculator";
// import type { CPCCalculationResults } from "@/types/calculator";

const formSchema = z.object({
  targetACOS: z
    .preprocess(
      (value) => (typeof value === 'string' && value !== '' ? Number(value) : 0), // Convert string to number, default to 0
      z.number({ required_error: "Target ACOS is required" })
        .min(0, "Target ACOS must be greater than or equal to 0") // Add min validation
        .max(100, "Target ACOS cannot exceed 100") // Add max validation
    ),
  conversionRate: z
    .preprocess(
      (value) => (typeof value === 'string' && value !== '' ? Number(value) : 0), // Convert string to number, default to 0
      z.number({ required_error: "Conversion rate is required" })
        .min(0, "Conversion rate must be greater than or equal to 0") // Add min validation
        .max(100, "Conversion rate cannot exceed 100") // Add max validation
    ),
  averageOrderValue: z
    .preprocess(
      (value) => (typeof value === 'string' && value !== '' ? Number(value) : 0), // Convert string to number, default to 0
      z.number({ required_error: "Average order value is required" })
        .min(0, "Average order value must be greater than or equal to 0") // Add min validation
    )
});


// interface Props {
//   onCalculate: (results: CPCCalculationResults) => void;
// }

export function CPCByACOSForm({ onCalculate }: any) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      targetACOS: 0,  // Default as string
      conversionRate: 0, // Default as string
      averageOrderValue: 0 // Default as string
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const results = calculateCPCByACOS(values);
      onCalculate(results);
    console.log(results)
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }
// Target acos (This is ACOS that you want to achieve)
  
  // Conversion rate (This is your or your category's conversion rate on ads. Conversion rate is calculated as Ad orders/ Ad clicks)
  // Average Order Value (This is your product's average price or ASP)
  return (
    <Card>
      <CardHeader>
        <CardTitle>CPC Calculator by Target ACOS</CardTitle>
      </CardHeader>
      <CardContent>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
        
        <FormField
          control={form.control}
          name="targetACOS"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target ACOS (%)</FormLabel>
              <p className="text-sm text-gray-500 mb-2">This is ACOS that you want to achieve.</p>
              <FormControl>
                <Input 
                placeholder=""
                type="number"
                {...field} />
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
              <p className="text-sm text-gray-500 mb-2">This is your conversion rate on ads. Conversion rate is calculated as Ad orders/ Ad clicks</p>
              <FormControl>
                <Input 
                placeholder=""
                type="number"
                {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="averageOrderValue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Average Order Value ($)</FormLabel>
              <p className="text-sm text-gray-500 mb-2">This is your product's average price or ASP</p>
              <FormControl>
                <Input 
                placeholder=""
                type="number"
                {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-blue-600 w-full hover:bg-blue-700">Calculate</Button>
      </form>
    </Form>
      </CardContent>
    </Card>
  );
}