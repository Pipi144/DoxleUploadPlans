import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "framer-motion";
import { forwardRef, InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  fieldLabel?: string;
  isRequired?: boolean;
  halfWidth?: boolean;
  errorText?: string;
};

const RequestInputField = forwardRef<HTMLInputElement, Props>(
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

        <Input
          {...props}
          ref={ref}
          className="w-full bg-[#e1ebfb] font-lexend font-medium text-black text-[16px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#6699cc] focus-visible:-ring-offset-[0.5px] transition-all duration-200 ease-linear"
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
RequestInputField.displayName = "RequestInputField";
export default RequestInputField;
