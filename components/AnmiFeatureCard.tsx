"use client";

import { motion } from "motion/react";
import { Anmi } from "./Anmi";
import { AnmiPose } from "@/data/anmi";

export function AnmiFeatureCard({
  pose,
  size = 220,
  className = "",
}: {
  pose: AnmiPose;
  size?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.5, ease: [0.16, 0.8, 0.3, 1] }}
      className={`hidden lg:flex items-center justify-center rounded-2xl border border-line bg-white p-8 ${className}`}
    >
      <Anmi pose={pose} size={size} />
    </motion.div>
  );
}
