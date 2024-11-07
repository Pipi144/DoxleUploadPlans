"use client";

import React from "react";
import useVerifyEmail from "./_Hooks/useVerifyEmail";

type Props = {
  params: Promise<{ slug: string }>;
};

const VerifyEmail = async ({ params }: Props) => {
  const { slug } = await params;

  useVerifyEmail(slug);
  return <></>;
};

export default VerifyEmail;
