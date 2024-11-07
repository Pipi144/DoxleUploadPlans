import { useCallback, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { IPlanProjectDetails, IProjectDetailWithFiles } from "@/Models/project";
import { AxiosBackendErrorReturn } from "@/Models/ResponeTypes";
import { DrawAPI, planBaseAddress } from "@/DoxleAPI";

interface IMutatePlanQueryProps {
  onCancelUpload?: () => void;
  onSuccessUpload?: (project: IProjectDetailWithFiles) => void;
  onErrorUpload?: (error?: any) => void;
  onCompletePreparing?: () => void;
}
interface IGetAWSUrlProps {
  onSuccessGetUrl?: (url: string) => void;
  onErrorGetUrl?: (error?: any) => void;
  onGetPresignedUrl?: () => void;
}

interface IGetAWSUrlFncParams {
  fileName: string;
  fileType: string;
  fileSize: number;
  fileId: string;
  projectId: string;
}
export interface IUploadPlanParams {
  projectId: string;
  file: File;
  fileId: string;
}
interface IUploadFileToAWSParams {
  file: File;
  awsUrl: string;
}

export const useMutateProjectPlan = ({
  onCancelUpload,
  onErrorUpload,
  onSuccessUpload,
  onCompletePreparing,
}: IMutatePlanQueryProps) => {
  const [progress, setProgress] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(0);
  const abortControllerRef = useRef<AbortController | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const lastLoadedRef = useRef<number | null>(null);

  const upload = useMutation<
    AxiosResponse<IProjectDetailWithFiles>,
    AxiosBackendErrorReturn,
    IUploadPlanParams
  >({
    mutationKey: getPlanMutateKey("upload"),

    mutationFn: ({ projectId, file, fileId }: IUploadPlanParams) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("file_id", fileId);
      lastTimeRef.current = Date.now();
      lastLoadedRef.current = 0;
      abortControllerRef.current = new AbortController();
      return DrawAPI.post<IProjectDetailWithFiles>(
        `project/${projectId}/upload/`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const currentTime = Date.now();
            const currentLoaded = progressEvent.loaded;
            const total = progressEvent.total || file.size;

            if (lastTimeRef.current && lastLoadedRef.current !== null) {
              const timeDiff = (currentTime - lastTimeRef.current) / 1000; // in seconds
              const bytesDiff = currentLoaded - lastLoadedRef.current;
              const uploadSpeed = bytesDiff / timeDiff; // bytes per second

              const estimatedTimeLeft = Math.round(
                (total - currentLoaded) / uploadSpeed
              ); // in seconds
              setEstimatedTime(estimatedTimeLeft);
            }

            const percentage = Math.round((currentLoaded / total) * 100);
            setProgress(percentage);

            lastTimeRef.current = currentTime;
            lastLoadedRef.current = currentLoaded;

            if (currentLoaded === total && onCompletePreparing) {
              onCompletePreparing();
            }
          },
          signal: abortControllerRef.current?.signal,
        }
      );
    },

    onSuccess: (response, variables) => {
      if (onSuccessUpload) onSuccessUpload(response.data);
    },
    onError: (error) => {
      if (onErrorUpload) onErrorUpload(error);
    },
  });
  const reset = useCallback(() => {
    if (onCancelUpload) onCancelUpload();
    abortControllerRef.current?.abort();
    upload.reset();

    setProgress(0), setEstimatedTime(0);
  }, [upload.reset, setProgress, setEstimatedTime, onCancelUpload]);
  return {
    ...upload,
    mutate: (params: IUploadPlanParams) => upload.mutate(params),
    progress,
    estimatedTime,
    reset,
  };
};

