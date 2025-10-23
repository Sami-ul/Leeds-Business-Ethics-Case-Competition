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
    // Colorado - Dense urban corridors (70 stores)
    { lat: 39.7392, lon: -104.9903, city: "Denver Metro", count: 35, type: "urban" },
    { lat: 38.8339, lon: -104.8214, city: "Colorado Springs", count: 18, type: "urban" },
    { lat: 40.5853, lon: -105.0844, city: "Fort Collins", count: 10, type: "suburban" },
    { lat: 39.5501, lon: -105.7821, city: "Aurora/Lakewood", count: 7, type: "low-access" },
    
    // Utah - Suburban neighborhoods (50 stores)
    { lat: 40.7608, lon: -111.8910, city: "Salt Lake City Metro", count: 28, type: "urban" },
    { lat: 40.2338, lon: -111.6585, city: "Provo/Orem", count: 12, type: "suburban" },
    { lat: 41.2230, lon: -111.9738, city: "Ogden", count: 10, type: "low-access" },
    
    // New Mexico - Low-access tracts (40 stores)
    { lat: 35.0844, lon: -106.6504, city: "Albuquerque", count: 22, type: "urban" },
    { lat: 32.3199, lon: -106.7637, city: "Las Cruces", count: 10, type: "low-access" },
    { lat: 35.6870, lon: -105.9378, city: "Santa Fe", count: 8, type: "suburban" },
    
    // Wyoming - Rural/low-access (20 stores)
    { lat: 41.1400, lon: -104.8202, city: "Cheyenne", count: 12, type: "low-access" },
    { lat: 42.8666, lon: -106.3131, city: "Casper", count: 8, type: "low-access" }
  ];

  if (!mounted) {
    return (
      <div className="my-8 max-w-3xl mx-auto bg-slate-900 rounded-xl p-6 shadow-2xl border border-slate-700">
        <div className="w-full aspect-[16/10] bg-slate-950 rounded-lg flex items-center justify-center text-slate-400">
          Loading map...
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="my-8 max-w-3xl mx-auto bg-slate-900 rounded-xl p-6 shadow-2xl border border-slate-700 relative z-10"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden border border-slate-700">
        <MapContainer
          center={[39.5, -109]}
          zoom={5}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
          dragging={false}
          scrollWheelZoom={false}
          doubleClickZoom={false}
          touchZoom={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          {stores.map((store, i) => (
            <CircleMarker
              key={i}
              center={[store.lat, store.lon]}
              radius={Math.sqrt(store.count) * 2}
              fillColor={
                store.type === 'urban' ? '#3b82f6' : 
                store.type === 'suburban' ? '#8b5cf6' : 
                '#ef4444'
              }
              fillOpacity={0.7}
              color={
                store.type === 'urban' ? '#60a5fa' : 
                store.type === 'suburban' ? '#a78bfa' : 
                '#f87171'
              }
              weight={2}
            >
              <Popup>
                <div className="text-sm">
                  <div className="font-bold text-blue-600">{store.city}</div>
                  <div className="text-gray-700">{store.count} stores</div>
                  <div className="text-xs text-gray-500 capitalize">{store.type === 'low-access' ? 'USDA Low-Access' : store.type}</div>
                </div>
              </Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>

      <motion.div 
        className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50" />
          <span className="text-slate-300">Urban Corridors</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-purple-500 rounded-full shadow-lg shadow-purple-500/50" />
          <span className="text-slate-300">Suburban</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg shadow-red-500/50" />
          <span className="text-slate-300">USDA Low-Access</span>
        </div>
        <div className="text-slate-400 ml-4">4 States • <span className="text-blue-400 font-semibold">180 stores</span></div>
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
        { icon: "⚖️", label: "Company Ethics Committee", desc: "Final decision" }
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

// Supply and Demand Graph
const SupplyDemandGraph = () => {
  const [showShift, setShowShift] = useState(false);

  return (
    <div className="my-8 p-6 bg-white rounded-2xl border border-black/10 shadow-lg max-w-2xl mx-auto">
      <div className="flex items-start justify-between gap-8 mb-8">
        <h3 className="text-xl font-bold text-gray-900 flex-1">Reducing Waste Through Price Adjustment</h3>
        <button
          onClick={() => setShowShift(!showShift)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm whitespace-nowrap shrink-0"
        >
          {showShift ? 'Reset' : 'Lower Price'}
        </button>
      </div>
      
      <div className="relative h-72 bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6">
        <svg className="w-full h-full" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid meet">
          {/* Axes */}
          <line x1="40" y1="260" x2="380" y2="260" stroke="#333" strokeWidth="2" />
          <line x1="40" y1="260" x2="40" y2="20" stroke="#333" strokeWidth="2" />
          
          {/* Axis labels */}
          <text x="380" y="280" fill="#666" fontSize="14" fontWeight="bold">Quantity</text>
          <text x="10" y="25" fill="#666" fontSize="14" fontWeight="bold">Price</text>
          
          {/* Demand curve (downward sloping - stays fixed) */}
          <path
            d="M 60 60 L 350 240"
            stroke="#3b82f6"
            strokeWidth="3"
            fill="none"
          />
          <text x="355" y="245" fill="#3b82f6" fontSize="14" fontWeight="bold">D</text>
          
          {/* Supply curve (upward sloping - stays fixed) */}
          <path
            d="M 60 240 L 350 60"
            stroke="#ef4444"
            strokeWidth="3"
            fill="none"
          />
          <text x="355" y="65" fill="#ef4444" fontSize="14" fontWeight="bold">S</text>
          
          {/* Original equilibrium point A (higher price, lower quantity) */}
          {/* Point A at intersection: x=205, y=150 */}
          <circle
            cx="205"
            cy="150"
            r="6"
            fill={showShift ? "#94a3b8" : "#8b5cf6"}
            style={{ transition: 'fill 0.3s ease' }}
          />
          <line
            x1="205"
            y1="150"
            x2="205"
            y2="260"
            stroke={showShift ? "#94a3b8" : "#8b5cf6"}
            strokeWidth="1.5"
            strokeDasharray="5,5"
            style={{ 
              opacity: showShift ? 0.5 : 1,
              transition: 'opacity 0.3s ease, stroke 0.3s ease'
            }}
          />
          <line
            x1="205"
            y1="150"
            x2="40"
            y2="150"
            stroke={showShift ? "#94a3b8" : "#8b5cf6"}
            strokeWidth="1.5"
            strokeDasharray="5,5"
            style={{ 
              opacity: showShift ? 0.5 : 1,
              transition: 'opacity 0.3s ease, stroke 0.3s ease'
            }}
          />
          
          {/* New equilibrium point B (lower price, higher quantity) */}
          {/* Moving down the demand curve to x=270, y=190 */}
          <circle
            cx="270"
            cy="190"
            r="6"
            fill="#10b981"
            style={{ 
              opacity: showShift ? 1 : 0,
              transition: 'opacity 0.3s ease'
            }}
          />
          <line
            x1="270"
            y1="190"
            x2="270"
            y2="260"
            stroke="#10b981"
            strokeWidth="1.5"
            strokeDasharray="5,5"
            style={{ 
              opacity: showShift ? 1 : 0,
              transition: 'opacity 0.3s ease'
            }}
          />
          <line
            x1="270"
            y1="190"
            x2="40"
            y2="190"
            stroke="#10b981"
            strokeWidth="1.5"
            strokeDasharray="5,5"
            style={{ 
              opacity: showShift ? 1 : 0,
              transition: 'opacity 0.3s ease'
            }}
          />
          
          {/* Arrow showing movement along demand curve */}
          {showShift && (
            <g>
              <path
                d="M 205 150 Q 237 170, 270 190"
                stroke="#10b981"
                strokeWidth="2"
                fill="none"
                strokeDasharray="4,4"
              />
              <polygon
                points="270,190 265,185 268,178"
                fill="#10b981"
              />
            </g>
          )}
          
          {/* Quantity labels */}
          <text x="198" y="280" fill={showShift ? "#94a3b8" : "#8b5cf6"} fontSize="12" fontWeight="bold">Q₁</text>
          {showShift && <text x="263" y="280" fill="#10b981" fontSize="12" fontWeight="bold">Q₂</text>}
          
          {/* Price labels */}
          <text x="10" y="155" fill={showShift ? "#94a3b8" : "#8b5cf6"} fontSize="12" fontWeight="bold">P₁</text>
          {showShift && <text x="10" y="195" fill="#10b981" fontSize="12" fontWeight="bold">P₂</text>}
          
          {/* Point labels on the curve */}
          {!showShift && <text x="185" y="140" fill="#8b5cf6" fontSize="12" fontWeight="bold">A</text>}
          {showShift && (
            <>
              <text x="185" y="140" fill="#94a3b8" fontSize="12" fontWeight="bold">A</text>
              <text x="275" y="180" fill="#10b981" fontSize="12" fontWeight="bold">B</text>
            </>
          )}
        </svg>
      </div>
    </div>
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
    <div className="my-12 p-8 bg-white rounded-2xl border border-black/10 shadow-lg">
      <h3 className="text-2xl font-bold mb-6 text-gray-900">Price Boundaries</h3>
      
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
          <div
            className="absolute w-full border-t-2 border-red-500 border-dashed"
            style={{ top: '15%' }}
          >
            <span className="absolute -top-6 right-0 text-xs font-semibold text-red-600">
              Upper Bound (+$0.15)
            </span>
          </div>

          {/* Lower bound line (red) */}
          <div
            className="absolute w-full border-t-2 border-red-500 border-dashed"
            style={{ bottom: '15%' }}
          >
            <span className="absolute -bottom-6 right-0 text-xs font-semibold text-red-600">
              Lower Bound (-$0.15)
            </span>
          </div>

          {/* Historical price line (blue) */}
          <svg className="w-full h-full" viewBox={`0 0 ${dataPoints * 10} 100`} preserveAspectRatio="none">
            <path
              d={historicalPrices.map((price, i) => {
                const x = i * 10;
                const y = 100 - ((price - chartMin) / (chartMax - chartMin)) * 100;
                return i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
              }).join('')}
              stroke="#3B82F6"
              strokeWidth="3"
              fill="none"
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
    </div>
  );
};

// Animated Eye Icon for Transparency
const AnimatedEye = () => {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 24 24"
      fill="none"
      className="mx-auto mb-8"
    >
      {/* Eye outline */}
      <path
        d="M12 5C7 5 2.73 8.11 1 12.5 2.73 16.89 7 20 12 20s9.27-3.11 11-7.5C21.27 8.11 17 5 12 5z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Iris */}
      <circle
        cx="12"
        cy="12.5"
        r="3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Pupil */}
      <circle
        cx="12"
        cy="12.5"
        r="1.5"
        fill="currentColor"
      />
    </svg>
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
    team: "Team 10",
    teamMembers: "Sami-ul Ahmed, Rohith Gokulakrishnan, Sohan Bekkam, Kedar Manoj",
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
        "4 Mountain West states: CO, UT, NM, WY",
        "Mix of dense urban corridors, suburban neighborhoods, and USDA-defined low-access tracts",
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
      headline: "Current Problems",
      bullets: [
        "The milk incident: $3.39 → $4.29",
        "Fairness risk: Unfair prices at certain times of day",
        "Customers cannot see why prices are changing",
        "\"Fairness is a law of nature and not something to be manipulated.\""
      ]
    },
    {
      id: "solution-transition",
      label: "Our Solution",
      template: "transition",
      kicker: "",
      headline: "Our Solution"
    },
    {
      id: "framework",
      label: "Values Framework",
      template: "grid",
      kicker: "Daniels Fund Ethics",
      headline: "Eight Principles Guide Our Solutions",
      showDanielsLogo: true,
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
      showSupplyDemand: true,
      bullets: [
        "Price ceiling and floor for all goods",
        "Late-hour freeze",
        "Ethics committee",
        "Product QR codes & interactive kiosks"
      ]
    },
    {
      id: "transparency-app",
      label: "Transparency: App",
      template: "standard",
      kicker: "Full disclosure",
      headline: "ShelfSense Mobile App",
      bullets: [
        "Transparency",
        "Live price updates",
        "Price history: customers know prices aren't personalized",
        "Price changed? See which factors influence it most."
      ]
    },
    {
      id: "transparency-demo",
      label: "Transparency: Demo",
      template: "standard",
      kicker: "Try it yourself",
      headline: "Experience It Live",
      showQRCode: true
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
        "Ethics department reviews reports"
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
        "Past year of price data from 5-miles radius as baseline",
        "Fresh data",
        "Ethics department approves all framing engine copy before customer-facing deployment",
        "Third-party audits",
        "Annual ethics certification/training"
      ]
    },
    {
      id: "measurement",
      label: "Measurement",
      template: "emphasis",
      kicker: "Non-financial KPIs",
      headline: "What We Track & When We Roll Back",
      bullets: [
        "End-of-shopping surveys",
        "Monitor trust levels",
        "Overwhelming negative response? Ethics committee intervenes."
      ]
    },
    {
      id: "qa",
      label: "Q&A",
      template: "standard",
      kicker: "Tough questions",
      headline: "Addressing Concerns",
      bullets: [
        "Why not disable Helios? We need efficiency, but fairness comes first",
        "Won't transparency hurt profits? Trust is our competitive advantage",
        "Long & Short Term Goals"
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

  // Track scroll to show/hide quote in nav - use passive listener for performance
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY || document.documentElement.scrollTop;
      setShowQuote(scrolled > 200);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
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
      className={"min-h-screen w-full bg-white text-black relative" + (printMode ? " print:bg-white! print:text-black!" : "")}
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
              <div className="flex flex-col">
                <h3 className="text-sm font-semibold tracking-tight">{DATA.event.team}</h3>
                <p className="text-xs text-black/50">{DATA.event.teamMembers}</p>
              </div>
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
            className="absolute inset-0 flex items-center px-6"
            initial={false}
            animate={{ 
              opacity: showQuote ? 1 : 0,
              y: showQuote ? 0 : 10,
              pointerEvents: showQuote ? 'auto' : 'none'
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="flex items-center gap-8 w-full">
              <div className="flex flex-col">
                <h3 className="text-sm font-semibold tracking-tight">{DATA.event.team}</h3>
                <p className="text-xs text-black/50">{DATA.event.teamMembers}</p>
              </div>
              <h3 className="text-sm md:text-base font-semibold tracking-tight text-center flex-1">
                "Ethical AI Pricing at ShelfSense Markets: Balancing Innovation and Integrity"
              </h3>
            </div>
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

      {/* Hero */}
      <section 
        ref={(el) => {
          heroRef.current = el as HTMLDivElement;
          if (el) sectionRefs.current.set('hero', el);
        }} 
        id="hero" 
        className="relative flex items-center justify-center min-h-screen px-6 pt-20"
      >
        {/* Geometric background shape with parallax */}
        <div 
          className="absolute inset-0 overflow-hidden"
          style={{ opacity: 0.5 }}
        >
          <div 
            className="absolute top-0 right-0 w-2/3 h-2/3 bg-black/2 transform rotate-12 translate-x-1/4 -translate-y-1/4"
          />
        </div>
        
        <div className="relative max-w-6xl mx-auto">
          <p className="uppercase tracking-[0.25em] text-[10px] font-medium text-black/40 mb-3">
            {DATA.event.title}
          </p>
          <h1 className="text-5xl md:text-6xl font-bold leading-[0.95] tracking-tight mb-6">
            <TypewriterOnView 
              text={DATA.caseTitle}
            />
          </h1>
          <p className="text-xl md:text-2xl text-black/70 max-w-4xl leading-relaxed mb-10">
            {DATA.assertion}
          </p>
          <div className="flex items-center gap-4">
            <a 
              href="#opening" 
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium bg-black text-white hover:bg-black/90 transition-colors"
            >
              Explore Now →
            </a>
            <a 
              href="#rec" 
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium border border-black/20 hover:border-black/40 transition-colors"
            >
              Jump to Recommendation
            </a>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-black/30 text-xs animate-bounce">
          ↓
        </div>
      </section>

      {/* Panels */}
      <main className="px-6">
        {DATA.sections.map((s, idx) => (
            <section
              id={s.id}
              key={s.id}
              ref={(el) => {
                if (el) sectionRefs.current.set(s.id, el);
              }}
              className="min-h-screen max-w-6xl mx-auto flex flex-col justify-center py-20 border-t border-black/10"
            >
              {/* Section number and kicker with varied animation */}
              {s.template !== 'transition' && (
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="text-5xl font-bold text-black/10">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <p className="text-black/40 uppercase tracking-[0.25em] text-sm font-medium">{s.kicker}</p>
                </div>
              )}
              
              <h2 
                className={s.template === 'transition' 
                  ? "text-6xl md:text-8xl font-bold leading-none tracking-tight text-center" 
                  : "text-3xl md:text-5xl font-bold leading-[1.05] tracking-tight mb-8"}
              >
                <TypewriterOnView 
                  text={s.headline}
                />
              </h2>

            <div className="w-full">
              {/* Template-based content rendering - render bullets first for intro slide */}
            {s.template === 'standard' && s.bullets && (s as any).showSupplyDemand ? (
              // Special layout for slide 5: bullets and graph side by side
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <ul className="space-y-5 text-lg md:text-xl text-black/80 leading-relaxed flex-1">
                  {s.bullets.map((b, i) => (
                    <li 
                      key={i} 
                      className="flex items-start gap-4 group"
                    >
                      <span className="text-black/20 font-mono text-lg mt-2 group-hover:text-black/60 transition-colors">
                        —
                      </span>
                      <span dangerouslySetInnerHTML={{ __html: b }} className="flex-1" />
                    </li>
                  ))}
                </ul>
                <div className="flex-1">
                  <SupplyDemandGraph />
                </div>
              </div>
            ) : s.template === 'standard' && s.bullets ? (
              <ul className="space-y-5 text-lg md:text-xl text-black/80 leading-relaxed mb-8">
                {s.bullets.map((b, i) => (
                  <li 
                    key={i} 
                    className="flex items-start gap-4 group"
                  >
                    <span className="text-black/20 font-mono text-lg mt-2 group-hover:text-black/60 transition-colors">
                      —
                    </span>
                    <span dangerouslySetInnerHTML={{ __html: b }} className="flex-1" />
                  </li>
                ))}
              </ul>
            ) : null}

              {/* Render special components */}
              {(s as any).showMap && <MountainWestMap />}

              {(s as any).showDanielsLogo && (
                <div className="flex justify-center my-8">
                  <img 
                    src="/logo.png" 
                    alt="Daniels Fund Ethics Initiative"
                    className="h-16 object-contain"
                  />
                </div>
              )}

              {(s as any).showQRCode && (
                <div className="flex flex-col items-center gap-4 my-8 p-6 bg-white/50 rounded-2xl border border-black/10">
                  <a href="/demo" className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                    <img 
                      src="/qr-demo.png" 
                      alt="QR Code to Demo"
                      width={200}
                      height={200}
                      className="block"
                    />
                  </a>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-gray-900">Try it yourself!</p>
                    <p className="text-sm text-gray-600">Scan to see the customer experience <span className="text-blue-600">or click the QR code</span></p>
                  </div>
                </div>
              )}

              {(s as any).showEscalation && <EscalationDiagram />}
              
              {/* Only render SupplyDemandGraph if not already rendered side-by-side with bullets */}
              {(s as any).showSupplyDemand && !s.bullets && <SupplyDemandGraph />}
              
              {(s as any).showPriceChart && <PriceGuardrailsChart />}

            {s.template === 'emphasis' && s.bullets && (
              <ul className="space-y-6">
                {s.bullets.map((b, i) => (
                  <li
                    key={i}
                    className="text-xl md:text-2xl font-medium text-black/90 border-l-4 border-black pl-6 py-2"
                  >
                    {b}
                  </li>
                ))}
              </ul>
            )}

            {s.template === 'grid' && s.bullets && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                {s.bullets.map((b, i) => (
                  <div
                    key={i}
                    className="border border-black/10 p-6 text-center hover:border-black/30 transition-all hover:shadow-lg"
                  >
                    <p className="text-xl md:text-2xl font-semibold text-black/90">{b}</p>
                  </div>
                ))}
              </div>
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
            <div className="mt-12 flex items-center gap-3 text-black/30 text-xs">
              <span className="font-mono">Section {idx + 1} / {DATA.sections.length}</span>
            </div>
          </section>
        ))}

        {/* Footer */}
        <section 
          className="min-h-screen max-w-6xl mx-auto flex flex-col justify-center border-t border-black/10 py-24"
        >
          <p 
            className="text-black/40 uppercase tracking-[0.25em] text-[10px] font-medium mb-4"
          >
            Conclusion
          </p>
          <h2 
            className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-6"
          >
            <TypewriterOnView 
              text="Thank you, any questions?"
            />
          </h2>
          <p 
            className="text-xl text-black/70 max-w-3xl mb-8"
          >
          </p>
          <a 
            href="#hero" 
            className="inline-flex items-center gap-2 text-sm font-medium text-black/60 hover:text-black transition-colors"
          >
            ↑ Back to top
          </a>
        </section>
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
