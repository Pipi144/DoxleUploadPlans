"use client";
import { HTMLMotionProps, motion } from "framer-motion";
import React, { forwardRef } from "react";

const AnimatedDiv = forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  (props, ref) => {
    return <motion.div ref={ref} {...props} />;
  }
);

export default AnimatedDiv;
