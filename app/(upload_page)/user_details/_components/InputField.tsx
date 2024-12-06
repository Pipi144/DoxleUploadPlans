import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { cn } from "../../../../lib/utils";
import AnimatedDiv from "@/components/AnimatedComponents/AnimatedDiv";

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  labelText: string;
  fieldDesc: string;
  errors?: string[];
};

const InputField = ({
  labelText,
  fieldDesc,
  className,
  errors,
  ...props
}: Props) => {
  return (
    <AnimatedDiv className="input-field-wrapper" layout="position">
      <label htmlFor={props.name} className="input-label">
        {labelText}
        {props.required && <span className="input-asterisk">*</span>}
      </label>
      <span className="input-field-desc">{fieldDesc}</span>
      <input className={cn(["input-field", className])} {...props} />
      <AnimatePresence>
        {errors && (
          <motion.span
            className="input-error"
            animate={{ y: [-5, 0], opacity: [0, 1] }}
            exit={{ y: [0, -5], opacity: [1, 0] }}
          >
            {errors.join(", ")}
          </motion.span>
        )}
      </AnimatePresence>
    </AnimatedDiv>
  );
};

export default InputField;
