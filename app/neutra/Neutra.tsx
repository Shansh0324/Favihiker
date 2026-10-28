import type { CSSProperties } from "react";
import s from "./neutra.module.css";

/** Position on the 1440px design grid: left, top, width, height in design px. */
const at = (x: number, y: number, w?: number, h?: number) => ({ "--x": x, "--y": y, "--w": w, "--h": h }) as CSSProperties;

const SHAPES = {
  sphere: { box: "0 0 400 400", d: "M200 20a180 180 0 1 0 .01 0Z" },
  blob: { box: "0 0 400 400", d: "M210 40C300 30 370 110 360 200C352 290 300 360 205 365C110 370 40 300 42 210C44 120 120 50 210 40Z" },
  swirl: { box: "0 0 400 400", d: "M190 30C260 10 340 60 370 140C395 210 360 300 290 345C220 390 120 380 70 320C20 260 25 170 70 110C100 70 140 45 190 30Z" },
  dome: { box: "0 0 400 130", d: "M10 125C30 40 120 8 200 8C280 8 370 40 390 125Z" },
  pouch: { box: "0 0 300 440", d: "M24 20H276V412Q276 428 260 428H40Q24 428 24 412Z" },
};
const STEEL = ["#050505", "#f4f4f4", "#6b6b6b", "#0d0d0d", "#e9e9e9", "#9a9a9a", "#111", "#fafafa", "#3a3a3a", "#cfcfcf", "#0a0a0a"];
const BLUE = ["#020414", "#f2f4ff", "#1d3bff", "#050a2e", "#dfe4ff", "#3b55ff", "#0a0f3a", "#ffffff", "#1d3bff", "#a9b6ff", "#020414"];

/**
 * Liquid-chrome stand-in for the reference's 3D renders: striped metal warped by noise.
 * ponytail: SVG approximation; drop real renders into /public/neutra and swap for <img> when you have them.
 */
function Chrome({ id, shape, seed = 1, freq = 0.012, warp = 60, angle = 35, blue = false, className, style }: {
  id: string;
  shape: keyof typeof SHAPES;
  seed?: number;
  freq?: number;
  warp?: number;
  angle?: number;
  blue?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  const { box, d } = SHAPES[shape];
  const stops = blue ? BLUE : STEEL;
  return (
    <svg viewBox={box} className={className} style={style} aria-hidden>
      <defs>
        <linearGradient id={`${id}-g`} x2=".45" spreadMethod="reflect" gradientTransform={`rotate(${angle} .5 .5)`}>
          {stops.map((c, i) => (
            <stop key={i} offset={i / (stops.length - 1)} stopColor={c} />
          ))}
        </linearGradient>
        <radialGradient id={`${id}-s`} cx=".42" cy=".38" r=".62">
          <stop offset=".55" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".55" />
        </radialGradient>
        <radialGradient id={`${id}-h`} cx=".36" cy=".26" r=".3">
          <stop offset="0" stopColor="#fff" stopOpacity=".85" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <filter id={`${id}-f`} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency={freq} numOctaves={2} seed={seed} />
          <feDisplacementMap in="SourceGraphic" scale={warp} xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <g filter={`url(#${id}-f)`}>
        <path d={d} fill={`url(#${id}-g)`} />
        <path d={d} fill={`url(#${id}-s)`} />
        <path d={d} fill={`url(#${id}-h)`} />
      </g>
    </svg>
  );
}

/** NEUTRA "N" mark. */
const Mark = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor" aria-hidden>
    <path d="M0 0H32L68 58V0H100V100H68L32 42V100H0Z" />
  </svg>
);

