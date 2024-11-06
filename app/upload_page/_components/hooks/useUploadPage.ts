"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";

import { useShallow } from "zustand/react/shallow";
import { FileRejection, useDropzone } from "react-dropzone";
import { produce } from "immer";
import { v4 as uuid } from "uuid";
import { Variants } from "framer-motion";
import { ILocalUploadedFile } from "@/Models/FileUpload";
import useRetrieveProjectFiles, {
  ProjectFile,
  useRetrieveProjectDetails,
} from "../../_services/ProjectFilesQuery";
import { IPlanProjectDetails } from "@/Models/project";
import { IFolderUploadDetails, TAllowedFileType } from "@/Models/UtilitiModels";
import useMutateProject from "../../_services/ProjectQueryHooks";
import { useDoxleErrorWarningStore } from "@/GeneralStores/useDoxleErrorWarningStore";
import useProcessFileDrop from "./useProcessFileDrop";

export interface IUploadPageContextValue {
  allUploadedFiles: ILocalUploadedFile[];
  setAllUploadedFiles: React.Dispatch<
    React.SetStateAction<ILocalUploadedFile[]>
  >;
  uploadStage: TUploadStage;
  setUploadStage: React.Dispatch<React.SetStateAction<TUploadStage>>;
  projectFiles: ProjectFile[];
  projectDetail: IPlanProjectDetails | undefined;
  setDisableNavCompleteScreen: React.Dispatch<React.SetStateAction<boolean>>;
  refetchProjectFiles: () => void;
}

