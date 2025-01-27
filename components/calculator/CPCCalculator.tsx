"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {CPCByACOSForm} from "./CPCByACOSForm"
import { CPCByCPAForm } from "./CPCByCPAForm";
import { CPCResults } from "./CPCResults";
// import type { CPCCalculationResults } from "@/types/calculator";

export function CPCCalculator() {
  const [acosResults, setAcosResults] = useState<any | null>(null);
  const [cpaResults, setCpaResults] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState("acos");

  const currentResults = activeTab === "acos" ? acosResults : cpaResults;

  return (
    <div className="container max-w-8xl mx-auto px-9 py-4 sm:py-8">
      <div className="bg-white">
      <h2 className="text-2xl font-bold mb-6">CPC Amazon PPC max cost-per-click Calculator</h2>
        
        <div className="mb-8 ">
          {activeTab === "acos" ? (
            <>
              <h3 className="text-base font-bold mb-4 text-left">Max CPC by Target ACOS</h3>
              <p className="text-gray-700 mb-4">
                Calculate your max. CPC by Target ACOS. This simple calculator takes into account your product's average order value (AOV or ASP), Target ACOS and Conversion rate on Amazon Ads to suggest max. CPC. Please note that the CPC calculated from your data is an average account level CPC. On a granular level, you will have keywords higher than this CPC as well as lower than it.
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 leading-8">
                <li>Step 1: Enter you product AOV or ASP</li>
                <li>Step 2: Enter your target ACOS</li>
                <li>Step 3: Enter your conversion rate on amazon ads. Click Calculate.</li>
              </ul>
            </>
          ) : (
            <>
              <h2 className="text-base font-bold mb-4 text-left">Max CPC by Target CPA</h2>
              <p className="text-gray-700 mb-4">
                Calculate your max. CPC by Target CPA (Cost per acquisition). This method of finding max CPC is mostly used by CPG brands who take into account subscribe and save audience and have a high cost per acquisition allowance. This simple calculator takes into account your product's average order value (AOV or ASP) and Conversion rate on Amazon Ads to suggest max. CPC. Please note that the CPC calculated from your data is an average account level CPC. On a granular level, you will have keywords higher than this CPC as well as lower than it.
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-4 leading-8">
                <li>Step 1: Enter you product AOV or ASP</li>
                <li>Step 2: Enter your conversion rate on amazon ads. Click Calculate.</li>
              </ul>
            </>
          )}
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-start">
          <div className="lg:col-span-5 mb-6 lg:mb-0">
            <div className="bg-card rounded-xl p-4 sm:p-6 shadow-md h-full  border-dashed border-2">
              <Tabs 
                defaultValue="acos" 
                className="space-y-6 p-2"
                onValueChange={setActiveTab}
              >
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="acos" className="text-sm md:text-base">By Target ACOS</TabsTrigger>
                  <TabsTrigger value="cpa" className="text-sm md:text-base">By CPA Target</TabsTrigger>
                </TabsList>

                <TabsContent value="acos" className="mt-6">
                  <CPCByACOSForm onCalculate={setAcosResults} />
                </TabsContent>

                <TabsContent value="cpa" className="mt-6">
                  <CPCByCPAForm onCalculate={setCpaResults} />
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <div className="lg:col-span-7">
            {currentResults && (
              <div className="border-dashed border-2 bg-card rounded-xl p-4 sm:p-6 shadow-md h-full">
                <CPCResults results={currentResults} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}