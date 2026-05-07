import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Activity, Camera, Dumbbell, HeartPulse } from "lucide-react";

export const Route = createFileRoute("/")({ component: Index });

function Index() {
  return (
    <main className="bg-hero">
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-24">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" /> Personal health, simplified
        </p>
        <h1 className="font-display text-5xl leading-[1.05] sm:text-6xl md:text-7xl max-w-3xl">
          Eat, train, and progress —<br />
          <span className="text-primary">tuned to your body.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          Calculate your BMI, get daily calories &amp; macros for your goal, follow a workout plan
          built for the gym or home, and snap a photo of any meal to see its full nutrition.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg" className="shadow-glow">
            <Link to="/auth">Start free</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/dashboard">View dashboard</Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-24 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: HeartPulse, title: "BMI & body data", body: "We use your stats and lifestyle to recommend a healthy direction." },
          { icon: Activity, title: "Calories & macros", body: "Daily targets dialed in for cutting, recomp, maintenance, or growth." },
          { icon: Dumbbell, title: "Workout plan", body: "A weekly split for the gym or zero-equipment routines at home." },
          { icon: Camera, title: "Snap your meal", body: "AI estimates calories, protein, carbs, fat and key micros." },
        ].map((f) => (
          <div key={f.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
            <f.icon className="h-6 w-6 text-primary" />
            <h3 className="mt-4 font-display text-xl">{f.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
