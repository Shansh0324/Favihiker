import Image from "next/image";
import type { CSSProperties } from "react";
import s from "./hero.module.css";

// Every collage piece is placed in design pixels of the original 1080×675 frame
// (y measured from the collage top, frame y 403). CSS scales them with --u.
// f = share of the spare width on wide screens; pieces baked into a photo crop share its f.
const at = (x: number, y: number, w: number, h: number, r = 0, z = 1, f?: number) =>
  ({ "--x": x, "--y": y, "--w": w, "--h": h, "--r": r, "--z": z, "--f": f }) as CSSProperties;

const Arrow = () => (
  <svg viewBox="0 0 22 10" fill="none" stroke="currentColor" strokeWidth="1.1">
    <path d="M0 5h21M16.5 .8 21 5l-4.5 4.2" />
  </svg>
);

const Play = () => (
  <svg viewBox="0 0 24 24">
    <path d="M7 4.5v15a1 1 0 0 0 1.5.9l12-7.5a1 1 0 0 0 0-1.8l-12-7.5A1 1 0 0 0 7 4.5Z" fill="currentColor" />
  </svg>
);

export default function Hero() {
  return (
    <section className={s.hero}>
      <nav className={s.links}>
        <a href="#about">
          About <Arrow />
        </a>
        <a href="#works">Works</a>
        <a href="#contacts">Contacts</a>
      </nav>

      <a href="/" className={s.logo}>
        <svg viewBox="0 0 20 20" aria-hidden>
          {[0, 45, 90, 135].map((r) => (
            <ellipse key={r} cx="10" cy="10" rx="3.4" ry="9.4" transform={`rotate(${r} 10 10)`} />
          ))}
        </svg>
        EL Gallery
      </a>

      <div className={s.actions}>
        <a href="#start" className={s.start}>
          Get started
        </a>
        <button className={s.icon} aria-label="Search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle cx="11" cy="11" r="6.5" />
            <path d="m16 16 3.5 3.5" />
          </svg>
        </button>
        <button className={s.icon} aria-label="Menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M5 10h14M5 14h14" />
          </svg>
        </button>
      </div>

      <div className={s.copy}>
        <h1 className={s.title}>
          We Make B
          <span className={s.mark}>
            o
            <svg className={s.arrows} viewBox="0 0 44 22" aria-hidden>
              <path d="M3 2c2 5 4 9 8 13M6.5 15H11v-4.5M22 1v14M18.5 11.5 22 15l3.5-3.5M42 3c-3 4-6 8-10 12M32 10.5V15h4.5" />
            </svg>
          </span>
          ring
          <br />
          Things In
          <span className={`${s.mark} ${s.pink}`}>
            t
            <svg className={s.spark} viewBox="0 0 36 17" aria-hidden>
              <path d="M17 0l1.5 8M5 4l5 6M31 3l-6 7M0 14l6 1M36 13l-6 2" />
            </svg>
          </span>
          eresting
        </h1>
        <p className={s.sub}>
          Unique digital products, brand identities,
          <br />
          web and mobile designs
        </p>
      </div>

      <div className={s.collage} aria-hidden>
        <div className={s.shape} style={{ ...at(180, 90, 182, 190), background: "#fcb1cf" }} />
        <div className={`${s.shape} ${s.lime}`} style={at(250, 142, 80, 70, 0, 2)} />
        <div className={`${s.pill} ${s.web}`} style={at(215, 198, 150, 64, 52, 3)}>WEB</div>
        <div className={`${s.pill} ${s.branding}`} style={at(280, 154, 140, 46, 22, 4)}>BRANDING</div>
        <div className={s.photo} style={at(0, 0, 252, 272, 0, 5)}>
          <Image src="/hero/posters.jpg" alt="" fill sizes="25vw" priority />
        </div>
        <div className={`${s.pill} ${s.landing}`} style={at(386, 68, 178, 50, 68, 5)}>
          <i />
          LANDIN PAGE
        </div>
        <div className={s.contact} style={at(533, 39, 172, 240, 0, 5)}>
          CONTACT US
          <br />
          BELOW
          <span>↓ ↓ ↓</span>
        </div>
        <div className={s.photo} style={at(458, 158, 115, 114, 0, 6, 0.4)}>
          <Image src="/hero/magazine.jpg" alt="" fill sizes="12vw" />
        </div>
        <div className={`${s.pill} ${s.outline}`} style={at(295, 55, 150, 46, -8, 7)}>UI/UX DESIGN</div>
        <div className={`${s.pill} ${s.outline}`} style={at(305, 103, 156, 46, -8, 7)}>E-COMMERCE</div>
        <div className={`${s.play} ${s.playPink}`} style={at(401, 145, 66, 66, 0, 8, 0.4)}>
          <span>
            <Play />
          </span>
        </div>
        <div className={s.chip} style={at(312, 203, 198, 65, 0, 9, 0.4)}>
          <Image src="/hero/avatar-team.jpg" alt="" width={54} height={54} />
          TOP TEAM
        </div>

        <div className={s.photo} style={at(790, 0, 218, 180, 0, 4, 1)}>
          <Image src="/hero/tote.jpg" alt="" fill sizes="20vw" priority />
        </div>
        <div className={`${s.shape} ${s.sphere}`} style={at(702, 50, 115, 115, 0, 5, 1)} />
        <div className={s.photo} style={at(1002, 82, 78, 190, 0, 5)}>
          <Image src="/hero/website.jpg" alt="" fill sizes="8vw" />
        </div>
        <div className={`${s.shape} ${s.oval}`} style={at(922, 64, 82, 165, -22, 6, 1)} />
        <div className={`${s.pill} ${s.outline} ${s.webDesign}`} style={at(707, 127, 187, 54, 0, 8, 1)}>
          WEB DESIGN
          <span>
            <Arrow />
          </span>
        </div>
        <div className={`${s.chip} ${s.chipLg}`} style={at(620, 180, 360, 90, 0, 9)}>
          <Image src="/hero/avatar-emotions.jpg" alt="" width={70} height={70} />
          CREATING EMOTIONS
        </div>
        <div className={`${s.play} ${s.playBlue}`} style={at(972, 203, 68, 68, 0, 10, 1)}>
          <Play />
        </div>
      </div>
    </section>
  );
}
