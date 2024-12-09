import NavHomeBtn from "@/components/DesignPatterns/NavHomeBtn";
import React from "react";
import VerifyingEmailBanner from "./_components/VerifyingEmailBanner";
import AnimatedDiv from "@/components/AnimatedComponents/AnimatedDiv";
import { MdEmail } from "react-icons/md";
import { NextPage } from "next";

type Props = { searchParams: { email?: string } };

const SuccessPage: NextPage<Props> = async ({ searchParams }) => {
  const email = searchParams.email;
  return (
    <>
      <AnimatedDiv
        className="text-[25px] tablet:text-[30px] font-lexend font-semibold text-black flex items-center self-center max-w-5xl"
        animate={{ x: [-400, 0], opacity: [0, 1] }}
        transition={{ duration: 0.5 }}
      >
        <MdEmail className="text-[22px] tablet:text-[25px] tablet:mt-[3px] text-black mr-[8px] " />
        We have sent a mail
      </AnimatedDiv>
      <AnimatedDiv
        className="input-field-desc max-w-5xl text-center my-[20px]"
        animate={{ x: [400, 0], opacity: [0, 1] }}
        transition={{ duration: 0.5 }}
      >
        An email has been sent to {email ?? "Unknown email"} with a link to
        verify your account. If you have not received the email after a few
        minutes, please check your spam folder.
      </AnimatedDiv>

      <VerifyingEmailBanner />

      <NavHomeBtn
        style={{ alignSelf: "center" }}
        // disabled={sendEmailTimer !== 0}
        // onClick={handleClickResendEmail}
      >
        {/* {sendEmailTimer !== 0
              ? `00:${
                  sendEmailTimer >= 10 ? sendEmailTimer : `0${sendEmailTimer}`
                }`
              : "Resend"} */}
      </NavHomeBtn>
    </>
  );
};

export default SuccessPage;
