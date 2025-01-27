"use client";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductAdv from "./components/ProductAdv";
import FAQ from "./components/FAQ";

import { useState } from "react";
import { CPCCalculator } from "@/components/calculator/CPCCalculator";




export default function PpcAuditCalculator() {

  const [bookDemo, setBookDemo] = useState(false);

  return (
   
      <div className="min-h-screen bg-gradient-to-b from-orange-100 via-pink-100 to-blue-100">
        <Header />
        <div className="p-8 rounded-lg shadow-md mx-auto">
          <div className="bg-white rounded-lg">
         <CPCCalculator/>
            <FAQ faqs={faqs} imagePath="/assets"/>
            <ProductAdv setBookDemo={setBookDemo}/>
            <Footer />
          </div>
        </div>
      </div>
   
  );
}

const faqs = [
  {
    question: 'Why do we need to calculate max cost per click (CPC)?',
    answer: [
      { text: 'By calculating your max. CPC, you can align your advertising and bid operations strategy to your target ACOS or allowable customer acquisition cost. It will help you make better decisions about Amazon Ad spends and new customer acquisition. This tool will help you quickly calculate optimal bids for your products.' },
    ],
  },
  {
    question: 'How can I use this calculator to calculate max CPC w.r.t target ACOS?',
    answer: [
      { text: 'This simple calculator takes into account your product\'s average order value (AOV or ASP), Target ACOS and Conversion rate on Amazon Ads to suggest max. CPC. Please note that the CPC calculated from your data is an average account level CPC. On a granular level, you will have keywords higher than this CPC as well as lower than it. Use following steps to use this calculator' },
    ],
    steps: [
      { text: 'Step 1: Enter you product AOV or ASP' },
      { text: 'Step 2: Enter your target ACOS' },
      { text: 'Step 3: Enter your conversion rate on amazon ads. Click Calculate.' },
    ],
    additionalInfo: [
      { text: 'The calculator will display the max. CPC on Right Hand Side. Along with that, you will see a graph of ACOS vs. CPC which will help you take a decision on ACOS targets.' }
    ]
  },
  {
    question: 'How can I use this calculator to calculate max CPC w.r.t target Cost Per Acquisition (CPA)?',
    answer: [
      { text: 'This simple calculator takes into account your product\'s target cost per acquisition and Conversion rate on Amazon Ads to suggest max. CPC. Please note that the CPC calculated from your data is an average account level CPC. On a granular level, you will have keywords higher than this CPC as well as lower than it.' },
    ],
    steps: [
      { text: 'Step 1: Enter you product Target CPA' },
      { text: 'Step 2: Enter your conversion rate on amazon ads. Click Calculate.' },
    ],
  },
  {
    question: 'How long will it take to run this tool and get results?',
    answer: [
      { text: 'It will take you less than 5 seconds to get the calculated max CPC. Just enter your variables and your data will be calculated.' },
    ],
  },
  {
    question: 'What should I do if I am facing an issue on this calculator?',
    answer: [
      { text: 'Sorry to hear that. If you can provide your feedback then our team will address this on priority and will get back to you. Please provide your feedback' },
      { link: { text: 'here', url: 'https://share.hsforms.com/2MJK9OXhHRvG-Eft2TQvvTgnmtwi' } },
    ],
  },
];
