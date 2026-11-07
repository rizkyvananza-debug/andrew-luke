import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  BookOpen,
  Cloud,
  Code,
  Disc3,
  Dumbbell,
  Film,
  FolderGit2,
  Gamepad2,
  Github,
  Headphones,
  Home,
  Instagram,
  Mail,
  MapPin,
  Music,
  Palette,
  Pencil,
  Play,
  Quote,
  Smartphone,
  Sparkle,
  Sparkles,
  Star,
  Tv,
  User,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lukiié vìe Aņdréw — andrewstoreyaoi.biz.id" },
      {
        name: "description",
        content:
          "Andrew Cain Young And Luke Mikael Davis (Rp Name), Lovely Developers — WhatsApp Bot, Web, and Manhwa BL Translator.",
      },
      { property: "og:title", content: "Lukiié vìe Aņdréw — andrewstoreyaoi.biz.id" },
      {
        property: "og:description",
        content:
          "Andrew Cain Young And Luke Mikael Davis (Rp Name), Lovely Developers — WhatsApp Bot, Web, and Manhwa BL Translator.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const themes = ["black", "white", "red", "purple", "blue", "green", "orange", "yellow", "pink", "gradient"] as const;
type Theme = (typeof themes)[number];

/* ---------- Tiny synthesized UI sound effects (no audio files needed) ---------- */
let sfxCtx: AudioContext | null = null;

function getSfxCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctor) return null;
  if (!sfxCtx) sfxCtx = new Ctor();
  if (sfxCtx.state === "suspended") sfxCtx.resume().catch(() => {});
  return sfxCtx;
}

function playTone(
  freqs: number[],
  { duration = 0.09, type = "sine" as OscillatorType, gain = 0.06, stagger = 0.045 } = {},
) {
  const ctx = getSfxCtx();
  if (!ctx) return;
  freqs.forEach((freq, i) => {
    const start = ctx.currentTime + i * stagger;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, start);
    g.gain.setValueAtTime(0, start);
    g.gain.linearRampToValueAtTime(gain, start + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    osc.connect(g);
    g.connect(ctx.destination);
    osc.start(start);
    osc.stop(start + duration + 0.02);
  });
}

/** Short neutral click for ordinary buttons (about me, get in touch, contact links, ...) */
function playClickSfx() {
  playTone([720], { duration: 0.07, type: "triangle", gain: 0.05 });
}

/** Two-note upward blip for section navigation (navbar / menu links) */
function playNavSfx() {
  playTone([520, 780], { duration: 0.1, type: "sine", gain: 0.05, stagger: 0.05 });
}

/** Bright ascending arpeggio for theme changes (matches the "special" feel of the reveal animation) */
function playThemeSfx() {
  playTone([440, 660, 880], { duration: 0.16, type: "triangle", gain: 0.055, stagger: 0.06 });
}

function rotStyle(deg: string): React.CSSProperties {
  return { ["--rot"]: deg } as React.CSSProperties;
}

function useInView<T extends HTMLElement>(once = true) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) obs.unobserve(entry.target);
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [once]);

  return { ref, inView };
}

