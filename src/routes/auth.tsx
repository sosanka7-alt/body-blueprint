import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Sign in — Verda" }] }),
  component: AuthPage,
});

function AuthPage() {
  const { user, signIn, signUp } = useAuth();
  const nav = useNavigate();
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (user) nav({ to: "/dashboard" });
  }, [user, nav]);

  const submit = async (e: React.FormEvent<HTMLFormElement>, mode: "in" | "up") => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email"));
    const password = String(fd.get("password"));
    const name = String(fd.get("name") ?? "");
    setBusy(true);
    const res = mode === "in" ? await signIn(email, password) : await signUp(email, password, name);
    setBusy(false);
    if (res.error) toast.error(res.error);
    else if (mode === "up") toast.success("Account created — let's set up your profile.");
  };

  return (
    <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-md items-center px-6">
      <div className="w-full rounded-2xl border border-border bg-card p-8 shadow-soft">
        <h1 className="font-display text-3xl">Welcome</h1>
        <p className="mt-1 text-sm text-muted-foreground">Track your body, plan, and meals.</p>
        <Tabs defaultValue="signin" className="mt-6">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="signin">Sign in</TabsTrigger>
            <TabsTrigger value="signup">Create account</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <form className="space-y-3" onSubmit={(e) => submit(e, "in")}>
              <Field label="Email" name="email" type="email" />
              <Field label="Password" name="password" type="password" />
              <Button type="submit" className="w-full" disabled={busy}>{busy ? "..." : "Sign in"}</Button>
            </form>
          </TabsContent>
          <TabsContent value="signup">
            <form className="space-y-3" onSubmit={(e) => submit(e, "up")}>
              <Field label="Full name" name="name" />
              <Field label="Email" name="email" type="email" />
              <Field label="Password" name="password" type="password" />
              <Button type="submit" className="w-full" disabled={busy}>{busy ? "..." : "Create account"}</Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} type={type} required={name !== "name"} />
    </div>
  );
}
