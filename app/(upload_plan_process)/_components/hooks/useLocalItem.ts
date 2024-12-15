import { useCallback, useEffect, useRef } from "react";
import { produce } from "immer";
import { useIsMutating } from "@tanstack/react-query";
import { ILocalUploadedFile } from "@/Models/FileUpload";
import { useUploadPageContext } from "./UploadProvider";
import {
  getPlanMutateKey,
  IGetAWSUrlFncParams,
  useAWSMutatePlan,
  useGetAWSPresignedUrl,
} from "../../../../services/useUploadPlan";

type Props = {
  item: ILocalUploadedFile;
  projectId: string | undefined;
};

const useLocalItem = ({ item, projectId }: Props) => {
  const { setLocalFiles } = useUploadPageContext();

  // change status to processing when upload starts
  const onStartUpload = useCallback(() => {
    setLocalFiles(
      produce((draft) => {
        const found = draft.find((f) => f.fileTempId === item.fileTempId);
        if (found) {
          found.fileState = "Processing";
        }

        return draft;
      })
    );
  }, []);

  // change status to finalising when upload completes
  const onCompletePreparing = useCallback(() => {
    setLocalFiles(
      produce((draft) => {
        const found = draft.find((f) => f.fileTempId === item.fileTempId);
        if (found) {
          found.fileState = "Finalising";
        }
        return draft;
      })
    );
  }, []);

  // change status to cancelled when upload is cancelled
  const onCancelUpload = useCallback(() => {
    setLocalFiles(
      produce((draft) => {
        const found = draft.find((f) => f.fileTempId === item.fileTempId);
        if (found) {
          found.fileState = "Cancelled";
        }
        return draft;
      })
    );
  }, []);

  // change status to completed when upload is successful
  const onSuccessUpload = useCallback(() => {
    setLocalFiles(
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

  // change status to failed when upload fails
  const onErrorUpload = useCallback(() => {
    // if (item.fileState === 'Processing')
    setLocalFiles(
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

  // get presigned url for file upload, when the api for presigned url success=> upload the file
  const getPresignedUrlMutation = useGetAWSPresignedUrl({
    onSuccessGetUrl: (url) => {
      uploadFileMutate({
        file: item.fileItem,
        awsUrl: url,
      });
      setLocalFiles(
        produce((draft) => {
          const found = draft.find((f) => f.fileTempId === item.fileTempId);
          if (found) found.awsUrl = url;
          return draft;
        })
      );
    },
    onErrorGetUrl: onErrorUpload,
  });

  // check if file is in uploading state
  const isUploadingState =
    item.fileState !== "Completed" &&
    item.fileState !== "Failed" &&
    item.fileState !== "Cancelled";

  // check if file is in getting presigned url state
  const isGettingPresignedURL =
    useIsMutating({
      mutationKey: getPlanMutateKey("getAwsUrl"),
      predicate: (q) =>
        (q.state.variables as IGetAWSUrlFncParams).fileId === item.fileTempId &&
        q.state.status === "pending",
    }) > 0;

  // cancel file upload
  const handleCancelFile = () => {
    if (
      item.fileState !== "Completed" &&
      item.fileState !== "Finalising" &&
      item.fileState !== "Failed" &&
      item.fileState !== "Cancelled"
    )
      reset();
    else
      setLocalFiles(
        produce((draft) => {
          draft = draft.filter((f) => f.fileTempId !== item.fileTempId);

          return draft;
        })
      );

    deleteFileMutate(item.fileTempId);
  };

  // retry file upload
  const handleRetry = () => {
    setLocalFiles(
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

export default useLocalItem;
