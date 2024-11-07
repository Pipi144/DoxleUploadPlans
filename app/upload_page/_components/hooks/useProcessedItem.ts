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

import { useState } from "react";
import { produce } from "immer";
import {
  ProjectFile,
  useSetProjectFileQueryData,
} from "../../_services/ProjectFilesQuery";
import { useUploadPageContext } from "./UploadProvider";
import { useAWSMutatePlan } from "../../_services/useUploadPlan";

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
