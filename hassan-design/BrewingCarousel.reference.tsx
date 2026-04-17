"use client";

import { useState } from "react";

interface BrewStep {
  method: string;
  tagline: string;
  grind: string;
  ratio: string;
  temp: string;
  time: string;
  tip: string;
}

// ── SVG Illustrations ──────────────────────────────────────────────────────

function PourOverIllustration() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full" aria-hidden>
      {/* Kettle spout pouring */}
      <path d="M20 30 Q30 28 35 38 L38 50" stroke="#C4813D" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <ellipse cx="18" cy="32" rx="10" ry="8" fill="#D4A574" stroke="#C4813D" strokeWidth="1.5"/>
      <rect x="10" y="22" width="16" height="20" rx="4" fill="#E8B960" stroke="#C4813D" strokeWidth="1.5"/>
      {/* Water stream */}
      <path d="M36 52 Q37 60 36 68" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 2"/>
      {/* Dripper */}
      <path d="M26 68 L94 68 L84 100 L36 100 Z" fill="#FFF8F0" stroke="#8B5E3C" strokeWidth="2"/>
      <path d="M50 68 L56 100" stroke="#C4813D" strokeWidth="1" strokeDasharray="3 2"/>
      <path d="M62 68 L64 100" stroke="#C4813D" strokeWidth="1" strokeDasharray="3 2"/>
      <path d="M74 68 L72 100" stroke="#C4813D" strokeWidth="1" strokeDasharray="3 2"/>
      {/* Cup */}
      <rect x="32" y="100" width="56" height="16" rx="3" fill="#F5EDE3" stroke="#8B5E3C" strokeWidth="2"/>
      <path d="M88 103 Q96 108 88 113" stroke="#8B5E3C" strokeWidth="1.5" fill="none"/>
      {/* Coffee in cup */}
      <rect x="34" y="102" width="52" height="6" rx="2" fill="#6B3A2A" opacity="0.3"/>
    </svg>
  );
}

function AeropressIllustration() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full" aria-hidden>
      {/* Body */}
      <rect x="38" y="20" width="44" height="70" rx="6" fill="#F5EDE3" stroke="#8B5E3C" strokeWidth="2"/>
      {/* Plunger */}
      <rect x="42" y="16" width="36" height="8" rx="3" fill="#C4813D" stroke="#8B5E3C" strokeWidth="1.5"/>
      <rect x="57" y="10" width="6" height="10" rx="2" fill="#8B5E3C"/>
      {/* Plunger disc inside */}
      <rect x="42" y="55" width="36" height="6" rx="2" fill="#D4A574" stroke="#C4813D" strokeWidth="1.5"/>
      {/* Coffee inside */}
      <rect x="42" y="62" width="36" height="20" rx="2" fill="#6B3A2A" opacity="0.4"/>
      {/* Filter cap */}
      <rect x="36" y="88" width="48" height="8" rx="4" fill="#C4813D" stroke="#8B5E3C" strokeWidth="2"/>
      {/* Ribs */}
      <line x1="45" y1="22" x2="45" y2="88" stroke="#E8B960" strokeWidth="1" opacity="0.5"/>
      <line x1="75" y1="22" x2="75" y2="88" stroke="#E8B960" strokeWidth="1" opacity="0.5"/>
      {/* Cup */}
      <rect x="34" y="96" width="52" height="14" rx="3" fill="#FFF8F0" stroke="#8B5E3C" strokeWidth="1.5"/>
      <path d="M86 99 Q93 106 86 111" stroke="#8B5E3C" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}

