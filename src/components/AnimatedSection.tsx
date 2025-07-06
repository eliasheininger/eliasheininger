"use client";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

export default function AnimatedSection({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({
        y: 0,
        opacity: 1,
        transition: { duration: 0.7, ease: "easeOut", delay },
      });
    }
  }, [inView, controls, delay]);

  return (
    <motion.section
      ref={ref}
      initial={{ y: 40, opacity: 0 }}
      animate={controls}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.section>
  );
}
