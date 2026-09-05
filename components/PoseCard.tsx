"use client";

import { motion } from "motion/react";
import { Anmi } from "./Anmi";
import { AnmiPose } from "@/data/anmi";

interface PoseCardProps {
  pose: AnmiPose;
  accent: string;
  eyebrow?: string;
  title: string;
  description: string;
  size?: number;
  index?: number;
}

export function PoseCard({ pose, accent, eyebrow, title, description, size = 148, index = 0 }: PoseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 0.8, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className="relative rounded-2xl border border-line bg-white overflow-hidden pt-1"
    >
      <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: accent }} />
      <div className="flex flex-col items-center text-center px-6 pt-7 pb-6">
        <motion.div
          whileHover={{ scale: 1.06, rotate: -2 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
        >
          <Anmi pose={pose} size={size} />
        </motion.div>
        {eyebrow && (
          <p className="font-display text-[24px] font-semibold mt-3 mb-1" style={{ color: accent }}>
            {eyebrow}
          </p>
        )}
        <h3 className="font-display text-[17px] font-medium text-ink mb-2">{title}</h3>
        <p className="font-body text-[13.5px] leading-relaxed text-muted max-w-[220px]">{description}</p>
      </div>
    </motion.div>
  );
}
