import type { FC } from 'react';
import './App.css';

/* ─── Data ─────────────────────────────────────────────────── */

const featuredStory = {
  tag: 'Featured',
  region: 'Ethiopia · Yirgacheffe',
  title: 'The Women Who Saved Heirloom Coffee',
  subtitle:
    'Deep in the Gedeo Zone, a cooperative of 340 women farmers is reviving wild-forest varieties that global agribusiness declared extinct.',
  author: 'Lena Mbeki',
  date: 'April 2026',
  readTime: '12 min read',
  img: 'https://images.unsplash.com/photo-1504627298434-2f0a5c3a3d08?w=1200&q=80',
};

const worldStories = [
  {
    tag: 'Origin Story',
    region: 'Colombia · Huila',
    title: 'The Pink Bourbon Comeback',
    blurb:
      'After a decade of neglect, the rare Pink Bourbon variety is fetching record prices at auction — but at what cost to small-holders?',
    author: 'Carlos Restrepo',
    readTime: '8 min',
    img: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80',
  },
  {
    tag: 'Harvest Report',
    region: 'Yemen · Haraz',
    title: 'Coffee in the Time of Crisis',
    blurb:
      'Amid ongoing conflict, Yemen\'s ancient terraced coffee gardens still produce some of the most complex cups on earth.',
    author: 'Nadia Al-Sharif',
    readTime: '10 min',
    img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
  },
  {
    tag: 'Innovation',
    region: 'Japan · Kyoto',
    title: 'The Precision Roasters of Kyoto',
    blurb:
      'Inside Japan\'s smallest roasteries, where batch sizes are measured in grams and flavour notes are mapped to the second.',
    author: 'Yuki Tanaka',
    readTime: '6 min',
    img: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80',
  },
  {
    tag: 'Farmer Profile',
    region: 'Guatemala · Antigua',
    title: 'Volcanic Terroir: Luis Zelaya\'s Obsession',
    blurb:
      'Luis farms the same three hectares his great-grandfather cleared. He has no plans to scale, and every barista in Copenhagen wants his beans.',
    author: 'Sofia Morales',
    readTime: '7 min',
    img: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&q=80',
  },
];

const interviews = [
  {
    name: 'Asnakech Thomas',
    title: 'Pioneer Farmer · Oromia, Ethiopia',
    quote:
      '"I never wanted to just grow coffee. I wanted to show that a woman in this region could define the flavour of a country."',
    img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80',
    topics: ['Natural Processing', 'Women in Coffee', 'Terroir'],
  },
  {
    name: 'James Hoffmann',
    title: 'World Barista Champion · Author',
    quote:
      '"The best cup of coffee I ever had was in a house with no electricity, made on a jebena over charcoal. Equipment is overrated."',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    topics: ['Brewing Philosophy', 'Specialty Trends', 'Home Barista'],
  },
  {
    name: 'Vera Santos',
    title: 'Q Grader & Co-Founder · Fazenda Serra',
    quote:
      '"Brazil gets dismissed as commercial. Come taste what we\'re doing in Minas Gerais and tell me that again."',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    topics: ['Brazilian Specialty', 'Cup of Excellence', 'Processing Methods'],
  },
];