function FrenchPressIllustration() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full" aria-hidden>
      {/* Carafe body */}
      <path d="M30 35 L30 95 Q30 102 38 102 L82 102 Q90 102 90 95 L90 35 Z" fill="#FFF8F0" stroke="#8B5E3C" strokeWidth="2"/>
      {/* Coffee liquid */}
      <path d="M30 65 L90 65 L90 95 Q90 102 82 102 L38 102 Q30 102 30 95 Z" fill="#6B3A2A" opacity="0.35"/>
      {/* Lid */}
      <rect x="28" y="28" width="64" height="10" rx="5" fill="#C4813D" stroke="#8B5E3C" strokeWidth="1.5"/>
      {/* Plunger rod */}
      <rect x="57" y="8" width="6" height="24" rx="2" fill="#8B5E3C"/>
      {/* Plunger disc */}
      <rect x="34" y="62" width="52" height="5" rx="2" fill="#D4A574" stroke="#C4813D" strokeWidth="1.5"/>
      {/* Handle */}
      <path d="M90 50 Q105 50 105 65 Q105 80 90 80" stroke="#8B5E3C" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      {/* Vertical lines in glass */}
      <line x1="45" y1="35" x2="45" y2="65" stroke="#C4813D" strokeWidth="0.8" opacity="0.3"/>
      <line x1="60" y1="35" x2="60" y2="65" stroke="#C4813D" strokeWidth="0.8" opacity="0.3"/>
      <line x1="75" y1="35" x2="75" y2="65" stroke="#C4813D" strokeWidth="0.8" opacity="0.3"/>
    </svg>
  );
}

function EspressoIllustration() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full" aria-hidden>
      {/* Machine body */}
      <rect x="15" y="25" width="90" height="65" rx="8" fill="#4A3228" stroke="#2C1810" strokeWidth="2"/>
      {/* Front panel */}
      <rect x="22" y="32" width="76" height="50" rx="5" fill="#6B3A2A"/>
      {/* Group head */}
      <rect x="42" y="55" width="36" height="14" rx="7" fill="#C4813D" stroke="#8B5E3C" strokeWidth="1.5"/>
      {/* Portafilter handle */}
      <path d="M48 69 L38 85 Q34 92 44 90 L52 74" fill="#8B5E3C" stroke="#2C1810" strokeWidth="1.5"/>
      <path d="M72 69 L82 85 Q86 92 76 90 L68 74" fill="#8B5E3C" stroke="#2C1810" strokeWidth="1.5"/>
      {/* Espresso drips */}
      <path d="M53 90 Q53 98 53 104" stroke="#6B3A2A" strokeWidth="2" strokeLinecap="round"/>
      <path d="M67 90 Q67 98 67 104" stroke="#6B3A2A" strokeWidth="2" strokeLinecap="round"/>
      {/* Espresso cup */}
      <path d="M44 104 L76 104 L72 116 L48 116 Z" fill="#FFF8F0" stroke="#8B5E3C" strokeWidth="1.5"/>
      {/* Buttons */}
      <circle cx="38" cy="42" r="4" fill="#C4813D" stroke="#8B5E3C" strokeWidth="1"/>
      <circle cx="52" cy="42" r="4" fill="#E8B960" stroke="#8B5E3C" strokeWidth="1"/>
      <circle cx="66" cy="42" r="4" fill="#C4813D" stroke="#8B5E3C" strokeWidth="1"/>
      {/* Steam wand */}
      <rect x="88" y="55" width="4" height="22" rx="2" fill="#D4A574" stroke="#8B5E3C" strokeWidth="1"/>
      <ellipse cx="90" cy="77" rx="4" ry="2" fill="#C4813D"/>
    </svg>
  );
}

function ChemexIllustration() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full" aria-hidden>
      {/* Top funnel */}
      <path d="M25 20 L95 20 L72 60 L48 60 Z" fill="#FFF8F0" stroke="#8B5E3C" strokeWidth="2"/>
      {/* Paper filter inside */}
      <path d="M35 22 L85 22 L66 56 L54 56 Z" fill="#F5EDE3" stroke="#C4813D" strokeWidth="1" opacity="0.7"/>
      {/* Coffee in filter */}
      <path d="M48 48 L72 48 L67 56 L53 56 Z" fill="#6B3A2A" opacity="0.4"/>
      {/* Neck */}
      <rect x="48" y="60" width="24" height="8" rx="2" fill="#FFF8F0" stroke="#8B5E3C" strokeWidth="2"/>
      {/* Wooden collar */}
      <rect x="42" y="56" width="36" height="6" rx="3" fill="#C4813D" stroke="#8B5E3C" strokeWidth="1.5"/>
      <rect x="42" y="66" width="36" height="6" rx="3" fill="#C4813D" stroke="#8B5E3C" strokeWidth="1.5"/>
      {/* Bottom carafe */}
      <path d="M48 68 L72 68 L80 100 Q82 108 70 108 L50 108 Q38 108 40 100 Z" fill="#FFF8F0" stroke="#8B5E3C" strokeWidth="2"/>
      {/* Coffee in carafe */}
      <path d="M50 85 L70 85 L76 100 Q78 107 70 107 L50 107 Q42 107 44 100 Z" fill="#6B3A2A" opacity="0.3"/>
      {/* Handle on collar */}
      <path d="M78 59 Q92 62 92 72 Q92 80 78 72" stroke="#8B5E3C" strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

