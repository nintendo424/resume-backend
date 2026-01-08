import { DateTime, Str, Int } from "chanfana";
import type { Context } from "hono";
import { z } from "zod";

export type AppContext = Context<{ Bindings: Env }>;

export const Email = z.object({
	name: Str({ required: true }),
	email: Str({ required: true }),
	details: Str({ required: true }),
});

export const Experience = z.object({
	id: Int({ required: true }),
	company: Str({ required: true }),
	position: Str({ required: true }),
	startDate: DateTime({ required: true }),
	endDate: DateTime({ required: false }),
	details: Str({ required: true }),
	skills: z.array(Str({ required: true }))
})
