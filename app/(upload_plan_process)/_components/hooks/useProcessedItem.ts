import { produce } from "immer";
import {
  ProjectFile,
  useSetProjectFileQueryData,
} from "../../../../services/ProjectFilesQuery";
import { useUploadPageContext } from "./UploadProvider";
import { useAWSMutatePlan } from "../../../../services/useUploadPlan";

type Props = { item: ProjectFile };

const useProcessedItem = ({ item }: Props) => {
  const { projectDetail, setAllUploadedFiles } = useUploadPageContext();
  const { deleteProjectFile } = useSetProjectFileQueryData();
  const { deleteFile } = useAWSMutatePlan({});
  const handleRemoveFile = () => {
    if (projectDetail) {
      deleteProjectFile(projectDetail.projectId, item.fileId);
      deleteFile.mutate(item.fileId);
      setAllUploadedFiles(
        produce((draft) => {
          const idx = draft.findIndex((f) => f.fileTempId === item.fileId);
          if (idx !== -1) draft.splice(idx, 1);
          return draft;
        })
      );
    }
  };
  return {
    handleRemoveFile,
  };
};

export default useProcessedItem;
