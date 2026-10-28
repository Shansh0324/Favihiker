"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useLenis } from "lenis/react";
import s from "./fav.module.css";

// em = rendered width of the word in Jost 280 with -0.02em tracking (measured from the font),
// so CSS can size every word to fill the same 95% of the screen width.
const WORDS = [
  { word: "Food", em: 1.93 },
  { word: "Stays", em: 1.88 },
  { word: "Films", em: 1.86 },
  { word: "Books", em: 2.25 },
  { word: "Music", em: 2.27 },
];
const CITIES = ["Bengaluru", "Mumbai", "Delhi", "Hyderabad", "Chennai", "Pune"];
const MENU = ["Food", "Stays", "Films & shows", "Books", "Music"];
const PLAN = ["Top dishes", "Plan my trip", "Plan my day", "Pick something for me"];

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4 4" />
  </svg>
);
const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

function Search({ className, inputRef }: { className: string; inputRef?: React.Ref<HTMLInputElement> }) {
  return (
    // ponytail: no search backend yet — point the form at the real search route when it exists.
    <form className={className} role="search" onSubmit={(e) => e.preventDefault()}>
      <SearchIcon />
      <input ref={inputRef} type="search" name="q" placeholder="Search food, stays, films…" aria-label="Search" />
      <kbd>/</kbd>
    </form>
  );
}

export default function FavHero() {
  const [active, setActive] = useState(0);
  const [city, setCity] = useState(CITIES[0]);
  const [open, setOpen] = useState(false);
  const hero = useRef<HTMLElement>(null);
  const search = useRef<HTMLInputElement>(null);
  const burger = useRef<HTMLButtonElement>(null);
  const close = useRef<HTMLButtonElement>(null);
  const lenis = useLenis();
  const { word, em } = WORDS[active];

  // Rotate the giant word (paused while the menu is open or for reduced motion).
  useEffect(() => {
    if (open || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setActive((n) => (n + 1) % WORDS.length), 3400);
    return () => clearInterval(t);
  }, [open]);

  // Menu: lock scroll, move focus, close on Escape. "/" jumps to search.
  useEffect(() => {
    if (open) {
      lenis?.stop();
      close.current?.focus();
    } else {
      lenis?.start();
    }
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        burger.current?.focus();
      }
      const typing = e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement;
      if (e.key === "/" && !typing && !open) {
        e.preventDefault();
        search.current?.focus();
      }
    };
    addEventListener("keydown", key);
    return () => removeEventListener("keydown", key);
  }, [open, lenis]);

  // The gradient leans gently toward the cursor.
  useEffect(() => {
    const el = hero.current!;
    let frame = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.setProperty("--mx", (e.clientX / innerWidth - 0.5).toFixed(3));
        el.style.setProperty("--my", (e.clientY / innerHeight - 0.5).toFixed(3));
      });
    };
    addEventListener("pointermove", move);
    return () => removeEventListener("pointermove", move);
  }, []);

  const shut = () => {
    setOpen(false);
    burger.current?.focus();
  };

  return (
    <>
      <section ref={hero} className={s.hero}>
        <div className={s.bg} aria-hidden>
          <div className={s.blobs}>
            {Array.from({ length: 14 }, (_, n) => (
              <i key={n} />
            ))}
          </div>
          <div className={s.streaks} />
          <div className={s.grain} />
        </div>

        <header className={s.nav}>
          <a href="/" className={s.brand} aria-label="favhiker home">
            <span>F</span>
            favhiker
          </a>
          <div className={s.actions}>
            <Search className={s.search} inputRef={search} />
            <a href="#signin" className={s.signin}>
              Sign in
            </a>
            <a href="#start" className={s.cta}>
              Start your diary
            </a>
            <button
              ref={burger}
              className={s.burger}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen(true)}
            >
              <i />
              <i />
            </button>
          </div>
        </header>

        <h1 className={s.srOnly}>
          Find your next favourite food, stays, films, books and music in {city}
        </h1>

        <div className={s.lede}>
          <span aria-hidden>Find your</span>
          <span aria-hidden className={s.indent}>
            next favourite
          </span>
          <label className={s.city}>
            <em>in {city}</em>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="m6 9 6 6 6-6" />
            </svg>
            <select value={city} onChange={(e) => setCity(e.target.value)} aria-label="City">
              {CITIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
          <div className={s.mobileActions}>
            <Search className={s.searchWide} />
            <a href="#start" className={s.ctaWide}>
              Start your diary — it’s free <Arrow />
            </a>
          </div>
        </div>

        <p key={word} className={s.word} style={{ "--em": em } as CSSProperties} aria-hidden>
          {[...word].map((ch, n) => (
            <span key={n} style={{ "--i": n } as CSSProperties}>
              {ch}
            </span>
          ))}
        </p>
      </section>

      <nav id="site-menu" className={s.menu} data-open={open} inert={!open} aria-label="Menu">
        <div className={s.menuTop}>
          <a href="/" className={s.brand}>
            <span>F</span>
            favhiker
          </a>
          <button ref={close} className={`${s.burger} ${s.burgerOpen}`} aria-label="Close menu" onClick={shut}>
            <i />
            <i />
          </button>
        </div>
        <div className={s.menuBody}>
          <ul className={s.menuMain}>
            {MENU.map((label, n) => (
              <li key={label} style={{ "--i": n } as CSSProperties}>
                <a href={`#${label.toLowerCase().replace(/\W+/g, "-")}`} onMouseEnter={() => setActive(n)} onClick={shut}>
                  <small>0{n + 1}</small>
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className={s.menuSide}>
            <p>Plan with favhiker</p>
            <ul>
              {PLAN.map((label, n) => (
                <li key={label} style={{ "--i": n + 3 } as CSSProperties}>
                  <a href={`#${label.toLowerCase().replace(/\W+/g, "-")}`} onClick={shut}>
                    {label} <Arrow />
                  </a>
                </li>
              ))}
            </ul>
            <div className={s.menuCtas}>
              <a href="#start" className={s.ctaWide} onClick={shut}>
                Start your diary — it’s free <Arrow />
              </a>
              <a href="#app" className={s.ghost} onClick={shut}>
                Get the app
              </a>
            </div>
          </div>
        </div>
        <p className={s.menuFoot}>
          <span>Your social diary · {city}</span>
          <a href="#signin" onClick={shut}>
            Sign in
          </a>
        </p>
      </nav>
    </>
  );
}
