"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import s from "./stamps.module.css";

/* ---------- Content (from the current favhiker site) ---------- */
const WORDS = ["dish.", "stay.", "film.", "book.", "show."];
const QUICK = [
  { icon: "award", label: "Top dishes" },
  { icon: "route", label: "Plan my trip" },
  { icon: "calendar", label: "Plan my day" },
  { icon: "clapper", label: "Films & shows" },
];
const BATTLE = [
  { img: "/favhiker/uprising.jpg", title: "The Uprising", meta: "Film · 2026 · Action" },
  { img: "/favhiker/forgotten-island.jpg", title: "Forgotten Island", meta: "Film · 2026 · Animation" },
];
const PICKS = [
  { img: "/favhiker/biryani.jpg", tag: "Food", icon: "utensils", title: "Paragon Restaurant", note: "Known for Mutton Biryani" },
  { img: "/favhiker/oberoi.jpg", tag: "Stay", icon: "bed", title: "The Oberoi, Bengaluru", note: "Top-rated in Bengaluru" },
  { img: "/favhiker/3-idiots.jpg", tag: "Film", icon: "clapper", title: "3 Idiots", note: "A favourite of 9 explorers" },
  { img: "/favhiker/devarayanadurga.jpg", tag: "Trip", icon: "route", title: "Devarayanadurga", note: "1 h 45 min from Bengaluru" },
  { img: "/favhiker/bhagavad.jpg", tag: "Book", icon: "book", title: "Shrimad Bhagvat", note: "A favourite of 2 explorers" },
  { img: "/favhiker/meghana.jpg", tag: "Food", icon: "utensils", title: "Meghana Foods", note: "Known for Hyderabadi Biryani" },
];
const NEARBY = ["Bengaluru", "Bannerghatta", "Savandurga", "Hosur", "Ramanagara", "Nandi Hills", "Shivagange", "Skandagiri"];
const DIARY = [
  { img: "/favhiker/biryani.jpg", tag: "Food", icon: "utensils", title: "The dishes you’d go back for.", text: "A GoldenBite is a dish an explorer loves. Find the best plate in any city.", gold: true },
  { img: "/favhiker/oberoi.jpg", tag: "Stays", icon: "bed", title: "The places you’d sleep again.", text: "Prices for your dates. Reviews read for you.", meta: "The Oberoi, Bengaluru" },
  { img: "/favhiker/3-idiots.jpg", tag: "Films & shows", icon: "clapper", title: "Say what you loved.", text: "The story, the music, the cast." },
  { img: "/favhiker/bhagavad.jpg", tag: "Books", icon: "book", title: "The ones you press into people’s hands.", text: "Keep what you loved. See what readers like you keep." },
];
const STEPS = [
  { title: "Add to my diary", text: "One tap. Your profile is your diary." },
  { title: "Say what you love", text: "Say why you loved it." },
  { title: "Find your next favourite", text: "Meet people with your taste." },
];
const MATCHES = [
  { p: 92, title: "Taste twin", text: "Trust their diary like your own." },
  { p: 77, title: "Your type", text: "Most of what they love, you will too." },
  { p: 58, title: "Some things in common", text: "Worth a look — a few shared favourites." },
  { p: 41, title: "Different taste", text: "Great for them. Maybe not for you." },
];
const READS = [
  "You both keep the same dish at the same place",
  "You both loved the writing of the same film",
  "Mountain views and quiet places, both of you",
  "Extra spice, small local places, late nights",
];
const TOOLS = [
  { icon: "sparkles", title: "AI Picks", text: "Know what to order, from what people loved there.", edge: "notch" },
  { icon: "swords", title: "Bite Battle", text: "This or that, ten rounds. Play with a friend.", edge: "scallop" },
  { icon: "bed", title: "Why stay here?", text: "A stay's reviews, read for you.", edge: "perf" },
  { icon: "calendar", title: "Plan my day", text: "Tell us your mood. Get a plan for the day.", edge: "wave", premium: true },
];
const APP_POINTS = [
  { icon: "utensils", text: "Every GoldenBite, with you at the table" },
  { icon: "bed", text: "The stays you keep, priced for your dates" },
  { icon: "users", text: "People with your taste, one tap away" },
];
const STATS = [
  { value: "114", label: "Countries" },
  { value: "2.3K", label: "Cities" },
  { value: "12.9K", label: "Restaurants" },
  { value: "80", label: "Cuisines" },
  { value: "13K", label: "Dishes" },
];
const KINDS = [
  { title: "Food", text: "Restaurants · Dishes · Cafés" },
  { title: "Stay", text: "Hotels · Resorts · Homestays" },
  { title: "Explore", text: "Malls · Events · Experiences" },
];
const CITIES = ["Bengaluru", "Kochi", "Mumbai", "New Delhi", "Calicut", "Hyderabad", "Chennai", "Pune", "Trivandrum", "Goa", "Kolkata", "Ahmedabad", "Thrissur", "Kollam", "Kannur"];
const COUNTRIES = [
  ["IN", "India"], ["AE", "United Arab Emirates"], ["SA", "Saudi Arabia"], ["GB", "United Kingdom"], ["PK", "Pakistan"], ["CN", "China"],
  ["US", "United States"], ["CA", "Canada"], ["ID", "Indonesia"], ["OM", "Oman"], ["TH", "Thailand"], ["AU", "Australia"],
];
const PERKS = ["Show what you do best", "Keep hours, photos and menu up to date", "Get found by explorers nearby", "Run it from the favhiker Business app"];
const FOOTER = [
  { title: "Explore", links: ["City Circle", "Categories", "Cities", "Malls", "GoldenBites", "Dining formats", "Top Explorers"] },
  { title: "Product", links: ["Search & AI Picks", "Plan my day", "Plan my trip", "Connect to ChatGPT & Claude", "For Restaurants", "Partner with us"] },
  { title: "Company", links: ["How it Works", "Mission & Vision", "FAQs"] },
  { title: "Support", links: ["Contact Us", "Report an Issue", "Support"] },
  { title: "Legal", links: ["Privacy Policy", "Terms & Conditions", "Refund Policy"] },
];
const pad = (n: number) => String(n + 1).padStart(2, "0");

