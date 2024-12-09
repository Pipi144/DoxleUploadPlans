import { produce } from "immer";
import {
  ProjectFile,
  useSetProjectFileQueryData,
} from "../../../../services/ProjectFilesQuery";
import { useUploadPageContext } from "./UploadProvider";
import { useAWSMutatePlan } from "../../../../services/useUploadPlan";

type Props = { item: ProjectFile };

const useServerItem = ({ item }: Props) => {
  const { projectDetail, setAllUploadedFiles } = useUploadPageContext();
  const { deleteProjectFile } = useSetProjectFileQueryData();
  const { deleteFile } = useAWSMutatePlan({});
  const handleRemoveFile = () => {
    if (projectDetail) {
      // delete from react query data
      deleteProjectFile(projectDetail.projectId, item.fileId);
      // delete server file with api
      deleteFile.mutate(item.fileId);

      // delete from local state if the file exists
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

export default useServerItem;
