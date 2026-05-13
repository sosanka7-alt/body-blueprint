import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { bmiCategory } from "@/lib/health";
import type { WorkoutDay } from "@/lib/workout";
import { buildDietChart, hydrationTarget, type DietPreference } from "@/lib/diet";
import { Button } from "@/components/ui/button";
import { Camera, Dumbbell, Loader2, Utensils, Droplets, Leaf, Drumstick } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Verda" }] }),
  component: Dashboard,
});

type Profile = {
  full_name: string | null;
  bmi: number | null;
  maintenance_calories: number | null;
  target_calories: number | null;
  protein_g: number | null;
  carbs_g: number | null;
  fat_g: number | null;
  goal: string | null;
  workout_location: string | null;
  workout_plan: WorkoutDay[] | null;
  diet_preference: DietPreference | null;
  weight_kg: number | null;
  onboarded: boolean | null;
};

function Dashboard() {
  const { user, loading } = useAuth();
  const nav = useNavigate();
  const [p, setP] = useState<Profile | null>(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) nav({ to: "/auth" });
  }, [user, loading, nav]);

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("*").eq("id", user.id).maybeSingle().then(({ data }) => {
      setP(data as Profile | null);
      setFetching(false);
      if (data && !data.onboarded) nav({ to: "/onboarding" });
    });
  }, [user, nav]);

  if (loading || fetching) {
    return <div className="grid min-h-[60vh] place-items-center"><Loader2 className="animate-spin text-muted-foreground" /></div>;
  }
  if (!p?.onboarded) return null;

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Hi {p.full_name ?? "there"} 👋</p>
          <h1 className="font-display text-4xl">Your plan</h1>
        </div>
        <Button asChild variant="outline"><Link to="/onboarding">Update profile</Link></Button>
      </div>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="BMI" value={p.bmi ?? "—"} sub={p.bmi ? bmiCategory(p.bmi) : ""} />
        <Stat label="Maintenance" value={`${p.maintenance_calories ?? "—"} kcal`} sub="per day" />
        <Stat label="Target" value={`${p.target_calories ?? "—"} kcal`} sub={`for ${p.goal}`} highlight />
        <Stat label="Macros" value={`${p.protein_g}P · ${p.carbs_g}C · ${p.fat_g}F`} sub="grams / day" />
      </section>

      <section className="mt-10 rounded-2xl border border-border bg-card p-6 shadow-soft">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl flex items-center gap-2"><Dumbbell className="h-5 w-5 text-primary" /> Weekly workout · {p.workout_location}</h2>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {p.workout_plan?.map((d) => (
            <div key={d.day} className="rounded-xl border border-border bg-background p-4">
              <div className="flex items-baseline justify-between">
                <span className="font-display text-lg">{d.day}</span>
                <span className="text-xs uppercase tracking-wider text-muted-foreground">{d.focus}</span>
              </div>
              <ul className="mt-3 space-y-1.5 text-sm">
                {d.exercises.map((ex, i) => (
                  <li key={i} className="flex justify-between gap-3">
                    <span>{ex.name}</span>
                    <span className="text-muted-foreground whitespace-nowrap">{ex.sets > 0 ? `${ex.sets}×${ex.reps}` : ex.reps}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <DietSection
        targetCalories={p.target_calories ?? p.maintenance_calories ?? 2000}
        preference={(p.diet_preference ?? "non_veg") as DietPreference}
        weightKg={p.weight_kg ?? 70}
        proteinTarget={p.protein_g ?? 0}
      />

      <section className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-accent/40 p-6">
        <div>
          <h3 className="font-display text-xl flex items-center gap-2"><Camera className="h-5 w-5 text-primary" /> Snap a meal</h3>
          <p className="text-sm text-muted-foreground">Get instant calories, protein, carbs, fat, and key micros.</p>
        </div>
        <Button asChild className="shadow-glow"><Link to="/meals">Open meal scanner</Link></Button>
      </section>
    </main>
  );
}

function Stat({ label, value, sub, highlight }: { label: string; value: React.ReactNode; sub?: string; highlight?: boolean }) {
  return (
    <div className={`rounded-2xl border p-5 shadow-soft ${highlight ? "border-primary/40 bg-primary text-primary-foreground" : "border-border bg-card"}`}>
      <p className={`text-xs uppercase tracking-wider ${highlight ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{label}</p>
      <p className="mt-2 font-display text-3xl">{value}</p>
      {sub && <p className={`mt-1 text-sm ${highlight ? "text-primary-foreground/80" : "text-muted-foreground"}`}>{sub}</p>}
    </div>
  );
}

function DietSection({
  targetCalories, preference, weightKg, proteinTarget,
}: { targetCalories: number; preference: DietPreference; weightKg: number; proteinTarget: number }) {
  const chart = buildDietChart(targetCalories, preference);
  const water = hydrationTarget(weightKg);
  const PrefIcon = preference === "veg" ? Leaf : Drumstick;
  return (
    <section className="mt-10 rounded-2xl border border-border bg-card p-6 shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-display text-2xl flex items-center gap-2">
          <Utensils className="h-5 w-5 text-primary" /> Daily diet chart
        </h2>
        <div className="flex items-center gap-3 text-sm">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1">
            <PrefIcon className="h-4 w-4 text-primary" />
            {preference === "veg" ? "Vegetarian" : "Non-vegetarian"}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1">
            <Droplets className="h-4 w-4 text-primary" /> {water} L water
          </span>
          <span className="rounded-full border border-border bg-background px-3 py-1">
            ~{targetCalories} kcal · {proteinTarget}g protein
          </span>
        </div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {chart.map((m) => (
          <div key={m.name} className="rounded-xl border border-border bg-background p-4">
            <div className="flex items-baseline justify-between">
              <span className="font-display text-lg">{m.name}</span>
              <span className="text-xs uppercase tracking-wider text-muted-foreground">{m.calories} kcal</span>
            </div>
            <p className="text-xs text-muted-foreground">{m.time}</p>
            <ul className="mt-3 space-y-1.5 text-sm list-disc list-inside marker:text-primary">
              {m.options.map((o, i) => <li key={i}>{o}</li>)}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        Pick one option per meal. Portions auto-scale with your target calories. Adjust around allergies or medical advice.
      </p>
    </section>
  );
}
