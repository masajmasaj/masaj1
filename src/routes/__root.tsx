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
    <div className="flex min-h-screen items-center justify-center bg-stone-50 px-4">
      <div className="max-w-md text-center">
        <p className="serif-display text-7xl text-forest">404</p>
        <h1 className="mt-6 font-serif text-2xl text-stone-900">This page is at rest.</h1>
        <p className="mt-3 text-sm text-stone-700">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-forest px-6 py-3 text-sm font-medium text-stone-50 hover:brightness-110 transition"
          >
            Return home
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
    <div className="flex min-h-screen items-center justify-center bg-stone-50 px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-2xl text-stone-900">A moment of stillness.</h1>
        <p className="mt-3 text-sm text-stone-700">
          Something didn&apos;t load as expected. Please try again.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="rounded-full bg-forest px-6 py-3 text-sm font-medium text-stone-50 hover:brightness-110 transition"
          >
            Try again
          </button>
          <a
            href="/"
            className="rounded-full border border-stone-300 bg-stone-50 px-6 py-3 text-sm font-medium text-stone-900 hover:bg-stone-100 transition"
          >
            Go home
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
      { title: "Lythe — Premium Mobile Massage & Wellness in London" },
      {
        name: "description",
        content:
          "Elite mobile massage therapists delivered to your home, hotel or office across London. Vetted, insured, clinic-grade wellness on demand.",
      },
      { name: "author", content: "Lythe Wellness" },
      { property: "og:site_name", content: "Lythe Wellness" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#2a3328" },
      { property: "og:title", content: "Lythe — Premium Mobile Massage & Wellness in London" },
      { name: "twitter:title", content: "Lythe — Premium Mobile Massage & Wellness in London" },
      { property: "og:description", content: "Elite mobile massage therapists delivered to your home, hotel or office across London. Vetted, insured, clinic-grade wellness on demand." },
      { name: "twitter:description", content: "Elite mobile massage therapists delivered to your home, hotel or office across London. Vetted, insured, clinic-grade wellness on demand." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/9b98740d-7891-4ce9-9ae0-e95ef615d0d2/id-preview-995ba21e--51eb6c2d-8ea5-492e-a282-ce5a098622fb.lovable.app-1783467072783.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/9b98740d-7891-4ce9-9ae0-e95ef615d0d2/id-preview-995ba21e--51eb6c2d-8ea5-492e-a282-ce5a098622fb.lovable.app-1783467072783.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
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
