"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/lib/CartContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ParticleBackground from "@/components/ParticleBackground";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart, addOrder } = useCart();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // If cart is empty and we haven't succeeded, redirect back
  useEffect(() => {
    if (items.length === 0 && !isSuccess) {
      router.push("/");
    }
  }, [items, isSuccess, router]);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing delay
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      // Generate mock order ID and add to state
      const mockOrderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);
      addOrder({
        id: mockOrderId,
        date: new Date().toLocaleDateString(),
        items: [...items],
        totalPrice: totalPrice,
      });
      clearCart();
      
      setTimeout(() => {
        router.push(`/tracking/${mockOrderId}`);
      }, 3000);
    }, 2000);
  };

  if (isSuccess) {
    return (
        <main className="min-h-screen bg-background text-foreground flex items-center justify-center relative">
          <ParticleBackground />
          <div className="relative z-10 p-10 max-w-md w-full flex flex-col items-center text-center animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(34,197,94,0.3)] border border-green-500/30">
              <svg className="w-12 h-12 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <h1 className="text-3xl font-bold mb-4 tracking-wider uppercase text-white">Payment Successful</h1>
            <p className="text-gray-400 mb-8 font-light">Your premium strawberry juice is on its way. Thank you for your order!</p>
            <div className="text-sm tracking-widest uppercase text-gray-500">Redirecting to order tracking...</div>
          </div>
        </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground relative flex items-center justify-center py-12 px-6">
      <ParticleBackground />
      
      <div className="relative z-10 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 animate-in fade-in slide-in-from-bottom-12 duration-700">
        
        {/* Order Summary */}
        <div className="bg-black/40 backdrop-blur-md rounded-[2rem] p-8 border border-white/5 order-2 md:order-1 h-fit">
          <h2 className="text-xl font-bold tracking-widest uppercase text-white mb-6">Order Summary</h2>
          <div className="space-y-4 mb-8">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center border border-white/10">
                    <svg className="text-primary w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.1-1.9-2.2-3.5a13 13 0 0 1 .5-2.7c1.7.5 3.3 1.5 4.2 2.8Z"/><path d="M14.1 6a4.7 4.7 0 0 0-4.1 4c4 1.5 6.4.2 7.6-1.5a4.7 4.7 0 0 0-3.5-2.5Z"/></svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">{item.name}</h3>
                    <p className="text-gray-400 text-xs">Qty: {item.quantity}</p>
                  </div>
                </div>
                <div className="font-medium text-white">₹{(item.price * item.quantity).toLocaleString()}</div>
              </div>
            ))}
          </div>

          <div className="space-y-3 pt-6 border-t border-white/10 text-sm">
            <div className="flex justify-between text-gray-400">
              <span>Subtotal</span>
              <span>₹{totalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Shipping</span>
              <span className="text-green-400">Free</span>
            </div>
            <div className="flex justify-between text-white font-bold text-xl pt-4 mt-2 border-t border-white/10 tracking-wider">
              <span>Total</span>
              <span className="text-primary">₹{totalPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Mock Payment Form */}
        <div className="bg-white/[0.02] backdrop-blur-md rounded-[2rem] p-8 border border-white/10 order-1 md:order-2 shadow-2xl">
          <Link href="/" className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors uppercase tracking-widest mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="m15 18-6-6 6-6"/></svg>
            Back to Cart
          </Link>
          
          <h2 className="text-2xl font-bold tracking-widest uppercase text-white mb-2">Secure Payment</h2>
          <p className="text-sm text-gray-400 mb-8">This is a mock gateway for demonstration purposes.</p>

          <form onSubmit={handlePayment} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gray-400">Email Address</label>
              <input required type="email" placeholder="you@example.com" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-light" />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gray-400">Card Information</label>
              <div className="relative">
                <input required type="text" placeholder="Card Number (Dummy)" maxLength={19} className="w-full bg-black/50 border border-white/10 rounded-t-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-light z-10 relative" />
                <div className="flex border-x border-b border-white/10 rounded-b-xl overflow-hidden bg-black/50 relative z-0">
                  <input required type="text" placeholder="MM/YY" maxLength={5} className="w-1/2 bg-transparent px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all border-r border-white/10 font-light" />
                  <input required type="text" placeholder="CVC" maxLength={3} className="w-1/2 bg-transparent px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-light" />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gray-400">Name on Card</label>
              <input required type="text" placeholder="Full Name" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all font-light" />
            </div>

            <button 
              type="submit" 
              disabled={isProcessing}
              className={`w-full bg-primary text-background font-bold text-lg py-4 rounded-xl uppercase tracking-widest mt-4 transition-all ${isProcessing ? "opacity-70 cursor-not-allowed" : "hover-glow shadow-[0_0_20px_rgba(255,23,68,0.3)] hover:scale-[1.02] active:scale-95"}`}
            >
              {isProcessing ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Processing...
                </span>
              ) : (
                `Pay ₹${totalPrice.toLocaleString()}`
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
