import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Activity,
  Apple,
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
      { title: "Verda — Train, eat, progress" },
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
    <main className="relative overflow-hidden bg-hero">
      {/* Ambient animated background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-24 h-[28rem] w-[28rem] rounded-full bg-[oklch(0.88_0.10_145/_0.55)] blur-3xl animate-drift" />
        <div
          className="absolute top-40 -right-24 h-[22rem] w-[22rem] rounded-full bg-[oklch(0.85_0.12_85/_0.45)] blur-3xl animate-drift"
          style={{ animationDelay: "-6s" }}
        />
        <div
          className="absolute bottom-0 left-1/3 h-[26rem] w-[26rem] rounded-full bg-[oklch(0.90_0.07_165/_0.45)] blur-3xl animate-drift"
          style={{ animationDelay: "-3s" }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(to right, oklch(0.55 0.13 155 / 0.12) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.55 0.13 155 / 0.12) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />
      </div>

      {/* Nav */}
      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 pt-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-glow">
            <Leaf className="h-5 w-5" />
          </span>
          <span className="font-display text-xl">Verda</span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-muted-foreground sm:flex">
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#how" className="hover:text-foreground transition-colors">How it works</a>
          <Link to="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
        </nav>
        <Button asChild size="sm" variant="outline">
          <Link to="/auth">Sign in</Link>
        </Button>
      </header>

      {/* Hero */}
      <section className="relative mx-auto grid max-w-6xl gap-12 px-6 pt-16 pb-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="animate-rise">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Personal health, simplified
          </p>
          <h1 className="font-display text-5xl leading-[1.02] sm:text-6xl md:text-7xl">
            Train smarter.
            <br />
            <span className="relative inline-block">
              <span className="relative z-10 text-primary">Eat sharper.</span>
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-2 -z-0 h-3 rounded-full bg-[oklch(0.88_0.12_135/_0.65)]"
              />
            </span>
            <br />
            Live <em className="not-italic italic-fraunces text-primary/90">stronger.</em>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            BMI, daily calories &amp; macros for your goal, a weekly workout plan
            for the gym or your living room, and AI that reads any meal from a photo.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="shadow-glow">
              <Link to="/auth">
                Start free <Flame className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/dashboard">View dashboard</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-10 grid max-w-md grid-cols-3 gap-6">
            {[
              { k: "12k+", v: "athletes" },
              { k: "98%", v: "stay on plan" },
              { k: "1.4M", v: "meals scanned" },
            ].map((s, i) => (
              <div
                key={s.v}
                className="animate-rise"
                style={{ animationDelay: `${0.3 + i * 0.1}s` }}
              >
                <div className="font-display text-3xl text-foreground">{s.k}</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">
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
      <div className="relative z-10 border-y border-border bg-card/60 py-4 backdrop-blur">
        <div className="flex overflow-hidden">
          <div className="flex shrink-0 animate-marquee gap-12 pr-12 font-display text-2xl text-muted-foreground">
            {[...marqueeItems, ...marqueeItems].map((m, i) => (
              <span key={i} className="inline-flex items-center gap-3 whitespace-nowrap">
                <Leaf className="h-4 w-4 text-primary" /> {m}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Features */}
      <section
        id="features"
        className="mx-auto grid max-w-6xl gap-6 px-6 py-24 sm:grid-cols-2 lg:grid-cols-4"
      >
        {features.map((f, i) => (
          <div
            key={f.title}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft transition-transform duration-300 hover:-translate-y-1 hover:shadow-glow"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <div
              aria-hidden
              className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[oklch(0.92_0.08_145/_0.6)] blur-2xl transition-transform duration-500 group-hover:scale-150"
            />
            <span className="relative grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
              <f.icon className="h-5 w-5" />
            </span>
            <h3 className="relative mt-4 font-display text-xl">{f.title}</h3>
            <p className="relative mt-2 text-sm text-muted-foreground">{f.body}</p>
          </div>
        ))}
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-6xl px-6 pb-28">
        <div className="mb-12 max-w-2xl">
          <p className="text-sm uppercase tracking-[0.2em] text-primary">How it works</p>
          <h2 className="mt-3 font-display text-4xl sm:text-5xl">
            Three steps to a body that feels like yours.
          </h2>
        </div>
        <ol className="grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="relative rounded-2xl border border-border bg-card p-7 shadow-soft"
            >
              <span className="font-display text-5xl text-primary/40">
                0{i + 1}
              </span>
              <h3 className="mt-2 font-display text-xl">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
              <s.icon className="absolute right-6 top-6 h-6 w-6 text-primary/70" />
            </li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-28">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-primary p-10 text-primary-foreground shadow-glow sm:p-14">
          <div
            aria-hidden
            className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/15 blur-3xl animate-drift"
          />
          <div
            aria-hidden
            className="absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-black/10 blur-3xl animate-drift"
            style={{ animationDelay: "-4s" }}
          />
          <div className="relative grid items-center gap-6 md:grid-cols-[1.2fr_auto]">
            <div>
              <h2 className="font-display text-4xl sm:text-5xl">
                Your strongest year starts today.
              </h2>
              <p className="mt-3 max-w-xl text-primary-foreground/80">
                Free to start. No equipment required. Cancel any time.
              </p>
            </div>
            <Button asChild size="lg" variant="secondary" className="justify-self-start md:justify-self-end">
              <Link to="/auth">Create your plan</Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-sm text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Verda. Move with intention.</p>
          <p className="inline-flex items-center gap-2">
            Made with <HeartPulse className="h-4 w-4 text-primary animate-heartbeat" /> for your body
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
    <div className="relative mx-auto h-[28rem] w-full max-w-md animate-rise" style={{ animationDelay: "0.15s" }}>
      {/* Pulse rings */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <span
          className="absolute inset-0 -m-24 block rounded-full border border-primary/30"
          style={{ animation: "pulse-ring 3.5s ease-out infinite" }}
        />
        <span
          className="absolute inset-0 -m-24 block rounded-full border border-primary/30"
          style={{ animation: "pulse-ring 3.5s ease-out infinite", animationDelay: "1.2s" }}
        />
        <span
          className="absolute inset-0 -m-24 block rounded-full border border-primary/30"
          style={{ animation: "pulse-ring 3.5s ease-out infinite", animationDelay: "2.4s" }}
        />
      </div>

      {/* Orbit */}
      <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 animate-spin-slow rounded-full border border-dashed border-primary/30">
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 grid h-8 w-8 place-items-center rounded-full bg-card shadow-soft">
          <Apple className="h-4 w-4 text-primary" />
        </span>
        <span className="absolute top-1/2 -right-3 -translate-y-1/2 grid h-8 w-8 place-items-center rounded-full bg-card shadow-soft">
          <Timer className="h-4 w-4 text-primary" />
        </span>
        <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 grid h-8 w-8 place-items-center rounded-full bg-card shadow-soft">
          <Flame className="h-4 w-4 text-primary" />
        </span>
        <span className="absolute top-1/2 -left-3 -translate-y-1/2 grid h-8 w-8 place-items-center rounded-full bg-card shadow-soft">
          <Leaf className="h-4 w-4 text-primary" />
        </span>
      </div>

      {/* Center disc — dumbbell */}
      <div className="absolute left-1/2 top-1/2 grid h-40 w-40 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gradient-to-br from-primary to-[oklch(0.65_0.14_140)] text-primary-foreground shadow-glow animate-float-y">
        <Dumbbell className="h-16 w-16" strokeWidth={1.5} />
      </div>

      {/* Floating cards */}
      <div
        className="absolute right-2 top-4 w-44 rounded-2xl border border-border bg-card/95 p-3 shadow-soft backdrop-blur animate-float-y"
        style={{ animationDelay: "-1.5s" }}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Today</span>
          <Flame className="h-3.5 w-3.5 text-primary" />
        </div>
        <div className="mt-1 font-display text-2xl">2,140 kcal</div>
        <div className="mt-2 flex items-end gap-1.5 h-10">
          {[0.4, 0.7, 0.55, 0.85, 0.6, 0.95, 0.7].map((h, i) => (
            <span
              key={i}
              className="flex-1 origin-bottom rounded-sm bg-primary/70"
              style={{
                height: `${h * 100}%`,
                animation: "bar-grow 0.9s ease-out both",
                animationDelay: `${0.3 + i * 0.08}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div
        className="absolute left-0 bottom-8 w-48 rounded-2xl border border-border bg-card/95 p-3 shadow-soft backdrop-blur animate-float-y"
        style={{ animationDelay: "-3s", ["--r" as string]: "-2deg" }}
      >
        <div className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-full bg-primary/10 text-primary">
            <Camera className="h-3.5 w-3.5" />
          </span>
          <div>
            <div className="text-xs text-muted-foreground">Meal scan</div>
            <div className="font-display">Salmon bowl</div>
          </div>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-1 text-[11px]">
          <div className="rounded-md bg-secondary px-2 py-1 text-center">42P</div>
          <div className="rounded-md bg-secondary px-2 py-1 text-center">38C</div>
          <div className="rounded-md bg-secondary px-2 py-1 text-center">22F</div>
        </div>
      </div>

      <div
        className="absolute -left-2 top-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/95 px-3 py-1.5 text-xs shadow-soft animate-float-x"
      >
        <span className="h-2 w-2 rounded-full bg-primary animate-heartbeat" />
        Streak · 14 days
      </div>
    </div>
  );
}
