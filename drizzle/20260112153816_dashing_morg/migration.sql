CREATE TABLE `emails` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`details` text NOT NULL,
	`sent` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `exp_to_skills` (
	`experienceId` integer NOT NULL,
	`skillId` integer NOT NULL,
	PRIMARY KEY(`experienceId`, `skillId`),
	FOREIGN KEY (`experienceId`) REFERENCES `experiences`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`skillId`) REFERENCES `skills`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `experiences` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`company` text NOT NULL,
	`position` text NOT NULL,
	`startDate` text NOT NULL,
	`endDate` text NOT NULL,
	`details` text NOT NULL,
	`enabled` integer NOT NULL,
	`current` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `skills` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`skill` text NOT NULL
);