function MokaPotIllustration() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full" aria-hidden>
      {/* Top chamber */}
      <path d="M42 20 L78 20 L76 55 Q75 58 60 58 Q45 58 44 55 Z" fill="#F5EDE3" stroke="#8B5E3C" strokeWidth="2"/>
      {/* Top chamber opening */}
      <ellipse cx="60" cy="20" rx="18" ry="5" fill="#C4813D" stroke="#8B5E3C" strokeWidth="1.5"/>
      {/* Coffee in top */}
      <path d="M48 45 L72 45 L71 55 Q70 57 60 57 Q50 57 49 55 Z" fill="#6B3A2A" opacity="0.4"/>
      {/* Middle gasket */}
      <ellipse cx="60" cy="58" rx="18" ry="4" fill="#8B5E3C" stroke="#2C1810" strokeWidth="1.5"/>
      {/* Bottom chamber */}
      <path d="M40 62 Q38 58 44 57 L76 57 Q82 58 80 62 L75 100 Q73 106 60 106 Q47 106 45 100 Z" fill="#D4A574" stroke="#8B5E3C" strokeWidth="2"/>
      {/* Water level */}
      <path d="M44 85 Q42 82 45 79 L75 79 Q78 82 76 85 L74 100 Q72 105 60 105 Q48 105 46 100 Z" fill="#93C5FD" opacity="0.4"/>
      {/* Handle */}
      <path d="M80 65 Q98 65 98 80 Q98 95 80 90" stroke="#8B5E3C" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      {/* Steam */}
      <path d="M56 18 Q54 12 56 8 Q58 4 56 0" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6"/>
      <path d="M64 18 Q62 12 64 8 Q66 4 64 0" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6"/>
    </svg>
  );
}

function ColdBrewIllustration() {
  return (
    <svg viewBox="0 0 120 120" fill="none" className="w-full h-full" aria-hidden>
      {/* Mason jar */}
      <rect x="30" y="30" width="60" height="78" rx="6" fill="#FFF8F0" stroke="#8B5E3C" strokeWidth="2"/>
      {/* Jar lid */}
      <rect x="28" y="20" width="64" height="14" rx="4" fill="#C4813D" stroke="#8B5E3C" strokeWidth="2"/>
      {/* Coffee grounds bag inside */}
      <rect x="42" y="38" width="36" height="30" rx="4" fill="#6B3A2A" opacity="0.3" strokeDasharray="3 2" stroke="#8B5E3C" strokeWidth="1.5"/>
      <path d="M55 38 Q60 34 65 38" stroke="#8B5E3C" strokeWidth="1.5" fill="none"/>
      {/* Cold brew liquid */}
      <rect x="32" y="68" width="56" height="36" rx="4" fill="#6B3A2A" opacity="0.35"/>
      {/* Ice cubes */}
      <rect x="40" y="72" width="10" height="10" rx="2" fill="white" stroke="#93C5FD" strokeWidth="1.5" opacity="0.8"/>
      <rect x="55" y="76" width="10" height="10" rx="2" fill="white" stroke="#93C5FD" strokeWidth="1.5" opacity="0.8"/>
      <rect x="70" y="72" width="10" height="10" rx="2" fill="white" stroke="#93C5FD" strokeWidth="1.5" opacity="0.8"/>
      {/* Bubbles */}
      <circle cx="45" cy="62" r="2" fill="#93C5FD" opacity="0.5"/>
      <circle cx="68" cy="58" r="2" fill="#93C5FD" opacity="0.5"/>
      <circle cx="57" cy="64" r="1.5" fill="#93C5FD" opacity="0.5"/>
    </svg>
  );
}

// ── Brew Method Definitions ────────────────────────────────────────────────

