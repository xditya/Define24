import config from "./env.ts";
import { Application, Router } from "oak";
import { createUser } from "./database.ts";

const router = new Router();

router.post("/login", async (ctx) => {
  const params = await ctx.request.body().value;
  if (!params) {
    return (ctx.response.body = { error: "No params provided." });
  }
  if (!params.email || !params.password) {
    return (ctx.response.body = { error: "Authentication Failed." });
  }

  if (
    params.email != config.DUMMY_EMAIL ||
    params.password != config.DUMMY_PASSWORD
  ) {
    return (ctx.response.body = { error: "Authentication Failed." });
  } else {
    ctx.response.body = { success: true };
  }
});

router.post("/register", async (ctx) => {
  const params = await ctx.request.body().value;
  if (!params) {
    return (ctx.response.body = { error: "No params provided." });
  }
  if (
    !params.email ||
    !params.password ||
    !params.name ||
    !params.loc ||
    !params.year
  ) {
    return (ctx.response.body = { error: "Registration Failed." });
  }

  try {
    await createUser(
      params.name,
      params.email,
      params.password,
      params.loc,
      params.year
    );
  } catch {
    return (ctx.response.body = { error: "Registration Failed." });
  }
  ctx.response.body = { success: true };
});

const app = new Application();
app.use(async (ctx, next) => {
  ctx.response.headers.set("Access-Control-Allow-Origin", "*");
  ctx.response.headers.set(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  ctx.response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  await next();
});

app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("error", (e) => console.log(e));

console.log("> Started listeneing on PORT 8000!");

await app.listen({ port: 8000 });
