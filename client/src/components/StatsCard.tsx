import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  icon?: string;
}

export function StatsCard({ title, value, description, icon }: StatsCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400 }}
      className="animate-hologram"
    >
      <Card className="overflow-hidden glass-effect border border-slate-200 dark:border-cyan-500/20 shadow-[0_0_10px_rgba(0,0,0,0.1)] dark:shadow-[0_0_15px_rgba(0,255,255,0.15)] animate-pulse-border">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
              <p className="text-2xl font-bold mt-1">{value}</p>
              <p className="text-sm text-muted-foreground mt-2">{description}</p>
            </div>
            {icon && (
              <div className="text-muted-foreground">
                {/* You can add icon rendering logic here */}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}