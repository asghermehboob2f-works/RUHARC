"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const SpotlightCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable =
          target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button") !== null ||
          target.closest("a") !== null ||
          target.getAttribute("role") === "button";
        setIsPointer(isClickable);

        const isImage = target.tagName === "IMG" || target.closest(".group") !== null;
        setIsHovered(isImage);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed pointer-events-none z-50 rounded-full border border-sky-400/40 mix-blend-difference hidden md:block"
      animate={{
        x: position.x - (isPointer ? 20 : isHovered ? 30 : 12),
        y: position.y - (isPointer ? 20 : isHovered ? 30 : 12),
        width: isPointer ? 40 : isHovered ? 60 : 24,
        height: isPointer ? 40 : isHovered ? 60 : 24,
        backgroundColor: isPointer
          ? "rgba(255, 255, 255, 0.1)"
          : isHovered
          ? "rgba(56, 189, 248, 0.1)"
          : "rgba(255, 255, 255, 0)",
      }}
      transition={{ type: "spring", damping: 28, stiffness: 350, mass: 0.2 }}
    />
  );
};
