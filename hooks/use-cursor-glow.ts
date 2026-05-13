import { useMotionValue, useSpring, useTransform } from "framer-motion";
import type { MouseEvent } from "react";

// ── Tweak these to customize the cursor glow ──────────────────────
const SPEED = 120; // Spring stiffness — higher = faster follow (range: 20–300)
const DAMPING = 25; // Spring damping   — higher = less overshoot (range: 10–60)
const RADIUS = "15%"; // Size of the glow circle
const OPACITY = 0.35; // Glow intensity (0–1)
// ──────────────────────────────────────────────────────────────────

export function useCursorGlow() {
  const cursorX = useMotionValue(50);
  const cursorY = useMotionValue(50);
  const springX = useSpring(cursorX, { stiffness: SPEED, damping: DAMPING });
  const springY = useSpring(cursorY, { stiffness: SPEED, damping: DAMPING });

  const glowBg = useTransform(
    () =>
      `radial-gradient(circle at ${springX.get()}% ${springY.get()}%, rgba(97, 78, 169, ${OPACITY}) 0%, transparent ${RADIUS})`,
  );

  const handleMouseMove = (e: MouseEvent) => {
    cursorX.set((e.clientX / window.innerWidth) * 100);
    cursorY.set((e.clientY / window.innerHeight) * 100);
  };

  return { glowBg, handleMouseMove };
}
