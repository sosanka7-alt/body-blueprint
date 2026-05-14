import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider, useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-display font-semibold text-foreground">404</h1>
        <p className="mt-4 text-muted-foreground">This page wandered off the path.</p>
        <Link to="/" className="mt-6 inline-block underline">Go home</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-4 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
        >Try again</button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Fit-do — Personalized BMI, Calories & Workout Plans" },
      { name: "description", content: "Get your BMI, daily calories, custom workout plan, and AI meal nutrition from a photo." },
      { property: "og:title", content: "Fit-do — Personalized BMI, Calories & Workout Plans" },
      { name: "twitter:title", content: "Fit-do — Personalized BMI, Calories & Workout Plans" },
      { property: "og:description", content: "Get your BMI, daily calories, custom workout plan, and AI meal nutrition from a photo." },
      { name: "twitter:description", content: "Get your BMI, daily calories, custom workout plan, and AI meal nutrition from a photo." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/7256912b-48e0-4221-8aca-70fa9601b5c6/id-preview-2ce9a63f--e0c57457-090e-4d80-9ae8-c35459031831.lovable.app-1778427859727.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/7256912b-48e0-4221-8aca-70fa9601b5c6/id-preview-2ce9a63f--e0c57457-090e-4d80-9ae8-c35459031831.lovable.app-1778427859727.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function NavBar() {
  const { user, signOut } = useAuth();
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-charcoal-grad text-silver border border-white/10 group-hover:rotate-12 transition-transform duration-500">
            <Leaf className="h-4 w-4" />
          </span>
          <span className="font-display text-xl font-semibold text-shimmer">Fit-do</span>
        </Link>
        <nav className="flex items-center gap-2 text-sm">
          {user ? (
            <>
              <Link to="/dashboard" className="px-3 py-2 hover:text-primary">Dashboard</Link>
              <Link to="/meals" className="px-3 py-2 hover:text-primary">Meals</Link>
              <Link to="/onboarding" className="px-3 py-2 hover:text-primary">Profile</Link>
              <Button variant="ghost" size="sm" onClick={() => signOut()}>Sign out</Button>
            </>
          ) : (
            <>
              <Link to="/auth" className="px-3 py-2 hover:text-primary">Sign in</Link>
              <Button asChild size="sm">
                <Link to="/auth">Get started</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NavBar />
        <Outlet />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}
