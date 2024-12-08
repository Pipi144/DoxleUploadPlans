import { useCallback, useEffect, useRef } from "react";
import { produce } from "immer";
import { useIsMutating } from "@tanstack/react-query";
import { ILocalUploadedFile } from "@/Models/FileUpload";
import { useUploadPageContext } from "./UploadProvider";
import {
  getPlanMutateKey,
  useAWSMutatePlan,
  useGetAWSPresignedUrl,
} from "../../../../services/useUploadPlan";

type Props = {
  item: ILocalUploadedFile;
  projectId: string | undefined;
};

const useUploadItem = ({ item, projectId }: Props) => {
  const { setAllUploadedFiles } = useUploadPageContext();
  const onStartUpload = useCallback(() => {
    setAllUploadedFiles(
      produce((draft) => {
        const found = draft.find((f) => f.fileTempId === item.fileTempId);
        if (found) {
          found.fileState = "Processing";
        }

        return draft;
      })
    );
  }, []);
  const onCompletePreparing = useCallback(() => {
    setAllUploadedFiles(
      produce((draft) => {
        const found = draft.find((f) => f.fileTempId === item.fileTempId);
        if (found) {
          found.fileState = "Finalising";
        }
        return draft;
      })
    );
  }, []);
  const onCancelUpload = useCallback(() => {
    setAllUploadedFiles(
      produce((draft) => {
        const found = draft.find((f) => f.fileTempId === item.fileTempId);
        if (found) {
          found.fileState = "Cancelled";
        }
        return draft;
      })
    );
  }, []);
  const onSuccessUpload = useCallback(() => {
    setAllUploadedFiles(
      produce((draft) => {
        const found = draft.find((f) => f.fileTempId === item.fileTempId);
        if (found) {
          found.fileState = "Completed";
        }
        // const foundIdx = draft.findIndex(
        //   (f) => f.fileTempId === item.fileTempId
        // );
        // if (foundIdx !== -1) {
        //   draft.splice(foundIdx, 1);
        // }
        return draft;
      })
    );
  }, []);
  const onErrorUpload = useCallback(() => {
    // if (item.fileState === 'Processing')
    setAllUploadedFiles(
      produce((draft) => {
        const found = draft.find((f) => f.fileTempId === item.fileTempId);
        if (found) {
          found.fileState = "Failed";
        }
        return draft;
      })
    );
  }, []);

  const {
    patch: {
      isPending: isFileUploading,
      progress,
      estimatedTime,
      reset,
      mutate: uploadFileMutate,
    },
    deleteFile: { mutate: deleteFileMutate },
  } = useAWSMutatePlan({
    onCompletePreparing,
    onCancelUpload,
    onSuccessUpload,
    onErrorUpload,
    onStartingUpload: onStartUpload,
  });

  const getPresignedUrlMutation = useGetAWSPresignedUrl({
    onSuccessGetUrl: (url) => {
      uploadFileMutate({
        file: item.fileItem,
        awsUrl: url,
      });
      setAllUploadedFiles(
        produce((draft) => {
          const found = draft.find((f) => f.fileTempId === item.fileTempId);
          if (found) found.awsUrl = url;
          return draft;
        })
      );
    },
    onErrorGetUrl: onErrorUpload,
  });

  const isUploadingState =
    item.fileState !== "Completed" &&
    item.fileState !== "Failed" &&
    item.fileState !== "Cancelled";
  const isGettingPresignedURL =
    useIsMutating({
      mutationKey: getPlanMutateKey("getAwsUrl"),
      predicate: (q) =>
        q.state.variables.fileTempId === item.fileTempId &&
        q.state.status === "pending",
    }) > 0;

  const handleCancelFile = () => {
    if (
      item.fileState !== "Completed" &&
      item.fileState !== "Finalising" &&
      item.fileState !== "Failed" &&
      item.fileState !== "Cancelled"
    )
      reset();
    else
      setAllUploadedFiles(
        produce((draft) => {
          draft = draft.filter((f) => f.fileTempId !== item.fileTempId);

          return draft;
        })
      );

    deleteFileMutate(item.fileTempId);
  };
  const handleRetry = () => {
    setAllUploadedFiles(
      produce((draft) => {
        const found = draft.find((f) => f.fileTempId === item.fileTempId);
        if (found) {
          found.fileState = "Preparing";
        }
      })
    );
  };

  // prevent strict mode
  const isMounted = useRef(false);
  useEffect(() => {
    //conditions to only allow getting presigned url once
    if (
      projectId &&
      item.fileState === "Preparing" &&
      !isFileUploading &&
      !isGettingPresignedURL &&
      !isMounted.current
    ) {
      getPresignedUrlMutation.mutate({
        fileName: item.fileItem.name,
        fileType: item.fileItem.type,
        fileSize: item.fileItem.size,
        fileId: item.fileTempId,
        projectId,
      });
    }
    isMounted.current = true;
  }, [
    item.fileState,
    isFileUploading,
    isGettingPresignedURL,
    isMounted.current,
    projectId,
  ]);
  return {
    isUploadingState,
    progress,
    estimatedTime,
    handleCancelFile,
    handleRetry,
  };
};

export default useUploadItem;
