import { TAllowedFileType } from "@/Models/UtilitiModels";
import React from "react";
import { FileRejection } from "react-dropzone";

type TProcessError = "Nested folder not supported" | "Processing Error";

type TSuccessDropResult = {
  folderName: string | undefined;
  files: File[];
  filesRejected: FileRejection[];
  isNestedFolder?: boolean;
};
const useProcessFileDrop = () => {
  const isTypeProcessError = (error: any): error is TProcessError =>
    error === "Nested folder not supported" || error === "Processing Error";

  const checkFileTypeValid = (
    file: File,
    allowTypeList: TAllowedFileType[]
  ): boolean => {
    const mimeIndex: number = allowTypeList.findIndex((type) =>
      file.type.startsWith(type.mimePrefix)
    );
    if (mimeIndex === -1) return false;
    const extIndex: number = allowTypeList[mimeIndex].extensions.findIndex(
      (ext) => file.name.toLowerCase().endsWith(ext.toLowerCase())
    );
    return extIndex >= 0;
  };
  const getFile = async (
    fileEntry: FileSystemFileEntry
  ): Promise<File | undefined> => {
    try {
      return new Promise((resolve, reject) => fileEntry.file(resolve, reject));
    } catch (err) {
      return;
    }
  };

  const getEntriesDrop = (e: React.DragEvent<HTMLDivElement>) => {
    const fileSystemFolderEntry: FileSystemDirectoryEntry[] = [];
    const fileSystemEntries: FileSystemFileEntry[] = [];
    // Parse first level objects
    for (let i = 0; i < e.dataTransfer.items.length; i++) {
      const item = e.dataTransfer.items[i].webkitGetAsEntry();
      if (item?.isFile) fileSystemEntries.push(item as FileSystemFileEntry);
      if (item?.isDirectory) {
        fileSystemFolderEntry.push(item as FileSystemDirectoryEntry);
      }
    }

    return {
      folders: fileSystemFolderEntry,
      files: fileSystemEntries,
    };
  };
  const extractFolderFiles = async (
    folderEntry: FileSystemDirectoryEntry,
    allowedTypeList: TAllowedFileType[]
  ): Promise<TSuccessDropResult> => {
    let isNested: boolean = false;
    const folderName = folderEntry.name;
    const files: File[] = [];
    const filesRejected: FileRejection[] = [];
    const reader = folderEntry.createReader();
    const readEntriesAsync = (): Promise<FileSystemEntry[]> => {
      return new Promise((resolve, reject) => {
        reader.readEntries((entries) => {
          if (entries.length === 0) {
            resolve([]);
          } else {
            resolve(entries);
          }
        }, reject);
      });
    };
    let entries: FileSystemEntry[];
    do {
      entries = await readEntriesAsync();
      for (const entry of entries) {
        if (entry.isDirectory) {
          isNested = true;
          break;
        } else if (entry.isFile) {
          const fileEntry = entry as FileSystemFileEntry;
          const file = await getFile(fileEntry);
          if (file) {
            if (checkFileTypeValid(file, allowedTypeList)) {
              if (file.size > 50000000)
                filesRejected.push({
                  file,
                  errors: [
                    {
                      message: "File size is greater than 50Mb",
                      code: "file-too-large",
                    },
                  ],
                });
              else files.push(file);
            } else
              filesRejected.push({
                file,
                errors: [
                  {
                    message: "File type not allowed",
                    code: "file-invalid-type",
                  },
                ],
              });
          }
        }
      }
    } while (entries.length > 0);

    return {
      folderName,
      files,
      filesRejected,
      isNestedFolder: isNested,
    };
  };

  const handleProcessDropEntries = async (
    e: React.DragEvent<HTMLDivElement>,
    allowedTypeList: TAllowedFileType[]
  ): Promise<TSuccessDropResult[] | TProcessError> => {
    try {
      const { files: fileEntries, folders } = getEntriesDrop(e);
      // If folder was found, extract contents and confirm with user
      let finalData: TSuccessDropResult[] = [];

      if (folders.length > 0) {
        const folderData: TSuccessDropResult[] = [];
        for (const folder of folders) {
          const result = await extractFolderFiles(folder, allowedTypeList);
          folderData.push(result);
        }
        finalData = finalData.concat(folderData);
      }
      // read files not belong to a folder
      if (fileEntries.length > 0) {
        const filesProcess: File[] = [];
        const errorFiles: FileRejection[] = [];
        for (const fileItem of fileEntries) {
          const file = await getFile(fileItem);
          if (file) {
            if (checkFileTypeValid(file, allowedTypeList)) {
              if (file.size > 110000000)
                errorFiles.push({
                  file,
                  errors: [
                    {
                      message: "File size is greater than 110Mb",
                      code: "file-too-large",
                    },
                  ],
                });
              else filesProcess.push(file);
            } else
              errorFiles.push({
                file,
                errors: [
                  {
                    message: "File type not allowed",
                    code: "file-invalid-type",
                  },
                ],
              });
          }
        }
        finalData.push({
          folderName: undefined,
          files: filesProcess,
          filesRejected: errorFiles,
        });
      }
      return finalData;
    } catch (e) {
      if (isTypeProcessError(e)) return e;
      else return "Processing Error";
    }
  };
  return { checkFileTypeValid, handleProcessDropEntries, getEntriesDrop };
};

export default useProcessFileDrop;
