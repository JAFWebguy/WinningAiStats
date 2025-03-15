import { motion } from "framer-motion";

export function BrainAnimation() {
  return (
    <div className="fixed inset-0 z-0 opacity-20">
      <motion.svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        initial="hidden"
        animate="visible"
      >
        <motion.path
          d="M100,20 C60,20 20,50 20,100 C20,150 60,180 100,180 C140,180 180,150 180,100 C180,50 140,20 100,20"
          stroke="rgba(0, 255, 255, 0.3)"
          strokeWidth="0.5"
          fill="none"
          animate={{
            pathLength: [0, 1],
            pathOffset: [0, 1],
          }}
          transition={{
            duration: 3,
            ease: "linear",
            repeat: Infinity,
          }}
        />
        <motion.path
          d="M100,40 C70,40 40,65 40,100 C40,135 70,160 100,160 C130,160 160,135 160,100 C160,65 130,40 100,40"
          stroke="rgba(0, 255, 255, 0.2)"
          strokeWidth="0.5"
          fill="none"
          animate={{
            pathLength: [0, 1],
            pathOffset: [0, 1],
          }}
          transition={{
            duration: 4,
            ease: "linear",
            repeat: Infinity,
            delay: 0.5,
          }}
        />
        {/* Neural connections */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.circle
            key={i}
            cx={80 + Math.random() * 40}
            cy={80 + Math.random() * 40}
            r="2"
            fill="rgba(0, 255, 255, 0.3)"
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </motion.svg>
    </div>
  );
}
