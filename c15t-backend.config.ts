import { defineConfig } from "@c15t/backend";
import { drizzleAdapter } from "@c15t/backend/db/adapters/drizzle";
import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";

// import { drizzle } from "drizzle-orm/node-postgres";
// import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

const db = drizzle({ client: pool });

export default defineConfig({
  adapter: drizzleAdapter({ provider: "postgresql", db }),
  trustedOrigins: ["localhost"],
});
