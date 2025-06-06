'use client'

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedContentProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  duration?: number;
}

const variants = {
  up: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  },
  down: {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 }
  },
  left: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  },
  right: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 }
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }
};

export default function AnimatedContent({
  children,
  className = "",
  delay = 0,
  direction = 'up',
  duration = 0.6
}: AnimatedContentProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={variants[direction]}
      transition={{
        duration,
        delay,
        ease: [0.4, 0, 0.2, 1]
      }}
    >
      {children}
    </motion.div>
  );
}

// Componente para animações de entrada em lista
interface AnimatedListProps {
  children: ReactNode[];
  className?: string;
  stagger?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export function AnimatedList({
  children,
  className = "",
  stagger = 0.1,
  direction = 'up'
}: AnimatedListProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger
      }
    }
  };

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {children.map((child, index) => (
        <motion.div
          key={index}
          variants={variants[direction]}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

// Componente para efeitos de hover
interface HoverCardProps {
  children: ReactNode;
  className?: string;
  scale?: number;
  lift?: number;
}

export function HoverCard({
  children,
  className = "",
  scale = 1.02,
  lift = 5
}: HoverCardProps) {
  return (
    <motion.div
      className={className}
      whileHover={{
        scale,
        y: -lift,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.div>
  );
}

// Componente para texto com efeito typewriter
interface TypewriterProps {
  text: string;
  className?: string;
  speed?: number;
}

export function Typewriter({
  text,
  className = "",
  speed = 50
}: TypewriterProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: index * (speed / 1000),
            duration: 0.1
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
}

// Componente para counter animado
interface AnimatedCounterProps {
  value: number;
  className?: string;
  duration?: number;
  format?: (value: number) => string;
}

export function AnimatedCounter({
  value,
  className = "",
  duration = 1,
  format = (v) => v.toString()
}: AnimatedCounterProps) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration }}
      >
        {format(value)}
      </motion.span>
    </motion.span>
  );
} 