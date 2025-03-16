import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export function AdsenseInFeed() {
  const adRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    // Only load ad once
    if (loadedRef.current) return;
    loadedRef.current = true;

    try {
      // Create script element for AdSense
      const script = document.createElement('script');
      script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
      script.async = true;
      script.crossOrigin = 'anonymous';
      // Replace with your AdSense Publisher ID
      script.dataset.adClient = 'ca-pub-XXXXXXXXXXXXXXXX';
      document.head.appendChild(script);

      // Initialize ads when script loads
      script.onload = () => {
        if (adRef.current) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      };
    } catch (err) {
      console.error('Error loading AdSense:', err);
    }
  }, []);

  return (
    <Card className="min-h-[100px] overflow-hidden glass-effect border border-slate-200 dark:border-cyan-500/20 shadow-[0_0_10px_rgba(0,0,0,0.1)] dark:shadow-[0_0_10px_rgba(0,255,255,0.1)] animate-pulse-border">
      <div 
        ref={adRef}
        style={{ minHeight: '100px', display: 'block' }}
        className="adsbygoogle"
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // Replace with your AdSense Publisher ID
        data-ad-slot="XXXXXXXXXX" // Replace with your Ad Slot ID
      />
    </Card>
  );
}
