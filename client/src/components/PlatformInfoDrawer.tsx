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
        <div className="mt-6 text-cyan-400/70">
          Info forthcoming
        </div>
      </SheetContent>
    </Sheet>
  );
}
