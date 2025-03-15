import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
}

export function StatsCard({ title, value, description }: StatsCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400 }}
      className="animate-hologram"
    >
      <Card className="overflow-hidden glass-effect border border-cyan-500/20 shadow-[0_0_15px_rgba(0,255,255,0.15)] animate-pulse-border">
        <CardContent className="p-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-cyan-400 holographic-text">{title}</p>
            <h3 className="text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 holographic-text">{value}</h3>
            <p className="text-sm text-cyan-300/70">{description}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}