function Reveal({
  children,
  delay = 0,
  from = "up",
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  from?: "up" | "left" | "right";
  className?: string;
  as?: React.ElementType;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const dir = from === "left" ? "reveal-left" : from === "right" ? "reveal-right" : "";
  return (
    <Tag
      ref={ref}
      className={`reveal ${dir} ${inView ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}


const hobbies = [
  { label: "Otak Atik Bot", icon: Code, bg: "bg-cream" },
  { label: "We Are Manhwa BL Readers", icon: Zap, bg: "bg-baby-blue" },
  { label: "Watching Movie", icon: Film, bg: "bg-pastel-yellow" },
  { label: "Desain (Digital)", icon: Palette, bg: "bg-lavender" },
  { label: "Coding", icon: Code, bg: "bg-cream" },
  { label: "Scroll Sosmed", icon: Smartphone, bg: "bg-baby-blue" },
  { label: "Music", icon: Headphones, bg: "bg-cream" },
  { label: "MLBB Together", icon: Gamepad2, bg: "bg-pastel-yellow" },
  { label: "Read Novels", icon: BookOpen, bg: "bg-lavender" },
];

const artists = [
/*
  { name: "Faye Webster", img: "/artists/faye-webster.jpg" },
  { name: "Cocteau Twins", img: "/artists/cocteau-twins.jpg" },
  { name: "Mitski", img: "/artists/mitski.jpg" },
  { name: "Clario", img: "/artists/clario.jpg" },
  { name: "Sufjan Stevens", img: "/artists/sufjan-stevens.jpg" },
  { name: "Call Me by Your Name", img: "/artists/cmbyn.jpg" },
  { name: "BDK", img: "/artists/bdk.jpg" },
  { name: "Maurice Ravel", img: "/artists/maurice-ravel.jpg" }
];

const animes = [
  { title: "No More Eurydice", img: "/anime/no-more-eurydice.jpg" },
  { title: "Nerd Project", img: "/anime/nerd-project.jpg" },
  { title: "Given", img: "/anime/given.jpg" }
];

const skills = [
  { name: "JavaScript (Andrew)", level: 40 },
  { name: "Type Setting (Luke)", level: 60 },
  { name: "Node.js (Andrew)", level: 20 },
  { name: "Bot Wa (Andrew)", level: 70 },
  { name: "Singing (Luke)", level: 99 },
  { name: "Guitar (Andrew)", level: 65 }
];

const statusItems = [
  { label: "Status", value: "Developer" },
  { label: "Focus", value: "Store - Bot - Web - Study" },
  { label: "Base", value: "Kaltim - Samarinda" },
  { label: "Mode", value: "Always Online" },
];

const exploring = ["TypeScript", "Vercel", "Termux", "UI/UX Design"];

const projects = [
  {
    title: "No More Eurydice WhatsApp Bot",
    href: "https://chat.whatsapp.com/JecDc2QHZKCEGbbp0hZ72P?mode=gi_t",
    img: "/projects/senxyzmusic.jpg",
    desc: "Bot WhatsApp dengan ratusan fitur dan sistem yang stabil",
    tags: [
      { name: "WhatsApp Bot", bg: "bg-baby-blue" },
      { name: "Free", bg: "bg-soft-pink" },
    ],
  },
  {
    title: "Our Store Website",
    href: "https://andrewstoreyaoi.biz.id",
    img: "/projects/netkuy.jpg",
    desc: "To Order Something Like Sewa Bot and You Can Read Manhwa From Here.",
    tags: [
      { name: "Store", bg: "bg-pastel-yellow" },
      { name: "Website", bg: "bg-lavender" },
    ],
  },
  {
    title: "Translate BL Manhwa's",
    href: "https://t.me/lukiies",
    img: "/projects/senxyzmusic.jpg",
    desc: "Baca Manhwa BL Dengan Subtitle Indonesia.",
    tags: [
      { name: "Manhwa BL", bg: "bg-baby-blue" },
      { name: "Free", bg: "bg-soft-pink" },
    ],
  }
];

const contacts = [
  { platform: "Telegram", handle: "Andrew Young", href: "https://t.me/andrewstoreid", icon: Zap },
    { platform: "Telegram", handle: "Luke Davis", href: "https://t.me/mafuyusatoo", icon: Zap },
  { platform: "Instagram", handle: "Andrew & Luke", href: "https://instagram.com/andrew_store0", icon: Instagram },
  { platform: "WhatsApp", handle: "Andrew", href: "https://wa.me/6281929972432", icon: Smartphone },
    { platform: "WhatsApp", handle: "Luke", href: "https://wa.me/31687593822", icon: Smartphone },
];

function Marquee() {
  const items = Array(8).fill(null);
  return (
    <div className="w-full bg-ink text-cream py-2.5 overflow-hidden border-b-2 border-ink relative z-40">
      <div className="marquee-track font-display font-semibold text-xs sm:text-sm tracking-[0.25em]">
        {items.map((_, i) => (
          <span key={i} className="px-6 flex items-center gap-6 shrink-0">
            Andrew And Luke
            <Star className="w-3 h-3 text-soft-pink" strokeWidth={2.5} />
          </span>
        ))}
      </div>
    </div>
  );
}

function NavButton({
  active,
  href,
  icon: Icon,
  label,
  onClick,
}: {
  active: boolean;
  href: string;
  icon: React.ElementType;
  label: string;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 text-xs sm:text-sm font-display font-semibold uppercase tracking-wide ${
        active
          ? "bg-cream text-ink border-ink/10 sticker"
          : "bg-lavender/60 text-ink border-ink/10 hover:bg-cream hover:-translate-y-0.5"
      }`}
    >
      <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      <span className="hidden sm:inline">{label}</span>
    </a>
  );
}

function SectionHeading({ fig, children }: { fig: string; children: React.ReactNode }) {
  return (
    <Reveal className="mb-3" from="left">
      <p className="fig-label mb-3">{fig}</p>
      <h2 className="font-display font-bold text-3xl sm:text-4xl uppercase flex items-center gap-3">
        {children}
      </h2>
    </Reveal>
  );
}

function FloatingIcon({
  icon: Icon,
  className,
  style,
}: {
  icon: React.ElementType;
  className: string;
  style?: React.CSSProperties;
}) {
  return <Icon className={`absolute ${className}`} style={style} />;
}

function useActiveSection() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const sections = ["home", "about", "hobby", "favorite", "skills", "projects", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return active;
}

const themeMeta: Record<Theme, { label: string; swatch: string }> = {
  black: { label: "Hitam", swatch: "#111111" },
  white: { label: "Putih", swatch: "#ffffff" },
  red: { label: "Merah", swatch: "#ff3d24" },
  purple: { label: "Ungu", swatch: "#a347ff" },
  blue: { label: "Biru", swatch: "#2f9bff" },
  green: { label: "Hijau", swatch: "#22c55e" },
  orange: { label: "Orange", swatch: "#ff7a1a" },
  yellow: { label: "Kuning", swatch: "#facc15" },
  pink: { label: "Pink", swatch: "#ff4fa3" },
  gradient: {
    label: "Gradien",
    swatch: "linear-gradient(135deg, #ff4fa3, #a347ff, #2f9bff)",
  },
};

function ThemeToggle({
  theme,
  onSelect,
}: {
  theme: Theme;
  onSelect: (t: Theme) => void;
}) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  return (
    <div className="relative" ref={panelRef}>
      {open && (
        <div className="absolute bottom-full right-0 mb-3 bg-cream border border-ink/10 rounded-2xl sticker p-2 flex flex-col gap-1 min-w-[150px] max-h-[60vh] overflow-y-auto reveal is-in">
          {themes.map((t) => (
            <button
              key={t}
              onClick={() => {
                onSelect(t);
                setOpen(false);
              }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors font-display font-semibold text-sm uppercase tracking-wide ${
                theme === t ? "bg-baby-blue text-ink" : "text-ink hover:bg-lavender/60"
              }`}
            >
              <span
                className="w-4 h-4 rounded-full border border-ink/20 shrink-0"
                style={{ background: themeMeta[t].swatch }}
              />
              {themeMeta[t].label}
              {theme === t && <span className="ml-auto text-xs">●</span>}
            </button>
          ))}
        </div>
      )}
      <button
        aria-label="Ganti tema warna"
        aria-expanded={open}
        onClick={() => {
          playClickSfx();
          setOpen((o) => !o);
        }}
        className="bg-ink text-cream rounded-full p-3.5 border border-ink/10 transition-transform hover:-translate-y-1 hover:rotate-6 sticker"
      >
        <Palette className="w-5 h-5" strokeWidth={2.5} />
      </button>
    </div>
  );
}

function BgmToggle() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.play().catch(() => setPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [playing]);

  return (
    <div className="fixed bottom-5 left-5 z-50">
      <audio
        ref={audioRef}
        src="https://c.termai.cc/v113/EMGItQE.mp3"
        loop
      />
      <button
        onClick={() => setPlaying((p) => !p)}
        aria-label="Toggle Background Music"
        className="group flex items-center gap-3 px-4 py-3 rounded-full shadow-lg sticker border transition-transform duration-300 hover:-translate-y-1 hover:rotate-2 bg-cream text-ink border-ink/10"
      >
        <div className="relative flex items-center justify-center">
          <Disc3 className={`w-5 h-5 ${playing ? "animate-[spin_3s_linear_infinite]" : ""}`} />
        </div>
        <span className="font-display font-semibold text-xs uppercase tracking-widest hidden sm:inline-block">
          {playing ? "BGM On" : "BGM Off"}
        </span>
        <div className="bg-white/20 rounded-full p-1">
          <Play className="w-3 h-3 fill-current ml-0.5" />
        </div>
      </button>
    </div>
  );
}

function HomeSection({ scrollTo }: { scrollTo: (id: string) => void }) {
  return (
    <section
      id="home"
      className="relative max-w-[1440px] mx-auto px-5 xl:px-10 pt-14 pb-24 overflow-hidden"
    >
      <FloatingIcon
        icon={Sparkles}
        className="top-2 left-2 text-soft-pink floaty-slow w-[34px] h-[34px]"
        style={rotStyle("-8deg")}
      />
      <FloatingIcon
        icon={Star}
        className="top-20 right-[12%] text-baby-blue fill-baby-blue floaty w-7 h-7"
        style={rotStyle("10deg")}
      />
      <FloatingIcon
        icon={Cloud}
        className="bottom-10 left-[8%] text-lavender fill-lavender floaty-fast w-12 h-12"
        style={rotStyle("0deg")}
      />
      <FloatingIcon
        icon={Star}
        className="bottom-24 right-[6%] text-pastel-yellow fill-pastel-yellow floaty-slow w-[22px] h-[22px]"
        style={rotStyle("-15deg")}
      />

      <div className="grid md:grid-cols-2 gap-12 items-center pt-6">
        <Reveal className="relative flex justify-center md:justify-start" from="left">
          <div className="tape w-24 -rotate-12 -top-3 left-10 z-10" />
          <div className="polaroid w-[280px] sm:w-[340px] rotate-[-3deg]">
            <img
              src="/hero-photo.jpg"
              alt="AltOffx"
              loading="eager"
              fetchPriority="high"
              className="w-full h-[360px] sm:h-[420px] object-cover rounded-sm"
            />
            <div className="absolute bottom-5 left-0 right-0 text-center fig-label">
              ALTOFFX— INDEPENDENT DEVELOPER
            </div>
          </div>
          <div className="absolute -bottom-6 -right-4 bg-pastel-yellow border border-ink/10 sticker px-4 py-2 rounded-xl rotate-6 font-display font-bold text-sm flex items-center gap-2 floaty-fast">
            <Star className="w-3.5 h-3.5 spin-slow" strokeWidth={2.5} />
            LEVEL UP
          </div>
        </Reveal>

        <Reveal from="right" delay={120}>
          <p className="fig-label mb-3">FIG.01 — INTRODUCTION</p>
          <h1 className="font-display font-bold leading-[0.95] text-5xl sm:text-6xl lg:text-5xl uppercase">
            Satria Trunk Wisnu
          </h1>
          <div
            className="inline-block mt-3 px-5 py-2 rounded-2xl border transition-colors duration-500"
            style={{ background: "var(--c-ink)", borderColor: "var(--c-ink)" }}
          >
            <h1
              className="font-hero font-bold leading-[0.95] text-5xl sm:text-6xl lg:text-7xl uppercase transition-colors duration-500"
              style={{ color: "var(--c-soft-pink)" }}
            >
              Kayzi-Dev
            </h1>
          </div>
          <div className="mt-6 inline-flex flex-wrap items-center gap-2 font-mono text-xs sm:text-sm tracking-[0.2em] uppercase bg-cream border border-ink/10 sticker rounded-full px-4 py-2">
            {["DREAM", "BUILD", "BREAK", "REPEAT"].map((word, i, arr) => (
              <span
                key={word}
                className="flex items-center gap-2 transition-transform hover:-translate-y-0.5 hover:text-soft-pink"
              >
                {word}
                {i < arr.length - 1 && <span className="text-soft-pink">/</span>}
              </span>
            ))}
          </div>
          <p className="mt-6 text-ink-soft text-base sm:text-lg leading-relaxed max-w-md">
            <strong className="text-ink">Lovely Developers</strong> — WhatsApp bot (Baileys & Zapo),
            web app, dan plugin-plugin absurd tengah malam. Hidup dari kopi.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={() => scrollTo("about")}
              className="group inline-flex items-center gap-2 bg-ink text-cream rounded-full px-6 py-3 font-display font-semibold text-sm uppercase tracking-wide hover-pop shine sticker pulse-ring"
            >
              About Me
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:translate-y-1"
              >
                <path d="M12 5v14" />
                <path d="m19 12-7 7-7-7" />
              </svg>
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="inline-flex items-center gap-2 bg-cream text-ink border border-ink/10 rounded-full px-6 py-3 font-display font-semibold text-sm uppercase tracking-wide hover-pop shine sticker"
            >
              Get in Touch
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="relative max-w-[1440px] mx-auto px-5 xl:px-10 py-20">
      <div className="tape w-28 rotate-3 -top-3 left-[10%]" />
      <div className="relative">
        <p className="fig-label mb-3">FIG.02 — ABOUT ME</p>
        <div className="grid md:grid-cols-[1fr_1.4fr] gap-6">
          <Reveal from="left" className="bg-pastel-yellow border border-ink/10 rounded-blob sticker p-6 flex flex-col justify-between rotate-[-1deg] hover-pop">
            <Sparkle className="w-7 h-7 floaty" style={rotStyle("0deg")} />
            <div>
              <p className="font-display font-bold text-2xl uppercase leading-tight mt-6">
                Kayz
              </p>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft mt-2">
                Independent Developer
              </p>
            </div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft mt-6">
              Dream, Build, Break, Repeat
            </p>
          </Reveal>
          <Reveal from="right" delay={120} className="bg-cream border border-ink/10 rounded-blob sticker p-8 halftone relative rotate-[1deg] hover-pop shine">
            <div className="absolute -top-4 -left-4 bg-soft-pink rounded-full p-2 text-ink">
              <Quote className="w-5 h-5 bounce-soft" />
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl uppercase mb-4">About Me</h2>
            <p className="text-ink-soft text-base sm:text-lg leading-relaxed">
              Halo! Saya KayzImagine / AltOffx (Satria Trunk Wisnu), developer independen yang fokus di WhatsApp bot
              (Baileys), React, dan sistem digital custom. Suka bikin hal yang aneh tapi berfungsi,
              dan terus belajar tiap hari. Mari terhubung dan ngobrol soal project.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function HobbySection() {
  return (
    <section id="hobby" className="relative max-w-[1440px] mx-auto px-5 xl:px-10 py-20">
      <div className="tape w-28 -rotate-6 -top-3 right-[10%]" />
      <div>
        <SectionHeading fig="FIG.03 — HOBBY">Things I Do Everyday</SectionHeading>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {hobbies.map(({ label, icon: Icon, bg }, i) => (
            <Reveal key={label} delay={i * 40}>
              <div
                className={`${bg} border border-ink/10 rounded-2xl sticker p-5 flex flex-col items-center gap-3 text-center hover-pop shine h-full`}
              >
              <div className="bg-cream border border-ink/10 rounded-full p-3 wiggle-hover">
                <Icon className="w-6 h-6 sm:w-[26px] sm:h-[26px]" strokeWidth={2} />
              </div>
              <p className="font-display font-semibold text-sm uppercase tracking-wide">{label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FavoriteSection() {
  return (
    <section id="favorite" className="max-w-[1440px] mx-auto px-5 xl:px-10 py-20 flex flex-col gap-16">
      <div className="relative">
        <div className="tape w-24 rotate-6 -top-3 left-[6%]" />
        <SectionHeading fig="FIG.04 — MUSIC">
          <Music className="w-7 h-7 text-soft-pink" strokeWidth={2.5} />
          Favorite Artists
        </SectionHeading>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {artists.map(({ name, img }, i) => (
            <Reveal key={name} delay={i * 35}>
            <div className="bg-cream border border-ink/10 rounded-2xl sticker overflow-hidden hover-pop group h-full">
              <div className="aspect-square w-full bg-lavender overflow-hidden relative">
                <img
                  src={img}
                  alt={name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                />
              </div>
              <div className="p-3 flex items-center gap-2">
                <Disc3 className="w-4 h-4 text-ink-soft shrink-0 group-hover:spin-slow" strokeWidth={2} />
                <p className="font-display font-semibold text-sm truncate">{name}</p>
              </div>
            </div>
            </Reveal>
          ))}
        </div>
      </div>
      <div className="relative">
        <div className="tape w-28 -rotate-3 -top-3 right-[8%]" />
        <SectionHeading fig="FIG.05 — ANIME">
          <Tv className="w-7 h-7 text-soft-pink" strokeWidth={2.5} />
          Favorite Art's
        </SectionHeading>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {animes.map(({ title, img }, i) => (
            <Reveal key={title} delay={i * 35} from={i % 2 === 0 ? "left" : "right"}>
            <div className="bg-cream border border-ink/10 rounded-2xl sticker p-4 flex items-center gap-4 hover-pop shine group h-full">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 bg-lavender">
                <img src={img} alt={title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="min-w-0">
                <p className="font-mono text-xs text-ink-soft mb-1">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="font-display font-bold text-sm sm:text-base uppercase truncate">
                  {title}
                </p>
              </div>
            </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div ref={ref}>
      <div className="flex items-center justify-between mb-2">
        <span className="font-display font-semibold uppercase tracking-wide">{name}</span>
        <span className="font-mono text-xs text-ink-soft">{level}%</span>
      </div>
      <div className="h-2 bg-lavender rounded-full overflow-hidden border border-ink/10">
        <div
          className="h-full bg-ink rounded-full bar-fill"
          style={{ width: inView ? `${level}%` : "0%", transitionDelay: `${delay}ms` }}
        />
      </div>
    </div>
  );
}

function SkillsSection() {
  return (
    <section id="skills" className="relative max-w-[1440px] mx-auto px-5 xl:px-10 py-20">
      <div className="tape w-24 -rotate-6 -top-3 left-[14%]" />
      <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10">
        <div>
          <SectionHeading fig="FIG.06 — SKILLS">
            <Code className="w-7 h-7 text-soft-pink" strokeWidth={2.5} />
            Tech Stack
          </SectionHeading>
          <div className="space-y-5 mt-8">
            {skills.map(({ name, level }, i) => (
              <SkillBar key={name} name={name} level={level} delay={i * 50} />
            ))}
          </div>
        </div>

        <div>
          <p className="fig-label mb-3">STATUS</p>
          <div className="bg-cream border border-ink/10 rounded-blob sticker p-6 halftone">
            <h3 className="font-display font-bold text-2xl uppercase mb-6">Status</h3>
            <div className="grid grid-cols-2 gap-4">
              {statusItems.map(({ label, value }, i) => (
                <Reveal key={label} delay={i * 40}>
                <div className="bg-cream border border-ink/10 rounded-xl p-4 sticker hover-pop h-full">
                  <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-soft mb-1">
                    {label}
                  </p>
                  <p className="font-display font-bold text-sm uppercase">{value}</p>
                </div>
                </Reveal>
              ))}
              <div className="col-span-2 bg-cream border border-ink/10 rounded-xl p-4 sticker">
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-soft mb-2">
                  Currently Exploring
                </p>
                <div className="flex flex-wrap gap-2">
                  {exploring.map((item) => (
                    <span
                      key={item}
                      className="bg-baby-blue border border-ink/10 font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full transition-transform hover:-translate-y-0.5 hover:rotate-2"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="relative max-w-[1440px] mx-auto px-5 xl:px-10 py-20">
      <div className="tape w-28 rotate-3 -top-3 left-[14%]" />
      <SectionHeading fig="FIG.07 — PROJECTS">
        <FolderGit2 className="w-7 h-7 text-soft-pink" strokeWidth={2.5} />
        Project
      </SectionHeading>
      <div className="grid sm:grid-cols-2 gap-6 mt-8">
        {projects.map(({ title, href, img, desc, tags }, i) => (
          <Reveal key={title} delay={i * 40} from={i % 2 === 0 ? "left" : "right"}>
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            onClick={() => playClickSfx()}
            className="block bg-cream border border-ink/10 rounded-blob sticker overflow-hidden hover-pop shine group h-full"
          >
            <div className="aspect-[16/10] w-full overflow-hidden border-b border-ink/10">
              <img
                src={img}
                alt={title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display font-bold text-xl uppercase">{title}</h3>
                <ArrowUpRight className="shrink-0 mt-1 w-[22px] h-[22px] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={2.5} />
              </div>
              <p className="text-ink-soft text-sm mt-2 leading-relaxed line-clamp-3">{desc}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {tags.map(({ name, bg }) => (
                  <span
                    key={name}
                    className={`${bg} border border-ink/10 font-mono text-[11px] uppercase tracking-widest px-3 py-1 rounded-full`}
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="relative max-w-[1440px] mx-auto px-5 xl:px-10 py-20 pb-28">
      <div className="tape w-24 rotate-6 -top-3 left-[6%]" />
      <SectionHeading fig="FIG.08 — CONTACT">
        <Mail className="w-7 h-7 text-soft-pink" strokeWidth={2.5} />
        Let&apos;s Connect
      </SectionHeading>
      <p className="text-ink-soft text-base sm:text-lg max-w-xl mb-10">
        Hubungi saya melalui platform di bawah ini.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {contacts.map(({ platform, handle, href, icon: Icon }, i) => (
          <Reveal key={platform} delay={i * 40}>
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            onClick={() => playClickSfx()}
            className="bg-cream border border-ink/10 rounded-2xl sticker p-5 flex items-center gap-4 hover-pop shine group h-full"
          >
            <div className="bg-lavender border border-ink/10 rounded-full p-3 wiggle-hover">
              <Icon className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-soft">
                {platform}
              </p>
              <p className="font-display font-semibold text-sm uppercase truncate">{handle}</p>
            </div>
            <ArrowUpRight className="shrink-0 w-4 h-4 opacity-40 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" strokeWidth={2.5} />
          </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-ink text-cream py-10 border-t-2 border-ink">
      <div className="max-w-[1440px] mx-auto px-5 xl:px-10 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-cream/70 mb-2">
          Dream, Build, Break, Repeat
        </p>
        <p className="font-display font-semibold text-sm">
          © {new Date().getFullYear()} Lukiié vìe Aņdréw — andrewstoreyaoi.biz.id
        </p>
      </div>
    </footer>
  );
}

function ThemeTransitionOverlay({
  color,
  phase,
}: {
  color: string;
  phase: "drop" | "expand" | "fade" | null;
}) {
  if (!phase) return null;
  return (
    <div
      className={
        phase === "drop"
          ? "theme-reveal-dot"
          : phase === "expand"
            ? "theme-reveal-dot expand"
            : "theme-reveal-dot expand theme-reveal-fade"
      }
      style={{ background: color }}
    />
  );
}

const THEME_STORAGE_KEY = "senzy-xyz-theme";

function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "gradient";
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
  return stored && (themes as readonly string[]).includes(stored) ? (stored as Theme) : "gradient";
}

function Index() {
  const [theme, setTheme] = useState<Theme>(getStoredTheme);
  const [pendingTheme, setPendingTheme] = useState<Theme | null>(null);
  const [animPhase, setAnimPhase] = useState<"drop" | "expand" | "fade" | null>(null);
  const activeSection = useActiveSection();

  // apply the persisted theme to <html data-theme="..."> as soon as the app mounts
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleThemeSelect = (t: Theme) => {
    if (t === theme || animPhase) return;
    playThemeSfx();
    setPendingTheme(t);
    setAnimPhase("drop");

    // 1. dot drops from top (750ms, matches theme-drop keyframe)
    window.setTimeout(() => {
      setAnimPhase("expand");

      // 2. dot expands to cover the screen (1100ms, matches theme-expand keyframe)
      window.setTimeout(() => {
        // swap the theme while the dot is fully covering the viewport
        document.documentElement.setAttribute("data-theme", t);
        setTheme(t);
        window.localStorage.setItem(THEME_STORAGE_KEY, t);
        setAnimPhase("fade");

        // 3. dot fades out, revealing the new theme underneath (500ms)
        window.setTimeout(() => {
          setAnimPhase(null);
          setPendingTheme(null);
        }, 500);
      }, 1100);
    }, 750);
  };

  const scrollTo = (id: string) => {
    playNavSfx();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "about", label: "About", icon: User },
    { id: "hobby", label: "Hobby", icon: Gamepad2 },
    { id: "favorite", label: "Favorite", icon: Star },
    { id: "skills", label: "Skills", icon: Code },
    { id: "projects", label: "Projects", icon: FolderGit2 },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  return (
    <div className="relative min-h-screen">
      <ThemeTransitionOverlay
        color={pendingTheme ? themeMeta[pendingTheme].swatch : ""}
        phase={animPhase}
      />
      <div className="grain" />
      <div className="pointer-events-none fixed top-0 left-0 w-80 h-80 rounded-full z-0 hidden md:block" style={{ background: "radial-gradient(circle, var(--c-glow-2, transparent), var(--c-glow-3, transparent) 50%, transparent 75%)", filter: "blur(20px)", mixBlendMode: "multiply" }} />

      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
        <ThemeToggle theme={theme} onSelect={handleThemeSelect} />
      </div>
      <BgmToggle />

      <Marquee />

      <header className="sticky top-0 z-30 bg-cream/80 backdrop-blur-md border-b border-ink/10">
        <div className="max-w-[1440px] mx-auto px-5 xl:px-10 py-4 flex items-center justify-between">
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollTo("home"); }} className="font-display font-bold text-lg uppercase tracking-wide">
            STAR STUDIO CODE
          </a>
          <nav className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {navItems.map(({ id, label, icon }) => (
              <NavButton
                key={id}
                href={`#${id}`}
                active={activeSection === id}
                icon={icon}
                label={label}
                onClick={(e) => { e.preventDefault(); scrollTo(id); }}
              />
            ))}
          </nav>
        </div>
      </header>

      <main className="relative z-10">
        <HomeSection scrollTo={scrollTo} />
        <AboutSection />
        <HobbySection />
        <FavoriteSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