const brewingGuides = [
  {
    method: 'Pour Over',
    device: 'Hario V60',
    difficulty: 'Intermediate',
    time: '4–5 min',
    ratio: '1:15',
    color: '#c8a97e',
    steps: [
      'Rinse filter with near-boiling water, discard rinse water',
      'Add 20 g medium-fine ground coffee',
      'Bloom with 40 ml at 93 °C for 45 seconds',
      'Pour in slow spirals to 150 ml at 1:15, then 300 ml total by 2:30',
      'Allow to drain — total brew time 4–4:30 min',
    ],
    tip: 'Grind finer if brew finishes in under 3 min; coarser if over 5 min.',
  },
  {
    method: 'Cold Brew',
    device: 'Mason Jar',
    difficulty: 'Easy',
    time: '12–18 hr',
    ratio: '1:8',
    color: '#6b9bb8',
    steps: [
      'Coarsely grind 80 g coffee (like rough sea salt)',
      'Combine with 640 ml cold filtered water in a jar',
      'Stir to saturate all grounds, cover tightly',
      'Refrigerate 12–18 hours (longer = stronger)',
      'Strain through a coffee filter — serve over ice',
    ],
    tip: 'Use a single-origin with chocolate or stone-fruit notes for a sweeter result without sugar.',
  },
  {
    method: 'Moka Pot',
    device: 'Bialetti Moka',
    difficulty: 'Easy',
    time: '5–7 min',
    ratio: '1:7',
    color: '#c0392b',
    steps: [
      'Fill the bottom chamber with hot (not boiling) water to the safety valve',
      'Fill the basket with finely ground coffee, level — do not tamp',
      'Assemble and heat on medium-low flame',
      'Remove from heat when you hear a steady gurgle',
      'Run the base under cold water to stop extraction immediately',
    ],
    tip: 'Starting with hot water reduces metallic bitterness from extended bottom-chamber heating.',
  },
  {
    method: 'AeroPress',
    device: 'AeroPress Original',
    difficulty: 'Easy',
    time: '2–3 min',
    ratio: '1:12',
    color: '#7d6b8a',
    steps: [
      'Insert paper filter, rinse; place AeroPress on sturdy mug',
      'Add 15 g medium-fine coffee',
      'Pour 180 ml at 85 °C, stir 10 seconds',
      'Attach cap, wait 1 minute total, then press steadily over 20–30 s',
      'Stop pressing before you hear hissing',
    ],
    tip: 'Inverted method gives more control over steep time — great for experimenters.',
  },
];

const shopItems = [
  {
    category: 'Single Origin',
    name: 'Yirgacheffe Natural — Grade 1',
    origin: 'Ethiopia',
    process: 'Natural',
    notes: 'Blueberry · Jasmine · Dark Chocolate',
    price: '$24 / 250 g',
    badge: 'Award Winning',
    img: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe?w=600&q=80',
  },
  {
    category: 'Single Origin',
    name: 'Huila Pink Bourbon',
    origin: 'Colombia',
    process: 'Washed',
    notes: 'Red Apple · Hibiscus · Brown Sugar',
    price: '$28 / 250 g',
    badge: 'Limited',
    img: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&q=80',
  },
  {
    category: 'Equipment',
    name: 'Hario V60 Starter Kit',
    origin: null,
    process: null,
    notes: 'Ceramic dripper · 40 filters · server · scoop',
    price: '$68',
    badge: 'Best Seller',
    img: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80',
  },
  {
    category: 'Equipment',
    name: 'Commandante C40 Grinder',
    origin: null,
    process: null,
    notes: 'Hand grinder · nitro blade · red clix upgrade',
    price: '$175',
    badge: 'Editor\'s Pick',
    img: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&q=80',
  },
];

const travelStories = [
  {
    destination: 'Addis Ababa, Ethiopia',
    type: 'City Guide',
    title: 'Three Days, Seven Coffee Ceremonies',
    blurb:
      'From the rooftop cafés of Bole to a traditional jebena ceremony in Dire Dawa, Ethiopia rewires your relationship with time — and coffee.',
    duration: '3-day itinerary',
    img: 'https://images.unsplash.com/photo-1520637836862-4d197d17c93a?w=800&q=80',
    highlights: ['Tomoca Coffee · founded 1953', 'Kaldi\'s Forest trip', 'Sunday market cupping'],
  },
  {
    destination: 'Medellín, Colombia',
    type: 'Farm Visit',
    title: 'Into the Coffee Triangle by Jeep',
    blurb:
      'Salento, Jardín, Manizales: the Eje Cafetero delivers cloud-forest hikes, colonial architecture, and cups that taste like the altitude.',
    duration: '5-day itinerary',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    highlights: ['Hacienda Venecia tour', 'Willowglen farm stay', 'La Catedral lookout hike'],
  },
  {
    destination: 'Kyoto & Tokyo, Japan',
    type: 'Café Circuit',
    title: 'The Quiet Art of the Japanese Coffee Shop',
    blurb:
      'Japan\'s kissaten culture is a masterclass in hospitality and restraint. Ten cafés, two cities, one slow week.',
    duration: '7-day itinerary',
    img: 'https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?w=800&q=80',
    highlights: ['Kurasu Kyoto', 'Bear Pond Espresso', 'Fuglen Tokyo'],
  },
];

