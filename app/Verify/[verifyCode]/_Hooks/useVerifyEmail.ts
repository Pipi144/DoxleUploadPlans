import { DoxleRoutes } from "@/DoxleRoutes";
import { useVerifyEmailProject } from "@/services/useUploadPlan";
import { notFound, useRouter } from "next/navigation";
import { useEffect } from "react";

const useVerifyEmail = (urlParams: string) => {
  const searchParams = new URLSearchParams(urlParams);
  const verificationCode = searchParams.get("code");
  const projectId = searchParams.get("project");
  const router = useRouter();
  const navToHome = () => {
    router.replace(DoxleRoutes.UploadBanner);
  };
  const { sendEmail } = useVerifyEmailProject({
    onSuccessVerify: (data) => {
      localStorage.setItem("projectId", data.projectId);
      setTimeout(() => {
        router.replace(DoxleRoutes.UploadPlanPage);
      }, 4000);
    },
  });
  useEffect(() => {
    if (!verificationCode || !projectId) notFound();
    else {
      sendEmail.mutate({ verificationCode, projectId: projectId });
    }
  }, []);

  return { navToHome };
};

export default useVerifyEmail;
