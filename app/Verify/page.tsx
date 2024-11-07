"use client";

import React from "react";
import useVerifyEmail from "./_Hooks/useVerifyEmail";
import GradualSpacing from "@/components/ui/gradual-spacing";
import DoxleIconPlain from "@/components/DoxleIcons";
import VerifySuccess from "./_components/VerifySuccess";

const VerifyEmail = () => {
  const { showBannerSuccess } = useVerifyEmail();

  return showBannerSuccess ? (
    <VerifySuccess />
  ) : (
    <>
      <DoxleIconPlain
        overwrittenColor="black"
        containerStyle={{
          marginBottom: 20,
          width: 100,
        }}
      />
      <GradualSpacing
        text="Verifying your email..."
        className="text-black text-[18px] tablet:text-[20px] font-lexend font-semibold leading-1"
        duration={1}
      />
    </>
  );
};

export default VerifyEmail;
