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
