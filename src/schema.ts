import { defineRelations } from "drizzle-orm";
import { int, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const experiences = sqliteTable("experiences", {
    id: int().primaryKey({ autoIncrement: true }),
    company: text().notNull(),
    position: text().notNull(),
    startDate: text().notNull(),
    endDate: text().notNull(),
    details: text().notNull(),
    enabled: int({ mode: "boolean" }).notNull(),
    current: int({ mode: "boolean" }).notNull(),
});

export const skills = sqliteTable("skills", {
    id: int().primaryKey({ autoIncrement: true }),
    skill: text().notNull(),
});

export const experiencesToSkills = sqliteTable("exp_to_skills", {
    experienceId: int().notNull().references(() => experiences.id),
    skillId: int().notNull().references(() => skills.id),
}, (t) => [primaryKey({ columns: [t.experienceId, t.skillId] })]);

export const emails = sqliteTable("emails", {
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    email: text().notNull(),
    details: text().notNull(),
    sent: int({ mode: "boolean" }).notNull(),
})

export const relations = defineRelations({ experiences, skills, experiencesToSkills }, (r) => ({
    experiences: {
        skills: r.many.skills({
            from: r.experiences.id.through(r.experiencesToSkills.experienceId),
            to: r.skills.id.through(r.experiencesToSkills.skillId),
        })
    }
}));
