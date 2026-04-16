"use client";

import { useState, useEffect } from "react";
import Preloader from "@/components/Preloader";
import ParticleBackground from "@/components/ParticleBackground";
import ScrollAnimation from "@/components/ScrollAnimation";
import { useScrollFade } from "@/hooks/useScrollFade";
import { createClient } from "@/utils/supabase/client";
import { logout } from "@/app/login/actions";
import Link from "next/link";
import CartSidebar from "@/components/CartSidebar";
import { useCart } from "@/lib/CartContext";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const { toggleSidebar, addToCart, totalItems } = useCart();

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  // Hooks for scroll fade
  const { ref: heroRef, isVisible: heroVisible } = useScrollFade(0.4);
  const { ref: storyRef, isVisible: storyVisible } = useScrollFade(0.4);
  const { ref: featuresRef, isVisible: featuresVisible } = useScrollFade(0.4);
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollFade(0.4);

  return (
    <main className="relative bg-background min-h-screen text-foreground">
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      <ParticleBackground />
      
      {!loading && <ScrollAnimation />}

      <div className={`relative z-20 transition-opacity duration-1000 w-full ${loading ? "opacity-0" : "opacity-100"}`}>
        
        {/* HEADER NAVIGATION */}
        <header className="fixed top-0 left-0 w-full px-6 md:px-12 py-8 items-center justify-between flex z-50 pointer-events-auto">
          <div className="flex items-center gap-3">
            <div className="w-[6px] h-[6px] bg-white rounded-full"></div>
            <span className="text-white font-bold tracking-[0.4em] uppercase text-sm">Ruby Press</span>
          </div>
          <div className="flex items-center gap-6 md:gap-10 text-[11px] md:text-xs uppercase tracking-[0.2em] font-medium text-gray-300">
            <Link href="/about" className="hover:text-primary transition-colors cursor-pointer hidden md:block">
              Story
            </Link>
            {user ? (
              <form action={logout}>
                <button type="submit" className="hover:text-primary transition-colors cursor-pointer hidden md:block uppercase tracking-[0.2em]">
                  Sign Out
                </button>
              </form>
            ) : (
              <Link href="/login" className="hover:text-primary transition-colors cursor-pointer hidden md:block">
                Sign In
              </Link>
            )}
            <Link href="/orders" className="hover:text-primary transition-colors cursor-pointer hidden md:block">
              Orders
            </Link>
            <Link href="/track" className="hover:text-primary transition-colors cursor-pointer hidden md:block">
              Track Order
            </Link>
            <button 
              onClick={toggleSidebar}
              className="relative w-10 h-10 border border-gray-600 rounded-full flex items-center justify-center hover:border-primary hover:text-primary transition-all md:ml-4 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-background text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </header>


        {/* SECTION 1: HERO */}
        <section className="h-[200vh] w-full flex flex-col justify-start items-center pointer-events-none">
          {/* First 100vh holds the text near the bottom */}
          <div className="h-screen w-full flex flex-col justify-end items-center pb-[10vh] sm:pb-[15vh]">
            <div ref={heroRef} className="flex gap-3 sm:gap-6 mb-10 text-glow select-none">
              <span className={`text-4xl sm:text-6xl md:text-7xl font-extrabold transition-all duration-1000 delay-100 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>Pure.</span>
              <span className={`text-4xl sm:text-6xl md:text-7xl font-extrabold transition-all duration-1000 delay-300 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>Fresh.</span>
              <span className={`text-4xl sm:text-6xl md:text-7xl font-extrabold transition-all duration-1000 delay-500 text-primary ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>Premium.</span>
            </div>
          </div>
        </section>

        {/* SECTION 2: STORY */}
        <section className="h-[200vh] w-full flex flex-col justify-start px-6 sm:px-12 md:px-24 lg:px-40 pointer-events-none">
          <div ref={storyRef} className="h-screen relative flex items-center justify-start pointer-events-auto">
            {/* Ambient orb behind text */}
            <div className={`absolute -left-20 w-[30rem] h-[30rem] rounded-full glow-orb transition-opacity duration-1000 delay-300 ${storyVisible ? "opacity-100" : "opacity-0"}`}></div>
            
            <div className={`relative z-10 max-w-lg transition-all duration-1000 ease-out transform ${storyVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-24"}`}>
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-8 text-white leading-tight">
                Crafted with <span className="text-primary">Love</span>
              </h2>
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light tracking-wide">
                Every bottle is cold pressed from the freshest strawberries, delivering pure nutrition without compromise. Taste the raw elegance of nature.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2.5: FEATURES */}
        <section className="h-[150vh] w-full flex flex-col justify-center px-6 sm:px-12 md:px-24 lg:px-40 pointer-events-none">
          <div ref={featuresRef} className={`relative z-20 w-full transition-all duration-1000 ease-out transform ${featuresVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-24"} pointer-events-auto`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Card 1 */}
              <div className="bg-[#0f0f0f] border border-[#1a1a1a] hover:border-primary/40 hover:shadow-[0_0_40px_rgba(255,23,68,0.15)] transition-all duration-500 rounded-[1.5rem] p-10 flex flex-col items-center text-center group cursor-default">
                <div className="w-14 h-14 bg-[#1a1a1a] rounded-[1rem] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-inner group-hover:shadow-[0_0_20px_rgba(255,23,68,0.2)]">
                  <svg className="text-primary w-6 h-6 drop-shadow-[0_0_8px_rgba(255,23,68,0.5)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.1-1.9-2.2-3.5a13 13 0 0 1 .5-2.7c1.7.5 3.3 1.5 4.2 2.8Z"/><path d="M14.1 6a4.7 4.7 0 0 0-4.1 4c4 1.5 6.4.2 7.6-1.5a4.7 4.7 0 0 0-3.5-2.5Z"/></svg>
                </div>
                <h3 className="text-white text-xl font-bold mb-3 tracking-wide">Fresh Strawberries</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-light">Hand-picked at peak ripeness for maximum flavor.</p>
              </div>

              {/* Card 2 */}
              <div className="bg-[#0f0f0f] border border-[#1a1a1a] hover:border-primary/40 hover:shadow-[0_0_40px_rgba(255,23,68,0.15)] transition-all duration-500 rounded-[1.5rem] p-10 flex flex-col items-center text-center group cursor-default">
                <div className="w-14 h-14 bg-[#1a1a1a] rounded-[1rem] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-inner group-hover:shadow-[0_0_20px_rgba(255,23,68,0.2)]">
                  <svg className="text-primary w-6 h-6 drop-shadow-[0_0_8px_rgba(255,23,68,0.5)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>
                </div>
                <h3 className="text-white text-xl font-bold mb-3 tracking-wide">Pure Spring Water</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-light">Sourced from pristine mountain springs.</p>
              </div>

              {/* Card 3 */}
              <div className="bg-[#0f0f0f] border border-[#1a1a1a] hover:border-primary/40 hover:shadow-[0_0_40px_rgba(255,23,68,0.15)] transition-all duration-500 rounded-[1.5rem] p-10 flex flex-col items-center text-center group cursor-default">
                <div className="w-14 h-14 bg-[#1a1a1a] rounded-[1rem] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-inner group-hover:shadow-[0_0_20px_rgba(255,23,68,0.2)]">
                  <svg className="text-primary w-6 h-6 drop-shadow-[0_0_8px_rgba(255,23,68,0.5)]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
                </div>
                <h3 className="text-white text-xl font-bold mb-3 tracking-wide">Natural Sweetness</h3>
                <p className="text-gray-400 text-sm leading-relaxed font-light">No added sugars. Just pure fruit goodness.</p>
              </div>

            </div>
          </div>
        </section>

        {/* SECTION 3: CTA */}
        <section id="shop" className="h-[100vh] w-full flex flex-col justify-center items-center pointer-events-none relative overflow-visible">
          {/* Subtle radial gradient background behind the whole section */}
          <div className="absolute inset-x-0 bottom-0 h-full pointer-events-none z-0" style={{ background: 'radial-gradient(circle at center 60%, rgba(255, 23, 68, 0.15) 0%, rgba(5,5,5,0) 60%)'}}></div>
          
          <div ref={ctaRef} className={`relative z-20 flex flex-col items-center justify-center h-full transition-all duration-1000 ease-out transform ${ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}>
            <button 
              onClick={() => {
                if (!user) {
                  window.location.href = '/login';
                } else {
                  addToCart({
                    id: 'premium-juice',
                    name: 'Premium Strawberry Juice',
                    price: 999, // INR
                    quantity: 1
                  });
                }
              }}
              className="hover-glow bg-primary text-background font-bold text-lg md:text-2xl px-14 py-6 rounded-full uppercase tracking-widest mb-8 pointer-events-auto cursor-pointer shadow-[0_0_40px_rgba(255,23,68,0.4)] hover:scale-105 active:scale-95 transition-all"
            >
              Order Now
            </button>
            <p className="text-base md:text-lg text-secondary tracking-widest font-medium uppercase opacity-80">
              Free delivery on your first order
            </p>
          </div>
        </section>

      </div>
      <CartSidebar />
    </main>
  );
}
