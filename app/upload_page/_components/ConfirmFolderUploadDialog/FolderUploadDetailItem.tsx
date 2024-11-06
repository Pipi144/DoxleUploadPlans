import React, { memo, useCallback, useState } from "react";

import { produce } from "immer";

import AddedFileItem from "./AddedFileItem";
import InvalidFileItem from "./InvalidFileItem";
import { IFolderUploadDetails } from "@/Models/UtilitiModels";
import { Input } from "@/components/ui/input";

type Props = {
  item: IFolderUploadDetails;
  itemIndex: number;
  setFolder: React.Dispatch<
    React.SetStateAction<IFolderUploadDetails[] | null>
  >;
};

const FolderUploadDetailItem = ({ item, itemIndex, setFolder }: Props) => {
  const onFolderNameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFolder(
      produce((draft) => {
        if (draft) {
          draft[itemIndex].folderName = e.target.value;
        }
        return draft;
      })
    );
  };
  const handleRemoveFile = useCallback((fileIndex: number) => {
    setFolder(
      produce((draft) => {
        if (draft) {
          draft[itemIndex].files.splice(fileIndex, 1);
        }
        return draft;
      })
    );
  }, []);
  return (
    <div className="w-full flex flex-col py-[10px] border-b-[1px] border-solid border-dxBorder">
      {item.isNestedFolder && (
        <div className="field-wrapper">
          <div className="label">Failed Folder</div>

          <div className="flex-1 flex flex-col">
            <span className="font-lexend text-[14px] font-normal text-white mb-[4px]">
              {item.folderName}
            </span>
            <span className="font-lexend text-[12px] font-normal text-[rgba(255,255,255,0.5)]">
              Nested folder not supported
            </span>
          </div>
        </div>
      )}
      {!item.isNestedFolder && (
        <>
          <div className="field-wrapper vert-center">
            <div className="label">Folder Name</div>
            <Input
              value={item.folderName}
              onChange={onFolderNameChange}
              onKeyDown={(e) => {
                if (e.nativeEvent.key === "Enter") {
                  e.preventDefault();

                  (e.target as HTMLInputElement).blur();
                }
              }}
              autoFocus
            />
          </div>

          <div className="field-wrapper">
            <div className="label">Valid Files</div>
            <div className="flex-1 flex items-center flex-wrap text-[14px] font-medium font-lexend text-[rgba(255,255,255,0.7)]">
              {item.files.length > 0
                ? item.files.map((file: File, index) => (
                    <AddedFileItem
                      key={`${file.name}-${index}`}
                      file={file}
                      handleRemoveFile={handleRemoveFile}
                      index={index}
                    />
                  ))
                : "No valid files"}
            </div>
          </div>

          {item.filesError && item.filesError?.length > 0 && (
            <div className="field-wrapper">
              <div className="label">Invalid Files</div>
              <div className="flex-1 flex flex-col">
                {item.filesError.map((file, index) => (
                  <InvalidFileItem key={`${index}`} file={file} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default memo(FolderUploadDetailItem);
