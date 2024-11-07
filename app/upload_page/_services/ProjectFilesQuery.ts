import { planBaseAddress } from "@/DoxleAPI";
import { IPlanProjectDetails } from "@/Models/project";
import { DefiniteAxiosQueryData } from "@/Models/ResponeTypes";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { produce } from "immer";

export interface ProjectFile {
  fileId: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  pages: number;
  url: string | null;
  status: "Pending Upload" | "Processing" | "Complete" | "Failed";
  statusDetail: string;
}

interface Props {
  enablePolling?: boolean;
  onSuccessCb?: (files: ProjectFile[]) => void;
}

const useRetrieveProjectFiles = ({
  onSuccessCb,
  enablePolling = false,
}: Props) => {
  const projectId: string | null = localStorage.getItem("projectId");
  // const showNotification = useDoxleNotificationStore(
  //   useShallow((state) => state.showNotification)
  // );
  return useQuery({
    queryKey: ["project-files", projectId],
    queryFn: async () => {
      try {
        const resp = await axios.get<ProjectFile[]>(
          `${planBaseAddress}/${projectId}/files`
        );
        if (onSuccessCb) onSuccessCb(resp.data);
        return resp;
      } catch (error) {}
    },
    enabled: Boolean(projectId),
    retry: 1,
    refetchInterval: (data) => {
      if (enablePolling) {
        return 1500;
      } else {
        if (
          data?.state.data?.data.find(
            (f) => f.status !== "Complete" && f.status !== "Failed"
          )
        )
          return 1500;

        return 15 * 60 * 1000;
      }
    },
    staleTime: 500,
    gcTime: 15 * 60 * 1000,
    refetchOnMount: false,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: false,
  });
};

export const useSetProjectFileQueryData = () => {
  const queryClient = useQueryClient();
  const clearAllProjectFiles = (projectId: string) => {
    const qKey = getProjectFileQueryKey(projectId);

    const data = queryClient.getQueryCache().findAll({
      predicate: (query) => qKey.every((key) => query.queryKey.includes(key)),
    });
    for (let i = 0; i < data.length; i++) {
      const query = data[i];
      queryClient.setQueryData<DefiniteAxiosQueryData<ProjectFile[]>>(
        query.queryKey,
        (data) =>
          produce(data, (draft) => {
            if (draft) draft.data = [];
          })
      );
    }
  };

  const deleteProjectFile = (projectId: string, fileId: string) => {
    const qKey = getProjectFileQueryKey(projectId);

    const data = queryClient.getQueryCache().findAll({
      predicate: (query) =>
        qKey.every((key) => query.queryKey.includes(key) && query.isActive()),
    });
    for (let i = 0; i < data.length; i++) {
      const query = data[i];
      queryClient.setQueryData<DefiniteAxiosQueryData<ProjectFile[]>>(
        query.queryKey,
        (data) =>
          produce(data, (draft) => {
            if (draft) {
              const foundIdx = draft.data.findIndex((f) => f.fileId === fileId);
              if (foundIdx !== -1) {
                draft.data.splice(foundIdx, 1);
              }
            }
          })
      );
    }
  };
  return {
    clearAllProjectFiles,
    deleteProjectFile,
  };
};
interface IRetrieveProjectDetailsProps {
  project?: string;
  onSuccessCb?: (files: IPlanProjectDetails) => void;
  enablePolling?: boolean;
}
export const useRetrieveProjectDetails = ({
  project,
  onSuccessCb,
  enablePolling,
}: IRetrieveProjectDetailsProps) => {
  const projectId: string | null = project ?? localStorage.getItem("projectId");
  // const showNotification = useDoxleNotificationStore(
  //   useShallow((state) => state.showNotification)
  // );
  return useQuery({
    queryKey: getProjectDetailQueryKey(projectId ?? ""),
    queryFn: async () => {
      try {
        const resp = await axios.get<IPlanProjectDetails>(
          `${planBaseAddress}/${projectId}`
        );

        if (onSuccessCb) onSuccessCb(resp.data);

        return resp;
      } catch (error) {}
    },
    enabled: Boolean(projectId),
    retry: 1,

    staleTime: 1 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    refetchInterval: () => {
      if (enablePolling) {
        return 1000;
      } else return false;
    },
    refetchOnMount: true,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: false,
  });
};

export const useSetProjectPlanQueryData = () => {
  const queryClient = useQueryClient();
  const updateProjectDetail = (project: IPlanProjectDetails) => {
    const qKey = getProjectDetailQueryKey(project.projectId);
    const dataActive = queryClient.getQueryCache().findAll({
      predicate: (query) =>
        qKey.every((key) => query.queryKey.includes(key)) && query.isActive(),
    });
    dataActive.forEach((query) => {
      queryClient.setQueryData<DefiniteAxiosQueryData<IPlanProjectDetails>>(
        query.queryKey,
        (oldData) =>
          produce(oldData, (draft) => {
            if (draft) {
              draft.data = project;
              return draft;
            } else queryClient.refetchQueries({ queryKey: query.queryKey });
          })
      );
    });
  };

  const refetchProjectDetail = (projectId: string) => {
    queryClient.refetchQueries({
      queryKey: getProjectDetailQueryKey(projectId),
    });
  };
  return { updateProjectDetail, refetchProjectDetail };
};
export const getProjectFileQueryKey = (projectId: string) => [
  "project-files",
  projectId,
];
export const getProjectDetailQueryKey = (projectId: string) => [
  "project-details",
  projectId,
];
export default useRetrieveProjectFiles;
