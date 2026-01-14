import { env, SELF } from "cloudflare:test";
import { describe, it, expect } from "vitest";

describe("Resume Backend App", () => {
    it("responds to / (OpenAPI docs)", async () => {
        const response = await SELF.fetch("http://localhost/");
        expect(response.status).toBe(200);
        const text = await response.text();
        expect(text).toContain("openapi.json");
    });

    it("responds to /api/experiences", async () => {
        const response = await SELF.fetch("http://localhost/api/experiences");
        expect(response.status).toBe(200);
        const json = await response.json() as any;
        expect(json).toHaveProperty("experiences");
        expect(Array.isArray(json.experiences)).toBe(true);
    });
});
