// import "dotenv/config";
import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

dotenv.config({ path: ".env.local" });

export default defineConfig({
  out: "./src/drizzle/migrations",
  schema: "./src/drizzle/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
    // host: "localhost",
    // port: 5432,
    // user: "postgres",
    // password: "postgres",
    // database: "consent",
    // ssl: false,
  },
});
