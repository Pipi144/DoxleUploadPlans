import React, { forwardRef, HTMLAttributes, PropsWithChildren } from "react";
import { Button, ButtonProps } from "../ui/button";

type Props = {};

const NavHomeBtn = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  return (
    <Button
      {...props}
      className="bg-black active:bg-slate-500 cursor-pointer hover:opacity-70 disabled:bg-slate-500 min-w-[70px] tablet:min-w-[80px] flex text-white disabled:text-[rgba(255,255,255,0.5)] text-[14px] tablet:text-[16px]  font-lexend font-medium justify-center items-center rounded-[28px] tablet:rounded-[40px] py-[8px] tablet:py-[10px] px-[20px] tablet:px-[30px] leading-normal mt-[14px]   transition-all duration-200 ease-linear"
      ref={ref}
    />
  );
});

export default NavHomeBtn;
