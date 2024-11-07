"use client";

import { DoxleRoutes } from "@/DoxleRoutes";
import { useVerifyEmailProject } from "@/services/useUploadPlan";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const useVerifyEmail = () => {
  const [showBannerSuccess, setShowBannerSuccess] = useState(false);
  const searchParams = useSearchParams();
  const verificationCode = searchParams.get("code");
  const projectId = searchParams.get("project");
  const router = useRouter();

  const { sendEmail } = useVerifyEmailProject({
    onSuccessVerify: (data) => {
      localStorage.setItem("projectId", data.projectId);
      setTimeout(() => {
        setShowBannerSuccess(true);
      }, 1000);
      setTimeout(() => {
        router.replace(DoxleRoutes.UploadPlanPage);
      }, 4000);
    },
    onErrorVerify: (error) => {
      console.log("ERROR:", error);
      throw new Error(
        error?.detail ?? "Failed to verify, your link may have expired"
      );
    },
  });
  useEffect(() => {
    if (!verificationCode || !projectId) {
      notFound();
    } else {
      sendEmail.mutate({ verificationCode, projectId: projectId });
    }
  }, []);

  return { showBannerSuccess };
};

export default useVerifyEmail;
