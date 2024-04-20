import { config } from "dotenv";
import { cleanEnv, url, str } from "envalid";

await config({ export: true });

export default cleanEnv(Deno.env.toObject(), {
  MONGO_URL: url(),
  DUMMY_EMAIL: str(),
  DUMMY_PASSWORD: str(),
});
