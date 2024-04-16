CREATE TABLE IF NOT EXISTS "groups" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"bio" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "members" (
	"id" uuid PRIMARY KEY NOT NULL,
	"userId" text NOT NULL,
	"groupId" uuid NOT NULL,
	"admin" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sessions" (
	"id" uuid PRIMARY KEY NOT NULL,
	"groupId" uuid NOT NULL,
	"location" text NOT NULL,
	"date" timestamp NOT NULL,
	"duration" bigint NOT NULL,
	"bookings" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"format" text NOT NULL,
	"sport" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
