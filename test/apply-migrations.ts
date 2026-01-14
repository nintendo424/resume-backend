import { applyD1Migrations, env } from "cloudflare:test";

await applyD1Migrations(env.resume_prod, env.TEST_MIGRATIONS);