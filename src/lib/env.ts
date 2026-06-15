import dotenv from "dotenv";
import { z } from "zod";

dotenv.config({ path: ".env.local" });

export const variables = z.object({
  // server side variables
  DATABASE_URL: z.string(),

  // client side variables must be prefixed with NEXT_PUBLIC_
  NEXT_PUBLIC_BASE_URL: z.string(),
});

export const env = variables.parse(process.env);
