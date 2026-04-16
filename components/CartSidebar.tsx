"use client";

import React from "react";
import { useCart } from "@/lib/CartContext";
import { useRouter } from "next/navigation";

export default function CartSidebar() {
  const { isSidebarOpen, closeSidebar, items, updateQuantity, removeFromCart, totalPrice } = useCart();
  const router = useRouter();

  if (!isSidebarOpen) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-[100] backdrop-blur-sm transition-opacity duration-300" 
        onClick={closeSidebar}
      />
      
      {/* Sidebar sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-[#0a0a0a] border-l border-white/10 z-[101] shadow-2xl transform transition-transform duration-500 ease-in-out flex flex-col ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold tracking-widest uppercase text-white">Your Cart</h2>
          <button 
            onClick={closeSidebar}
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center opacity-50 space-y-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              <p className="text-lg tracking-widest uppercase">Your cart is empty</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="w-20 h-20 bg-black rounded-xl border border-white/10 flex items-center justify-center overflow-hidden">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <svg className="text-primary w-6 h-6 drop-shadow-[0_0_8px_rgba(255,23,68,0.5)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.1-1.9-2.2-3.5a13 13 0 0 1 .5-2.7c1.7.5 3.3 1.5 4.2 2.8Z"/><path d="M14.1 6a4.7 4.7 0 0 0-4.1 4c4 1.5 6.4.2 7.6-1.5a4.7 4.7 0 0 0-3.5-2.5Z"/></svg>
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <h3 className="text-white font-bold text-sm tracking-wide">{item.name}</h3>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-500 hover:text-red-500 transition-colors p-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3 bg-black px-3 py-1 rounded-full border border-white/10">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-gray-400 hover:text-white pb-1"
                      >-</button>
                      <span className="text-white text-sm font-medium w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-gray-400 hover:text-white"
                      >+</button>
                    </div>
                    
                    <span className="text-primary font-bold">₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-white/10 bg-black/20">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-400 uppercase tracking-widest text-sm">Total Amount</span>
              <span className="text-3xl font-bold text-white tracking-wide">₹{totalPrice.toLocaleString()}</span>
            </div>
            
            <button 
              onClick={() => {
                closeSidebar();
                router.push('/checkout');
              }}
              className="w-full bg-primary text-background font-bold text-lg py-5 rounded-full uppercase tracking-widest hover-glow shadow-[0_0_20px_rgba(255,23,68,0.3)] hover:scale-[1.02] active:scale-95 transition-all text-center"
            >
              Secure Checkout
            </button>
            <p className="text-center text-xs text-gray-500 mt-4 tracking-wider uppercase font-medium">Free shipping included</p>
          </div>
        )}
      </div>
    </>
  );
}
