import { KontenbaseClient } from "@kontenbase/sdk";

const KONTENBASE_API_KEY = process.env.KONTENBASE_API_KEY as string;

export const kontenbaseServer = new KontenbaseClient({
  apiKey: KONTENBASE_API_KEY,
});
