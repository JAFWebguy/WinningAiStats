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
      <Card className="overflow-hidden glass-effect border border-slate-200 dark:border-cyan-500/20 shadow-[0_0_10px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(0,255,255,0.15)] animate-pulse-border">
        <CardContent className="p-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-600 dark:text-cyan-400">{title}</p>
            <h3 className="text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-900 dark:from-cyan-400 dark:to-blue-400">{value}</h3>
            <p className="text-sm text-slate-500 dark:text-cyan-300/70">{description}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}