/* ---------- Icons (24px stroke set) ---------- */
const PATHS: Record<string, string> = {
  home: "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z",
  pin: "M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4",
  chevron: "m6 9 6 6 6-6",
  arrow: "M5 12h14M13 6l6 6-6 6",
  route: "M6 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM18 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM6 16V9a3 3 0 0 1 3-3h7M18 8v7a3 3 0 0 1-3 3H8",
  calendar: "M4 6h16v15H4zM4 10h16M8 3v4M16 3v4M8 14h2M12 14h2M8 17h2M12 17h2",
  clapper: "M4 11h16v9H4zM4 11 5.5 5l14 3-1.5 3M9 6l-1 4.5M14 7l-1 4",
  bed: "M3 19V7M3 15h18v4M21 15v-2a3 3 0 0 0-3-3h-7v5M7 12.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z",
  sparkles: "M11 3l1.9 5.1L18 10l-5.1 1.9L11 17l-1.9-5.1L4 10l5.1-1.9zM19 15l.7 1.8 1.8.7-1.8.7L19 20l-.7-1.8-1.8-.7 1.8-.7z",
  swords: "M14 4h6v6L9 21l-3-3zM4 14l6 6M3 21l3-3M10 4H4v6l3 3",
  crown: "M3 8l4.5 4L12 5l4.5 7L21 8l-2 11H5z",
  users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8",
  utensils: "M5 3v7a3 3 0 0 0 6 0V3M8 3v18M19 15V3a5 5 0 0 0-5 5v7h5zM19 15v6",
  book: "M2 4h7a3 3 0 0 1 3 3v14a2 2 0 0 0-2-2H2zM22 4h-7a3 3 0 0 0-3 3v14a2 2 0 0 1 2-2h8z",
  award: "M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM8.5 13.9 7 22l5-3 5 3-1.5-8.1",
  check: "M20 6 9 17l-5-5",
  share: "M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 22a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM8.6 13.5l6.8 4M15.4 6.5l-6.8 4",
  instagram: "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM17.5 6.5h0",
  facebook: "M15 3h-2.5A4.5 4.5 0 0 0 8 7.5V10H5v4h3v7h4v-7h3l1-4h-4V7.5A.5.5 0 0 1 12.5 7H15z",
  youtube: "M2.5 7.5a3 3 0 0 1 2.1-2.1C6.5 5 12 5 12 5s5.5 0 7.4.4a3 3 0 0 1 2.1 2.1c.5 1.9.5 4.5.5 4.5s0 2.6-.5 4.5a3 3 0 0 1-2.1 2.1C17.5 19 12 19 12 19s-5.5 0-7.4-.4a3 3 0 0 1-2.1-2.1C2 14.6 2 12 2 12s0-2.6.5-4.5zM10 15l5-3-5-3z",
};
const Icon = ({ n }: { n: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d={PATHS[n]} />
  </svg>
);
/** Four-point sparkle used as an ornament. */
const Spark = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="M12 0c.6 6.6 5.4 11.4 12 12-6.6.6-11.4 5.4-12 12-.6-6.6-5.4-11.4-12-12C6.6 11.4 11.4 6.6 12 0z" />
  </svg>
);
const Apple = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M16.4 12.6c0-2.4 2-3.5 2-3.6-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9s-1.8-.9-3-.8C7 7.3 5.5 8.2 4.7 9.6c-1.7 2.9-.4 7.2 1.2 9.6.8 1.2 1.7 2.4 3 2.4 1.2-.1 1.6-.8 3-.8s1.8.8 3 .8 2-1.2 2.8-2.3c.9-1.3 1.2-2.6 1.3-2.7-.1 0-2.6-1-2.6-4ZM14.2 5.6c.6-.8 1.1-1.9 1-3-.9 0-2.1.6-2.7 1.4-.6.7-1.1 1.8-1 2.9 1 .1 2.1-.5 2.7-1.3Z" />
  </svg>
);
const Play = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M4 3.5v17a1 1 0 0 0 1.5.9l14.7-8.5a1 1 0 0 0 0-1.8L5.5 2.6A1 1 0 0 0 4 3.5Zm2 2.2L13.3 12 6 18.3V5.7Z" />
  </svg>
);

