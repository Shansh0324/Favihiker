"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useLenis } from "lenis/react";
import s from "./landing.module.css";

/* ---------- Content (from favhiker.com) ---------- */
const WORDS = ["dish.", "stay.", "film.", "book.", "show."];
// Favourites drifting around the hero headline: x/y in % of the hero, r = tilt, d = parallax depth.
const FLOATERS = [
  { img: "/favhiker/biryani.jpg", title: "Paragon", note: "Mutton Biryani", x: 6, y: 21, r: -6, d: 1.3 },
  { img: "/favhiker/3-idiots.jpg", title: "3 Idiots", note: "Kept by 9 explorers", x: 13, y: 61, r: 5, d: 0.7 },
  { img: "/favhiker/oberoi.jpg", title: "The Oberoi", note: "Top-rated stay", x: 80, y: 17, r: 6, d: 0.9 },
  { img: "/favhiker/bhagavad.jpg", title: "Shrimad Bhagvat", note: "Kept by 2 explorers", x: 82, y: 59, r: -5, d: 1.5 },
];
const CHAPTERS = [
  { short: "Keep", title: "Keep what you love.", text: "One tap adds a dish, a stay, a film or a book to your diary. Your profile is your diary." },
  { short: "Say why", title: "Say why you loved it.", text: "The extra spice. The view. The ending. A line or two, and your diary starts to sound like you." },
  { short: "Match", title: "Meet people with your taste.", text: "favhiker reads only what’s in both diaries — no likes, no follower counts — and tells you how close your taste is." },
  { short: "Discover", title: "Find your next favourite.", text: "Their diary becomes your shortlist. Not what’s popular. What’s right for you." },
];
const NEXT = [
  { img: "/favhiker/oberoi.jpg", title: "The Oberoi", note: "Stay · Bengaluru" },
  { img: "/favhiker/3-idiots.jpg", title: "3 Idiots", note: "Film · 2009" },
  { img: "/favhiker/devarayanadurga.jpg", title: "Devarayanadurga", note: "Trip · 1 h 45 min" },
];
const DIARY = [
  { tag: "Food", img: "/favhiker/biryani.jpg", title: "The dishes you’d go back for.", text: "A GoldenBite is a dish an explorer loves. Find the best plate in any city." },
  { tag: "Stays", img: "/favhiker/oberoi.jpg", title: "The places you’d sleep again.", text: "Prices for your dates. Reviews read for you." },
  { tag: "Films & shows", img: "/favhiker/uprising.jpg", title: "Say what you loved.", text: "The story, the music, the cast." },
  { tag: "Books", img: "/favhiker/bhagavad.jpg", title: "The ones you press into people’s hands.", text: "Keep what you loved. See what readers like you keep." },
];
const MATCHES = [
  { p: 41, title: "Different taste", text: "Great for them. Maybe not for you." },
  { p: 58, title: "Some things in common", text: "Worth a look — a few shared favourites." },
  { p: 77, title: "Your type", text: "Most of what they love, you will too." },
  { p: 92, title: "Taste twin", text: "Trust their diary like your own." },
];
const READS = [
  "You both keep the same dish at the same place",
  "You both loved the writing of the same film",
  "Mountain views and quiet places, both of you",
  "Extra spice, small local places, late nights",
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
const TOOLS = [
  { icon: "sparkles", title: "AI Picks", text: "Know what to order, from what people loved there." },
  { icon: "swords", title: "Bite Battle", text: "This or that, ten rounds. Play with a friend." },
  { icon: "bed", title: "Why stay here?", text: "A stay’s reviews, read for you." },
  { icon: "calendar", title: "Plan my day", text: "Tell us your mood. Get a plan for the day.", premium: true },
];
const BATTLE = [
  { img: "/favhiker/uprising.jpg", title: "The Uprising", meta: "Film · 2026 · Action" },
  { img: "/favhiker/forgotten-island.jpg", title: "Forgotten Island", meta: "Film · 2026 · Animation" },
];
const ROUNDS = 7;
const STATS = [
  { n: 114, label: "Countries" },
  { n: 2300, label: "Cities" },
  { n: 12900, label: "Restaurants" },
  { n: 80, label: "Cuisines" },
  { n: 13000, label: "Dishes" },
];
const KINDS = [
  { title: "Food", text: "Restaurants · Dishes · Cafés" },
  { title: "Stay", text: "Hotels · Resorts · Homestays" },
  { title: "Explore", text: "Malls · Events · Experiences" },
];
const CITIES = ["Bengaluru", "Kochi", "Mumbai", "New Delhi", "Calicut", "Hyderabad", "Chennai", "Pune", "Trivandrum", "Goa", "Kolkata", "Ahmedabad", "Thrissur", "Kollam", "Kannur"];
const COUNTRIES = ["India", "United Arab Emirates", "Saudi Arabia", "United Kingdom", "Pakistan", "China", "United States", "Canada", "Indonesia", "Oman", "Thailand", "Australia"];
const APP_POINTS = [
  { icon: "utensils", text: "Every GoldenBite, with you at the table" },
  { icon: "bed", text: "The stays you keep, priced for your dates" },
  { icon: "users", text: "People with your taste, one tap away" },
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
const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
/** 2300 → "2.3K", 13000 → "13K", 114 → "114" */
const fmt = (v: number, to: number) => (to >= 1000 ? `${(v / 1000).toFixed(to % 1000 ? 1 : 0)}K` : String(Math.round(v)));

/* ---------- Icons (24px stroke set) ---------- */
const PATHS: Record<string, string> = {
  pin: "M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21zM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
  arrow: "M5 12h14M13 6l6 6-6 6",
  down: "M12 5v14M6 13l6 6 6-6",
  route: "M6 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM18 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM6 16V9a3 3 0 0 1 3-3h7M18 8v7a3 3 0 0 1-3 3H8",
  calendar: "M4 6h16v15H4zM4 10h16M8 3v4M16 3v4M8 14h2M12 14h2M8 17h2M12 17h2",
  clapper: "M4 11h16v9H4zM4 11 5.5 5l14 3-1.5 3M9 6l-1 4.5M14 7l-1 4",
  bed: "M3 19V7M3 15h18v4M21 15v-2a3 3 0 0 0-3-3h-7v5M7 12.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z",
  sparkles: "M11 3l1.9 5.1L18 10l-5.1 1.9L11 17l-1.9-5.1L4 10l5.1-1.9zM19 15l.7 1.8 1.8.7-1.8.7L19 20l-.7-1.8-1.8-.7 1.8-.7z",
  swords: "M14 4h6v6L9 21l-3-3zM4 14l6 6M3 21l3-3M10 4H4v6l3 3",
  users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8",
  utensils: "M5 3v7a3 3 0 0 0 6 0V3M8 3v18M19 15V3a5 5 0 0 0-5 5v7h5zM19 15v6",
  book: "M2 4h7a3 3 0 0 1 3 3v14a2 2 0 0 0-2-2H2zM22 4h-7a3 3 0 0 0-3 3v14a2 2 0 0 1 2-2h8z",
  check: "M20 6 9 17l-5-5",
  plus: "M12 5v14M5 12h14",
  heart: "M12 20s-7.5-4.6-9.3-9.4A5 5 0 0 1 12 6.3a5 5 0 0 1 9.3 4.3C19.5 15.4 12 20 12 20z",
  instagram: "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM17.5 6.5h0",
  facebook: "M15 3h-2.5A4.5 4.5 0 0 0 8 7.5V10H5v4h3v7h4v-7h3l1-4h-4V7.5A.5.5 0 0 1 12.5 7H15z",
  youtube: "M2.5 7.5a3 3 0 0 1 2.1-2.1C6.5 5 12 5 12 5s5.5 0 7.4.4a3 3 0 0 1 2.1 2.1c.5 1.9.5 4.5.5 4.5s0 2.6-.5 4.5a3 3 0 0 1-2.1 2.1C17.5 19 12 19 12 19s-5.5 0-7.4-.4a3 3 0 0 1-2.1-2.1C2 14.6 2 12 2 12s0-2.6.5-4.5zM10 15l5-3-5-3z",
};
const Icon = ({ n }: { n: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d={PATHS[n]} />
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
function Logo({ sub = false }: { sub?: boolean }) {
  return (
    <a href="/" className={s.logo} aria-label="favhiker home">
      <span className={s.logoMark}>F</span>
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

/** Initial in a coloured disc — the explorers in the story. */
const Avatar = ({ l, tone = 0 }: { l: string; tone?: number }) => (
  <span className={s.avatar} data-tone={tone} aria-hidden>
    {l}
  </span>
);

function Head({ eyebrow, title, sub, center = false }: { eyebrow: string; title: ReactNode; sub?: string; center?: boolean }) {
  return (
    <header className={center ? `${s.head} ${s.center}` : s.head} data-reveal>
      <p className={s.eyebrow}>{eyebrow}</p>
      <h2 className={s.h2}>{title}</h2>
      {sub && <p className={s.sub}>{sub}</p>}
    </header>
  );
}

/** Counts up from zero the first time it scrolls into view. */
function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(to);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setV(0);
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          const k = Math.min(1, (t - t0) / 1600);
          setV(to * (1 - (1 - k) ** 3));
          if (k < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(ref.current!);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);
  return <span ref={ref}>{fmt(v, to)}</span>;
}

export default function Landing() {
  const page = useRef<HTMLDivElement>(null);
  const nav = useRef<HTMLElement>(null);
  const story = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const [word, setWord] = useState(0);
  const [step, setStep] = useState(0);
  const [round, setRound] = useState(0);
  const [pick, setPick] = useState<number | null>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setWord((n) => (n + 1) % WORDS.length), 2400);
    return () => clearInterval(t);
  }, []);

  // One scroll loop: nav state, hero parallax, the pinned story's chapter, and the picks reel.
  useEffect(() => {
    const root = page.current!;
    const st = story.current!;
    const tr = track.current!;
    const wide = matchMedia("(min-width: 900px)");
    let raf = 0;
    let last = -1;
    const update = () => {
      raf = 0;
      const vh = innerHeight;
      nav.current!.dataset.solid = String(scrollY > 24);
      root.style.setProperty("--hero", clamp01(scrollY / vh).toFixed(4));

      const r = st.getBoundingClientRect();
      const p = clamp01(-r.top / (r.height - vh));
      st.style.setProperty("--p", p.toFixed(4));
      const next = Math.min(CHAPTERS.length - 1, Math.floor(p * CHAPTERS.length));
      if (next !== last) setStep((last = next));

      if (wide.matches) {
        const box = tr.parentElement!.getBoundingClientRect();
        const k = clamp01(((vh - box.top) / (vh + box.height)) * 1.5 - 0.25);
        tr.style.transform = `translate3d(${-k * Math.max(0, tr.scrollWidth - box.width)}px, 0, 0)`;
      } else tr.style.transform = "";
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", onScroll);
    return () => {
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Fade-and-rise for anything marked data-reveal, once.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.setAttribute("data-in", "");
          io.unobserve(e.target);
        }),
      { rootMargin: "0px 0px -10% 0px" },
    );
    page.current!.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /** Jump to the middle of a story chapter. */
  const goTo = (i: number) => {
    const st = story.current!;
    const top = st.getBoundingClientRect().top + scrollY + ((i + 0.5) / CHAPTERS.length) * (st.offsetHeight - innerHeight);
    if (lenis) lenis.scrollTo(top);
    else scrollTo({ top, behavior: "smooth" });
  };

  const vote = (i: number | null) => {
    setPick(i);
    setRound((r) => (r + 1) % ROUNDS);
  };

  return (
    <div className={s.page} ref={page}>
      {/* ---------- Nav ---------- */}
      <header className={s.nav} ref={nav}>
        <div className={s.navInner}>
          <Logo />
          <nav className={s.navLinks} aria-label="Main">
            <a href="#how">How it works</a>
            <a href="#taste">Taste Match</a>
            <a href="#cities">Cities</a>
            <a href="#business">For business</a>
          </nav>
          <div className={s.navRight}>
            <a href="#signin" className={s.signin}>
              Sign in
            </a>
            <a href="#app" className={s.btnInk}>
              Get the app
            </a>
          </div>
        </div>
      </header>

      {/* ---------- Hero ---------- */}
      <section className={`${s.hero} ${s.grain}`}>
        <div className={s.floaters} aria-hidden>
          {FLOATERS.map((f, i) => (
            <figure
              key={f.title}
              className={s.floater}
              style={{ "--x": `${f.x}%`, "--y": `${f.y}%`, "--r": `${f.r}deg`, "--depth": f.d, "--i": i } as CSSProperties}
            >
              <img src={f.img} alt="" />
              <figcaption>
                <b>{f.title}</b>
                <small>{f.note}</small>
              </figcaption>
            </figure>
          ))}
          <span className={`${s.bubble} ${s.bubbleA}`}>
            <Avatar l="R" tone={2} /> Rahul kept <b>Meghana Foods</b>
          </span>
          <span className={`${s.bubble} ${s.bubbleB}`}>
            <Icon n="heart" /> 92% taste match
          </span>
        </div>

        <div className={s.heroCopy}>
          <p className={s.pill}>
            <i /> Your social diary
          </p>
          <h1 className={s.h1}>
            Find your next
            <br />
            favourite{" "}
            <em key={word} className={s.word}>
              {WORDS[word]}
            </em>
          </h1>
          <p className={s.lede}>Keep a diary of the food, stays, films, shows and books you love — and see what people with your taste love too.</p>
          <div className={s.ctas}>
            <a href="#how" className={s.btnInk}>
              Start your diary — it’s free <Icon n="arrow" />
            </a>
            <a href="#app" className={s.btnGhost}>
              Get the app
            </a>
          </div>
        </div>

        <a href="#how" className={s.cue}>
          <span>Scroll to see how a favourite travels</span>
          <Icon n="down" />
        </a>
      </section>

      {/* ---------- Story: one favourite, from your diary to someone else's ---------- */}
      <section className={s.story} ref={story} id="how">
        <div className={s.pin}>
          <div className={`${s.wrap} ${s.storyGrid}`}>
            <div className={s.storyText}>
              <p className={s.eyebrow}>How a favourite travels</p>
              <div className={s.chapters}>
                {CHAPTERS.map((c, i) => (
                  <div key={c.short} className={s.chapter} data-on={i === step} aria-hidden={i !== step}>
                    <span className={s.chapterNo}>0{i + 1}</span>
                    <h2 className={s.h2}>{c.title}</h2>
                    <p className={s.sub}>{c.text}</p>
                  </div>
                ))}
              </div>
              <ol className={s.progress}>
                {CHAPTERS.map((c, i) => (
                  <li key={c.short} style={{ "--i": i } as CSSProperties}>
                    <button onClick={() => goTo(i)} data-on={i === step}>
                      <i />
                      {c.short}
                    </button>
                  </li>
                ))}
              </ol>
            </div>

            <div className={s.scene} data-step={step} aria-hidden>
              <div className={s.sceneBox}>
                {/* 01–02 · one favourite, kept and described */}
                <article className={s.keep}>
                  <img src="/favhiker/biryani.jpg" alt="" />
                  <div className={s.keepMeta}>
                    <span>
                      <b>Paragon Restaurant</b>
                      <small>Mutton Biryani · Bengaluru</small>
                    </span>
                    <span className={s.kept}>
                      <Icon n="check" /> Kept
                    </span>
                  </div>
                </article>
                <span className={s.toast}>
                  <Avatar l="Y" /> Added to <b>your diary</b>
                </span>
                <figure className={s.note}>
                  <blockquote>“The mutton falls off the bone. Go before one, or wait an hour.”</blockquote>
                  <figcaption>
                    {["Extra spice", "Late nights", "Small local places"].map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </figcaption>
                </figure>

                {/* 03 · two diaries, read only for what they share */}
                <div className={s.venn}>
                  <div className={s.circle} data-side="you">
                    <span className={s.who}>
                      <Avatar l="Y" /> You
                    </span>
                    <img src="/favhiker/biryani.jpg" alt="" />
                    <img src="/favhiker/devarayanadurga.jpg" alt="" />
                  </div>
                  <div className={s.circle} data-side="them">
                    <span className={s.who}>
                      <Avatar l="A" tone={1} /> Ananya
                    </span>
                    <img src="/favhiker/meghana.jpg" alt="" />
                    <img src="/favhiker/oberoi.jpg" alt="" />
                  </div>
                  <div className={s.overlap}>
                    <b>92%</b>
                    <small>Taste twin</small>
                  </div>
                </div>
                <ul className={s.shared}>
                  <li>
                    <Icon n="check" /> You both keep the same dish at the same place
                  </li>
                  <li>
                    <Icon n="check" /> Mountain views and quiet places, both of you
                  </li>
                </ul>

                {/* 04 · their favourites become your shortlist */}
                <p className={s.fanHead}>
                  <Avatar l="A" tone={1} /> From Ananya’s diary
                </p>
                <div className={s.fan}>
                  {NEXT.map((n, i) => (
                    <article key={n.title} className={s.fanCard} style={{ "--i": i } as CSSProperties}>
                      <img src={n.img} alt="" />
                      <b>{n.title}</b>
                      <small>{n.note}</small>
                      <span className={s.fanAdd}>
                        <Icon n="plus" />
                      </span>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- The diary ---------- */}
      <section className={s.sec} id="diary">
        <div className={s.wrap}>
          <Head
            eyebrow="The diary"
            title={
              <>
                One diary. <em>Everything you love.</em>
              </>
            }
            sub="Food, stays, films, shows and books. One diary, one link to share."
          />
          <ol className={s.rows}>
            {DIARY.map((d, i) => (
              <li key={d.tag} data-reveal style={{ "--d": i } as CSSProperties}>
                <a href="#picks" className={s.row}>
                  <span className={s.rowNo}>{pad(i)}</span>
                  <span className={s.rowTag}>{d.tag}</span>
                  <span className={s.rowBody}>
                    <b>{d.title}</b>
                    <small>{d.text}</small>
                  </span>
                  <span className={s.rowImg}>
                    <img src={d.img} alt="" />
                  </span>
                  <span className={s.rowGo}>
                    <Icon n="arrow" />
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Taste Match ---------- */}
      <section className={s.band} id="taste">
        <div className={`${s.bandInner} ${s.grain} ${s.tasteBand}`}>
          <div className={s.wrap}>
            <Head
              eyebrow="Taste Match"
              title={
                <>
                  A great place isn’t <em>great for everyone.</em>
                </>
              }
              sub="Ratings show what’s popular. Taste Match shows what you’ll love."
              center
            />
            <div className={s.scale} data-reveal>
              {MATCHES.map((m) => (
                <div key={m.p} className={s.level} style={{ "--v": m.p / 100 } as CSSProperties}>
                  <b>
                    <Counter to={m.p} />%
                  </b>
                  <span className={s.bar}>
                    <i />
                  </span>
                  <strong>{m.title}</strong>
                  <small>{m.text}</small>
                </div>
              ))}
            </div>
            <div className={s.reads} data-reveal>
              <p>
                <b>What it reads.</b> Only what’s in both diaries. No likes, no follower counts.
              </p>
              <ul>
                {READS.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
              <a href="#how" className={s.btnInk}>
                Find people with your taste <Icon n="arrow" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Picks ---------- */}
      <section className={s.sec} id="picks">
        <div className={`${s.wrap} ${s.rowHead}`}>
          <Head eyebrow="Picked for you in Bengaluru" title="Your next favourites" />
          <a href="#cities" className={s.link}>
            See all <Icon n="arrow" />
          </a>
        </div>
        <div className={s.reel}>
          <div className={s.track} ref={track}>
            {PICKS.map((p, i) => (
              <a key={p.title} href="#how" className={s.pick} data-reveal style={{ "--d": i } as CSSProperties}>
                <span className={s.pickImg}>
                  <img src={p.img} alt="" />
                  <span className={s.tag}>
                    <Icon n={p.icon} /> {p.tag}
                  </span>
                </span>
                <b>{p.title}</b>
                <small>{p.note}</small>
              </a>
            ))}
          </div>
        </div>
        <div className={`${s.wrap} ${s.nearby}`} data-reveal>
          <p className={s.eyebrow}>Closest to you</p>
          <div className={s.chips}>
            {NEARBY.map((c) => (
              <a key={c} href="#cities" className={s.chip}>
                <Icon n="pin" /> {c}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Decide faster ---------- */}
      <section className={s.sec} id="decide">
        <div className={`${s.wrap} ${s.decide}`}>
          <div>
            <Head
              eyebrow="Decide faster"
              title={
                <>
                  Not what’s popular. <em>What’s right for you.</em>
                </>
              }
              sub="Your diary, turned into tonight’s answer."
            />
            <ol className={s.tools}>
              {TOOLS.map((t, i) => (
                <li key={t.title} data-reveal style={{ "--d": i } as CSSProperties}>
                  <a href="#app">
                    <span className={s.toolIcon}>
                      <Icon n={t.icon} />
                    </span>
                    <span className={s.toolBody}>
                      <b>
                        {t.title}
                        {t.premium && <em>Premium</em>}
                      </b>
                      <small>{t.text}</small>
                    </span>
                    <span className={s.toolGo}>
                      Try it <Icon n="arrow" />
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </div>

          <div className={`${s.battle} ${s.grain}`} data-reveal>
            <div className={s.battleTop}>
              <span className={s.eyebrow}>Watch Battle</span>
              <span className={s.rounds} aria-label={`Round ${round + 1} of ${ROUNDS}`}>
                {Array.from({ length: ROUNDS }, (_, i) => (
                  <i key={i} data-state={i < round ? "done" : i === round ? "now" : undefined} />
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
            <button className={s.neither} onClick={() => vote(null)}>
              Neither — show me two others
            </button>
          </div>
        </div>
      </section>

      {/* ---------- Everywhere ---------- */}
      <section className={s.sec} id="cities">
        <div className={s.wrap}>
          <Head eyebrow="Everywhere" title="Your next favourite could be anywhere." sub="Find places worth it, wherever you go." center />
          <dl className={s.stats} data-reveal>
            {STATS.map((st) => (
              <div key={st.label}>
                <dt>{st.label}</dt>
                <dd>
                  <Counter to={st.n} />
                  <i>+</i>
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className={s.marquees} aria-hidden>
          <div className={s.marquee}>
            {[...CITIES, ...CITIES].map((c, i) => (
              <span key={i}>{c}</span>
            ))}
          </div>
          <div className={`${s.marquee} ${s.reverse}`}>
            {[...COUNTRIES, ...COUNTRIES].map((c, i) => (
              <span key={i}>{c}</span>
            ))}
          </div>
        </div>
        <div className={`${s.wrap} ${s.kinds}`} data-reveal>
          {KINDS.map((k) => (
            <a key={k.title} href="#cities">
              <b>{k.title}</b>
              <small>{k.text}</small>
            </a>
          ))}
          <a href="#cities" className={s.btnInk}>
            Browse every city <Icon n="arrow" />
          </a>
        </div>
      </section>

      {/* ---------- App ---------- */}
      <section className={s.band} id="app">
        <div className={`${s.bandInner} ${s.grain} ${s.appBand}`}>
          <div className={`${s.wrap} ${s.app}`}>
            <div data-reveal>
              <p className={s.eyebrow}>The favhiker app</p>
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
              <Stores />
              <div className={s.qr}>
                <img src="/favhiker/qr.png" alt="QR code to get the favhiker app" />
                <p>
                  Scan with your phone to get the app
                  <small>★ 4.4 on the stores · Free</small>
                </p>
              </div>
            </div>
            <img src="/favhiker/phone-hand.png" alt="The favhiker app open on a phone, exploring Bengaluru" className={s.hand} />
          </div>
        </div>
      </section>

      {/* ---------- Business ---------- */}
      <section className={s.sec} id="business">
        <div className={`${s.wrap} ${s.biz}`}>
          <div className={s.bizImg} data-reveal>
            <img src="/favhiker/cafe-people.jpg" alt="Friends sharing a meal at a café while an explorer photographs a dish" />
          </div>
          <div className={s.bizText} data-reveal>
            <p className={s.eyebrow}>For business</p>
            <h2 className={s.h2}>Claim your business on favhiker</h2>
            <p className={s.sub}>Restaurants, stays, shops and more. Get in front of real explorers.</p>
            <ul className={s.perks}>
              {PERKS.map((p) => (
                <li key={p}>
                  <Icon n="check" /> {p}
                </li>
              ))}
            </ul>
            <div className={s.bizCta}>
              <a href="#business" className={s.btnInk}>
                Explore favhiker Business <Icon n="arrow" />
              </a>
              <small>Free to get started · Verified within 48h</small>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className={`${s.footer} ${s.grain}`}>
        <div className={s.wrap}>
          <p className={s.signoff} data-reveal>
            Share what you love.
            <br />
            <em>Help someone find their next favourite.</em>
          </p>
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
            <small>© 2026 favhiker. All rights reserved.</small>
            <div className={s.follow}>
              {["instagram", "facebook", "youtube"].map((n) => (
                <a key={n} href="#" aria-label={n}>
                  <Icon n={n} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <p className={s.bigWord} aria-hidden>
          favhiker
        </p>
        <img src="/favhiker/mascot.png" alt="" className={s.mascot} />
      </footer>
    </div>
  );
}
