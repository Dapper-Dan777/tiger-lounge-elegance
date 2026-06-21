import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Seite nicht gefunden</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Die angeforderte Seite existiert nicht oder wurde verschoben.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center bg-gold px-6 py-3 text-xs tracking-[0.25em] uppercase text-black transition-colors hover:bg-[var(--gold-soft)]"
          >
            Zur Startseite
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl text-foreground">Seite konnte nicht geladen werden</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Es ist ein Fehler aufgetreten. Bitte laden Sie die Seite neu oder kehren Sie zur Startseite zurück.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center bg-gold px-6 py-3 text-xs tracking-[0.25em] uppercase text-black transition-colors hover:bg-[var(--gold-soft)]"
          >
            Erneut versuchen
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center border border-[rgba(201,169,97,0.3)] px-6 py-3 text-xs tracking-[0.25em] uppercase text-foreground transition-colors hover:border-gold hover:text-gold"
          >
            Zur Startseite
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Tiger Lounge – Premium Shisha Bar in Bürstadt" },
      { name: "description", content: "Tiger Lounge Bürstadt – Premium Shisha. Clean. Elegant. Unvergesslich." },
      { name: "author", content: "Tiger Lounge" },
      { property: "og:title", content: "Tiger Lounge – Premium Shisha Bar in Bürstadt" },
      { property: "og:description", content: "Tiger Lounge Bürstadt – Premium Shisha. Clean. Elegant. Unvergesslich." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/og-image.jpg" },
      { property: "og:locale", content: "de_DE" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@tiger_lounge_" },
      { name: "twitter:title", content: "Tiger Lounge – Premium Shisha Bar in Bürstadt" },
      { name: "twitter:description", content: "Tiger Lounge Bürstadt – Premium Shisha. Clean. Elegant. Unvergesslich." },
      { name: "twitter:image", content: "/og-image.jpg" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="de">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}