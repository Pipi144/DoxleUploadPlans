// Copyright 2024 selvinkamal
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     https://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

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
