import { env, SELF } from "cloudflare:test";
import { describe, it, expect } from "vitest";

describe("Experience List Endpoint", () => {
    it("returns an empty list when no data is present", async () => {
        const response = await SELF.fetch("http://localhost/api/experiences");
        expect(response.status).toBe(200);
        const json = await response.json() as any;
        expect(json.experiences).toEqual([]);
    });
});
