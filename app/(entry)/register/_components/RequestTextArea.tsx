import { Textarea } from "@/components/ui/textarea";
import { AnimatePresence, motion } from "framer-motion";
import React, { forwardRef, TextareaHTMLAttributes } from "react";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  fieldLabel?: string;
  isRequired?: boolean;
  halfWidth?: boolean;
  errorText?: string;
};
const RequestTextArea = forwardRef<HTMLTextAreaElement, Props>(
  ({ fieldLabel, isRequired, halfWidth, errorText, ...props }: Props, ref) => {
    return (
      <motion.div
        className={`w-[100%] mobileMd:${
          halfWidth ? "w-[45%]" : "w-full"
        } flex flex-col mb-[20px] laptop:mb-[30px] min-w-[250px] `}
        layout="position"
        transition={{
          damping: 16,
        }}
      >
        <div className="text-black text-[14px] font-lexend font-medium mb-[4px]">
          {fieldLabel ?? ""}

          {isRequired && (
            <span className="text-red-600 text-[16px] ml-[2px]">*</span>
          )}
        </div>

        <Textarea
          className="w-full bg-[#e1ebfb80] font-lexend font-medium text-black text-[16px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-doxleColor focus-visible:-ring-offset-[0.5px] transition-all duration-200 ease-linear"
          {...props}
          ref={ref}
        />
        <AnimatePresence>
          {errorText && (
            <motion.span
              className="text-red-600 text-[10px] font-lexend font-medium mt-[4px]"
              animate={{ x: [-5, 0], opacity: [0, 1] }}
              exit={{ x: [0, 5], opacity: [1, 0] }}
            >
              {errorText}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }
);

export default RequestTextArea;
