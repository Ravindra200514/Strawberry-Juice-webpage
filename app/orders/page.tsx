"use client";

import { useCart } from "@/lib/CartContext";
import Link from "next/link";
import ParticleBackground from "@/components/ParticleBackground";
import { useRouter } from "next/navigation";

export default function OrdersPage() {
  const { orders } = useCart();
  const router = useRouter();

  return (
    <main className="min-h-screen bg-background text-foreground relative flex flex-col items-center py-20 px-6">
      <ParticleBackground />
      
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        {/* Header */}
        <div className="text-center mb-16 px-4">
          <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-white transition-colors uppercase tracking-widest mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="m15 18-6-6 6-6"/></svg>
            Return to Home
          </Link>
          <h1 className="text-3xl md:text-5xl font-extrabold uppercase tracking-widest text-white mb-4">
            My Orders
          </h1>
          <p className="text-gray-400 font-light text-lg">
            You have placed <span className="text-primary font-bold">{orders.length}</span> order{orders.length === 1 ? '' : 's'}.
          </p>
        </div>

        {/* Orders List */}
        <div className="w-full flex flex-col gap-6">
          {orders.length === 0 ? (
            <div className="bg-black/40 backdrop-blur-md rounded-[2rem] p-12 border border-white/5 shadow-2xl flex flex-col items-center text-center">
              <svg className="w-16 h-16 text-gray-600 mb-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              <h2 className="text-xl font-bold tracking-widest uppercase text-white mb-2">No Orders Yet</h2>
              <p className="text-gray-500 mb-8 font-light">You haven't placed any orders during this session.</p>
              <Link href="/#shop" className="bg-primary text-background font-bold text-sm px-8 py-3 rounded-full uppercase tracking-widest hover-glow shadow-[0_0_20px_rgba(255,23,68,0.3)] hover:scale-105 active:scale-95 transition-all">
                Shop Now
              </Link>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="bg-black/40 backdrop-blur-md rounded-[2rem] p-6 md:p-8 border border-white/5 shadow-2xl group hover:border-white/10 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6 pb-6 border-b border-white/10">
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-widest uppercase mb-1">
                      Order <span className="text-primary font-mono">{order.id}</span>
                    </h3>
                    <p className="text-sm text-gray-500">Placed on {order.date}</p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Total</p>
                      <p className="font-bold text-white">₹{order.totalPrice.toLocaleString()}</p>
                    </div>
                    <button 
                      onClick={() => router.push(`/tracking/${order.id}`)}
                      className="ml-4 border border-white/20 hover:border-primary hover:text-primary text-white text-xs font-bold px-6 py-3 rounded-full uppercase tracking-widest transition-all"
                    >
                      Track
                    </button>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <h4 className="text-xs text-gray-500 uppercase tracking-widest">Items ({order.items.length})</h4>
                  {order.items.map(item => (
                    <div key={item.id} className="flex items-center gap-4 bg-white/5 p-3 rounded-xl border border-white/5">
                      <div className="w-10 h-10 bg-black rounded-lg border border-white/10 flex items-center justify-center shrink-0">
                        <svg className="text-primary w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.1-1.9-2.2-3.5a13 13 0 0 1 .5-2.7c1.7.5 3.3 1.5 4.2 2.8Z"/><path d="M14.1 6a4.7 4.7 0 0 0-4.1 4c4 1.5 6.4.2 7.6-1.5a4.7 4.7 0 0 0-3.5-2.5Z"/></svg>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-white">{item.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-sm font-medium text-white">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