const ALL_BREW_METHODS: Record<string, BrewStep & { illustration: React.ReactNode; accentColor: string }> = {
  pourOver: {
    method: "Pour Over",
    tagline: "Clean, bright, and nuanced",
    grind: "Medium-fine",
    ratio: "1:16 (coffee:water)",
    temp: "93–96°C / 200–205°F",
    time: "3–4 min",
    tip: "Pour in slow, even circles starting from the center. A 30-second bloom unlocks the full fragrance.",
    illustration: <PourOverIllustration />,
    accentColor: "bg-caramel/10 border-caramel/30",
  },
  aeropress: {
    method: "Aeropress",
    tagline: "Bold, smooth, low-acid",
    grind: "Medium",
    ratio: "1:12 (coffee:water)",
    temp: "80–90°C / 176–194°F",
    time: "1–2 min",
    tip: "Invert method gives you more control. Steep for 60–90 seconds then press slowly and steadily.",
    illustration: <AeropressIllustration />,
    accentColor: "bg-sage/10 border-sage/30",
  },
  frenchPress: {
    method: "French Press",
    tagline: "Full-bodied, rich, and immersive",
    grind: "Coarse",
    ratio: "1:15 (coffee:water)",
    temp: "93–96°C / 200–205°F",
    time: "4 min steep",
    tip: "Don't stir after pressing — let the grounds settle. This brings out the heavy, velvety texture natural-process beans are known for.",
    illustration: <FrenchPressIllustration />,
    accentColor: "bg-espresso/8 border-roast-light/25",
  },
  espresso: {
    method: "Espresso",
    tagline: "Concentrated, intense, complex",
    grind: "Fine (powder-like)",
    ratio: "1:2 (coffee:espresso)",
    temp: "90–94°C / 194–201°F",
    time: "25–30 sec pull",
    tip: "Tamp with ~15kg of even pressure. Natural-process beans shine in espresso — expect a heavy, syrupy shot with fruit notes.",
    illustration: <EspressoIllustration />,
    accentColor: "bg-roast/10 border-roast/30",
  },
  chemex: {
    method: "Chemex",
    tagline: "Crystal-clear, tea-like sweetness",
    grind: "Medium-coarse",
    ratio: "1:17 (coffee:water)",
    temp: "93–96°C / 200–205°F",
    time: "4–5 min",
    tip: "Chemex filters are thicker — pre-wet them to remove paper taste. Pour in stages of 50–60g for exceptional clarity.",
    illustration: <ChemexIllustration />,
    accentColor: "bg-honey/15 border-honey/40",
  },
  mokaPot: {
    method: "Moka Pot",
    tagline: "Stovetop espresso-style strength",
    grind: "Fine-medium",
    ratio: "Fill basket; fill chamber to valve",
    temp: "Use pre-boiled water",
    time: "4–5 min on stove",
    tip: "Use low-medium heat and pre-boiled water to avoid a bitter, metallic taste. Remove from heat as soon as you hear gurgling.",
    illustration: <MokaPotIllustration />,
    accentColor: "bg-caramel/10 border-caramel/25",
  },
  coldBrew: {
    method: "Cold Brew",
    tagline: "Smooth, sweet, low-acid refreshment",
    grind: "Extra coarse",
    ratio: "1:8 (coffee:water)",
    temp: "Cold / room temperature",
    time: "12–24 hrs steep",
    tip: "Use coarsely ground beans and steep in the fridge overnight. Natural and honey-processed beans yield a sweeter, fruitier cold brew.",
    illustration: <ColdBrewIllustration />,
    accentColor: "bg-sage/10 border-sage/25",
  },
};

// ── Processing method → recommended brew order ──────────────────────────

function getBrewMethods(processingMethod: string) {
  const m = processingMethod.toLowerCase();

  if (m.includes("washed") || m.includes("wet")) {
    // Washed: bright, clean, high acidity → methods that preserve clarity
    return [
      ALL_BREW_METHODS.pourOver,
      ALL_BREW_METHODS.chemex,
      ALL_BREW_METHODS.aeropress,
      ALL_BREW_METHODS.coldBrew,
    ];
  }

  if (m.includes("natural") || m.includes("dry")) {
    // Natural: fruity, heavy body, fermented sweetness → full-immersion or pressure
    return [
      ALL_BREW_METHODS.frenchPress,
      ALL_BREW_METHODS.espresso,
      ALL_BREW_METHODS.mokaPot,
      ALL_BREW_METHODS.coldBrew,
    ];
  }

  if (m.includes("honey") || m.includes("pulped")) {
    // Honey / pulped natural: sweet, balanced → versatile methods
    return [
      ALL_BREW_METHODS.aeropress,
      ALL_BREW_METHODS.pourOver,
      ALL_BREW_METHODS.chemex,
      ALL_BREW_METHODS.mokaPot,
    ];
  }

  if (m.includes("semi")) {
    // Semi-washed: complex, medium body → flexible
    return [
      ALL_BREW_METHODS.aeropress,
      ALL_BREW_METHODS.pourOver,
      ALL_BREW_METHODS.frenchPress,
      ALL_BREW_METHODS.espresso,
    ];
  }

  // Fallback / Other
  return [
    ALL_BREW_METHODS.pourOver,
    ALL_BREW_METHODS.aeropress,
    ALL_BREW_METHODS.frenchPress,
    ALL_BREW_METHODS.chemex,
  ];
}

