"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ParticleBackground from "@/components/ParticleBackground";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const router = useRouter();

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim()) {
      router.push(`/tracking/${orderId.trim()}`);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground relative flex items-center justify-center py-12 px-6">
      <ParticleBackground />
      
      <div className="relative z-10 max-w-lg w-full bg-black/40 backdrop-blur-md rounded-[2rem] p-8 md:p-12 border border-white/5 shadow-2xl animate-in fade-in zoom-in duration-700 text-center">
        <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-white transition-colors uppercase tracking-widest mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="m15 18-6-6 6-6"/></svg>
          Return to Home
        </Link>
        
        <h1 className="text-3xl font-bold tracking-widest uppercase text-white mb-2">Track Your Order</h1>
        <p className="text-sm text-gray-400 mb-8 font-light leading-relaxed">
          Enter your Order ID below to receive real-time updates on your premium strawberry juice delivery.
        </p>

        <form onSubmit={handleTrack} className="space-y-6">
          <div className="space-y-2 text-left">
            <label className="text-xs uppercase tracking-widest text-gray-400 ml-1">Order ID</label>
            <input 
              required 
              type="text" 
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="e.g. ORD-123456" 
              className="w-full bg-black/50 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-mono tracking-wider text-center text-lg" 
            />
          </div>

          <button 
            type="submit" 
            disabled={!orderId}
            className="w-full bg-primary text-background font-bold text-lg py-4 rounded-xl uppercase tracking-widest transition-all hover-glow shadow-[0_0_20px_rgba(255,23,68,0.3)] hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:pointer-events-none disabled:scale-100"
          >
            Track Order
          </button>
        </form>
      </div>
    </main>
  );
}
