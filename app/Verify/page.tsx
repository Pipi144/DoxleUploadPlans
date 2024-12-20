"use client";

import React from "react";
import useVerifyEmail from "./_Hooks/useVerifyEmail";
import GradualSpacing from "@/components/ui/gradual-spacing";
import DoxleIconPlain from "@/components/DoxleIcons";
import SuccessBanner from "../../components/DesignPatterns/SuccessBanner";
import DoxleTopMenu from "../(upload_plan_process)/_components/DoxleTopMenu";

const VerifyEmail = () => {
  const { showBannerSuccess } = useVerifyEmail();

  return (
    <>
      {showBannerSuccess ? (
        <SuccessBanner />
      ) : (
        <>
          <DoxleTopMenu />
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
      )}
    </>
  );
};

export default VerifyEmail;
