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
      // Initialize ads when component mounts
      if (adRef.current && !adRef.current.hasAttribute('data-ad-loaded')) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        adRef.current.setAttribute('data-ad-loaded', 'true');
      }
    } catch (err) {
      console.error('Error loading AdSense:', err);
    }
  }, []);

  return (
    <Card className="min-h-[100px] overflow-hidden glass-effect border border-slate-200 dark:border-cyan-500/20 shadow-[0_0_10px_rgba(0,0,0,0.1)] dark:shadow-[0_0_10px_rgba(0,255,255,0.1)] animate-pulse-border">
      <ins 
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-7959951727406050"
        data-ad-slot="7678973600"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </Card>
  );
}