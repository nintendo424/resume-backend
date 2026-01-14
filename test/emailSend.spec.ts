import { SELF } from "cloudflare:test";
import { describe, it, expect, vi } from "vitest";

// Mock the resend module
vi.mock("resend", () => {
    return {
        Resend: vi.fn().mockImplementation(() => {
            return {
                emails: {
                    send: vi.fn().mockResolvedValue({ data: { id: "mock-id" }, error: null }),
                },
            };
        }),
    };
});

describe("Email Send Endpoint", () => {
    it("returns 400 for invalid request body", async () => {
        const originalListeners = process.listeners('unhandledRejection')
        process.removeAllListeners('unhandledRejection')
        const expectedError = new Promise<void>((resolve) => {
            process.on('unhandledRejection', (reason) => {
                if (reason?.name === "ZodError") {
                    resolve()
                }
            })
        })
        const response = await SELF.fetch("http://localhost/api/email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: "Test",
            }),
        });
        expect(response.status).toBe(400);

        originalListeners.forEach((listener) => {
            process.on('unhandledRejection', listener as any)
        })
    });

    it("successfully sends an email (mocked) and returns 200", async () => {
        const response = await SELF.fetch("http://localhost/api/email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: "John Doe",
                email: "john@example.com",
                details: "This is a test message from Vitest.",
            }),
        });

        expect(response.status).toBe(200);
    });
});
