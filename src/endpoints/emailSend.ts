import { Bool, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { type AppContext, Email } from "../types";
import { Resend } from "resend";
import { env } from "process";
import { drizzle } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";
import { emails } from "../schema";

export class EmailSend extends OpenAPIRoute {
	schema = {
		tags: ["Email"],
		summary: "Send a new email",
		request: {
			body: {
				content: {
					"application/json": {
						schema: Email,
					},
				},
			},
		},
		responses: {
			"200": {
				description: "Returns the created task",
				content: {
					"application/json": {
						schema: z.object({
							series: z.object({
								success: Bool(),
							}),
						}),
					},
				},
			},
		},
	};

	async handle(c: AppContext) {
		const validatedData = await this.getValidatedData<typeof this.schema>();
		const emailDetails = validatedData.body;

		const resend = new Resend(env.RESEND_API_KEY);

		const db = drizzle(c.env.resume_prod);
		const record = await db.insert(emails).values({
			name: emailDetails.name,
			email: emailDetails.email,
			details: emailDetails.details,
			sent: false
		}).returning({ id: emails.id });

		const { data, error } = await resend.emails.send({
			from: env.FROM_EMAIL,
			to: env.TO_EMAIL,
			subject: "Resume site response",
			html: `From: ${emailDetails.name}<br>Email: ${emailDetails.email}<br>Data: ${emailDetails.details}`,
		});

		await db.update(emails).set({ sent: true }).where(eq(emails.id, record[0].id))

		return {
			success: true,
		};
	}
}