/* ─── Sub-components ───────────────────────────────────────── */

const NavBar: FC = () => (
  <nav className="navbar">
    <div className="navbar-inner">
      <div className="nav-logo">
        <span className="nav-logo-icon">☕</span>
        <span className="nav-logo-text">Grounds & Glory</span>
      </div>
      <ul className="nav-links">
        <li><a href="#stories">Stories</a></li>
        <li><a href="#interviews">Interviews</a></li>
        <li><a href="#brew">Brew</a></li>
        <li><a href="#shop">Shop</a></li>
        <li><a href="#travel">Travel</a></li>
      </ul>
      <button className="nav-subscribe">Subscribe</button>
    </div>
  </nav>
);

const Hero: FC = () => (
  <section className="hero" id="hero">
    <div className="hero-img-wrap">
      <img src={featuredStory.img} alt={featuredStory.title} className="hero-img" />
      <div className="hero-overlay" />
    </div>
    <div className="hero-content">
      <div className="hero-meta">
        <span className="tag tag--white">{featuredStory.tag}</span>
        <span className="hero-region">{featuredStory.region}</span>
      </div>
      <h1 className="hero-title">{featuredStory.title}</h1>
      <p className="hero-subtitle">{featuredStory.subtitle}</p>
      <div className="hero-byline">
        <span>By {featuredStory.author}</span>
        <span className="dot">·</span>
        <span>{featuredStory.date}</span>
        <span className="dot">·</span>
        <span>{featuredStory.readTime}</span>
      </div>
      <a href="#" className="btn btn--primary">Read Story</a>
    </div>
  </section>
);

const WorldStories: FC = () => (
  <section className="section" id="stories">
    <div className="section-header">
      <span className="section-eyebrow">Around the World</span>
      <h2 className="section-title">From the Fields</h2>
    </div>
    <div className="grid-4">
      {worldStories.map((s) => (
        <article className="card" key={s.title}>
          <div className="card-img-wrap">
            <img src={s.img} alt={s.title} className="card-img" />
            <span className="tag tag--dark card-tag">{s.tag}</span>
          </div>
          <div className="card-body">
            <p className="card-region">{s.region}</p>
            <h3 className="card-title">{s.title}</h3>
            <p className="card-blurb">{s.blurb}</p>
            <div className="card-footer">
              <span>{s.author}</span>
              <span className="dot">·</span>
              <span>{s.readTime}</span>
            </div>
          </div>
        </article>
      ))}
    </div>
  </section>
);

