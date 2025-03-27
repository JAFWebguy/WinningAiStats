CREATE TABLE "analytics_events" (
	"id" serial PRIMARY KEY NOT NULL,
	"event_type" text NOT NULL,
	"event_data" jsonb,
	"timestamp" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "market_share_history" (
	"id" serial PRIMARY KEY NOT NULL,
	"platform_name" text NOT NULL,
	"market_share" numeric(10, 3) NOT NULL,
	"growth" numeric(10, 3) NOT NULL,
	"timestamp" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "platform_comparisons" (
	"id" serial PRIMARY KEY NOT NULL,
	"platform1" text NOT NULL,
	"platform2" text NOT NULL,
	"comparison_metrics" jsonb NOT NULL,
	"timestamp" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "platform_metrics" (
	"id" serial PRIMARY KEY NOT NULL,
	"platform_name" text NOT NULL,
	"parameters" text,
	"training_data_size" text,
	"average_latency" text,
	"supported_languages" integer,
	"api_pricing" text,
	"hardware_requirements" text,
	"timestamp" timestamp DEFAULT now() NOT NULL
);