/* ---------- Pieces ---------- */
/** Round seal with text running around the rim (like a label's maker's mark). */
function Seal({ id, text, className, children }: { id: string; text: string; className?: string; children?: ReactNode }) {
  return (
    <span className={`${s.seal} ${className ?? ""}`} aria-hidden>
      <svg viewBox="0 0 100 100" className={s.sealRim}>
        <defs>
          <path id={id} d="M50 50m-37 0a37 37 0 1 1 74 0a37 37 0 1 1-74 0" />
        </defs>
        <circle cx="50" cy="50" r="48" />
        <circle cx="50" cy="50" r="27" />
        <text>
          <textPath href={`#${id}`} textLength="231" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <span className={s.sealCore}>{children}</span>
    </span>
  );
}

/** Postmark: ringed city stamp with cancellation waves. */
const Postmark = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 220 110" className={className} fill="none" stroke="currentColor" aria-hidden>
    <defs>
      <path id="pm" d="M55 55m-38 0a38 38 0 1 1 76 0a38 38 0 1 1-76 0" />
    </defs>
    <circle cx="55" cy="55" r="48" strokeWidth="2" />
    <circle cx="55" cy="55" r="29" strokeWidth="1.2" />
    <text fill="currentColor" stroke="none">
      <textPath href="#pm" textLength="236" lengthAdjust="spacing">
        BENGALURU · FAVHIKER · 2026 ·
      </textPath>
    </text>
    <text x="55" y="61" textAnchor="middle" fill="currentColor" stroke="none" className="pmDate">
      FREE
    </text>
    {[34, 48, 62, 76].map((y) => (
      <path key={y} d={`M112 ${y}c9-8 18 8 27 0s18 8 27 0 18 8 27 0 18 8 27 0`} strokeWidth="2" />
    ))}
  </svg>
);

function Logo({ sub = false }: { sub?: boolean }) {
  return (
    <a href="/" className={s.logo} aria-label="favhiker home">
      <span className={s.logoStamp}>F</span>
      <span>
        favhiker
        {sub && <small>Your social diary</small>}
      </span>
    </a>
  );
}

