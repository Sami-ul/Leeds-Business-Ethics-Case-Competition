"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import dynamic from 'next/dynamic';

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const CircleMarker = dynamic(() => import('react-leaflet').then(mod => mod.CircleMarker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

/**
 * Leeds Ethics Scroll-Deck — Interactive presentation component
 *
 * Features:
 * - Palantir-inspired design with white background and bold typography
 * - Apple-style scroll animations with spring physics
 * - Dynamic navigation bar that shows quote after scrolling
 * - Keyboard navigation (↑/↓ or PageUp/PageDown to jump sections)
 * - Press P to toggle print mode
 * - Edit the DATA object below with your case content
 */

// Real Map with Leaflet
const MountainWestMap = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const stores = [
    { lat: 43.6150, lon: -116.2023, city: "Boise, ID", count: 8 },
    { lat: 40.7608, lon: -111.8910, city: "Salt Lake City, UT", count: 22 },
    { lat: 39.7392, lon: -104.9903, city: "Denver, CO", count: 28 },
    { lat: 38.8339, lon: -104.8214, city: "Colorado Springs, CO", count: 12 },
    { lat: 35.0844, lon: -106.6504, city: "Albuquerque, NM", count: 15 },
    { lat: 41.1400, lon: -104.8202, city: "Cheyenne, WY", count: 7 },
    { lat: 39.5296, lon: -119.8138, city: "Reno, NV", count: 8 },
  ];

  if (!mounted) {
    return (
      <div className="my-8 max-w-4xl mx-auto bg-slate-900 rounded-xl p-8 shadow-2xl border border-slate-700">
        <div className="w-full aspect-[16/10] bg-slate-950 rounded-lg flex items-center justify-center text-slate-400">
          Loading map...
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="my-8 max-w-4xl mx-auto bg-slate-900 rounded-xl p-8 shadow-2xl border border-slate-700"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden border border-slate-700">
        {/* @ts-ignore - React Leaflet type issues with dynamic imports */}
        <MapContainer
          center={[39.5, -109] as [number, number]}
          zoom={5}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
          dragging={false}
          scrollWheelZoom={false}
          doubleClickZoom={false}
          touchZoom={false}
        >
          {/* @ts-ignore */}
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          {stores.map((store, i) => (
            // @ts-ignore
            <CircleMarker
              key={i}
              center={[store.lat, store.lon] as [number, number]}
              radius={Math.sqrt(store.count) * 2}
              fillColor="#3b82f6"
              fillOpacity={0.7}
              color="#60a5fa"
              weight={2}
            >
              {/* @ts-ignore */}
              <Popup>
                <div className="text-sm">
                  <div className="font-bold text-blue-600">{store.city}</div>
                  <div className="text-gray-700">{store.count} stores</div>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>

      <motion.div 
        className="mt-4 flex items-center justify-center gap-6 text-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50" />
          <span className="text-slate-300">Store Location</span>
        </div>
        <div className="text-slate-400">Total: <span className="text-blue-400 font-semibold">100 stores</span></div>
      </motion.div>
    </motion.div>
  );
};

// Escalation Path Diagram
const EscalationDiagram = () => {
  return (
    <motion.div
      className="my-12 flex flex-col md:flex-row items-center justify-center gap-8 max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {[
        { icon: "🏪", label: "Store Rep", desc: "First contact" },
        { icon: "🌎", label: "Regional Manager", desc: "Review & escalate" },
        { icon: "⚖️", label: "HR Final Verdict", desc: "Final decision" }
      ].map((step, i) => (
        <React.Fragment key={i}>
          <motion.div
            className="flex flex-col items-center gap-3 bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-2xl border-2 border-black/10 min-w-[180px]"
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            whileHover={{ scale: 1.05, borderColor: "rgba(0,0,0,0.3)" }}
          >
            <div className="text-5xl mb-2">{step.icon}</div>
            <div className="text-xl font-bold text-gray-900 text-center">{step.label}</div>
            <div className="text-sm text-gray-600 text-center">{step.desc}</div>
          </motion.div>
          {i < 2 && (
            <motion.div
              className="hidden md:block text-4xl text-gray-400"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 + 0.3 }}
            >
              →
            </motion.div>
          )}
        </React.Fragment>
      ))}
    </motion.div>
  );
};

// Price Guardrails Chart
const PriceGuardrailsChart = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const dataPoints = 52; // weeks in a year
  const basePrice = 3.30;
  const stdDev = 0.15;
  
  // Generate mock yearly data with deterministic values (seeded random)
  const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };

  const historicalPrices = Array.from({ length: dataPoints }, (_, i) => {
    const trend = Math.sin((i / dataPoints) * Math.PI * 2) * 0.08;
    const noise = (seededRandom(i * 123.456) - 0.5) * 0.06;
    return basePrice + trend + noise;
  });

  const maxPrice = basePrice + stdDev;
  const minPrice = basePrice - stdDev;
  const chartMax = basePrice + stdDev + 0.1;
  const chartMin = basePrice - stdDev - 0.1;

  if (!mounted) {
    return (
      <div className="my-12 p-8 bg-white rounded-2xl border border-black/10 shadow-lg h-[500px] flex items-center justify-center">
        <div className="text-gray-400">Loading chart...</div>
      </div>
    );
  }

  return (
    <motion.div
      className="my-12 p-8 bg-white rounded-2xl border border-black/10 shadow-lg"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h3 className="text-2xl font-bold mb-6 text-gray-900">Price Boundaries: ±1 Standard Deviation</h3>
      
      <div className="relative h-80">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-gray-500 pr-3">
          <span>${chartMax.toFixed(2)}</span>
          <span>${basePrice.toFixed(2)}</span>
          <span>${chartMin.toFixed(2)}</span>
        </div>

        {/* Chart area */}
        <div className="ml-14 h-full relative">
          {/* Upper bound line (red) */}
          <motion.div
            className="absolute w-full border-t-2 border-red-500 border-dashed"
            style={{ top: '15%' }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <span className="absolute -top-6 right-0 text-xs font-semibold text-red-600">
              Upper Bound (+$0.15)
            </span>
          </motion.div>

          {/* Lower bound line (red) */}
          <motion.div
            className="absolute w-full border-t-2 border-red-500 border-dashed"
            style={{ bottom: '15%' }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <span className="absolute -bottom-6 right-0 text-xs font-semibold text-red-600">
              Lower Bound (-$0.15)
            </span>
          </motion.div>

          {/* Historical price line (blue) */}
          <svg className="w-full h-full" viewBox={`0 0 ${dataPoints * 10} 100`} preserveAspectRatio="none">
            <motion.path
              d={historicalPrices.map((price, i) => {
                const x = i * 10;
                const y = 100 - ((price - chartMin) / (chartMax - chartMin)) * 100;
                return i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
              }).join('')}
              stroke="#3B82F6"
              strokeWidth="3"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </svg>

          {/* Shaded area between bounds */}
          <div 
            className="absolute w-full bg-red-100/30"
            style={{ top: '15%', bottom: '15%' }}
          />
        </div>
      </div>

      <div className="mt-6 flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-6 h-0.5 bg-blue-500"></div>
          <span className="text-gray-700">Historical Price (1 year)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-0.5 border-t-2 border-red-500 border-dashed"></div>
          <span className="text-gray-700">AI Price Boundaries</span>
        </div>
      </div>
    </motion.div>
  );
};

// Animated Eye Icon for Transparency
const AnimatedEye = () => {
  return (
    <motion.svg
      width="80"
      height="80"
      viewBox="0 0 24 24"
      fill="none"
      className="mx-auto mb-8"
      initial={{ scale: 0, rotate: -180 }}
      whileInView={{ scale: 1, rotate: 0 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
    >
      {/* Eye outline */}
      <motion.path
        d="M12 5C7 5 2.73 8.11 1 12.5 2.73 16.89 7 20 12 20s9.27-3.11 11-7.5C21.27 8.11 17 5 12 5z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
      {/* Iris */}
      <motion.circle
        cx="12"
        cy="12.5"
        r="3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      {/* Pupil */}
      <motion.circle
        cx="12"
        cy="12.5"
        r="1.5"
        fill="currentColor"
        animate={{
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.svg>
  );
};

// Typewriter component that starts animation when scrolled into view
const TypewriterOnView = ({ text, onComplete }: { text: string; onComplete?: () => void }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [key, setKey] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (isInView && !hasStarted) {
      console.log('✍️ Typewriter starting for text:', text.substring(0, 30));
      setHasStarted(true);
      setKey(prev => prev + 1);
      
      // Calculate animation duration and call onComplete
      if (onComplete) {
        const charCount = text.length;
        const durationMs = (charCount / 50) * 1000 + 500; // speed=50 + buffer
        console.log('Will call onComplete in', durationMs, 'ms');
        setTimeout(onComplete, durationMs);
      }
    }
  }, [isInView, hasStarted, text, onComplete]);

  return (
    <span ref={ref}>
      {isInView ? (
        <TypeAnimation
          key={key}
          sequence={[text]}
          wrapper="span"
          speed={50}
          cursor={true}
          repeat={0}
        />
      ) : (
        <span className="opacity-0">{text}</span>
      )}
    </span>
  );
};

const DATA = {
  event: {
    title: "Leeds Business Ethics Case Competition",
    team: "Team: Sami + Co.",
    date: "Round 1 — Wed, Oct 22, 2025",
  },
  caseTitle: "ShelfSense Markets: Ethical AI Pricing with Helios",
  company: "Midsized Grocery Chain — Mountain West Region",
  assertion: "Treat fairness as a law of nature, not a variable to manipulate. Our position: transparency, guardrails, and human oversight over algorithmic profit maximization.",
  sections: [
    {
      id: "intro",
      label: "Introduction",
      template: "standard",
      kicker: "Context",
      headline: "ShelfSense Markets",
      showMap: true,
      bullets: [
        "Operating on razor-thin profit margins",
        "Uses Helios AI pricing technology that changes prices in real-time",
        "Goal: Increase profits and reduce waste through dynamic pricing"
      ]
    },
    {
      id: "problem",
      label: "Ethical Problem",
      template: "emphasis",
      kicker: "The Crisis",
      headline: "The Milk Incident: $3.39 → $4.29",
      bullets: [
        "Fairness risk: Unfair prices at certain times of day",
        "Customers cannot see why prices are changing",
        "\"Fairness is a law of nature and not something to be manipulated.\"",
        "Will we treat fairness as a constraint (like thermodynamics) or reverse-engineer it?"
      ]
    },
    {
      id: "framework",
      label: "Values Framework",
      template: "grid",
      kicker: "Daniels Fund Ethics",
      headline: "Eight Principles Guide Our Solutions",
      bullets: [
        "Integrity",
        "Trust", 
        "Accountability",
        "Transparency",
        "Fairness",
        "Respect",
        "Rule of Law",
        "Viability"
      ]
    },
    {
      id: "equity",
      label: "Equity & Access",
      template: "standard",
      kicker: "Preventing the dependence tax",
      headline: "Protecting Vulnerable Customers",
      bullets: [
        "Price ceiling and floor for all goods: customers will not be charged over the limit",
        "Late-hour freeze: Prices locked 2 hours before closing, reverting to midday baseline",
        "Interactive kiosks for price explainability: no phone needed, more equitable access",
        "QR codes on each product provide in-depth reasons for price changes",
        "Prices reduced for goods close to expiration: lowering waste"
      ]
    },
    {
      id: "transparency-app",
      label: "Transparency: App",
      template: "standard",
      kicker: "Full disclosure",
      headline: "ShelfSense Mobile App",
      bullets: [
        "Live price updates for all products in real-time",
        "Price history shows trends so customers know prices aren't personalized",
        "If price is above/below industry standard, see which factors influence it most",
        "QR codes on each product link directly to explanations"
      ]
    },
    {
      id: "transparency-demo",
      label: "Transparency: Demo",
      template: "standard",
      kicker: "Try it yourself",
      headline: "Experience It Live",
      showQRCode: true,
      bullets: [
        "Scan the QR code to see a live demo",
        "Real-time price transparency in action",
        "Interactive price history charts",
        "Customer reporting interface"
      ]
    },
    {
      id: "transparency-reporting",
      label: "Transparency: Reporting",
      template: "standard",
      kicker: "Customer voice",
      headline: "Report & Escalate Concerns",
      showEscalation: true,
      bullets: [
        "Customers can report unfair prices directly through the app",
        "Public fairness intuition serves as a correction mechanism",
        "Company-wide Ethics department reviews all reports",
        "Clear escalation path ensures accountability"
      ]
    },
    {
      id: "guardrails",
      label: "Guardrails & Governance",
      template: "standard",
      kicker: "Non-negotiable boundaries",
      headline: "Hard Limits on AI Autonomy",
      showPriceChart: true,
      bullets: [
        "Use past year of price data from surrounding stores as baseline",
        "Helios bounded to ±1 standard deviation from yearly mean",
        "Fresh data accounts for inflation and natural fluctuations",
        "Periodic audits by independent third-party reviewers",
        "Annual ethics certification training for all Helios overseers"
      ]
    },
    {
      id: "measurement",
      label: "Measurement",
      template: "emphasis",
      kicker: "Non-financial KPIs",
      headline: "What We Track & When We Roll Back",
      bullets: [
        "Track complaints and perceived fairness via end-of-shopping surveys",
        "Customer accounts (phone/email) with survey incentives (coupons)",
        "Monitor: trust levels, complaint mix, opt-in rates for notifications",
        "If overwhelming negative response: AI overseer intervenes (e.g., lowers prices)"
      ]
    },
    {
      id: "qa",
      label: "Q&A",
      template: "standard",
      kicker: "Tough questions",
      headline: "Addressing Concerns",
      bullets: [
        "Why not disable Helios?: We need efficiency, but fairness comes first",
        "Won't transparency hurt profits?: Trust is our competitive advantage",
        "What if competitors don't follow?: We lead on integrity, not follow the pack"
      ]
    }
  ]
};

export default function LeedsScrollDeck() {
  console.log('🎬 LeedsScrollDeck component rendering');
  
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [printMode, setPrintMode] = useState(false);
  const [showQuote, setShowQuote] = useState(false);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
  
  // Hero scroll animations - Enhanced dynamic style
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroOpacity = useTransform(heroProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 0.5], [1, 0.92]);
  const heroY = useTransform(heroProgress, [0, 0.5], [0, -100]);
  const heroBlur = useTransform(heroProgress, [0, 0.3, 0.5], [0, 2, 5]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const ids = DATA.sections.map(s => s.id);
      const curr = nearestSection();
      const idx = ids.indexOf(curr);
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        const next = document.getElementById(ids[Math.min(idx + 1, ids.length - 1)]);
        next?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      if (e.key === "ArrowUp" || e.key === "PageUp") {
        const prev = document.getElementById(ids[Math.max(idx - 1, 0)]);
        prev?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      if (e.key.toLowerCase() === "p") setPrintMode(v => !v);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Track scroll to show/hide quote in nav
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY || document.documentElement.scrollTop;
      setShowQuote(scrolled > 200);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const nearestSection = () => {
    const sections = DATA.sections.map(s => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    let best = sections[0]?.id || DATA.sections[0].id;
    let bestDist = Infinity;
    const top = window.scrollY;
    sections.forEach(sec => {
      const d = Math.abs(sec.offsetTop - top);
      if (d < bestDist) { best = sec.id; bestDist = d; }
    });
    return best;
  };

  return (
    <div 
      className={"min-h-screen w-full bg-white text-black relative snap-y snap-mandatory" + (printMode ? " print:bg-white! print:text-black!" : "")} 
      style={{ 
        scrollSnapType: 'y mandatory', 
        position: 'relative'
      }}
    >

      {/* Top navigation bar - Palantir-inspired semi-transparent with quote */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/10">
        <div className="max-w-7xl mx-auto px-6 py-4 relative" style={{ minHeight: '56px' }}>
          {/* Original nav content */}
          <motion.div 
            className="flex items-center justify-between w-full"
            initial={false}
            animate={{ 
              opacity: showQuote ? 0 : 1,
              y: showQuote ? -10 : 0,
              pointerEvents: showQuote ? 'none' : 'auto'
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="flex items-center gap-8">
              <h3 className="text-sm font-semibold tracking-tight">{DATA.event.team}</h3>
              <div className="hidden md:flex items-center gap-6 text-xs text-black/60">
                {DATA.sections.slice(0, 5).map((s) => (
                  <a key={s.id} href={`#${s.id}`} className="hover:text-black transition-colors uppercase tracking-wider">
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
            <div className="text-xs text-black/60">{DATA.event.date}</div>
          </motion.div>

          {/* Quote that appears on scroll */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center px-6"
            initial={false}
            animate={{ 
              opacity: showQuote ? 1 : 0,
              y: showQuote ? 0 : 10,
              pointerEvents: showQuote ? 'auto' : 'none'
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <h3 className="text-sm md:text-base font-semibold tracking-tight text-center px-12">
              "Ethical AI Pricing at ShelfSense Markets: Balancing Innovation and Integrity"
            </h3>
          </motion.div>
        </div>
        {/* Progress bar */}
        <motion.div style={{ scaleX }} className="absolute bottom-0 left-0 right-0 h-0.5 origin-left bg-black" />
      </nav>

      {/* Left rail navigation - minimal dots */}
      <aside className="fixed left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3 z-40">
        {DATA.sections.map((s, i) => (
          <a key={s.id} href={`#${s.id}`} className="group relative">
            <div className="w-1.5 h-1.5 rounded-full bg-black/20 group-hover:bg-black group-hover:w-2 group-hover:h-2 transition-all" />
            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur px-2 py-1 rounded">{s.label}</span>
          </a>
        ))}
      </aside>

      {/* Hero - Apple-style scroll animations */}
      <section 
        ref={(el) => {
          heroRef.current = el as HTMLDivElement;
          if (el) sectionRefs.current.set('hero', el);
        }} 
        id="hero" 
        className="relative flex items-center justify-center min-h-screen px-6 pt-20 overflow-hidden snap-start snap-always"
      >
        {/* Geometric background shape with parallax */}
        <motion.div 
          className="absolute inset-0 overflow-hidden"
          style={{ opacity: heroOpacity }}
        >
          <motion.div 
            className="absolute top-0 right-0 w-2/3 h-2/3 bg-black/2 transform rotate-12 translate-x-1/4 -translate-y-1/4"
            style={{ y: useTransform(heroProgress, [0, 1], [0, -100]) }}
          />
        </motion.div>
        
        <motion.div 
          className="relative max-w-6xl mx-auto"
          style={{ 
            opacity: heroOpacity,
            scale: heroScale,
            y: heroY,
            filter: useTransform(heroBlur, (v) => `blur(${v}px)`)
          }}
        >
          <motion.p 
            className="uppercase tracking-[0.25em] text-[10px] font-medium text-black/40 mb-3"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.2,
              type: "spring",
              stiffness: 100
            }}
          >
            {DATA.event.title}
          </motion.p>
          <motion.h1 
            className="text-6xl md:text-8xl font-bold leading-[0.95] tracking-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.4,
              type: "spring",
              stiffness: 80
            }}
          >
            <TypewriterOnView 
              text={DATA.caseTitle}
            />
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-black/70 max-w-4xl leading-relaxed mb-10"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.6,
              type: "spring",
              stiffness: 90
            }}
          >
            {DATA.assertion}
          </motion.p>
          <motion.div 
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.8,
              type: "spring",
              stiffness: 100
            }}
          >
            <motion.a 
              href="#opening" 
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium bg-black text-white hover:bg-black/90 transition-colors"
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Now →
            </motion.a>
            <motion.a 
              href="#rec" 
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium border border-black/20 hover:border-black/40 transition-colors"
              whileHover={{ scale: 1.05, borderColor: "rgba(0,0,0,0.6)" }}
              whileTap={{ scale: 0.95 }}
            >
              Jump to Recommendation
            </motion.a>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-black/30 text-xs"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          ↓
        </motion.div>
      </section>

      {/* Panels - Apple-style scroll animations */}
      <main className="px-6">
        {DATA.sections.map((s, idx) => (
            <motion.section
              id={s.id}
              key={s.id}
              ref={(el) => {
                if (el) sectionRefs.current.set(s.id, el);
              }}
              className="min-h-screen max-w-6xl mx-auto flex flex-col justify-center py-20 border-t border-black/10 snap-start snap-always"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-20%", amount: 0.1 }}
              transition={{ duration: 0.8 }}
            >
              {/* Section number and kicker with varied animation */}
              <motion.div 
                className="flex items-baseline gap-4 mb-4"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.1,
                  type: "spring",
                  stiffness: 120
                }}
              >
                <span className="text-4xl font-bold text-black/10">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <p className="text-black/40 uppercase tracking-[0.25em] text-[10px] font-medium">{s.kicker}</p>
              </motion.div>
              <motion.h2 
                className="text-3xl md:text-5xl font-bold leading-[1.05] tracking-tight mb-8"
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.2,
                  type: "spring",
                  stiffness: 80
                }}
              >
                <TypewriterOnView 
                  text={s.headline}
                />
              </motion.h2>

            <div className="w-full">
              {/* Render special components */}
              {(s as any).showMap && <MountainWestMap />}

              {(s as any).showQRCode && (
                <motion.div
                  className="flex flex-col items-center gap-4 my-8 p-6 bg-white/50 rounded-2xl border border-black/10"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="bg-white p-4 rounded-xl shadow-lg">
                    <img 
                      src="/qr-demo.png" 
                      alt="QR Code to Demo"
                      width={200}
                      height={200}
                      className="block"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-gray-900">Try it yourself!</p>
                    <p className="text-sm text-gray-600">Scan to see the customer experience</p>
                  </div>
                </motion.div>
              )}

              {(s as any).showEscalation && <EscalationDiagram />}
              
              {(s as any).showPriceChart && <PriceGuardrailsChart />}

              {/* Template-based content rendering */}
            {s.template === 'standard' && s.bullets && (
              <ul className="space-y-5 text-lg md:text-xl text-black/80 leading-relaxed">
                {s.bullets.map((b, i) => (
                  <motion.li 
                    key={i} 
                    className="flex items-start gap-4 group"
                    initial={{ opacity: 0, x: -30, y: 10 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.08, type: "spring", stiffness: 120 }}
                    whileHover={{ x: 10, scale: 1.02, transition: { duration: 0.2 } }}
                  >
                    <motion.span 
                      className="text-black/20 font-mono text-lg mt-2 group-hover:text-black/60 transition-colors"
                      whileHover={{ rotate: 90, scale: 1.3 }}
                      transition={{ duration: 0.3 }}
                    >
                      —
                    </motion.span>
                    <span dangerouslySetInnerHTML={{ __html: b }} className="flex-1" />
                  </motion.li>
                ))}
              </ul>
            )}

            {s.template === 'emphasis' && s.bullets && (
              <ul className="space-y-6">
                {s.bullets.map((b, i) => (
                  <motion.li
                    key={i}
                    className="text-xl md:text-2xl font-medium text-black/90 border-l-4 border-black pl-6 py-2"
                    initial={{ opacity: 0, x: -50, scale: 0.95 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 0.7, delay: 0.3 + i * 0.1, type: "spring", stiffness: 100 }}
                  >
                    {b}
                  </motion.li>
                ))}
              </ul>
            )}

            {s.template === 'grid' && s.bullets && (
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {s.bullets.map((b, i) => (
                  <motion.div
                    key={i}
                    className="border border-black/10 p-6 text-center hover:border-black/30 transition-all hover:shadow-lg"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                    whileHover={{ y: -5, scale: 1.05 }}
                  >
                    <p className="text-xl md:text-2xl font-semibold text-black/90">{b}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {s.template === 'split' && (s as any).sections && (
              <div className="grid md:grid-cols-2 gap-8 mt-8">
                {(s as any).sections.map((section: any, i: number) => (
                  <motion.div
                    key={i}
                    className="border border-black/10 p-8 hover:border-black/20 transition-all"
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-20%" }}
                    transition={{ duration: 0.7, delay: 0.3 + i * 0.15, type: "spring" }}
                  >
                    <h3 className="text-2xl md:text-3xl font-bold mb-6 text-black/90">{section.title}</h3>
                    <ul className="space-y-4">
                      {section.items.map((item: string, j: number) => (
                        <motion.li
                          key={j}
                          className="flex items-start gap-3 text-lg md:text-xl text-black/80"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-20%" }}
                          transition={{ duration: 0.5, delay: 0.5 + j * 0.08 }}
                        >
                          <span className="text-black/30 mt-1">•</span>
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            )}
            </div>

            {/* Footer crumbs */}
            <motion.div 
              className="mt-12 flex items-center gap-3 text-black/30 text-xs"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <span className="font-mono">Section {idx + 1} / {DATA.sections.length}</span>
            </motion.div>
          </motion.section>
        ))}

        {/* Footer with Apple-style animation */}
        <motion.section 
          className="min-h-screen max-w-6xl mx-auto flex flex-col justify-center border-t border-black/10 py-24 snap-start snap-always"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1 }}
        >
          <motion.p 
            className="text-black/40 uppercase tracking-[0.25em] text-[10px] font-medium mb-4"
            initial={{ opacity: 0, x: -30, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ 
              duration: 0.7, 
              delay: 0.2,
              type: "spring",
              stiffness: 120
            }}
          >
            Conclusion
          </motion.p>
          <motion.h2 
            className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-6"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ 
              duration: 0.9, 
              delay: 0.3,
              type: "spring",
              stiffness: 70
            }}
          >
            <TypewriterOnView 
              text="Thank you — we welcome scrutiny."
            />
          </motion.h2>
          <motion.p 
            className="text-xl text-black/70 max-w-3xl mb-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ 
              duration: 0.7, 
              delay: 0.5,
              type: "spring",
              stiffness: 100
            }}
          >
            We'll publish our risk register and audit summary. Hold us to it.
          </motion.p>
          <motion.a 
            href="#hero" 
            className="inline-flex items-center gap-2 text-sm font-medium text-black/60 hover:text-black"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ 
              duration: 0.6, 
              delay: 0.7,
              type: "spring",
              stiffness: 120
            }}
            whileHover={{ 
              x: 5,
              gap: "1rem",
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            ↑ Back to top
          </motion.a>
        </motion.section>
      </main>

      {/* Print helpers */}
      <style>{`
        @media print {
          .print\\:!bg-white { background-color: white !important; }
          .print\\:!text-black { color: black !important; }
          a { color: black !important; text-decoration: none !important; }
          section { break-inside: avoid; page-break-inside: avoid; }
          nav, aside, .fixed { display: none !important; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
        
        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }
        
        /* Backdrop blur support */
        @supports (backdrop-filter: blur(12px)) {
          .backdrop-blur-md {
            backdrop-filter: blur(12px);
          }
        }
      `}</style>
    </div>
  );
}
