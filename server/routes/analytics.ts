import { Router } from 'express';
import { db } from '../db';
import { marketShareHistory, platformMetrics, platformComparisons, analyticsEvents } from '../db/schema';
import { eq, and, gte, desc } from 'drizzle-orm';

const router = Router();

// Get historical market share data
router.get('/market-share-history', async (req, res) => {
  try {
    const { platform, startDate, endDate } = req.query;
    const query = db.select().from(marketShareHistory);
    
    if (platform) {
      query.where(eq(marketShareHistory.platformName, platform as string));
    }
    
    if (startDate) {
      query.where(gte(marketShareHistory.timestamp, new Date(startDate as string)));
    }
    
    if (endDate) {
      query.where(gte(marketShareHistory.timestamp, new Date(endDate as string)));
    }
    
    query.orderBy(desc(marketShareHistory.timestamp));
    
    const history = await query;
    res.json(history);
  } catch (error) {
    console.error('Error fetching market share history:', error);
    res.status(500).json({ error: 'Failed to fetch market share history' });
  }
});

// Get platform comparison
router.get('/compare-platforms', async (req, res) => {
  try {
    const { platform1, platform2 } = req.query;
    
    if (!platform1 || !platform2) {
      return res.status(400).json({ error: 'Both platform names are required' });
    }
    
    const comparison = await db
      .select()
      .from(platformComparisons)
      .where(
        and(
          eq(platformComparisons.platform1, platform1 as string),
          eq(platformComparisons.platform2, platform2 as string)
        )
      )
      .orderBy(desc(platformComparisons.timestamp))
      .limit(1);
    
    res.json(comparison[0]);
  } catch (error) {
    console.error('Error fetching platform comparison:', error);
    res.status(500).json({ error: 'Failed to fetch platform comparison' });
  }
});

// Get platform metrics history
router.get('/platform-metrics', async (req, res) => {
  try {
    const { platform } = req.query;
    
    if (!platform) {
      return res.status(400).json({ error: 'Platform name is required' });
    }
    
    const metrics = await db
      .select()
      .from(platformMetrics)
      .where(eq(platformMetrics.platformName, platform as string))
      .orderBy(desc(platformMetrics.timestamp));
    
    res.json(metrics);
  } catch (error) {
    console.error('Error fetching platform metrics:', error);
    res.status(500).json({ error: 'Failed to fetch platform metrics' });
  }
});

// Track analytics event
router.post('/track-event', async (req, res) => {
  try {
    const { eventType, eventData } = req.body;
    
    if (!eventType) {
      return res.status(400).json({ error: 'Event type is required' });
    }
    
    await db.insert(analyticsEvents).values({
      eventType,
      eventData,
    });
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error tracking analytics event:', error);
    res.status(500).json({ error: 'Failed to track analytics event' });
  }
});

export default router; 