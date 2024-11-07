"use client";

import React from "react";
import useVerifyEmail from "./_Hooks/useVerifyEmail";

type Props = {
  _params: { urlParams: string };
};

const VerifyEmail = ({ _params }: Props) => {
  useVerifyEmail(_params.urlParams);
  return <></>;
};

export default VerifyEmail;
