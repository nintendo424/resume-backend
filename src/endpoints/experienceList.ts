import { Bool, Num, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { Experience, type AppContext } from "../types";
import { drizzle } from "drizzle-orm/d1";
import { experiences } from "../schema";

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
							series: z.object({
								result: z.object({
									experiences: Experience.array(),
								}),
							}),
						}),
					},
				},
			},
		},
	};

	async handle(c: AppContext) {
		const db = drizzle(c.env.resume_prod);
		const result = db.select().from(experiences).all();
		return Response.json(result);
	}
}
