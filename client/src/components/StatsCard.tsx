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
    >
      <Card className="overflow-hidden bg-black/50 backdrop-blur-xl border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
        <CardContent className="p-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-purple-400">{title}</p>
            <h3 className="text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">{value}</h3>
            <p className="text-sm text-purple-300/70">{description}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}