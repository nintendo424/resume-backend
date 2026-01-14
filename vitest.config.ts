import path from "node:path";
import {
    defineWorkersProject,
    readD1Migrations,
} from "@cloudflare/vitest-pool-workers/config";

export default defineWorkersProject(async () => {
    const migrationsPath = path.join(__dirname, "drizzle");
    const migrations = await readD1Migrations(migrationsPath);
    return {
        test: {
            setupFiles: ["./test/apply-migrations.ts"],
            poolOptions: {
                workers: {
                    wrangler: {
                        configPath: "./wrangler.jsonc",
                    },
                    miniflare: {
                        bindings: {
                            TEST_MIGRATIONS: migrations,
                            RESEND_API_KEY: "mock-key",
                            FROM_EMAIL: "mock@example.com",
                            TO_EMAIL: "mock-to@example.com",
                        },
                    },
                },
            },
        },
    }
});
