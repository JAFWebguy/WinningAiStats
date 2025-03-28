import posthog from './posthog';

// Define window.gtag
declare global {
  interface Window {
    gtag: (
      command: 'js' | 'config' | 'event',
      timestamp?: Date | string,
      config?: { [key: string]: any }
    ) => void;
    dataLayer: any[];
  }
}

// Track page views
export const trackPageView = (url: string) => {
  // Track in Google Analytics
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', 'G-DQ3D5GFG9X', {
      page_path: url,
    });
  }

  // Track in PostHog
  posthog.capture('$pageview', {
    url,
    referrer: document.referrer,
  });
};

// Track custom events
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  // Track in Google Analytics
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, properties);
  }

  // Track in PostHog
  posthog.capture(eventName, properties);
};

// Future Tasks:
/*
TODO: AdSense Setup
1. Get Google AdSense account approval
2. Replace Publisher ID in AdsenseInFeed component:
   - Update `script.dataset.adClient = 'ca-pub-XXXXXXXXXXXXXXXX'`
   - Update `data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"`
3. Replace Ad Slot ID:
   - Update `data-ad-slot="XXXXXXXXXX"`
4. Test ad display and responsive behavior
5. Monitor ad performance through AdSense dashboard
*/