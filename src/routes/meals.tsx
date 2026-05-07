import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Camera, Loader2, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/meals")({
  head: () => ({ meta: [{ title: "Meal scanner — Verda" }] }),
  component: Meals,
});

type Meal = {
  id: string;
  image_url: string | null;
  name: string | null;
  calories: number | null;
  protein_g: number | null;
  carbs_g: number | null;
  fat_g: number | null;
  fiber_g: number | null;
  micros: Record<string, string> | null;
  notes: string | null;
  created_at: string;
};

type SignedMeal = Meal & { signed?: string };

function Meals() {
  const { user, loading } = useAuth();
  const nav = useNavigate();
  const [meals, setMeals] = useState<SignedMeal[]>([]);
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!loading && !user) nav({ to: "/auth" });
  }, [user, loading, nav]);

  const refresh = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("meals").select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(50);
    const list = (data ?? []) as Meal[];
    const withSigned: SignedMeal[] = await Promise.all(
      list.map(async (m) => {
        if (!m.image_url) return m;
        const { data: s } = await supabase.storage
          .from("meal-photos").createSignedUrl(m.image_url, 3600);
        return { ...m, signed: s?.signedUrl };
      }),
    );
    setMeals(withSigned);
  };

  useEffect(() => { if (user) refresh(); }, [user]);

  const handleFile = async (file: File) => {
    if (!user) return;
    setBusy(true);
    try {
      const path = `${user.id}/${Date.now()}-${file.name.replace(/[^a-z0-9.\-]/gi, "_")}`;
      const { error: upErr } = await supabase.storage.from("meal-photos").upload(path, file);
      if (upErr) throw upErr;

      const base64 = await fileToBase64(file);
      const { data, error } = await supabase.functions.invoke("analyze-meal", {
        body: { imageBase64: base64 },
      });
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);

      const r = data as {
        name: string; calories: number; protein_g: number; carbs_g: number;
        fat_g: number; fiber_g?: number; micros?: Record<string, string>; description?: string;
      };

      const { error: insErr } = await supabase.from("meals").insert({
        user_id: user.id,
        image_url: path,
        name: r.name,
        calories: Math.round(r.calories),
        protein_g: r.protein_g,
        carbs_g: r.carbs_g,
        fat_g: r.fat_g,
        fiber_g: r.fiber_g ?? null,
        micros: r.micros ?? null,
        notes: r.description ?? null,
      });
      if (insErr) throw insErr;
      toast.success("Meal analyzed");
      refresh();
    } catch (e: any) {
      toast.error(e.message ?? "Failed to analyze meal");
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const remove = async (m: SignedMeal) => {
    await supabase.from("meals").delete().eq("id", m.id);
    if (m.image_url) await supabase.storage.from("meal-photos").remove([m.image_url]);
    refresh();
  };

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="font-display text-4xl">Meal scanner</h1>
      <p className="mt-2 text-muted-foreground">
        Snap a photo or upload — we'll estimate calories, macros, and key micros.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl border border-dashed border-border bg-card p-6 shadow-soft">
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />
        <Button onClick={() => fileRef.current?.click()} disabled={busy} className="shadow-glow">
          {busy ? <><Loader2 className="animate-spin" /> Analyzing…</> : <><Camera /> Take / upload photo</>}
        </Button>
        <span className="text-sm text-muted-foreground inline-flex items-center gap-1">
          <Upload className="h-3.5 w-3.5" /> JPG / PNG, up to ~10MB
        </span>
      </div>

      <section className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {meals.map((m) => (
          <article key={m.id} className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
            {m.signed && <img src={m.signed} alt={m.name ?? "meal"} className="aspect-[4/3] w-full object-cover" />}
            <div className="p-4">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-display text-lg">{m.name}</h3>
                <button onClick={() => remove(m)} className="text-muted-foreground hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {m.calories} kcal · {m.protein_g}P · {m.carbs_g}C · {m.fat_g}F
                {m.fiber_g ? ` · ${m.fiber_g}g fiber` : ""}
              </p>
              {m.micros && Object.keys(m.micros).length > 0 && (
                <ul className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1 text-xs text-muted-foreground">
                  {Object.entries(m.micros).slice(0, 6).map(([k, v]) => (
                    <li key={k} className="flex justify-between">
                      <span>{k}</span><span className="text-foreground">{v}</span>
                    </li>
                  ))}
                </ul>
              )}
              {m.notes && <p className="mt-3 text-xs text-muted-foreground line-clamp-3">{m.notes}</p>}
            </div>
          </article>
        ))}
        {meals.length === 0 && (
          <p className="col-span-full text-sm text-muted-foreground">No meals yet — snap your first one above.</p>
        )}
      </section>
    </main>
  );
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => {
      const result = r.result as string;
      resolve(result.split(",")[1] ?? "");
    };
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}