const Interviews: FC = () => (
  <section className="section section--dark" id="interviews">
    <div className="section-inner">
      <div className="section-header">
        <span className="section-eyebrow section-eyebrow--light">In Their Own Words</span>
        <h2 className="section-title section-title--light">Interviews</h2>
      </div>
      <div className="grid-3">
        {interviews.map((i) => (
          <div className="interview-card" key={i.name}>
            <div className="interview-img-wrap">
              <img src={i.img} alt={i.name} className="interview-img" />
            </div>
            <div className="interview-body">
              <p className="interview-quote">{i.quote}</p>
              <div className="interview-meta">
                <strong className="interview-name">{i.name}</strong>
                <span className="interview-title">{i.title}</span>
              </div>
              <div className="interview-topics">
                {i.topics.map((t) => (
                  <span className="topic-pill" key={t}>{t}</span>
                ))}
              </div>
              <a href="#" className="btn btn--outline-light">Read Interview</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const BrewingGuides: FC = () => (
  <section className="section" id="brew">
    <div className="section-header">
      <span className="section-eyebrow">In the Cup</span>
      <h2 className="section-title">Brewing Guides</h2>
      <p className="section-desc">
        Four methods, clear instructions. Pick your ritual.
      </p>
    </div>
    <div className="grid-2">
      {brewingGuides.map((g) => (
        <div className="brew-card" key={g.method} style={{ '--accent': g.color } as React.CSSProperties}>
          <div className="brew-header">
            <div>
              <h3 className="brew-method">{g.method}</h3>
              <p className="brew-device">{g.device}</p>
            </div>
            <div className="brew-meta-pills">
              <span className="brew-pill">{g.difficulty}</span>
              <span className="brew-pill">{g.time}</span>
              <span className="brew-pill">Ratio {g.ratio}</span>
            </div>
          </div>
          <ol className="brew-steps">
            {g.steps.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
          <div className="brew-tip">
            <span className="brew-tip-label">Pro tip</span>
            {g.tip}
          </div>
        </div>
      ))}
    </div>
  </section>
);

const Shop: FC = () => (
  <section className="section section--cream" id="shop">
    <div className="section-header">
      <span className="section-eyebrow">The Pantry</span>
      <h2 className="section-title">Beans & Equipment</h2>
      <p className="section-desc">
        Curated picks from roasters and makers we trust — no affiliate noise, just things we actually use.
      </p>
    </div>
    <div className="grid-4">
      {shopItems.map((item) => (
        <div className="shop-card" key={item.name}>
          <div className="shop-img-wrap">
            <img src={item.img} alt={item.name} className="shop-img" />
            <span className="shop-badge">{item.badge}</span>
          </div>
          <div className="shop-body">
            <p className="shop-category">{item.category}</p>
            <h3 className="shop-name">{item.name}</h3>
            {item.origin && (
              <p className="shop-origin">{item.origin} · {item.process}</p>
            )}
            <p className="shop-notes">{item.notes}</p>
            <div className="shop-footer">
              <span className="shop-price">{item.price}</span>
              <button className="btn btn--small">Buy Now</button>
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="shop-cta">
      <a href="#" className="btn btn--primary">Browse Full Shop</a>
    </div>
  </section>
);

const Travel: FC = () => (
  <section className="section" id="travel">
    <div className="section-header">
      <span className="section-eyebrow">Pack Your Bags</span>
      <h2 className="section-title">Coffee Travel</h2>
      <p className="section-desc">
        Itineraries, farm visits, and café circuits built around the world's best growing regions.
      </p>
    </div>
    <div className="travel-grid">
      {travelStories.map((t, idx) => (
        <article className={`travel-card ${idx === 0 ? 'travel-card--featured' : ''}`} key={t.destination}>
          <div className="travel-img-wrap">
            <img src={t.img} alt={t.destination} className="travel-img" />
            <div className="travel-overlay" />
          </div>
          <div className="travel-body">
            <div className="travel-top">
              <span className="tag tag--white">{t.type}</span>
              <span className="travel-duration">{t.duration}</span>
            </div>
            <h3 className="travel-title">{t.title}</h3>
            <p className="travel-dest">{t.destination}</p>
            <p className="travel-blurb">{t.blurb}</p>
            <ul className="travel-highlights">
              {t.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <a href="#" className="btn btn--outline-white">View Itinerary</a>
          </div>
        </article>
      ))}
    </div>
  </section>
);

const Footer: FC = () => (
  <footer className="footer">
    <div className="footer-inner">
      <div className="footer-brand">
        <span className="nav-logo-icon">☕</span>
        <span className="nav-logo-text">Grounds & Glory</span>
        <p className="footer-tagline">Slow journalism for the caffeinated mind.</p>
      </div>
      <div className="footer-cols">
        <div>
          <h4>Magazine</h4>
          <ul>
            <li><a href="#">Origin Stories</a></li>
            <li><a href="#">Interviews</a></li>
            <li><a href="#">Brew Guides</a></li>
            <li><a href="#">Travel</a></li>
          </ul>
        </div>
        <div>
          <h4>Shop</h4>
          <ul>
            <li><a href="#">Single Origins</a></li>
            <li><a href="#">Equipment</a></li>
            <li><a href="#">Gift Sets</a></li>
            <li><a href="#">Subscriptions</a></li>
          </ul>
        </div>
        <div>
          <h4>Company</h4>
          <ul>
            <li><a href="#">About</a></li>
            <li><a href="#">Write for Us</a></li>
            <li><a href="#">Newsletter</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <p>© 2026 Grounds & Glory. All rights reserved.</p>
    </div>
  </footer>
);

/* ─── App ───────────────────────────────────────────────────── */

const App: FC = () => (
  <>
    <NavBar />
    <main>
      <Hero />
      <WorldStories />
      <Interviews />
      <BrewingGuides />
      <Shop />
      <Travel />
    </main>
    <Footer />
  </>
);

export default App;
