import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {};

const CodeInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      className,

      ...props
    },
    ref
  ) => {
    return (
      <input
        className={cn([
          "text-base font-lexend font-normal border-solid border-[1px] border-[#00000020] bg-[#E1EBFB] bg-opacity-80 w-[50px] aspect-square text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
          className,
        ])}
        {...props}
        maxLength={1}
        type="number"
        min={0}
        ref={ref}
      />
    );
  }
);
CodeInput.displayName = "CodeInput";
export default CodeInput;
