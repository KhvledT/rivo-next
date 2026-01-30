"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  type PanInfo
} from "motion/react";
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";

/* ---------------- CardRotate (MEMOIZED) ---------------- */

interface CardRotateProps {
  children: React.ReactNode;
  onSendToBack: () => void;
  sensitivity: number;
  disableDrag: boolean;
}

const CardRotate = memo(function CardRotate({
  children,
  onSendToBack,
  sensitivity,
  disableDrag
}: CardRotateProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (
        Math.abs(info.offset.x) > sensitivity ||
        Math.abs(info.offset.y) > sensitivity
      ) {
        onSendToBack();
      } else {
        x.set(0);
        y.set(0);
      }
    },
    [onSendToBack, sensitivity, x, y]
  );

  if (disableDrag) {
    return (
      <motion.div className="absolute inset-0">
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className="absolute inset-0 cursor-grab"
      drag
      dragElastic={0.6}
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      whileTap={{ cursor: "grabbing" }}
      style={{ x, y, rotateX, rotateY }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
});

/* ---------------- Stack ---------------- */

interface StackProps {
  cards?: React.ReactNode[];
  randomRotation?: boolean;
  sensitivity?: number;
  sendToBackOnClick?: boolean;
  animationConfig?: { stiffness: number; damping: number };
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  mobileClickOnly?: boolean;
  mobileBreakpoint?: number;
}

export default function Stack({
  cards = [],
  randomRotation = false,
  sensitivity = 200,
  animationConfig = { stiffness: 260, damping: 20 },
  sendToBackOnClick = false,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  mobileClickOnly = false,
  mobileBreakpoint = 768
}: StackProps) {
  const [stack, setStack] = useState(() =>
    cards.map((content, i) => ({ id: i + 1, content }))
  );

  const [isMobile, setIsMobile] = useState(false);
  const [paused, setPaused] = useState(false);

  /* --------- Stable random rotation (ONCE) --------- */
  const rotationsRef = useRef<number[]>(
    cards.map(() => (Math.random() * 10 - 5))
  );

  /* --------- Mobile detection --------- */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < mobileBreakpoint);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [mobileBreakpoint]);

  const disableDrag = mobileClickOnly && isMobile;
  const enableClick = sendToBackOnClick || disableDrag;

  /* --------- Stable sendToBack --------- */
  const sendToBack = useCallback((id: number) => {
    setStack(prev => {
      const index = prev.findIndex(c => c.id === id);
      if (index === -1) return prev;
      const newStack = [...prev];
      const [card] = newStack.splice(index, 1);
      newStack.unshift(card);
      return newStack;
    });
  }, []);

  /* --------- Autoplay --------- */
  useEffect(() => {
    if (!autoplay || paused || stack.length <= 1) return;

    const id = setInterval(() => {
      sendToBack(stack[stack.length - 1].id);
    }, autoplayDelay);

    return () => clearInterval(id);
  }, [autoplay, autoplayDelay, paused, stack, sendToBack]);

  /* --------- Render --------- */
  return (
    <div
      className="relative w-full h-full"
      style={{ perspective: 600 }}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
    >
      {stack.map((card, index) => (
        <CardRotate
          key={card.id}
          onSendToBack={() => sendToBack(card.id)}
          sensitivity={sensitivity}
          disableDrag={disableDrag}
        >
          <motion.div
            className="w-full h-full rounded-2xl"
            onClick={() => enableClick && sendToBack(card.id)}
            animate={{
              rotateZ:
                (stack.length - index - 1) * 4 +
                (randomRotation ? rotationsRef.current[index] : 0),
              scale:
                1 + index * 0.06 - stack.length * 0.06,
              transformOrigin: "90% 90%"
            }}
            transition={{
              type: "spring",
              stiffness: animationConfig.stiffness,
              damping: animationConfig.damping
            }}
          >
            {card.content}
          </motion.div>
        </CardRotate>
      ))}
    </div>
  );
}
