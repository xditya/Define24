import { config } from "dotenv";
import { cleanEnv, url, str } from "envalid";

await config({ export: true });

export default cleanEnv(Deno.env.toObject(), {
  MONGO_URL: url(),
  ADMIN_EMAIL: str(),
  ADMIN_PASSWORD: str(),
  DUMMY_EMAIL: str(),
  DUMMY_PASSWORD: str(),
});
