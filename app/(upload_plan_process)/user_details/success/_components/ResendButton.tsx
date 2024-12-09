"use client";

import NavHomeBtn from "@/components/DesignPatterns/NavHomeBtn";
import { useInterval } from "@/Utilities/HookUtilities";
import React, { useState } from "react";
import { resendVerification } from "../../action";

type Props = { projectId: string };

const ResendButton = ({ projectId }: Props) => {
  const [sendEmailTimer, setSendEmailTimer] = useState(60);
  useInterval(() => {
    if (sendEmailTimer === 0) {
      return;
    }
    setSendEmailTimer((prev) => prev - 1);
  }, 1000);
  return (
    <NavHomeBtn
      style={{ alignSelf: "center" }}
      disabled={sendEmailTimer !== 0}
      onClick={() => {
        setSendEmailTimer(60);
        resendVerification(projectId);
      }}
    >
      {sendEmailTimer !== 0
        ? `00:${sendEmailTimer >= 10 ? sendEmailTimer : `0${sendEmailTimer}`}`
        : "Resend"}
    </NavHomeBtn>
  );
};

export default ResendButton;
