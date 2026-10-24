"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import s from "./milu.module.css";

const OCCASIONS = [
  { title: "Для дня рождения", text: "готовые наборы закусок, чтобы гости были сыты, а вы отдыхали", img: "occ1" },
  { title: "Для корпоратива", text: "эффектная подача и удобный формат «на зубок»", img: "occ2" },
  { title: "Для семейного праздника", text: "разнообразие вкусов, которое понравится и взрослым, и детям", img: "occ3" },
];

const REASONS = [
  {
    title: "Забота о вашем здоровье",
    text: "Мы добавили в меню позиции со сниженным содержанием сахара, чтобы вам было легче выбирать и просто наслаждаться — без лишних мыслей о калориях",
    tone: "purple",
  },
  {
    title: "Красивая фуршетная подача",
    text: "Мы уделяем внимание не только вкусу, но и внешнему виду. Наши гастробоксы и закуски выглядят эстетично и украшают любое мероприятие",
    tone: "orange",
  },
  {
    title: "Готовые решения для любого события",
    text: "День рождения, корпоратив, встреча с друзьями или семейный праздник – у нас есть готовые наборы, которые легко заказать и подать на стол",
    tone: "pink",
  },
  {
    title: "Удобный заказ и доставка",
    text: "Оставьте заявку на сайте, и мы поможем подобрать подходящий набор. Доставим заказ вовремя, чтобы вы могли спокойно готовиться к своему событию",
    tone: "yellow",
  },
];

const CATEGORIES = ["Брускетты", "Гастробоксы", "Десерты", "Канапе", "Мини-бургеры", "Салаты", "Сэндвичи", "Тарталетки", "Фритюр", "Эклеры"];
const FEATURES = ["Для вегетарианцев", "С индейкой", "С курицей", "С морепродуктами", "С мясом", "С рыбой"];

// ponytail: three demo products from the mockup; load the real catalogue here.
const PRODUCTS = [
  { id: 1, title: "Тарталетка со свекольным муссом, каперсами и миндалём", price: 100, img: "prod1", category: "Тарталетки", features: ["Для вегетарианцев"] },
  { id: 2, title: "Тарталетка с тартаром из лосося", price: 195, img: "prod2", category: "Тарталетки", features: ["С рыбой"] },
  { id: 3, title: "Тарталетка с креветкой и авокадо-лаймовым кремом", price: 190, img: "prod3", category: "Тарталетки", features: ["С морепродуктами"] },
];

const NAV = ["Акции", "Доставка и оплата", "О нас"];

const Heart = ({ filled = false }) => (
  <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden>
    <path d="M12 20s-7.5-4.6-7.5-10A4.2 4.2 0 0 1 12 7.6 4.2 4.2 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10Z" />
  </svg>
);
const Cart = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M3 4h2.2l2.2 10.2a1.5 1.5 0 0 0 1.5 1.2h8.4a1.5 1.5 0 0 0 1.5-1.1L20.5 8H6.6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="9.5" cy="19.5" r="1.5" />
    <circle cx="17" cy="19.5" r="1.5" />
  </svg>
);

/** Yellow ribbon with text that runs along it forever. */
function Ribbon({ d, viewBox, text, className, speed = 40 }: { d: string; viewBox: string; text: string; className: string; speed?: number }) {
  const id = useId();
  const path = useRef<SVGPathElement>(null);
  const measure = useRef<SVGTextElement>(null);
  const tp = useRef<SVGTextPathElement>(null);
  const [repeat, setRepeat] = useState(1);

  useEffect(() => {
    let frame = 0;
    let alive = true;
    // Measure once the display font is in, otherwise the phrase length is wrong.
    document.fonts.ready.then(() => {
      const phrase = measure.current?.getComputedTextLength();
      if (!alive || !phrase) return;
      setRepeat(Math.ceil(path.current!.getTotalLength() / phrase) + 2);
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      let offset = 0;
      let last = performance.now();
      frame = requestAnimationFrame(function tick(now) {
        offset = (offset - (speed * (now - last)) / 1000) % phrase;
        last = now;
        tp.current?.setAttribute("startOffset", String(offset));
        frame = requestAnimationFrame(tick);
      });
    });
    return () => {
      alive = false;
      cancelAnimationFrame(frame);
    };
  }, [speed]);

  return (
    <svg className={className} viewBox={viewBox} aria-hidden>
      <path ref={path} id={id} d={d} className={s.ribbonBand} />
      <text className={s.ribbonText} dominantBaseline="central">
        <textPath ref={tp} href={`#${id}`}>
          {text.repeat(repeat)}
        </textPath>
      </text>
      <text ref={measure} className={s.ribbonText} opacity="0">
        {text}
      </text>
    </svg>
  );
}

