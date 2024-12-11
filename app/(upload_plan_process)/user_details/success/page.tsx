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

import React from "react";
import VerifyingEmailBanner from "./_components/VerifyingEmailBanner";
import AnimatedDiv from "@/components/AnimatedComponents/AnimatedDiv";
import { MdEmail } from "react-icons/md";
import { NextPage } from "next";
import ResendButton from "./_components/ResendButton";
type Props = { searchParams: { email?: string; projectId?: string } };

const SuccessPage: NextPage<Props> = async (props) => {
  const { email, projectId } = props.searchParams;

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

      <ResendButton projectId={projectId ?? ""} />
    </>
  );
};

export default SuccessPage;
