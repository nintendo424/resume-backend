import type { Context } from "hono";
import { z } from "zod";

export type AppContext = Context<{ Bindings: Env }>;

export const Email = z.object({
	name: z.string().min(1),
	email: z.email(),
	details: z.string().min(1),
});

export const Experience = z.object({
	id: z.int(),
	company: z.string().min(1),
	position: z.string().min(1),
	startDate: z.string().min(1),
	endDate: z.string().min(1),
	details: z.string().min(1),
	skills: z.array(z.string().min(1))
})
