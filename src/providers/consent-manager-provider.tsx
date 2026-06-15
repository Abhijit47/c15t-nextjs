"use client";
import { type ReactNode } from "react";
import {
  ConsentManagerProvider,
  ConsentBanner,
  ConsentDialog,
} from "@c15t/nextjs";
import { DevTools } from "@c15t/dev-tools/react";
import { env } from "@/lib/env";

export default function ConsentManager({ children }: { children: ReactNode }) {
  return (
    <ConsentManagerProvider
      options={{
        mode: "hosted",
        // backendURL: `${env.NEXT_PUBLIC_BASE_URL}/api/c15t`,
        backendURL: `https://c15t-nextjs.vercel.app/api/c15t`,
        // backendURL: `/api/c15t`,
        // backendURL: `https://leonidas-caulescent-elfriede.ngrok-free.dev/api/c15t`,
        consentCategories: ["necessary", "measurement", "marketing"],
        // Shows banner during development. Remove for production.
        overrides: { gpc: true },
        legalLinks: {
          privacyPolicy: {
            href: "/privacy",
            target: "_self",
          },
          cookiePolicy: {
            href: "/cookies",
            target: "_self",
          },
          termsOfService: {
            href: "https://example.com/terms",
            target: "_blank",
            rel: "noopener noreferrer",
            label: "Terms of Service",
          },
        },
      }}
    >
      <ConsentBanner />
      <ConsentDialog
        showTrigger={{
          icon: "settings",
          defaultPosition: "bottom-left",
          showWhen: "after-consent",
          size: "sm",
        }}
      />
      {process.env.NODE_ENV !== "production" && <DevTools />}
      {children}
    </ConsentManagerProvider>
  );
}
