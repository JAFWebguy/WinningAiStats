import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface PlatformInfoDrawerProps {
  platform: string;
  children: React.ReactNode;
}

export function PlatformInfoDrawer({ platform, children }: PlatformInfoDrawerProps) {
  const getPlatformInfo = (platform: string) => {
    switch (platform) {
      case "ChatGPT":
        return (
          <>
            <div className="space-y-6">
              <section>
                <h3 className="text-lg font-semibold text-cyan-400 mb-3">Latest Models</h3>
                <ul className="list-disc pl-5 space-y-2 text-cyan-400/70">
                  <li>GPT-4.5 (February 2025): Enhanced natural language processing and web search integration</li>
                  <li>GPT-4o ("omni"): Multimodal processing across text, voice, and vision</li>
                  <li>GPT-4o mini: Smaller version with multimodal capabilities</li>
                  <li>o3-mini and o3-mini-high: Superior performance in math, science, and logical reasoning</li>
                  <li>o1 series: Emphasis on reflective reasoning</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-cyan-400 mb-3">Key Features</h3>
                <ul className="list-disc pl-5 space-y-2 text-cyan-400/70">
                  <li>Reduced hallucinations and more natural interactions in GPT-4.5</li>
                  <li>Multimodal capabilities in GPT-4o models</li>
                  <li>Proprietary model with confidential training data and parameters</li>
                  <li>Requires commercial license or subscription ($200 monthly through ChatGPT Pro)</li>
                </ul>
              </section>

              <section>
                <h3 className="text-lg font-semibold text-cyan-400 mb-3">Best For</h3>
                <ul className="list-disc pl-5 space-y-2 text-cyan-400/70">
                  <li>Businesses seeking excellent conversational dialogue</li>
                  <li>Real-time interactions without budget limitations</li>
                </ul>
              </section>
            </div>
          </>
        );
      default:
        return (
          <div className="mt-6 text-cyan-400/70">
            Info forthcoming
          </div>
        );
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="bg-black/90 border-cyan-500/20">
        <SheetHeader>
          <SheetTitle className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 holographic-text">
            {platform}
          </SheetTitle>
        </SheetHeader>
        <div className="mt-6 overflow-y-auto max-h-[calc(100vh-8rem)]">
          {getPlatformInfo(platform)}
        </div>
      </SheetContent>
    </Sheet>
  );
}