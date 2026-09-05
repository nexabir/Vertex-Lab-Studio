import Image from "next/image";
import { anmiPoses, AnmiPose } from "@/data/anmi";

export function Anmi({
  pose,
  size = 320,
  priority = false,
  className = "",
}: {
  pose: AnmiPose;
  size?: number;
  priority?: boolean;
  className?: string;
}) {
  const asset = anmiPoses[pose];
  const aspect = asset.height / asset.width;
  return (
    <Image
      src={asset.src}
      alt={asset.alt}
      width={size}
      height={Math.round(size * aspect)}
      priority={priority}
      className={className}
      style={{ objectFit: "contain" }}
    />
  );
}
