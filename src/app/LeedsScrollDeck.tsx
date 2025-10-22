"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

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
      viewport={{ once: false, margin: "-20%" }}
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
        viewport={{ once: false }}
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
      bullets: [
        "Midsized grocery chain with ~100 stores in mountain West region",
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
        "Price ceiling and floor for all goods—customers will not be charged over the limit",
        "Late-hour freeze: Prices locked 2 hours before closing, reverting to midday baseline",
        "Large screens (front & back of store) display top 5 most common items' price fluctuations",
        "QR codes on each product provide in-depth reasons for price changes",
        "Prices reduced for goods close to expiration—lowering waste"
      ]
    },
    {
      id: "transparency",
      label: "Transparency & Communication",
      template: "standard",
      kicker: "Full disclosure",
      headline: "What We'll Disclose—At Shelf, In App, On Web",
      icon: "eye",
      bullets: [
        "Mobile app with live price updates for all products",
        "If price is above/below industry standard, customers see which factors influence it most",
        "Price history available on app so customers feel assured prices aren't individual-based",
        "Customers can report absurd prices—public fairness intuition as correction",
        "Company-wide Ethics department to address price reports",
        "Clear escalation path: Store rep → Regional manager → HR final verdict"
      ]
    },
    {
      id: "guardrails",
      label: "Guardrails & Governance",
      template: "split",
      kicker: "Non-negotiable boundaries",
      headline: "Hard Limits on AI Autonomy",
      sections: [
        {
          title: "Price Guardrails",
          items: [
            "Use past year of price data from surrounding stores as baseline",
            "Helios bounded to ±1 standard deviation from yearly mean",
            "Fresh data accounts for inflation and natural fluctuations"
          ]
        },
        {
          title: "Continuous Improvement",
          items: [
            "Periodic audits by independent third-party reviewers",
            "Annual ethics certification training for all Helios overseers",
            "Decision logs reviewed for compliance with ethical principles"
          ]
        }
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
        "If overwhelming negative response → AI overseer intervenes (e.g., lowers prices)"
      ]
    },
    {
      id: "qa",
      label: "Q&A",
      template: "standard",
      kicker: "Tough questions",
      headline: "Addressing Concerns",
      bullets: [
        "Why not disable Helios? → We need efficiency, but fairness comes first",
        "Won't transparency hurt profits? → Trust is our competitive advantage",
        "What if competitors don't follow? → We lead on integrity, not follow the pack"
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
              viewport={{ once: false, margin: "-20%", amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              {/* Section number and kicker with varied animation */}
              <motion.div 
                className="flex items-baseline gap-4 mb-4"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-20%" }}
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
                className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-8"
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, margin: "-20%" }}
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

            {/* Render icon if specified */}
            {(s as any).icon === 'eye' && <AnimatedEye />}

            {/* Template-based content rendering */}
            {s.template === 'standard' && s.bullets && (
              <ul className="space-y-5 text-xl md:text-2xl text-black/80 leading-relaxed">
                {s.bullets.map((b, i) => (
                  <motion.li 
                    key={i} 
                    className="flex items-start gap-4 group"
                    initial={{ opacity: 0, x: -30, y: 10 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: false, margin: "-20%" }}
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
                    className="text-2xl md:text-3xl font-medium text-black/90 border-l-4 border-black pl-6 py-2"
                    initial={{ opacity: 0, x: -50, scale: 0.95 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: false, margin: "-20%" }}
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
                viewport={{ once: false, margin: "-20%" }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {s.bullets.map((b, i) => (
                  <motion.div
                    key={i}
                    className="border border-black/10 p-6 text-center hover:border-black/30 transition-all hover:shadow-lg"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-20%" }}
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
                    viewport={{ once: false, margin: "-20%" }}
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
                          viewport={{ once: false, margin: "-20%" }}
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

            {/* Footer crumbs */}
            <motion.div 
              className="mt-12 flex items-center gap-3 text-black/30 text-xs"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, margin: "-20%" }}
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
          viewport={{ once: false, margin: "-20%" }}
          transition={{ duration: 1 }}
        >
          <motion.p 
            className="text-black/40 uppercase tracking-[0.25em] text-[10px] font-medium mb-4"
            initial={{ opacity: 0, x: -30, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: false, margin: "-20%" }}
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
            viewport={{ once: false, margin: "-20%" }}
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
            viewport={{ once: false, margin: "-20%" }}
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
            viewport={{ once: false, margin: "-20%" }}
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