export default function Neutra() {
  return (
    <div className={s.shell}>
      <main className={s.page}>
        {/* ---------- Hero ---------- */}
        <section className={`${s.sec} ${s.hero}`} style={{ "--sh": 1150 } as CSSProperties}>
          <h1 className={`${s.abs} ${s.word}`} style={at(20, 24)}>
            NEUTRA<sup>®</sup>
          </h1>
          <div className={`${s.abs} ${s.orb}`} style={at(300, 190, 720, 720)}>
            <Chrome id="hero" shape="sphere" seed={4} freq={0.018} warp={34} angle={80} blue />
            <Mark className={s.orbMark} />
          </div>
          <p className={`${s.abs} ${s.small} ${s.light}`} style={at(560, 955, 320)}>
            Clean fuel for a neutral planet
          </p>
          <i className={`${s.abs} ${s.bar} ${s.barLight}`} style={at(690, 1100, 20, 4)} />
          <i className={`${s.abs} ${s.bar} ${s.barLight}`} style={at(806, 1100, 94, 4)} />
        </section>

        {/* ---------- Transforming the energy ---------- */}
        <section className={`${s.sec} ${s.grey}`} style={{ "--sh": 1600 } as CSSProperties}>
          <h2 className={`${s.abs} ${s.h2} ${s.center}`} style={at(0, 72, 1440)}>
            Transforming
            <br />
            the energy
          </h2>
          <p className={`${s.abs} ${s.small}`} style={at(30, 290, 200)}>
            (01) — Energy
          </p>
          <div className={`${s.abs} ${s.tile} ${s.black}`} style={at(766, 327, 184, 184)}>
            <Chrome id="thumb" shape="sphere" seed={9} freq={0.02} warp={28} angle={120} />
          </div>
          <div className={`${s.abs} ${s.tile} ${s.blue}`} style={at(950, 511, 184, 184)}>
            <Mark className={s.tileMark} />
          </div>
          <div className={`${s.abs} ${s.card}`} style={at(327, 695, 806, 480)}>
            <div className={s.cardLogo}>
              <Mark />
              NEUTRA<sup>®</sup>
            </div>
            <p className={`${s.small} ${s.light} ${s.cardNote}`}>
              Zero-emission
              <br />
              fuel systems
            </p>
          </div>
          <i className={`${s.abs} ${s.blue}`} style={at(327, 683, 418, 22)} />
          <Chrome id="blob" shape="blob" seed={7} freq={0.01} warp={70} angle={20} className={`${s.abs} ${s.float}`} style={at(96, 1010, 400, 380)} />
          <i className={`${s.abs} ${s.dot}`} style={at(704, 1460, 10, 10)} />
          <i className={`${s.abs} ${s.dot}`} style={at(720, 1460, 10, 10)} />
          <p className={`${s.abs} ${s.small} ${s.center}`} style={at(520, 1495, 400)}>
            (02)
          </p>
        </section>

        {/* ---------- The world's lowest cost fuel ---------- */}
        <section className={`${s.sec} ${s.grey}`} style={{ "--sh": 1715 } as CSSProperties}>
          <i className={`${s.abs} ${s.blue}`} style={at(40, 0, 175, 8)} />
          <h2 className={`${s.abs} ${s.h2} ${s.stagger}`} style={at(0, 70, 1440)}>
            <span style={{ "--i": 674 } as CSSProperties}>The</span>
            <span style={{ "--i": 337 } as CSSProperties}>World’s</span>
            <span style={{ "--i": 490 } as CSSProperties}>Lowest cost</span>
            <span style={{ "--i": 337 } as CSSProperties}>Fuel</span>
          </h2>
          <Chrome id="swirl" shape="swirl" seed={3} freq={0.009} warp={110} angle={55} className={`${s.abs} ${s.float}`} style={at(316, 440, 858, 817)} />
          <i className={`${s.abs} ${s.fade}`} style={at(806, 868, 184, 286)} />
          <div className={s.abs} style={at(0, 1440, 184, 245)}>
            <Mark className={s.bigMark} />
          </div>
          <div className={`${s.abs} ${s.tile} ${s.blue}`} style={at(214, 1440, 184, 245)}>
            <Chrome id="blueTile" shape="blob" seed={12} freq={0.014} warp={80} angle={140} blue />
          </div>
          <i className={`${s.abs} ${s.bar}`} style={at(694, 1547, 20, 4)} />
          <i className={`${s.abs} ${s.bar}`} style={at(806, 1547, 94, 4)} />
          <p className={`${s.abs} ${s.small} ${s.center}`} style={at(495, 1590, 450)}>
            Engineered for scale.
            <br />
            Priced for everyone.
          </p>
          <div className={`${s.abs} ${s.tile} ${s.black}`} style={at(1235, 1440, 194, 245)}>
            <Chrome id="darkTile" shape="swirl" seed={21} freq={0.012} warp={90} angle={100} />
          </div>
        </section>

        {/* ---------- Core ---------- */}
        <section className={`${s.sec} ${s.dark}`} style={{ "--sh": 970 } as CSSProperties}>
          <Chrome id="dome" shape="dome" seed={5} freq={0.01} warp={26} angle={90} className={s.abs} style={at(337, 337, 816, 265)} />
          <p className={`${s.abs} ${s.small} ${s.light}`} style={at(316, 500, 260)}>
            Neutra core™
          </p>
          <span className={`${s.abs} ${s.chip}`} style={at(603, 496, 102, 30)}>
            New
          </span>
          <p className={`${s.abs} ${s.small} ${s.light} ${s.copy}`} style={at(806, 633, 330)}>
            A closed-loop cell that turns captured carbon into clean, storable fuel.
            <br />
            <br />
            No new drilling. No new emissions. Just energy, neutralised.
          </p>
        </section>

        {/* ---------- Product ---------- */}
        <section className={`${s.sec} ${s.product}`} style={{ "--sh": 1756 } as CSSProperties}>
          <div className={`${s.abs} ${s.paper}`} style={at(337, 51, 755, 990)}>
            <div className={s.pouch}>
              <Chrome id="pouch" shape="pouch" seed={8} freq={0.03} warp={14} angle={70} />
              <div className={s.label}>
                <Mark />
                <b>NEUTRA</b>
              </div>
            </div>
          </div>
          <p className={`${s.abs} ${s.tag}`} style={at(163, 1021, 174, 82)}>
            Neutra
            <br />
            fuel pack
          </p>
          <div className={`${s.abs} ${s.mini}`} style={at(337, 1143, 174, 82)}>
            <Chrome id="mini" shape="blob" seed={15} freq={0.02} warp={40} />
            <span>
              1 kg
              <br />
              refill
            </span>
          </div>
          <p className={`${s.abs} ${s.small} ${s.light} ${s.center}`} style={at(620, 1300, 400)}>
            Available worldwide
          </p>
          <div className={`${s.abs} ${s.tile} ${s.blue}`} style={at(664, 1634, 112, 112)}>
            <Mark className={s.tileMark} />
          </div>
        </section>
      </main>
    </div>
  );
}