type TUploadStage = "FileUpload" | "DetailEntry" | "Complete";
const useUploadPage = ({ urlProjectId }: { urlProjectId?: string }) => {
  const [hideAddBtn, setHideAddBtn] = useState(false);
  const [pendingFolderUpload, setPendingFolderUpload] = useState<
    IFolderUploadDetails[] | null
  >(null);
  const [filesOnDragged, setFilesOnDragged] = useState(false);
  const [allUploadedFiles, setAllUploadedFiles] = useState<
    ILocalUploadedFile[]
  >([]);
  const [uploadStage, setUploadStage] = useState<TUploadStage>("FileUpload");
  const [disableNavCompleteScreen, setDisableNavCompleteScreen] =
    useState(false);
  const [projectId, setProjectId] = useState<string | undefined>(
    urlProjectId ?? undefined
  );
  const fileContainerRef = React.useRef<HTMLDivElement>(null);
  let scrollTimer: ReturnType<typeof setTimeout>;
  const enablePolling = allUploadedFiles.length !== 0;
  const projectFileQuery = useRetrieveProjectFiles({
    projectId,
    enablePolling: enablePolling,
  });
  const projectDetailQuery = useRetrieveProjectDetails({
    projectId,
    enablePolling: uploadStage === "DetailEntry",
    onSuccessCb: (data) => {
      if (data.processClicked) {
        if (!data.emailVerified) setUploadStage("DetailEntry");
        else if (!disableNavCompleteScreen) setUploadStage("Complete");
      } else {
        if (data.emailVerified) {
          setUploadStage("Complete");
        }
      }
    },
  });
  const { createProjectQuery } = useMutateProject({
    onSuccessCb: (data) => setProjectId(data.projectId),
  });
  const projectDetail = projectDetailQuery.data?.data;
  const projectFiles = useMemo(
    () => projectFileQuery.data?.data ?? [],
    [projectFileQuery.data?.data]
  );
  const processableFiles = projectFiles.length > 0;

  const { addCurrentErrorFiles } = useDoxleErrorWarningStore(
    useShallow((state) => ({
      addCurrentErrorFiles: state.addCurrentErrorFiles,
    }))
  );

  const allowedFileTypes: TAllowedFileType[] = [
    {
      mimePrefix: "application/",
      extensions: [".pdf", ".zip"],
    },
  ];
  const onDrop = useCallback(
    <T extends File>(
      acceptedFiles: T[],
      fileRejections: FileRejection[],
    ) => {
      if (acceptedFiles.length > 0) {
        setAllUploadedFiles(
          produce((draft) => {
            draft.push(
              ...acceptedFiles.map(
                (file) =>
                  ({
                    fileItem: file,
                    fileState: "Preparing",
                    fileTempId: uuid(),
                  } as ILocalUploadedFile)
              )
            );

            return draft;
          })
        );
      }
      if (fileRejections.length > 0) {
        const errorFiles: FileRejection[] = [];
        fileRejections.forEach((rejection) => {
          errorFiles.push({
            ...rejection,
            errors: [
              {
                message: "Invalid file type, please upload a PDF/zip file",
                code: rejection.errors[0].code,
              },
            ],
          });
        });
        addCurrentErrorFiles(errorFiles);
        setFilesOnDragged(false);
      }
    },
    []
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "application/pdf": [".pdf"], "application/zip": [".zip"] },
    maxSize: 110000000,
    multiple: true,
  });

  const { handleProcessDropEntries } = useProcessFileDrop();

  //---->handle dropping files effect<----
  const handleFileDragEnter = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.dataTransfer.items.length > 0) setFilesOnDragged(true);
    },
    []
  );
  const handleFileDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setFilesOnDragged(false);
  };
  //<------------------------------------>

  //handle uploading files in folder
  const uploadFilesInFolder = useCallback(() => {
    if (pendingFolderUpload) {
      const allFiles: ILocalUploadedFile[] = [];
      pendingFolderUpload.forEach((folder) => {
        if (!folder.isNestedFolder) {
          const files: ILocalUploadedFile[] = folder.files.map((file) => ({
            fileItem: file,
            fileState: "Preparing",
            fileTempId: uuid(),
          }));
          allFiles.push(...files);
        }
      });

      setAllUploadedFiles(
        produce((draft) => {
          draft.push(...allFiles);
          return draft;
        })
      );
      setPendingFolderUpload(null);
    }
  }, [pendingFolderUpload]);

  const uploadFilesPlain = useCallback((files: File[]) => {
    const allFiles: ILocalUploadedFile[] = files.map((file) => ({
      fileItem: file,
      fileState: "Preparing",
      fileTempId: uuid(),
    }));
    setAllUploadedFiles(
      produce((draft) => {
        draft.push(...allFiles);
        return draft;
      })
    );
  }, []);
  const handleFileFolderDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    try {
      setFilesOnDragged(false);
      const res = await handleProcessDropEntries(e, allowedFileTypes);
      // all files are failed=> show error
      if (typeof res === "string") alert(res);
      else {
        const filesNotInFolder = res.find((item) => !item.folderName);
        const folders = res.filter((item) => item.folderName);

        // call api upload seperately for files not in folder
        if (filesNotInFolder) {
          uploadFilesPlain(filesNotInFolder.files);
          if (filesNotInFolder.filesRejected.length > 0)
            addCurrentErrorFiles(filesNotInFolder.filesRejected);
        }

        // if there's folder included in dropped files=> show folder upload dialog
        if (folders.length > 0)
          setPendingFolderUpload(
            folders.map((item) => ({
              folderName: item.folderName!,
              files: item.files,
              filesError: item.filesRejected,
              isNestedFolder: item.isNestedFolder,
            }))
          );
      }
    } catch (error) {
      console.log("ERROR:", error);
    }
  };
  const handleProcessFiles = () => {
    setUploadStage("DetailEntry");
  };
  const floatingBtnVariants: Variants = {
    initial: {
      opacity: 1,
    },
    hidden: {
      opacity: 0,
      pointerEvents: "none",
    },
  };
  const contextVal: IUploadPageContextValue = useMemo(
    () => ({
      allUploadedFiles,
      setAllUploadedFiles,
      uploadStage,
      setUploadStage,
      projectFiles,
      projectDetail,
      setDisableNavCompleteScreen,
      refetchProjectFiles: projectFileQuery.refetch,
    }),
    [allUploadedFiles, uploadStage, projectFiles, projectDetail]
  );

  useEffect(() => {
    const storageProjectId = window.localStorage.getItem("projectId");
    if (urlProjectId) window.localStorage.setItem("projectId", urlProjectId);
    else if (!projectId) {
      if (storageProjectId) setProjectId(storageProjectId)
      else if (!createProjectQuery.isPending)
        createProjectQuery.mutate({
          projectId: uuid(),
          projectName: "New Project",
          createStorey: false,
        });
    }
  }, []);

  useEffect(() => {
    const handleScrollStart = () => {
      if (!hideAddBtn) {
        setHideAddBtn(true);
      }

      // Clear the previous timer
      clearTimeout(scrollTimer);

      // Set a new timer to detect scroll end
      scrollTimer = setTimeout(() => {
        setHideAddBtn(false);
      }, 300); // Adjust the delay as needed
    };

    const div = fileContainerRef.current;
    if (div) {
      div.addEventListener("scroll", handleScrollStart);
    }

    return () => {
      if (div) {
        div.removeEventListener("scroll", handleScrollStart);
      }
      clearTimeout(scrollTimer); // Cleanup timer on unmount
    };
  }, [hideAddBtn]);

  return {
    filesOnDragged,
    handleFileDragEnter,
    handleFileDragLeave,
    getRootProps,
    getInputProps,
    handleFileFolderDrop,
    pendingFolderUpload,
    setPendingFolderUpload,

    uploadFilesInFolder,
    contextVal,
    allUploadedFiles,
    projectId,
    handleProcessFiles,
    processableFiles,
    projectFiles,
    isGettingProjectDetails: projectDetailQuery.isLoading,
    floatingBtnVariants,
    hideAddBtn,
    fileContainerRef,
    setHideAddBtn,
  };
};

export default useUploadPage;
