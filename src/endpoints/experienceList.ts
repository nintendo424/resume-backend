import { env } from "cloudflare:workers";
import { OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { Experience, type AppContext } from "../types";
import { drizzle } from "drizzle-orm/d1";
import { relations } from "../schema";

const db = drizzle(env.resume_prod, { relations });

export class ExperienceList extends OpenAPIRoute {
	schema = {
		tags: ["Resume"],
		summary: "List experience records",
		responses: {
			"200": {
				description: "Returns a list of experiences",
				content: {
					"application/json": {
						schema: z.object({
							experiences: Experience.array(),
						}),
					},
				},
			},
		},
	};

	async handle(c: AppContext) {
		const results = await db.query.experiences.findMany({
			with: {
				skills: true
			}
		});

		return {
			experiences: results.map(({ skills, ...rest }) => ({
				...rest,
				skills: skills.map(({ skill }) => skill),
			}))
		};
	}
}
