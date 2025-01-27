"use client";
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/cpc-calculator'); // Redirects to the PPCCalculator route
  }, []);

  return (
    <div>
      <h1>Loading...</h1>
      <p>This page will redirect you to the Amazon Ads Spend Calculator.</p>
    </div>
  );
}
