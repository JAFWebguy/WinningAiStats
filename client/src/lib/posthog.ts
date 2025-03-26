import posthog from 'posthog-js'

// Initialize PostHog with US region
posthog.init(
  import.meta.env.VITE_POSTHOG_PROJECT_KEY || '', // Project key will be injected from environment
  {
    api_host: 'https://us.posthog.com', // US region endpoint
    persistence: 'localStorage',
    autocapture: true,
    capture_pageview: true,
    capture_pageleave: true,
    loaded: (posthog) => {
      // Enable debug mode in development
      if (import.meta.env.DEV) {
        posthog.debug();
      }
    }
  }
);

// Re-export for use in components
export default posthog;

// Helper function to track custom events
export const track = (eventName: string, properties?: Record<string, any>) => {
  posthog.capture(eventName, properties);
};