import { db } from "@/drizzle/db";
import { c15tInstance } from "@c15t/backend";
import { drizzleAdapter } from "@c15t/backend/db/adapters/drizzle";

export const c15t = c15tInstance({
  appName: "c15t-nextjs",
  basePath: "/api/c15t",
  tablePrefix: "c15t_",
  trustedOrigins: [
    "http://localhost:3000",
    "https://example.com",
    "http://myapp.localhost:1355",
    "https://localhost:4091",
    "*.vercel.app",
    "*.ngrok-free.dev",
  ],
  adapter: drizzleAdapter({ db, provider: "postgresql" }),
});