// ── Component ──────────────────────────────────────────────────────────────

interface BrewingCarouselProps {
  processingMethod: string;
}

export default function BrewingCarousel({ processingMethod }: BrewingCarouselProps) {
  const methods = getBrewMethods(processingMethod);
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  function go(index: number) {
    setDirection(index > active ? "right" : "left");
    setActive(index);
  }

  function prev() {
    go(active === 0 ? methods.length - 1 : active - 1);
  }

  function next() {
    go(active === methods.length - 1 ? 0 : active + 1);
  }

  const card = methods[active];

  return (
    <section className="mt-10">
      <div className="flex items-center gap-3 mb-6">
        <h2 className="font-serif text-xl font-bold text-espresso">Brewing Guide</h2>
        <div className="flex-1 h-px bg-cream-dark" />
        <span className="text-xs text-roast-light bg-cream-dark px-2.5 py-1 rounded-full capitalize">
          {processingMethod || "General"}
        </span>
      </div>

      <div className="relative">
        {/* Card */}
        <div
          key={active}
          className={`animate-fade-in rounded-2xl border ${card.accentColor} p-6 md:p-8 grid md:grid-cols-[1fr_2fr] gap-6 md:gap-10 items-center`}
        >
          {/* Illustration */}
          <div className="flex justify-center">
            <div className="w-36 h-36 md:w-44 md:h-44">
              {card.illustration}
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="text-xs font-medium text-roast-light uppercase tracking-widest mb-1">
              Recommended Brew
            </p>
            <h3 className="font-serif text-2xl font-bold text-espresso mb-0.5">
              {card.method}
            </h3>
            <p className="text-sm italic text-caramel mb-5">{card.tagline}</p>

            {/* Params grid */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 mb-5">
              {[
                { label: "Grind Size", value: card.grind },
                { label: "Coffee Ratio", value: card.ratio },
                { label: "Water Temp", value: card.temp },
                { label: "Brew Time", value: card.time },
              ].map((p) => (
                <div key={p.label}>
                  <p className="text-xs text-roast-light mb-0.5">{p.label}</p>
                  <p className="text-sm font-medium text-espresso">{p.value}</p>
                </div>
              ))}
            </div>

            {/* Tip */}
            <div className="bg-white/60 rounded-xl px-4 py-3 border border-white">
              <p className="text-xs font-semibold text-caramel mb-1">Pro Tip</p>
              <p className="text-sm text-espresso leading-relaxed">{card.tip}</p>
            </div>
          </div>
        </div>

        {/* Prev / Next arrows */}
        <button
          onClick={prev}
          aria-label="Previous brew method"
          className="absolute -left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white border border-cream-dark shadow-sm flex items-center justify-center text-espresso hover:bg-cream-dark transition-colors z-10"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
          </svg>
        </button>
        <button
          onClick={next}
          aria-label="Next brew method"
          className="absolute -right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white border border-cream-dark shadow-sm flex items-center justify-center text-espresso hover:bg-cream-dark transition-colors z-10"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {/* Dot indicators + method pill tabs */}
      <div className="flex items-center justify-center gap-2 mt-5 flex-wrap">
        {methods.map((m, i) => (
          <button
            key={m.method}
            onClick={() => go(i)}
            aria-label={`View ${m.method}`}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              i === active
                ? "bg-espresso text-cream shadow-sm scale-105"
                : "bg-cream-dark text-roast-light hover:bg-espresso/10 hover:text-espresso"
            }`}
          >
            {m.method}
          </button>
        ))}
      </div>
    </section>
  );
}
