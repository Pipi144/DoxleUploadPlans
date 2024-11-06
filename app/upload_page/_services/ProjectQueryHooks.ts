import { planBaseAddress } from "@/DoxleAPI";
import { IPlanProjectDetails, Project } from "@/Models/project";
import { AxiosBackendErrorReturn } from "@/Models/ResponeTypes";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";

export const getProjectMutationKey = (
  action: "add" | "create-budget" | "process"
) => [`${action}-project`];

interface IProcessFileProps {
  projectId: string;
  fileId: string;
}
interface UseMutateProjectProps {
  onSuccessCb?: (project: IPlanProjectDetails) => void;
  onErrorCb?: (error?: unknown) => void;
  onProcessSuccessCb?: (fileId: string) => void;
}
const useMutateProject = ({
  onSuccessCb,
  onErrorCb,
  onProcessSuccessCb,
}: UseMutateProjectProps) => {
  const createProjectQuery = useMutation<
    AxiosResponse<IPlanProjectDetails, AxiosBackendErrorReturn>,
    unknown,
    Partial<Project>
  >({
    mutationKey: getProjectMutationKey("add"),
    mutationFn: (project: Partial<Project>) =>
      axios.post<IPlanProjectDetails>(
        `${planBaseAddress}/create-project`,
        project
      ),

    retry: 1,
    onSuccess: (result) => {
      localStorage.setItem("projectId", result.data.projectId);
      if (onSuccessCb) onSuccessCb(result.data);
    },
    onError: (error) => {
      if (onErrorCb) onErrorCb(error);
    },
  });

  return {
    createProjectQuery,
    createProject: createProjectQuery.mutate,
  };
};

export default useMutateProject;
