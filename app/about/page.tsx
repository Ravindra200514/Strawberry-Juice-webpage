"use client";

import Link from "next/link";
import ParticleBackground from "@/components/ParticleBackground";
import { useScrollFade } from "@/hooks/useScrollFade";

export default function AboutPage() {
  const { ref: section1, isVisible: isSec1Visible } = useScrollFade(0.2);
  const { ref: section2, isVisible: isSec2Visible } = useScrollFade(0.2);
  const { ref: section3, isVisible: isSec3Visible } = useScrollFade(0.2);

  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <ParticleBackground />

      {/* Navigation Header */}
      <header className="absolute top-0 left-0 w-full px-6 md:px-12 py-8 flex z-50">
        <Link href="/" className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors uppercase tracking-widest bg-black/50 p-3 rounded-full backdrop-blur-md border border-white/5">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="m15 18-6-6 6-6"/></svg>
          Back to Origin
        </Link>
      </header>

      {/* Hero Section */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center pt-24 px-6 md:px-20 relative text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000">
          <span className="text-secondary tracking-[0.4em] uppercase text-xs font-bold mb-4 block">The Strawberry Story</span>
          <h1 className="text-5xl md:text-7xl font-extrabold uppercase tracking-widest text-white mb-8">
            Nature&apos;s <span className="text-primary italic">Perfection</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed font-light">
            We embarked on a journey to bottle the purest essence of nature without any compromises. No artificial additives, no refined sugars, just the raw elegance of meticulously cold-pressed strawberries.
          </p>
        </div>
      </section>

      {/* About The Product Section */}
      <section ref={section1} className={`py-24 px-6 md:px-20 w-full transition-all duration-1000 transform ${isSec1Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="bg-white/5 backdrop-blur-lg rounded-[3rem] border border-white/10 aspect-square flex items-center justify-center relative overflow-hidden group shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <img 
              src="/juice_bottle.png" 
              alt="Premium Strawberry Juice Bottle"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 relative z-10"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-widest text-white mb-6">Our Process</h2>
            <div className="space-y-6 text-gray-400 font-light leading-relaxed text-lg">
              <p>
                Each bottle begins its life in high-altitude organic farms, where the crisp mountain air and mineral-rich soils produce berries of unparalleled sweetness and aroma.
              </p>
              <p>
                We hand-pick every strawberry at the precise peak of ripeness. Within 24 hours of harvesting, the berries undergo our proprietary cold-press hydraulic extraction. Heat destroys nutrients—so we strictly avoid it. This meticulous process ensures every drop retains its dynamic antioxidants, live enzymes, and vibrant, tart-sweet flavor profile.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Nutrition Details Section */}
      <section ref={section2} className={`py-24 px-6 md:px-20 w-full bg-black/50 border-y border-white/5 transition-all duration-1000 transform ${isSec2Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-widest text-white mb-16">Nutritional Transparency</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Calories", value: "45", unit: "kcal" },
              { label: "Vitamin C", value: "120", unit: "% DV" },
              { label: "Added Sugar", value: "0", unit: "g" },
              { label: "Antioxidants", value: "3x", unit: "Standard" }
            ].map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-primary/50 transition-colors">
                <span className="text-sm uppercase tracking-widest text-gray-500 mb-4">{stat.label}</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-primary">{stat.value}</span>
                  <span className="text-sm font-bold text-white">{stat.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Bottom Section */}
      <section ref={section3} className={`min-h-[40vh] flex flex-col items-center justify-center px-6 text-center transition-all duration-1000 transform ${isSec3Visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}`}>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Ready to Elevate Your Vitality?</h2>
        <Link href="/#shop" className="hover-glow bg-primary text-background font-bold text-lg md:text-xl px-12 py-5 rounded-full uppercase tracking-widest shadow-[0_0_40px_rgba(255,23,68,0.4)] hover:scale-105 active:scale-95 transition-all">
          Experience Pure Grace
        </Link>
      </section>
      
    </main>
  );
}