interface ISuccessAWSPresignedUrl {
  presignedUrl: string;
  fileId: string;
}
export const useGetAWSPresignedUrl = ({
  onSuccessGetUrl,
  onErrorGetUrl,
  onGetPresignedUrl,
}: IGetAWSUrlProps) => {
  const upload = useMutation<
    AxiosResponse<ISuccessAWSPresignedUrl>,
    AxiosBackendErrorReturn,
    IGetAWSUrlFncParams
  >({
    mutationKey: getPlanMutateKey("getAwsUrl"),
    mutationFn: (payload: IGetAWSUrlFncParams) => {
      return axios.post<ISuccessAWSPresignedUrl>(
        `${planBaseAddress}/presigned-url`,
        payload,
        {
          timeout: 30000,
        }
      );
    },
    onMutate: () => {
      if (onGetPresignedUrl) onGetPresignedUrl();
    },

    onSuccess: (response, variables) => {
      if (onSuccessGetUrl) onSuccessGetUrl(response.data.presignedUrl);
    },
    onError: (error) => {
      if (onErrorGetUrl) onErrorGetUrl(error);
    },
  });

  return {
    ...upload,
    mutate: (params: IGetAWSUrlFncParams) => upload.mutate(params),
  };
};

interface IAWSUploadPlanProps extends IMutatePlanQueryProps {
  onStartingUpload?: () => void;
  onDeleteAllFileSuccess?: (projectId: string) => void;
}
export const useAWSMutatePlan = ({
  onCancelUpload,
  onErrorUpload,
  onSuccessUpload,
  onCompletePreparing,
  onStartingUpload,
  onDeleteAllFileSuccess,
}: IAWSUploadPlanProps) => {
  const [progress, setProgress] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(0);
  const abortControllerRef = useRef<AbortController | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const lastLoadedRef = useRef<number | null>(null);

  const upload = useMutation<
    AxiosResponse,
    AxiosBackendErrorReturn,
    IUploadFileToAWSParams
  >({
    mutationKey: getPlanMutateKey("uploadAWS"),
    mutationFn: ({ awsUrl, file }: IUploadFileToAWSParams) => {
      return axios.put(awsUrl, file, {
        headers: { "Content-Type": file.type },

        onUploadProgress: (progressEvent) => {
          const currentTime = Date.now();
          const currentLoaded = progressEvent.loaded;
          const total = progressEvent.total || file.size;

          if (lastTimeRef.current !== null && lastLoadedRef.current !== null) {
            const timeDiff = (currentTime - lastTimeRef.current) / 1000; // in seconds
            const bytesDiff = currentLoaded - lastLoadedRef.current;
            const uploadSpeed = bytesDiff / timeDiff; // bytes per second

            const estimatedTimeLeft = Math.round(
              (total - currentLoaded) / uploadSpeed
            ); // in seconds
            setEstimatedTime(estimatedTimeLeft);
          }

          const percentage = Math.round((currentLoaded / total) * 100);
          setProgress(percentage);

          lastTimeRef.current = currentTime;
          lastLoadedRef.current = currentLoaded;

          if (currentLoaded === total && onCompletePreparing) {
            onCompletePreparing();
          }
        },
        signal: abortControllerRef.current?.signal,
      });
    },
    onMutate: () => {
      lastTimeRef.current = Date.now();
      lastLoadedRef.current = 0;
      abortControllerRef.current = new AbortController();
      if (onStartingUpload) onStartingUpload();
    },
    onSuccess: (response, variables) => {
      if (onSuccessUpload) onSuccessUpload(response.data);
    },
    onError: (error) => {
      if (onErrorUpload) onErrorUpload(error);
    },
  });
  const reset = useCallback(() => {
    abortControllerRef.current?.abort();
    upload.reset();

    setProgress(0), setEstimatedTime(0);
    if (onCancelUpload) onCancelUpload();
  }, [upload.reset, setProgress, setEstimatedTime, onCancelUpload]);

  const deleteFile = useMutation<
    AxiosResponse,
    AxiosBackendErrorReturn,
    string
  >({
    mutationKey: getPlanMutateKey("delete"),
    mutationFn: (fileId: string) => {
      return axios.delete(`${planBaseAddress}/file/${fileId}`);
    },
    onMutate: () => {},
    onSuccess: (response, variables) => {},
    onError: (error) => {},
  });

  const deleteAllFile = useMutation<
    AxiosResponse,
    AxiosBackendErrorReturn,
    string
  >({
    mutationKey: getPlanMutateKey("delete-all-project-files"),
    mutationFn: (projectId: string) => {
      return axios.get(`${planBaseAddress}/${projectId}/delete-all-files`);
    },
    onMutate: () => {},
    onSuccess: (response, variables) => {
      if (onDeleteAllFileSuccess) onDeleteAllFileSuccess(variables);
    },
    onError: (error) => {},
  });
  return {
    patch: {
      ...upload,
      mutate: (params: IUploadFileToAWSParams) => upload.mutate(params),
      progress,
      estimatedTime,
      reset,
    },
    deleteFile: {
      ...deleteFile,
      mutate: (params: string) => deleteFile.mutate(params),
    },
    deleteAllFile: {
      ...deleteAllFile,
      mutate: (params: string) => deleteAllFile.mutate(params),
    },
  };
};

