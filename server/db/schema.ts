import { pgTable, serial, text, timestamp, numeric, integer, jsonb } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

export const marketShareHistory = pgTable('market_share_history', {
  id: serial('id').primaryKey(),
  platformName: text('platform_name').notNull(),
  marketShare: numeric('market_share', { precision: 10, scale: 3 }).notNull(),
  growth: numeric('growth', { precision: 10, scale: 3 }).notNull(),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
});

export const platformMetrics = pgTable('platform_metrics', {
  id: serial('id').primaryKey(),
  platformName: text('platform_name').notNull(),
  parameters: text('parameters'),
  trainingDataSize: text('training_data_size'),
  averageLatency: text('average_latency'),
  supportedLanguages: integer('supported_languages'),
  apiPricing: text('api_pricing'),
  hardwareRequirements: text('hardware_requirements'),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
});

export const platformComparisons = pgTable('platform_comparisons', {
  id: serial('id').primaryKey(),
  platform1: text('platform1').notNull(),
  platform2: text('platform2').notNull(),
  comparisonMetrics: jsonb('comparison_metrics').notNull(),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
});

export const analyticsEvents = pgTable('analytics_events', {
  id: serial('id').primaryKey(),
  eventType: text('event_type').notNull(),
  eventData: jsonb('event_data'),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
});

// Zod schemas for type validation
export const insertMarketShareHistorySchema = createInsertSchema(marketShareHistory);
export const selectMarketShareHistorySchema = createSelectSchema(marketShareHistory);

export const insertPlatformMetricsSchema = createInsertSchema(platformMetrics);
export const selectPlatformMetricsSchema = createSelectSchema(platformMetrics);

export const insertPlatformComparisonsSchema = createInsertSchema(platformComparisons, {
  comparisonMetrics: z.object({
    marketShare: z.object({
      platform1: z.number(),
      platform2: z.number(),
    }),
    growth: z.object({
      platform1: z.number(),
      platform2: z.number(),
    }),
    metrics: z.record(z.object({
      platform1: z.union([z.string(), z.number()]),
      platform2: z.union([z.string(), z.number()]),
    })),
  }),
});
export const selectPlatformComparisonsSchema = createSelectSchema(platformComparisons);

export const insertAnalyticsEventsSchema = createInsertSchema(analyticsEvents);
export const selectAnalyticsEventsSchema = createSelectSchema(analyticsEvents);

// Types
export type MarketShareHistory = typeof marketShareHistory.$inferSelect;
export type NewMarketShareHistory = typeof marketShareHistory.$inferInsert;

export type PlatformMetrics = typeof platformMetrics.$inferSelect;
export type NewPlatformMetrics = typeof platformMetrics.$inferInsert;

export type PlatformComparisons = typeof platformComparisons.$inferSelect;
export type NewPlatformComparisons = typeof platformComparisons.$inferInsert;

export type AnalyticsEvents = typeof analyticsEvents.$inferSelect;
export type NewAnalyticsEvents = typeof analyticsEvents.$inferInsert; 