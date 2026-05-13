import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  calcBMI, calcBMR, calcMacros, calcMaintenance, calcTargetCalories,
  type Activity, type Gender, type Goal,
} from "@/lib/health";
import { buildWorkoutPlan } from "@/lib/workout";

export const Route = createFileRoute("/onboarding")({
  head: () => ({ meta: [{ title: "Set up your profile — Verda" }] }),
  component: Onboarding,
});

type FormState = {
  full_name: string;
  age: string;
  gender: Gender;
  height_cm: string;
  weight_kg: string;
  activity_level: Activity;
  goal: Goal;
  workout_location: "gym" | "home";
  diet_preference: "veg" | "non_veg";
  barriers: string;
};

const DEFAULT: FormState = {
  full_name: "",
  age: "",
  gender: "male",
  height_cm: "",
  weight_kg: "",
  activity_level: "moderate",
  goal: "maintain",
  workout_location: "gym",
  diet_preference: "non_veg",
  barriers: "",
};

function Onboarding() {
  const { user, loading } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState<FormState>(DEFAULT);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) nav({ to: "/auth" });
  }, [user, loading, nav]);

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("*").eq("id", user.id).maybeSingle().then(({ data }) => {
      if (data) {
        setForm({
          full_name: data.full_name ?? "",
          age: data.age?.toString() ?? "",
          gender: (data.gender as Gender) ?? "male",
          height_cm: data.height_cm?.toString() ?? "",
          weight_kg: data.weight_kg?.toString() ?? "",
          activity_level: (data.activity_level as Activity) ?? "moderate",
          goal: (data.goal as Goal) ?? "maintain",
          workout_location: (data.workout_location as "gym" | "home") ?? "gym",
          diet_preference: ((data as { diet_preference?: string }).diet_preference as "veg" | "non_veg") ?? "non_veg",
          barriers: data.barriers ?? "",
        });
      }
    });
  }, [user]);

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const age = +form.age, h = +form.height_cm, w = +form.weight_kg;
    if (!age || !h || !w) return toast.error("Please fill age, height, and weight.");

    const bmi = calcBMI(h, w);
    const bmr = calcBMR(w, h, age, form.gender);
    const maintenance = calcMaintenance(bmr, form.activity_level);
    const target = calcTargetCalories(maintenance, form.goal);
    const macros = calcMacros(target, w, form.goal);
    const plan = buildWorkoutPlan(form.workout_location, form.goal, form.barriers);

    setSaving(true);
    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      email: user.email,
      full_name: form.full_name,
      age, height_cm: h, weight_kg: w,
      gender: form.gender,
      activity_level: form.activity_level,
      goal: form.goal,
      workout_location: form.workout_location,
      diet_preference: form.diet_preference,
      barriers: form.barriers,
      bmi,
      maintenance_calories: maintenance,
      target_calories: target,
      ...macros,
      workout_plan: plan,
      onboarded: true,
    });
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Profile saved");
    nav({ to: "/dashboard" });
  };

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="font-display text-4xl">Tell us about you</h1>
      <p className="mt-2 text-muted-foreground">
        We use this to calculate your calories, macros, and workout plan.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-8 rounded-2xl border border-border bg-card p-6 shadow-soft">
        <Section title="Basics">
          <Grid>
            <Text label="Full name" value={form.full_name} onChange={(v) => update("full_name", v)} />
            <Text label="Age" type="number" value={form.age} onChange={(v) => update("age", v)} />
            <SelectField label="Gender" value={form.gender} onChange={(v) => update("gender", v as Gender)}
              options={[["male","Male"],["female","Female"],["other","Other"]]} />
            <Text label="Height (cm)" type="number" value={form.height_cm} onChange={(v) => update("height_cm", v)} />
            <Text label="Weight (kg)" type="number" value={form.weight_kg} onChange={(v) => update("weight_kg", v)} />
            <SelectField label="Activity level" value={form.activity_level} onChange={(v) => update("activity_level", v as Activity)}
              options={[
                ["sedentary","Sedentary (little exercise)"],
                ["light","Light (1-3 d/wk)"],
                ["moderate","Moderate (3-5 d/wk)"],
                ["active","Active (6-7 d/wk)"],
                ["very_active","Very active (intense daily)"],
              ]} />
          </Grid>
        </Section>

        <Section title="Your goal">
          <Grid>
            <SelectField label="Primary goal" value={form.goal} onChange={(v) => update("goal", v as Goal)}
              options={[
                ["lose","Lose fat"],
                ["maintain","Maintain"],
                ["recomp","Body recomposition"],
                ["gain","Build muscle / mass"],
              ]} />
            <SelectField label="Where will you train?" value={form.workout_location}
              onChange={(v) => update("workout_location", v as "gym" | "home")}
              options={[["gym","Gym"],["home","Home / no equipment"]]} />
            <SelectField label="Diet preference" value={form.diet_preference}
              onChange={(v) => update("diet_preference", v as "veg" | "non_veg")}
              options={[["veg","Vegetarian"],["non_veg","Non-vegetarian"]]} />
          </Grid>
        </Section>

        <Section title="Health & barriers"
          subtitle="Anything we should adapt around — injuries, conditions, disabilities, or medications.">
          <Textarea
            placeholder="e.g. Lower-back pain, asthma, diabetes type 2, knee surgery in 2022…"
            value={form.barriers}
            onChange={(e) => update("barriers", e.target.value)}
            className="min-h-28"
          />
          <p className="mt-2 text-xs text-muted-foreground">
            Verda is not a substitute for medical advice. Consult a professional before starting any program.
          </p>
        </Section>

        <Button type="submit" size="lg" disabled={saving} className="shadow-glow">
          {saving ? "Saving..." : "Generate my plan"}
        </Button>
      </form>
    </main>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-xl">{title}</h2>
      {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      <div className="mt-4">{children}</div>
    </div>
  );
}
function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2">{children}</div>;
}
function Text({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Input type={type} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: [string, string][] }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger><SelectValue /></SelectTrigger>
        <SelectContent>
          {options.map(([v, l]) => <SelectItem key={v} value={v}>{l}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  );
}
