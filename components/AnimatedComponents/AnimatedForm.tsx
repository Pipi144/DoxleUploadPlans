"use client";
import { HTMLMotionProps, motion } from "framer-motion";
import React, { forwardRef } from "react";

const AnimatedForm = forwardRef<HTMLFormElement, HTMLMotionProps<"form">>(
  (props, ref) => {
    return <motion.form ref={ref} {...props} />;
  }
);
AnimatedForm.displayName = "AnimatedForm";
export default AnimatedForm;
