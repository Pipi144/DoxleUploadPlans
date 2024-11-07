"use client";

import React from "react";
import useVerifyEmail from "./_Hooks/useVerifyEmail";

type Props = {
  params: { urlParams: string };
};

const VerifyEmail = ({ params }: Props) => {
  useVerifyEmail(params.urlParams);
  return <></>;
};

export default VerifyEmail;