/** Round sticker: wavy (scalloped) or oval edge, text around the rim, emoji in the middle. */
function Sticker({ label, icon, bg, ink, oval = false, className }: { label: string; icon: string; bg: string; ink: string; oval?: boolean; className: string }) {
  const id = useId();
  const edge = Array.from({ length: 121 }, (_, i) => {
    const a = (i / 120) * Math.PI * 2;
    const r = 56 + 3 * Math.cos(a * 14);
    return `${(60 + r * Math.cos(a)).toFixed(2)},${(60 + r * Math.sin(a)).toFixed(2)}`;
  }).join(" ");
  return (
    <svg className={className} viewBox="0 0 120 120" aria-hidden>
      {oval ? <ellipse cx="60" cy="60" rx="58" ry="48" fill={bg} /> : <polygon points={edge} fill={bg} />}
      <path id={id} d="M60 22a38 38 0 1 1-.01 0" fill="none" />
      <text fill={ink} className={s.stickerText}>
        <textPath href={`#${id}`} startOffset="50%" textAnchor="middle">
          {label}
        </textPath>
      </text>
      <text x="60" y="62" textAnchor="middle" dominantBaseline="central" fontSize="30">
        {icon}
      </text>
    </svg>
  );
}

export default function Milu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cart, setCart] = useState(0);
  const [favs, setFavs] = useState<number[]>([]);
  const [cats, setCats] = useState<string[]>(["Тарталетки"]);
  const [feats, setFeats] = useState<string[]>([]);
  const badgeId = useId();

  const toggle = (list: string[], set: (v: string[]) => void, v: string) => set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);
  const shown = PRODUCTS.filter(
    (p) => (!cats.length || cats.includes(p.category)) && (!feats.length || p.features.some((f) => feats.includes(f))),
  );

  return (
    <div className={s.shell}>
      <div className={s.page}>
        {/* ---------- Header ---------- */}
        <header className={s.header}>
          <div className={s.pill}>
            <a href="#" className={s.logo}>
              MILU
            </a>
            <span className={s.city}>
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
              </svg>
              Саратов
            </span>
            <nav className={s.links} data-open={menuOpen}>
              <a href="#menu">
                Меню
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="m7 10 5 5 5-5" />
                </svg>
              </a>
              {NAV.map((l) => (
                <a key={l} href="#">
                  {l}
                </a>
              ))}
              <a href="tel:+78452906060" className={s.linksPhone}>
                8 (8452) 90-60-60
              </a>
            </nav>
            <button className={s.burger} aria-label="Меню" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
              <i />
              <i />
            </button>
          </div>
          <div className={s.pill}>
            <a href="tel:+78452906060" className={s.phone}>
              8 (8452) 90-60-60
            </a>
            <a href="#" className={s.iconBtn} aria-label={`Избранное: ${favs.length}`}>
              <Heart filled />
              {favs.length > 0 && <b>{favs.length}</b>}
            </a>
            <a href="#" className={s.iconBtn} aria-label={`Корзина: ${cart}`}>
              <Cart />
              {cart > 0 && <b>{cart}</b>}
            </a>
          </div>
        </header>

        {/* ---------- Hero ---------- */}
        <section className={s.hero}>
          <Image className={s.heroLeft} src="/milu/hero-left.jpg" alt="Тарталетка со свекольным муссом" width={520} height={660} priority />
          <Image className={s.heroRight} src="/milu/hero-right.jpg" alt="Эклер с икрой" width={760} height={816} priority />
          <h1 className={s.heroTitle}>
            Закуски и гастробоксы
            <br />с доставкой в Саратове
          </h1>
          <p className={s.heroText}>
            Красивая подача, свежие продукты и доставка точно ко времени.
            <br />
            Просто выберите блюда — мы соберём идеальный стол
          </p>
          <div className={s.heroCtas}>
            <a href="#menu" className={s.btnYellow}>
              Перейти в меню
            </a>
            <a href="#" className={s.btnOutline}>
              Оставить заявку
            </a>
          </div>
          <svg className={s.badge} viewBox="0 0 120 120" aria-hidden>
            <circle cx="60" cy="60" r="58" fill="#fef5ec" />
            <circle cx="60" cy="60" r="54" fill="#f7a9bb" />
            <path id={badgeId} d="M60 21a39 39 0 1 1-.01 0" fill="none" />
            <text className={s.badgeText}>
              <textPath href={`#${badgeId}`}>твоя улыбка - это мило • твоя улыбка - это мило •</textPath>
            </text>
            <circle cx="60" cy="60" r="24" fill="#fef5ec" />
            <path d="M60 67s-9-5.4-9-11.2a4.8 4.8 0 0 1 9-2.3 4.8 4.8 0 0 1 9 2.3C69 61.6 60 67 60 67Z" fill="#f4708c" />
            <path d="M49 69q11 9 22 0" fill="none" stroke="#f4708c" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
        </section>

        {/* ---------- Occasions ---------- */}
        <section className={s.occasions}>
          <Ribbon
            className={s.ribbonA}
            viewBox="0 0 1440 1100"
            text="твоя улыбка - это мило • "
            d="M -40 590 C 100 600 230 610 300 560 C 380 500 480 430 460 380 C 440 330 360 340 340 410 C 320 480 330 560 420 578 C 540 600 640 585 800 568 C 980 548 1150 520 1270 560 C 1390 600 1432 700 1440 800 C 1448 900 1432 980 1420 1100"
          />
          <div className={s.occRow}>
            {OCCASIONS.map((o) => (
              <a key={o.title} href="#menu" className={s.occCard}>
                <Image src={`/milu/${o.img}.jpg`} alt="" width={280} height={324} />
                <h3>{o.title}</h3>
                <p>{o.text}</p>
              </a>
            ))}
          </div>
        </section>

        {/* ---------- Why us ---------- */}
        <section className={s.why}>
          <svg className={s.doodle} viewBox="0 0 70 70" aria-hidden>
            <path d="M8 48 30 40M20 14l18 22M58 4 50 32" />
          </svg>
          <Sticker className={s.stickerMeat} label="свежее • мясо •" icon="🥩" bg="#f38ea5" ink="#ffe27a" />
          <Sticker className={s.stickerTomato} label="только • свежее •" icon="🍅" bg="#ffd95a" ink="#e8505b" />
          <Sticker className={s.stickerSea} label="свежие морепродукты" icon="🦐" bg="#f9b5c6" ink="#3f6fd8" oval />
          <p className={s.tag}>почему выбирают MILU</p>
          <h2 className={s.heading}>
            Мы всё продумали
            <br />
            до мелочей
          </h2>
          <div className={s.reasons}>
            {REASONS.map((r, n) => (
              <article key={r.title} className={`${s.reason} ${s[r.tone]}`}>
                <span className={s.num}>0{n + 1}</span>
                <h3>{r.title}</h3>
                <p>{r.text}</p>
                {r.tone === "orange" && <Image className={s.reasonPhoto} src="/milu/why-photo.jpg" alt="" width={652} height={408} />}
              </article>
            ))}
          </div>
        </section>

        {/* ---------- Menu ---------- */}
        <section className={s.menu} id="menu">
          <Ribbon
            className={s.ribbonB}
            viewBox="0 0 1440 420"
            speed={50}
            text="разнообразное меню, где каждый подберёт что-то по своему вкусу • "
            d="M -40 15 C 80 100 140 170 280 165 C 500 155 720 70 900 80 C 1060 90 1110 220 1010 300 C 930 365 870 330 905 280 C 950 215 1080 250 1180 200 C 1300 140 1400 90 1480 40"
          />
          <h2 className={s.menuTitle}>Меню</h2>
          <div className={s.catalog}>
            <aside className={s.filters}>
              <fieldset>
                <legend>Категория</legend>
                {CATEGORIES.map((c) => (
                  <label key={c}>
                    <input type="checkbox" checked={cats.includes(c)} onChange={() => toggle(cats, setCats, c)} />
                    {c}
                  </label>
                ))}
              </fieldset>
              <fieldset>
                <legend>Особенности</legend>
                {FEATURES.map((f) => (
                  <label key={f}>
                    <input type="checkbox" checked={feats.includes(f)} onChange={() => toggle(feats, setFeats, f)} />
                    {f}
                  </label>
                ))}
              </fieldset>
            </aside>
            <div>
              <div className={s.found}>
                Найдено: {shown.length}
                {[...cats, ...feats].map((f) => (
                  <button key={f} onClick={() => (cats.includes(f) ? toggle(cats, setCats, f) : toggle(feats, setFeats, f))}>
                    × {f}
                  </button>
                ))}
              </div>
              <div className={s.grid}>
                {shown.map((p) => (
                  <article key={p.id} className={s.product}>
                    <Image src={`/milu/${p.img}.jpg`} alt={p.title} width={664} height={660} />
                    <h3>{p.title}</h3>
                    <p className={s.price}>
                      {p.price} ₽ <small>/ 1 шт</small>
                    </p>
                    <div className={s.buy}>
                      <button className={s.btnSmall} onClick={() => setCart(cart + 1)}>
                        В корзину
                      </button>
                      <button
                        className={s.fav}
                        aria-label="В избранное"
                        aria-pressed={favs.includes(p.id)}
                        onClick={() => setFavs(favs.includes(p.id) ? favs.filter((x) => x !== p.id) : [...favs, p.id])}
                      >
                        <Heart filled={favs.includes(p.id)} />
                      </button>
                    </div>
                  </article>
                ))}
                {!shown.length && <p className={s.empty}>Ничего не найдено — попробуйте другие фильтры</p>}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
