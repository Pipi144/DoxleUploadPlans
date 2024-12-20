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
} from "../../../../services/ProjectFilesQuery";
import { IPlanProjectDetails } from "@/Models/project";
import { IFolderUploadDetails, TAllowedFileType } from "@/Models/UtilitiModels";
import { useDoxleErrorWarningStore } from "@/GeneralStores/useDoxleErrorWarningStore";
import useProcessFileDrop from "./useProcessFileDrop";
import { getCookie, setCookie } from "cookies-next/client";
import { COOKIE_KEYS } from "@/app/Cookies";
import { createProject } from "../../action";
import { useToast } from "@/hooks/use-toast";
export interface IUploadPageContextValue {
  localFiles: ILocalUploadedFile[];
  setLocalFiles: React.Dispatch<React.SetStateAction<ILocalUploadedFile[]>>;
  serverFiles: ProjectFile[];
  projectDetail: IPlanProjectDetails | undefined;

  refetchProjectFiles: () => void;
}
const sizeLimit = 20971520;
const useUploadPage = ({ urlProjectId }: { urlProjectId?: string }) => {
  const [hideAddBtn, setHideAddBtn] = useState(false); // floating add btn control
  const [pendingFolderUpload, setPendingFolderUpload] = useState<
    IFolderUploadDetails[] | null
  >(null); // folder upload control to handle dropped folders
  const [filesOnDragged, setFilesOnDragged] = useState(false); // show dropping effect, when user is dragging files over the dropzone
  const [localFiles, setLocalFiles] = useState<ILocalUploadedFile[]>([]); // all local files uploaded by user

  const [projectId, setProjectId] = useState<string | undefined>(
    urlProjectId ?? undefined
  ); // project id
  const fileContainerRef = React.useRef<HTMLDivElement>(null);
  const { toast } = useToast(); //notification
  let scrollTimer: ReturnType<typeof setTimeout>;

  const projectFileQuery = useRetrieveProjectFiles({
    projectId,
    enablePolling: localFiles.length !== 0,
  });
  const projectDetailQuery = useRetrieveProjectDetails({
    projectId,
    enablePolling: false,
  });

  const projectDetail = projectDetailQuery.data?.data;
  const serverFiles = useMemo(
    () => projectFileQuery.data?.data ?? [],
    [projectFileQuery.data?.data]
  );
  const processedPreviously =
    projectDetail?.processClicked && projectDetail?.emailVerified;
  const processableFiles = serverFiles.length > 0;

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
    <T extends File>(acceptedFiles: T[], fileRejections: FileRejection[]) => {
      if (acceptedFiles.length > 0) {
        setLocalFiles(
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
        fileRejections.forEach((rejection, idx) => {
          errorFiles.push({
            ...rejection,
            errors: [
              {
                message:
                  rejection.errors[idx].code === "file-invalid-type"
                    ? "Invalid file type, please upload a PDF/zip file"
                    : rejection.errors[idx].code === "file-too-large"
                    ? `File size is greater than ${Math.round(
                        sizeLimit / (1024 * 1024)
                      )}Mb`
                    : rejection.errors[idx].message,
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
    maxSize: sizeLimit,
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

      setLocalFiles(
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
    setLocalFiles(
      produce((draft) => {
        draft.push(...allFiles);
        return draft;
      })
    );
  }, []);

  const handleFileFolderDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    try {
      setFilesOnDragged(false);
      const res = await handleProcessDropEntries(
        e,
        allowedFileTypes,
        sizeLimit
      );
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
      localFiles,
      setLocalFiles,

      serverFiles,
      projectDetail,
      refetchProjectFiles: projectFileQuery.refetch,
    }),
    [localFiles, serverFiles, projectDetail]
  );

  const createNewProject = async () => {
    try {
      const result = await createProject({
        projectId: uuid(),
        projectName: "New Project",
        createStorey: false,
      });

      if (result) {
        setProjectId(result.projectId);
      } else toast({ title: "Error", description: "Error creating project" });
    } catch (error) {
      console.error("ERROR createProject:", error);
    }
  };
  useEffect(() => {
    const storageProjectId = getCookie(COOKIE_KEYS.ProjectId);

    if (urlProjectId)
      setCookie(COOKIE_KEYS.ProjectId, urlProjectId, {
        maxAge: 60 * 60 * 24 * 7, //7 days
      });
    else if (!projectId) {
      if (storageProjectId) setProjectId(storageProjectId);
      else createNewProject();
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
    processedPreviously,
    uploadFilesInFolder,
    contextVal,
    localFiles,
    projectId,
    processableFiles,
    serverFiles,
    isGettingProjectDetails: projectDetailQuery.isLoading,
    floatingBtnVariants,
    hideAddBtn,
    fileContainerRef,
    setHideAddBtn,
  };
};

export default useUploadPage;
