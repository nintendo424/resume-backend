import { int, sqliteTable, text,  } from "drizzle-orm/sqlite-core";

export const experiences = sqliteTable("experiences", {
    id: int().primaryKey({ autoIncrement: true }),
    company: text().notNull(),
    position: text().notNull(),
    startDate: int({ mode: "timestamp" }).notNull(),
    endDate: int({ mode: "timestamp" }),
    details: text().notNull(),
    skills: int(),
    enabled: int({ mode: "boolean" }).notNull(),
});

export const skills = sqliteTable("skills", {
    id: int().primaryKey({ autoIncrement: true }),
    skill: text().notNull(),
});

export const expToSkills = sqliteTable("exp_to_skills", {
    id: int().primaryKey({ autoIncrement: true }),
    experienceId: int().references(() => experiences.id),
    skillId: int().references(() => skills.id),
});

export const emails = sqliteTable("emails", {
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    email: text().notNull(),
    details: text().notNull(),
    sent: int({ mode: "boolean" }).notNull(),
})