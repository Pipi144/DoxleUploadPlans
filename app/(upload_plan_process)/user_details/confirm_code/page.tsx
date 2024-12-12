"use client";

import React, { useEffect } from "react";
import CodeInputForm from "../_components/CodeInputForm";
import { getProjectData } from "../../action";
import { redirect } from "next/navigation";
import { DoxleRoutes } from "@/DoxleRoutes";

type Props = {};

const CodeConfirm = ({}: Props) => {
  const checkVerifiedStatus = async () => {
    try {
      const resp = await getProjectData();

      if (resp?.emailVerified) redirect(DoxleRoutes.VerifySuccessPage);
    } catch (error) {}
  };
  useEffect(() => {
    checkVerifiedStatus();
  }, []);
  return <CodeInputForm />;
};

export default CodeConfirm;