type TPlanDetails = {
  projectId: string;
  projectName?: string;
  userName?: string;
  userEmail?: string;
  userPhone?: string;
  processClicked?: boolean;
};
interface IAWSUpdatePlanDetailsProps {
  onSuccessUpdate?: (project: IPlanProjectDetails) => void;
}
export const useAWSUpdatePlanDetails = ({
  onSuccessUpdate,
}: IAWSUpdatePlanDetailsProps) => {
  const upload = useMutation<
    AxiosResponse<IPlanProjectDetails>,
    AxiosBackendErrorReturn,
    TPlanDetails
  >({
    mutationKey: getPlanMutateKey("uploadDetail"),
    mutationFn: ({ projectId, ...payload }: TPlanDetails) => {
      return axios.patch<IPlanProjectDetails>(
        `${planBaseAddress}/${projectId}`,
        payload
      );
    },
    onMutate: () => {},

    onSuccess: (response, variables) => {
      if (onSuccessUpdate) onSuccessUpdate(response.data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return {
    ...upload,
    mutate: (params: TPlanDetails) => upload.mutate(params),
  };
};
interface TVerifyEmailParams {
  projectId: string;
  verificationCode: string;
}
interface IVerifyEmailProjectProps {
  onSuccessVerify?: (project: IPlanProjectDetails) => void;
}
export const useVerifyEmailProject = ({
  onSuccessVerify,
}: IVerifyEmailProjectProps) => {
  const upload = useMutation<
    AxiosResponse<IPlanProjectDetails>,
    AxiosBackendErrorReturn,
    TVerifyEmailParams
  >({
    mutationKey: getPlanMutateKey("verifyEmail"),
    mutationFn: ({ projectId, verificationCode }: TVerifyEmailParams) => {
      return axios.post<IPlanProjectDetails>(
        `${planBaseAddress}/${projectId}/verify`,
        { verificationCode },
        {
          timeout: 10000,
        }
      );
    },

    onSuccess: (response, variables) => {
      if (onSuccessVerify) onSuccessVerify(response.data);
    },
    onError: (error) => {},
  });
  const resend = useMutation<AxiosResponse, AxiosBackendErrorReturn, string>({
    mutationKey: getPlanMutateKey("resend-verification"),
    mutationFn: (projectId: string) => {
      return axios.get(`${planBaseAddress}/${projectId}/resend-verification`);
    },

    onSuccess: (response, variables) => {
      if (onSuccessVerify) onSuccessVerify(response.data);
    },
    onError: (error) => {},
  });
  return {
    sendEmail: {
      ...upload,
      mutate: (params: TVerifyEmailParams) => upload.mutate(params),
    },
    resendVerification: {
      ...resend,
      mutate: (params: string) => resend.mutate(params),
    },
  };
};
export const getPlanMutateKey = (
  action:
    | "upload"
    | "delete"
    | "getAwsUrl"
    | "uploadAWS"
    | "uploadDetail"
    | "verifyEmail"
    | "delete-all-project-files"
    | "resend-verification"
) => [`${action}-plan`];
