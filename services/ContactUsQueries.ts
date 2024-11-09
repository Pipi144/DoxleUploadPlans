import { useShallow } from "zustand/react/shallow";
import { useMutation } from "@tanstack/react-query";
import { AxiosResponse, isAxiosError } from "axios";

import { AxiosBackendErrorReturn } from "../Models/ResponeTypes";
import { DrawAPI } from "@/DoxleAPI";

interface ContactMutationProps {
  onSuccessCb?: () => void;
  onErrorCb?: () => void;
}
export interface IRequestAccessData {
  fName: string;
  lName: string;
  email: string;
  company: string;
  numOfEmployee: string;
  suggestion: string;
  helpStatement: string;
  problemStatement: string;
  preferredSoftware: string[];
}
export const useContactUsMutation = (props: ContactMutationProps) => {
  const requestAccessMutation = useMutation<
    AxiosResponse,
    unknown,
    IRequestAccessData
  >({
    mutationKey: ["request-access"],
    mutationFn: (newRequest: IRequestAccessData) =>
      DrawAPI.post(`/contact/request/`, newRequest),
    retry: 1,
    onSuccess: (result: AxiosResponse) => {
      if (props.onSuccessCb) props.onSuccessCb();
    },
    onError: (error: unknown) => {
      if (props.onErrorCb) props.onErrorCb();
    },
  });

  return {
    requestAccessMutation,
    submitRequestAccess: requestAccessMutation.mutate,
  };
};
