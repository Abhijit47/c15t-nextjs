"use client";
import { type ReactNode } from "react";
import {
  ConsentManagerProvider,
  ConsentBanner,
  ConsentDialog,
} from "@c15t/nextjs";
import { DevTools } from "@c15t/dev-tools/react";

export default function ConsentManager({ children }: { children: ReactNode }) {
  return (
    <ConsentManagerProvider
      options={{
        mode: "hosted",
        backendURL: `/api/c15t`,
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
