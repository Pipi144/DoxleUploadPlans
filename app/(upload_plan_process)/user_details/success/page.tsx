import React from "react";
import VerifyingEmailBanner from "./_components/VerifyingEmailBanner";
import AnimatedDiv from "@/components/AnimatedComponents/AnimatedDiv";

const VerifySuccessPage = () => {
  return (
    <>
      <AnimatedDiv
        className="text-[25px] tablet:text-[30px] font-lexend font-semibold text-black flex items-center self-center mb-8"
        animate={{ x: [-400, 0], opacity: [0, 1] }}
        transition={{ duration: 0.5 }}
      >
        yay, your email is verified.
      </AnimatedDiv>

      <VerifyingEmailBanner />
    </>
  );
};

export default VerifySuccessPage;
