"use client";

import { motion } from "framer-motion";

const RAYS = [
  { x: 16, y: 70, color: "#6D4AFF" },
  { x: 34, y: 46, color: "#17C3E6" },
  { x: 58, y: 28, color: "#FF6B4A" },
  { x: 88, y: 12, color: "#C6F135" },
];

interface RaysMarkProps {
  size?: number;
  lit?: boolean[];
  animated?: boolean;
  hubColor?: string;
  className?: string;
}

export function RaysMark({
  size = 40,
  lit = [true, true, true, true],
  animated = false,
  hubColor = "#14131F",
  className,
}: RaysMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
    >
      {RAYS.map((ray, i) => {
        const isLit = lit[i] ?? true;
        const stroke = isLit ? ray.color : "#DEDCD3";
        const common = {
          x1: 50,
          y1: 90,
          x2: ray.x,
          y2: ray.y,
          stroke,
          strokeWidth: 7,
          strokeLinecap: "round" as const,
        };
        return animated ? (
          <motion.line
            key={i}
            {...common}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.15 * i, ease: [0.16, 0.8, 0.3, 1] }}
          />
        ) : (
          <line key={i} {...common} />
        );
      })}
      {RAYS.map((ray, i) => {
        const isLit = lit[i] ?? true;
        const fill = isLit ? ray.color : "#DEDCD3";
        return animated ? (
          <motion.circle
            key={`n-${i}`}
            cx={ray.x}
            cy={ray.y}
            r={6.5}
            fill={fill}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.15 * i + 0.5 }}
          />
        ) : (
          <circle key={`n-${i}`} cx={ray.x} cy={ray.y} r={6.5} fill={fill} />
        );
      })}
      <circle cx={50} cy={90} r={8} fill={hubColor} />
    </svg>
  );
}
