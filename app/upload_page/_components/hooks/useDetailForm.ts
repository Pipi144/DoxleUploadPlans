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
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { useUploadPageContext } from "./UploadProvider";
import { useSetProjectPlanQueryData } from "../../_services/ProjectFilesQuery";
import {
  useAWSUpdatePlanDetails,
  useVerifyEmailProject,
} from "../../_services/useUploadPlan";
import { useInterval } from "@/Utilities/HookUtilities";

type TDetailInput = {
  projectName: string;
  email: string;
  name: string;
};

const useDetailForm = () => {
  const [sendEmailTimer, setSendEmailTimer] = useState(0);
  const [showVerifyEmail, setShowVerifyEmail] = useState(false);

  const { projectDetail, setUploadStage } = useUploadPageContext();
  const { register, handleSubmit, getValues, formState } =
    useForm<TDetailInput>({
      defaultValues: {
        projectName: projectDetail?.projectName ?? "",
        email: projectDetail?.userEmail ?? "",
        name: projectDetail?.userName ?? "",
      },
    });

  const { updateProjectDetail } = useSetProjectPlanQueryData();
  const uploadDetail = useAWSUpdatePlanDetails({
    onSuccessUpdate: (data) => {
      setShowVerifyEmail(true);
      updateProjectDetail(data);
    },
  });
  const { resendVerification } = useVerifyEmailProject({});
  const onSubmit: SubmitHandler<TDetailInput> = (data, event) => {
    event?.preventDefault();
    if (!(data.email && data.projectName && data.name)) {
      alert("MISING");
    } else {
      if (projectDetail) {
        if (
          projectDetail.emailVerified &&
          projectDetail.userEmail === data.email
        ) {
          setUploadStage("Complete");
        } else
          uploadDetail.mutate({
            projectId: projectDetail.projectId,
            userEmail: data.email,
            userName: data.name,
            projectName: data.projectName,
            processClicked: true,
          });
        setSendEmailTimer(60);
        // setShowVerifyEmail(true);
      }
    }
  };

  const handleClickResendEmail = () => {
    if (projectDetail) {
      resendVerification.mutate(projectDetail.projectId);
      setSendEmailTimer(60);
    }
  };
  const FIELD_DESCRIPTIONS: Record<keyof TDetailInput, string> = {
    projectName: "typically, the address of your building project site.",
    email: "we will send the measurements to the provided email address",
    name: "Enter your company name or your name",
  };

  useEffect(() => {
    if (projectDetail?.processClicked && !projectDetail.emailVerified) {
      setShowVerifyEmail(true);
    }
  }, [projectDetail?.processClicked, projectDetail?.emailVerified]);

  useInterval(() => {
    if (sendEmailTimer === 0) {
      return;
    }
    setSendEmailTimer((prev) => prev - 1);
  }, 1000);
  return {
    register,
    handleSubmit,
    getValues,
    formState,
    onSubmit,
    FIELD_DESCRIPTIONS,
    showVerifyEmail,
    projectDetail,
    isUpdatingDetail: uploadDetail.isPending,
    sendEmailTimer,
    handleClickResendEmail,
  };
};
export default useDetailForm;
