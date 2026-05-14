import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Activity,
  Apple,
  ArrowRight,
  Camera,
  Dumbbell,
  Flame,
  HeartPulse,
  Leaf,
  Sparkles,
  Timer,
  TrendingUp,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fit-do — Train, eat, progress" },
      {
        name: "description",
        content:
          "BMI, daily calories & macros, gym or home workout plans, and AI meal photo analysis — tuned to your body.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative overflow-hidden">
      {/* Charcoal animated background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-32 h-[34rem] w-[34rem] rounded-full bg-[#1c1c1c] blur-3xl animate-drift" />
        <div
          className="absolute top-20 -right-32 h-[30rem] w-[30rem] rounded-full bg-[#222] blur-3xl animate-drift"
          style={{ animationDelay: "-6s" }}
        />
        <div
          className="absolute bottom-0 left-1/4 h-[32rem] w-[32rem] rounded-full bg-[#161616] blur-3xl animate-drift"
          style={{ animationDelay: "-3s" }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #cccccc 1px, transparent 1px), linear-gradient(to bottom, #cccccc 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />
      </div>

      {/* Nav */}
      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 pt-6">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-charcoal-grad text-silver shadow-ring border border-white/10 group-hover:rotate-12 transition-transform duration-500">
            <Dumbbell className="h-4.5 w-4.5" strokeWidth={2} />
          </span>
          <span className="font-display text-xl tracking-tight text-shimmer">Fit-do</span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-muted-foreground sm:flex">
          <a href="#features" className="story-link hover:text-foreground transition-colors">Features</a>
          <a href="#how" className="story-link hover:text-foreground transition-colors">How it works</a>
          <Link to="/dashboard" className="story-link hover:text-foreground transition-colors">Dashboard</Link>
        </nav>
        <Button asChild size="sm" variant="outline" className="glass border-white/10 hover:bg-white/5">
          <Link to="/auth">Sign in</Link>
        </Button>
      </header>

      {/* Hero */}
      <section className="relative mx-auto grid max-w-6xl gap-12 px-6 pt-20 pb-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
          <p className="mb-6 inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-silver animate-fade-up">
            <Sparkles className="h-3.5 w-3.5 text-silver" />
            Personal health, simplified
          </p>
          <h1 className="font-display text-5xl leading-[1.04] sm:text-6xl md:text-7xl">
            <span className="block overflow-hidden">
              <span className="block animate-letter text-silver" style={{ animationDelay: "0.05s" }}>
                Train smarter.
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="block animate-letter text-shimmer" style={{ animationDelay: "0.2s" }}>
                Eat sharper.
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="block animate-letter text-silver" style={{ animationDelay: "0.35s" }}>
                Live <em className="not-italic font-light italic">stronger.</em>
              </span>
            </span>
          </h1>
          <div className="mt-6 h-px w-32 origin-left bg-gradient-to-r from-silver/60 to-transparent animate-line" style={{ animationDelay: "0.6s" }} />
          <p className="mt-6 max-w-xl text-lg text-muted-foreground animate-fade-up" style={{ animationDelay: "0.5s" }}>
            BMI, daily calories &amp; macros for your goal, a weekly workout plan
            for the gym or your living room, and AI that reads any meal from a photo.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: "0.65s" }}>
            <Button asChild size="lg" className="group bg-steel text-charcoal hover:opacity-95 border-0 shadow-glow">
              <Link to="/auth">
                Start free
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="glass border-white/15 hover:bg-white/5">
              <Link to="/dashboard">View dashboard</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-12 grid max-w-md grid-cols-3 gap-6 stagger">
            {[
              { k: "12k+", v: "athletes" },
              { k: "98%", v: "stay on plan" },
              { k: "1.4M", v: "meals scanned" },
            ].map((s) => (
              <div key={s.v}>
                <div className="font-display text-3xl text-silver">{s.k}</div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  {s.v}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero visual */}
        <HeroArt />
      </section>

      {/* Marquee */}
      <div className="relative z-10 border-y border-white/5 glass py-5 overflow-hidden">
        <div className="flex">
          <div className="flex shrink-0 animate-marquee gap-12 pr-12 font-display text-2xl">
            {[...marqueeItems, ...marqueeItems].map((m, i) => (
              <span key={i} className="inline-flex items-center gap-3 whitespace-nowrap text-mist">
                <span className="h-1.5 w-1.5 rounded-full bg-silver animate-ticker-fade" />
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <section
        id="features"
        className="mx-auto max-w-6xl px-6 py-24"
      >
        <div className="mb-12 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.24em] text-mist">What you get</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl text-silver">
            Built like a coach. Quiet like an app.
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 stagger">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative overflow-hidden rounded-2xl glass border-sheen p-6 hover-lift hover-tilt"
            >
              {/* Sheen sweep */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 animate-shimmer-bg"
              />
              <span className="relative grid h-11 w-11 place-items-center rounded-xl bg-charcoal-grad text-silver border border-white/10 shadow-ring transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105">
                <f.icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <h3 className="relative mt-5 font-display text-xl text-silver">{f.title}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              <div className="relative mt-5 inline-flex items-center gap-1 text-xs text-mist transition-colors group-hover:text-silver">
                Learn more <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-6xl px-6 pb-28">
        <div className="mb-12 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.24em] text-mist">How it works</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl text-silver">
            Three steps to a body that feels like yours.
          </h2>
        </div>
        <ol className="grid gap-5 md:grid-cols-3 stagger">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="relative overflow-hidden rounded-2xl glass p-7 hover-lift"
            >
              {/* Vertical scan line */}
              <span
                aria-hidden
                className="absolute left-6 top-0 h-12 w-px bg-gradient-to-b from-transparent via-silver/60 to-transparent animate-scan"
                style={{ animationDelay: `${i * 0.4}s` }}
              />
              <span className="font-display text-5xl text-shimmer">
                0{i + 1}
              </span>
              <h3 className="mt-3 font-display text-xl text-silver">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              <s.icon className="absolute right-6 top-6 h-6 w-6 text-mist animate-float-y" />
            </li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-28">
        <div className="relative overflow-hidden rounded-3xl bg-charcoal-grad border border-white/10 p-10 shadow-ring sm:p-14 animate-glow">
          <div aria-hidden className="absolute inset-0 bg-grain opacity-25 mix-blend-overlay" />
          <div
            aria-hidden
            className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/5 blur-3xl animate-drift"
          />
          <div
            aria-hidden
            className="absolute -bottom-28 -left-12 h-72 w-72 rounded-full bg-white/[0.03] blur-3xl animate-drift"
            style={{ animationDelay: "-4s" }}
          />
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-silver/60 to-transparent"
          />
          <div className="relative grid items-center gap-6 md:grid-cols-[1.2fr_auto]">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-mist">Begin</p>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl text-silver">
                Your strongest year starts today.
              </h2>
              <p className="mt-3 max-w-xl text-mist">
                Free to start. No equipment required. Cancel any time.
              </p>
            </div>
            <Button asChild size="lg" className="bg-steel text-charcoal hover:opacity-95 border-0 justify-self-start md:justify-self-end shadow-glow group">
              <Link to="/auth">
                Create your plan
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Fit-do. Move with intention.</p>
          <p className="inline-flex items-center gap-2">
            Made with <HeartPulse className="h-4 w-4 text-silver animate-heartbeat" /> for your body
          </p>
        </div>
      </footer>
    </main>
  );
}

const marqueeItems = [
  "Strength",
  "Mobility",
  "Hypertrophy",
  "Recovery",
  "Macros",
  "Cardio",
  "Mindful eating",
  "Progress",
];

const features = [
  {
    icon: HeartPulse,
    title: "BMI & body data",
    body: "We use your stats and lifestyle to recommend a healthy direction.",
  },
  {
    icon: Activity,
    title: "Calories & macros",
    body: "Daily targets dialed in for cutting, recomp, maintenance, or growth.",
  },
  {
    icon: Dumbbell,
    title: "Workout plan",
    body: "A weekly split for the gym or zero-equipment routines at home.",
  },
  {
    icon: Camera,
    title: "Snap your meal",
    body: "AI estimates calories, protein, carbs, fat and key micros.",
  },
];

const steps = [
  {
    icon: HeartPulse,
    title: "Tell us about you",
    body: "Quick intake — body, goals, gym or home, and any barriers we should respect.",
  },
  {
    icon: TrendingUp,
    title: "Get your blueprint",
    body: "Daily calories, macro split, and a weekly plan tuned to your level.",
  },
  {
    icon: Camera,
    title: "Track effortlessly",
    body: "Snap meals, log workouts, watch the trend lines move.",
  },
];

function HeroArt() {
  return (
    <div className="relative mx-auto h-[28rem] w-full max-w-md animate-rise-blur" style={{ animationDelay: "0.2s" }}>
      {/* Pulse rings */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {[0, 1.2, 2.4].map((d) => (
          <span
            key={d}
            className="absolute inset-0 -m-24 block rounded-full border border-silver/15"
            style={{ animation: "pulse-ring 3.8s ease-out infinite", animationDelay: `${d}s` }}
          />
        ))}
      </div>

      {/* Orbit ring */}
      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full border border-dashed border-white/15">
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 grid h-9 w-9 place-items-center rounded-full glass shadow-ring animate-spin-rev">
          <Apple className="h-4 w-4 text-silver" />
        </span>
        <span className="absolute top-1/2 -right-3 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full glass shadow-ring animate-spin-rev">
          <Timer className="h-4 w-4 text-silver" />
        </span>
        <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 grid h-9 w-9 place-items-center rounded-full glass shadow-ring animate-spin-rev">
          <Flame className="h-4 w-4 text-silver" />
        </span>
        <span className="absolute top-1/2 -left-3 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-full glass shadow-ring animate-spin-rev">
          <Leaf className="h-4 w-4 text-silver" />
        </span>
      </div>

      {/* Inner orbit */}
      <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 animate-spin-rev rounded-full border border-white/10" />

      {/* Center disc */}
      <div className="absolute left-1/2 top-1/2 grid h-40 w-40 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-charcoal-grad text-silver border border-white/10 shadow-ring animate-glow">
        <div aria-hidden className="absolute inset-0 rounded-full bg-grain opacity-30 mix-blend-overlay" />
        <Dumbbell className="relative h-16 w-16" strokeWidth={1.4} />
      </div>

      {/* Floating cards */}
      <div
        className="absolute right-2 top-4 w-44 rounded-2xl glass border-sheen p-3 shadow-ring animate-float-y hover-lift"
        style={{ animationDelay: "-1.5s" }}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Today</span>
          <Flame className="h-3.5 w-3.5 text-silver animate-heartbeat" />
        </div>
        <div className="mt-1 font-display text-2xl text-silver">2,140 kcal</div>
        <div className="mt-2 flex items-end gap-1.5 h-10">
          {[0.4, 0.7, 0.55, 0.85, 0.6, 0.95, 0.7].map((h, i) => (
            <span
              key={i}
              className="flex-1 origin-bottom rounded-sm bg-gradient-to-t from-[#3a3a3a] to-silver"
              style={{
                height: `${h * 100}%`,
                animation: "bar-grow 0.9s ease-out both",
                animationDelay: `${0.6 + i * 0.08}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div
        className="absolute left-0 bottom-8 w-48 rounded-2xl glass border-sheen p-3 shadow-ring animate-float-y hover-lift"
        style={{ animationDelay: "-3s", ["--r" as string]: "-2deg" }}
      >
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-charcoal-grad border border-white/10 text-silver">
            <Camera className="h-3.5 w-3.5" />
          </span>
          <div>
            <div className="text-xs text-muted-foreground">Meal scan</div>
            <div className="font-display text-silver">Salmon bowl</div>
          </div>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-1 text-[11px]">
          <div className="rounded-md bg-white/5 px-2 py-1 text-center text-silver border border-white/10">42P</div>
          <div className="rounded-md bg-white/5 px-2 py-1 text-center text-silver border border-white/10">38C</div>
          <div className="rounded-md bg-white/5 px-2 py-1 text-center text-silver border border-white/10">22F</div>
        </div>
      </div>

      <div className="absolute -left-2 top-6 inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs shadow-ring animate-float-x text-silver">
        <span className="h-2 w-2 rounded-full bg-silver animate-heartbeat" />
        Streak · 14 days
      </div>
    </div>
  );
}
