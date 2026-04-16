"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ParticleBackground from "@/components/ParticleBackground";

export default function TrackingPage({ params }: { params: { orderId: string } }) {
  const [currentStep] = useState(1);
  const { orderId } = params;

  // The order logically starts at "Order Placed". Let it hold there statically.
  useEffect(() => {
    // Deliberately empty; we hold on "Order Placed".
  }, []);

  const steps = [
    { id: 1, title: "Order Placed", desc: "We have received your order." },
    { id: 2, title: "Processing", desc: "Cold-pressing your fresh strawberries." },
    { id: 3, title: "Shipped", desc: "Your juice is out for delivery." },
    { id: 4, title: "Delivered", desc: "Enjoy your premium juice!" }
  ];

  return (
    <main className="min-h-screen bg-background text-foreground relative flex flex-col items-center py-20 px-6">
      <ParticleBackground />
      
      <div className="relative z-10 w-full max-w-3xl flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        {/* Header */}
        <div className="text-center mb-16">
          <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-white transition-colors uppercase tracking-widest mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="m15 18-6-6 6-6"/></svg>
            Return to Home
          </Link>
          <h1 className="text-3xl md:text-5xl font-extrabold uppercase tracking-widest text-white mb-4">
            Track Order
          </h1>
          <p className="text-primary font-mono text-lg">{orderId}</p>
        </div>

        {/* Tracking Timeline */}
        <div className="bg-black/40 backdrop-blur-md rounded-[2rem] p-8 md:p-12 border border-white/5 w-full shadow-2xl relative">
          
          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
            {steps.map((step) => {
              const isActive = currentStep >= step.id;

              return (
                <div key={step.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  
                  {/* Icon */}
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full border-4 border-black shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_0_4px_rgba(0,0,0,1)] z-10 transition-colors duration-500 ${isActive ? "bg-primary text-white" : "bg-white/10 text-gray-500"}`}>
                    {isActive ? (
                      <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    ) : (
                      <span className="font-bold text-sm">{step.id}</span>
                    )}
                  </div>

                  {/* Card */}
                  <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-2xl border transition-all duration-500 ${isActive ? "bg-white/5 border-primary/30 shadow-[0_0_20px_rgba(255,23,68,0.1)]" : "bg-black/50 border-white/5"}`}>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className={`font-bold text-lg tracking-wide ${isActive ? "text-white" : "text-gray-500"}`}>{step.title}</h3>
                    </div>
                    <div className={`text-sm font-light ${isActive ? "text-gray-300" : "text-gray-600"}`}>
                      {step.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
        
      </div>
    </main>
  );
}
