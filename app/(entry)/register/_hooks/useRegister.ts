"use client";

import { useToast } from "@/hooks/use-toast";
import {
  IRequestAccessData,
  useContactUsMutation,
} from "@/services/ContactUsQueries";
import { useState } from "react";
import { useForm } from "react-hook-form";
export const Checkbox_Values = [
  "Buildxact",
  "Procore",
  "Databuild",
  "Buildertrend",
  "CoConstruct",
  "Smartsheet",
  "Excel",
  "Other",
];

const newRqData = {
  fName: "",
  lName: "",
  email: "",
  company: "",
  numOfEmployee: "",
  suggestion: "",
  helpStatement: "",
  problemStatement: "",
  preferredSoftware: [],
};
function useRegister() {
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const {
    register,
    setValue,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm<IRequestAccessData>({ defaultValues: newRqData });
  const [preferredSoftware] = watch(["preferredSoftware"]);
  const { toast } = useToast();
  const { requestAccessMutation } = useContactUsMutation({
    onSuccessCb: () => {
      setShowSuccessBanner(true);
    },
    onErrorCb: () => {
      toast({
        title: "Failed to submit request",
        description: "Please try again later",
      });
    },
  });

  const onSubmit = handleSubmit((data) => {
    if (data.fName && data.lName && data.email)
      requestAccessMutation.mutate(data);
  });
  return {
    register,
    errors,
    setValue,
    onSubmit,
    preferredSoftware,
    showSuccessBanner,
    isSubmitting: requestAccessMutation.isPending,
  };
}

export default useRegister;