function Stores() {
  return (
    <div className={s.stores}>
      <a href="#app" className={s.store}>
        <Apple />
        <span>
          <small>Download on the</small>App Store
        </span>
      </a>
      <a href="#app" className={s.store}>
        <Play />
        <span>
          <small>Get it on</small>Google Play
        </span>
      </a>
    </div>
  );
}

/** Numbered label, heading and sub-line that open each section. */
function Head({ n, kicker, title, sub, center = false }: { n: string; kicker: string; title: ReactNode; sub?: string; center?: boolean }) {
  return (
    <header className={center ? `${s.head} ${s.center}` : s.head}>
      <p className={s.label}>
        <span>No. {n}</span>
        <i />
        {kicker}
      </p>
      <h2 className={s.h2}>{title}</h2>
      {sub && <p className={s.sub}>{sub}</p>}
    </header>
  );
}

const Ring = ({ p }: { p: number }) => (
  <span className={s.ring} style={{ "--p": p } as CSSProperties}>
    <svg viewBox="0 0 64 64" aria-hidden>
      <circle cx="32" cy="32" r="28" />
      <circle cx="32" cy="32" r="28" pathLength="100" />
    </svg>
    {p}%
  </span>
);

export default function Stamps() {
  const [word, setWord] = useState(0);
  const [round, setRound] = useState(0);
  const [pick, setPick] = useState<number | null>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setWord((n) => (n + 1) % WORDS.length), 2400);
    return () => clearInterval(t);
  }, []);

  const vote = (i: number | null) => {
    setPick(i);
    setRound((r) => (r + 1) % 7);
  };

  return (
    <div className={s.page}>
      {/* ---------- Nav ---------- */}
      <header className={s.nav}>
        <div className={s.navInner}>
          <Logo />
          <button className={s.homeChip}>
            <Icon n="home" /> Home <Icon n="chevron" />
          </button>
          <button className={s.city}>
            <Icon n="pin" /> Bengaluru <Icon n="chevron" />
          </button>
          <label className={s.search}>
            <Icon n="search" />
            <input placeholder="Search food, stays, films, books…" aria-label="Search" />
          </label>
          <a href="#app" className={s.ghost}>
            Use app
          </a>
          <a href="#signin" className={s.dark}>
            Sign in
          </a>
        </div>
      </header>

      {/* ---------- Hero: a stamp on green, like a first-day cover ---------- */}
      <section className={s.hero}>
        <p className={`${s.corner} ${s.tl}`}>
          favhiker
          <i />
        </p>
        <p className={`${s.corner} ${s.tr}`}>No. 01</p>
        <p className={`${s.corner} ${s.bl}`}>2026</p>
        <span className={`${s.corner} ${s.br} ${s.ringMark}`} />
        <p className={`${s.vert} ${s.vl}`}>Your social diary</p>
        <p className={`${s.vert} ${s.vr}`}>Bengaluru</p>

        <div className={`${s.wrap} ${s.heroGrid}`}>
          <div className={s.heroText}>
            <p className={s.label}>
              <span>No. 01</span>
              <i />
              Your social diary
            </p>
            <h1 className={s.h1}>
              Find your next favourite{" "}
              <em key={word} className={s.word}>
                {WORDS[word]}
              </em>
            </h1>
            <p className={s.lede}>Keep a diary of the food, stays, films, shows and books you love — and see what people with your taste love too.</p>
            <div className={s.ctas}>
              <a href="#start" className={s.btnYellow}>
                Start your diary — it’s free <Icon n="arrow" />
              </a>
              <a href="#app" className={s.btnLine}>
                Use the app
              </a>
            </div>
            <div className={s.quick}>
              {QUICK.map((q) => (
                <a key={q.label} href="#favourites">
                  <span>
                    <Icon n={q.icon} />
                  </span>
                  {q.label}
                </a>
              ))}
            </div>
          </div>

          <div className={s.heroArt}>
            <div className={s.shadow}>
              <div className={`${s.perf} ${s.battle}`}>
                <div className={s.battleTop}>
                  <span className={s.label}>
                    <Icon n="swords" /> Watch Battle
                  </span>
                  <span className={s.rounds} aria-label={`Round ${round + 1} of 7`}>
                    {Array.from({ length: 7 }, (_, i) => (
                      <i key={i} data-on={i === round} />
                    ))}
                  </span>
                </div>
                <h3>Which would you watch tonight?</h3>
                <p>Tap one. The winner stays on. Seven rounds.</p>
                <div className={s.versus}>
                  {BATTLE.map((b, i) => (
                    <button key={b.title} className={s.poster} data-picked={pick === i} onClick={() => vote(i)}>
                      <img src={b.img} alt={b.title} />
                      <b>{b.title}</b>
                      <small>{b.meta}</small>
                    </button>
                  ))}
                  <span className={s.vs}>vs</span>
                </div>
                <div className={s.stampFoot}>
                  <span>
                    <b>Watch</b>
                    <small>Battle</small>
                  </span>
                  <button className={s.neither} onClick={() => vote(null)}>
                    Neither — show me two others
                  </button>
                  <strong>0{round + 1}</strong>
                </div>
              </div>
            </div>
            <Seal id="seal-gold" text="GOLDENBITE · A DISH AN EXPLORER LOVES · " className={s.goldSeal}>
              <img src="/favhiker/rosette.png" alt="" />
            </Seal>
            <div className={`${s.scallop} ${s.sticker}`}>
              <strong>12.9K+</strong>
              <small>restaurants in explorers’ diaries</small>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Next favourites: a sheet of stamps ---------- */}
      <section className={s.sec} id="favourites">
        <div className={s.wrap}>
          <div className={s.rowHead}>
            <Head n="02" kicker="Picked for you in Bengaluru" title="Your next favourites" />
            <a href="#cities" className={s.textLink}>
              See all <Icon n="arrow" />
            </a>
          </div>
        </div>
        <div className={s.reel}>
          {PICKS.map((p, i) => (
            <a key={p.title} href="#start" className={s.shadow}>
              <span className={`${s.perf} ${s.pick}`}>
                <span className={s.pickImg}>
                  <img src={p.img} alt="" />
                  <span className={s.pickTag}>
                    <Icon n={p.icon} /> {p.tag}
                  </span>
                </span>
                <span className={s.pickFoot}>
                  <span>
                    <b>{p.title}</b>
                    <small>{p.note}</small>
                  </span>
                  <em>{pad(i)}</em>
                </span>
              </span>
            </a>
          ))}
        </div>
        <div className={s.wrap}>
          <div className={s.nearby}>
            <p className={s.label}>
              <Icon n="pin" /> Closest to you
            </p>
            <div className={s.chips}>
              {NEARBY.map((c) => (
                <a key={c} href="#cities" className={s.chip}>
                  {c}
                </a>
              ))}
            </div>
            <a href="#cities" className={s.textLink}>
              Somewhere else <Icon n="arrow" />
            </a>
          </div>
        </div>
      </section>

      {/* ---------- The diary: arched labels ---------- */}
      <section className={`${s.sec} ${s.cream}`} id="start">
        <div className={s.wrap}>
          <Head n="03" kicker="The diary" title="One diary. Everything you love." sub="Food, stays, films, shows and books. One diary, one link to share." center />
          <div className={s.arches}>
            {DIARY.map((d) => (
              <a key={d.tag} href="#favourites" className={s.arch}>
                <span className={s.archImg}>
                  <img src={d.img} alt="" />
                </span>
                {d.gold && <img src="/favhiker/rosette.png" alt="" className={s.archBadge} />}
                <span className={s.archTag}>
                  <Icon n={d.icon} /> {d.tag}
                </span>
                <h3>{d.title}</h3>
                <p>{d.text}</p>
                {d.meta && <small>{d.meta}</small>}
              </a>
            ))}
          </div>
          <ol className={s.steps}>
            {STEPS.map((st, i) => (
              <li key={st.title} className={s.ticket}>
                <span className={s.stub}>
                  <small>Step</small>
                  <b>0{i + 1}</b>
                </span>
                <span className={s.ticketBody}>
                  <b>{st.title}</b>
                  <span>{st.text}</span>
                </span>
              </li>
            ))}
          </ol>
          <div className={s.centerRow}>
            <a href="#app" className={s.btnDark}>
              <Icon n="share" /> Start my diary — it’s free <Icon n="arrow" />
            </a>
          </div>
        </div>
      </section>

      {/* ---------- Taste: editorial cards on deep green ---------- */}
      <section className={`${s.sec} ${s.taste}`}>
        <div className={s.wrap}>
          <Head n="04" kicker="Taste" title="A great place isn’t great for everyone." sub="Ratings show what’s popular. Taste Match shows what you’ll love." center />
          <div className={s.tasteGrid}>
            <div className={`${s.paperCard} ${s.matches}`}>
              <h3>What a match says</h3>
              {MATCHES.map((m) => (
                <div key={m.p} className={s.match}>
                  <Ring p={m.p} />
                  <span>
                    <b>{m.title}</b>
                    <small>{m.text}</small>
                  </span>
                </div>
              ))}
            </div>
            <div className={`${s.paperCard} ${s.reads}`}>
              <div className={s.readsHead}>
                <span className={s.orbit}>
                  <Spark />
                </span>
                <div>
                  <h3>What it reads</h3>
                  <p>Only what’s in both diaries. No likes, no follower counts.</p>
                </div>
              </div>
              <ul className={s.readList}>
                {READS.map((r, i) => (
                  <li key={r}>
                    <span>{pad(i)}</span>
                    {r}
                  </li>
                ))}
              </ul>
              <div className={s.readsFoot}>
                <small>Follow people for what they find.</small>
                <a href="#start" className={s.btnPill}>
                  <span aria-hidden>✻</span> Find people with your taste <span aria-hidden>✻</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Decide faster: member cards ---------- */}
      <section className={s.sec}>
        <div className={s.wrap}>
          <Head n="05" kicker="Decide faster" title="Not what’s popular. What’s right for you." sub="Your diary, turned into tonight’s answer." center />
          <div className={s.members}>
            {TOOLS.map((t, i) => (
              <a key={t.title} href="#app" className={`${s.member} ${s.shadow}`} data-edge={t.edge}>
                <span className={s.memberBadge}>
                  <small>{t.premium ? "Premium" : "Tool"}</small>
                  <b>#{i + 1}</b>
                </span>
                <span className={s.memberCard}>
                  <b className={s.memberName}>{t.title}</b>
                  <small className={s.memberSub}>· Decide faster ·</small>
                  <span className={s.memberIcon}>
                    <Icon n={t.icon} />
                  </span>
                  <span className={s.memberText}>{t.text}</span>
                  <span className={s.memberFoot}>
                    <small>· Try it ·</small>
                    <b>
                      Tonight <Icon n="arrow" />
                    </b>
                  </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- App: a postcard ---------- */}
      <section className={s.sec} id="app">
        <div className={s.wrap}>
          <div className={s.postcard}>
            <div className={s.postText}>
              <p className={s.label}>
                <span>No. 06</span>
                <i />
                The favhiker app
              </p>
              <h2 className={s.h2}>
                Your diary, <em>in your pocket.</em>
              </h2>
              <p className={s.sub}>Keep the food and stays you love, in one diary with you. Your people, a tap away.</p>
              <ul className={s.points}>
                {APP_POINTS.map((a) => (
                  <li key={a.text}>
                    <i>
                      <Icon n={a.icon} />
                    </i>
                    {a.text}
                  </li>
                ))}
              </ul>
            </div>
            <div className={s.postSide}>
              <div className={s.postTop}>
                <Postmark className={s.postmark} />
                <span className={s.shadow}>
                  <span className={`${s.perf} ${s.miniStamp}`}>
                    <img src="/favhiker/mascot.png" alt="" />
                    <b>Free</b>
                  </span>
                </span>
              </div>
              <Stores />
              <div className={s.qr}>
                <img src="/favhiker/qr.png" alt="QR code to get the favhiker app" />
                <p>
                  Scan with your phone to get the app
                  <small>★ 4.4 on the stores · Free</small>
                </p>
              </div>
            </div>
            <img src="/favhiker/phones.jpg" alt="The favhiker app on five phones" className={s.phones} />
          </div>
        </div>
      </section>

      {/* ---------- Anywhere: a stamp sheet of numbers ---------- */}
      <section className={`${s.sec} ${s.cream}`} id="cities">
        <div className={s.wrap}>
          <div className={s.anywhere}>
            <div>
              <Head n="07" kicker="Everywhere" title="Your next favourite could be anywhere." sub="Find places worth it, wherever you go." />
              <div className={s.kinds}>
                {KINDS.map((k) => (
                  <a key={k.title} href="#cities">
                    <b>{k.title}</b>
                    <small>{k.text}</small>
                  </a>
                ))}
              </div>
              <a href="#cities" className={s.btnYellow}>
                Browse every city <Icon n="arrow" />
              </a>
            </div>
            <dl className={s.sheet}>
              {STATS.map((st) => (
                <div key={st.label} className={s.shadow}>
                  <div className={s.perf}>
                    <dd>
                      {st.value}
                      <span>+</span>
                    </dd>
                    <dt>{st.label}</dt>
                  </div>
                </div>
              ))}
              <div className={s.shadow}>
                <div className={s.perf}>
                  <dd>
                    <img src="/favhiker/mascot.png" alt="" />
                  </dd>
                  <dt>And counting</dt>
                </div>
              </div>
            </dl>
          </div>
          <div className={s.places}>
            <p className={s.label}>Explore a city</p>
            <div className={s.chips}>
              {CITIES.map((c) => (
                <a key={c} href="#cities" className={s.chip}>
                  <Icon n="pin" /> {c}
                </a>
              ))}
            </div>
            <p className={s.label}>Or a country</p>
            <div className={s.chips}>
              {COUNTRIES.map(([code, name]) => (
                <a key={code} href="#cities" className={s.chip}>
                  <i className={s.code}>{code}</i> {name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Business: a tear-off ticket ---------- */}
      <section className={s.sec}>
        <div className={s.wrap}>
          <div className={s.shadow}>
            <div className={s.bizTicket}>
              <div className={s.bizMain}>
                <p className={s.label}>
                  <span>No. 08</span>
                  <i />
                  For business
                </p>
                <h2 className={s.h2}>Claim your business on favhiker</h2>
                <p className={s.sub}>Restaurants, stays, shops and more. Get in front of real explorers.</p>
                <p className={s.label}>What you get</p>
                <ul className={s.perks}>
                  {PERKS.map((p) => (
                    <li key={p}>
                      <Icon n="check" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={s.bizStub}>
                <span className={s.bizArch}>
                  <img src="/favhiker/cafe.jpg" alt="" />
                </span>
                <a href="#business" className={s.btnDark}>
                  Explore favhiker Business <Icon n="arrow" />
                </a>
                <small>Free to get started · Verified within 48h</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className={s.footer}>
        <div className={s.wrap}>
          <div className={s.footTop}>
            <div className={s.footBrand}>
              <Logo sub />
              <p>Keep the food, stays, films, shows and books you love — and find your next favourite through people with your taste.</p>
              <Stores />
            </div>
            {FOOTER.map((col) => (
              <nav key={col.title} className={s.footCol} aria-label={col.title}>
                <b>{col.title}</b>
                {col.links.map((l) => (
                  <a key={l} href="#">
                    {l}
                  </a>
                ))}
              </nav>
            ))}
          </div>
          <div className={s.footBottom}>
            <Seal id="seal-foot" text="SHARE WHAT YOU LOVE · SHARE WHAT YOU LOVE · " className={s.footSeal}>
              <span>♥</span>
            </Seal>
            <p className={s.signoff}>
              Share what you love.
              <br />
              <em>Help someone find their next favourite.</em>
            </p>
            <div className={s.follow}>
              <span className={s.label}>Follow us</span>
              {["instagram", "facebook", "youtube"].map((n) => (
                <a key={n} href="#" aria-label={n}>
                  <Icon n={n} />
                </a>
              ))}
            </div>
          </div>
          <div className={s.legal}>
            <small>© 2026 favhiker. All rights reserved.</small>
          </div>
        </div>
        <p className={s.bigWord} aria-hidden>
          favhiker
        </p>
      </footer>
    </div>
  );
}
