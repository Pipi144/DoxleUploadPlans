"use client";
import { Button, ButtonProps } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { forwardRef } from "react";

type UploadBtnProps = ButtonProps & {};

const UploadBtn = forwardRef<HTMLButtonElement, UploadBtnProps>(
  (props: UploadBtnProps, ref) => {
    const router = useRouter();
    const onClickBtn = () => {
      router.push("/upload_page");
    };
    return (
      <Button
        onClick={onClickBtn}
        className="self-start bg-black text-[14px] tablet:text-[16px] font-lexend text-white font-medium transition-all duration-200 ease-linear active:bg-[rgba(0,0,0,0.25)] py-[5px] tablet:py-[8px] px-[10px] tablet:px[16px] rounded-none hover:rounded-[8px]"
        ref={ref}
        {...props}
      >
        Upload plans
      </Button>
    );
  }
);

export default UploadBtn;
