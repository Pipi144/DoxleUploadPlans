"use client";

import {
  DoxleCSVIcon,
  DoxleExcelIcon,
  DoxlePDFIcon,
  DoxleTextIcon,
  DoxleWordIcon,
} from "@/components/DoxleIcons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDoxleErrorWarningStore } from "@/GeneralStores/useDoxleErrorWarningStore";
import { checkSupportedFileType } from "@/Utilities/MimeFileType";

import React from "react";
import { CiFileOff } from "react-icons/ci";
import { useShallow } from "zustand/react/shallow";

export default function FileErrorWarning() {
  const { clearCurrentErrorFiles, currentErrorFiles } =
    useDoxleErrorWarningStore(
      useShallow((state) => ({
        clearCurrentErrorFiles: state.clearCurrentErrorFiles,
        currentErrorFiles: state.currentErrorFiles,
      }))
    );
  return (
    <Dialog
      open={Boolean(currentErrorFiles.length > 0)}
      onOpenChange={(open) => {
        if (!open) {
          clearCurrentErrorFiles();
        }
      }}
    >
      <DialogContent className="bg-white px-[20px] py-[14px] ">
        <DialogHeader className="w-full items-center flex flex-row border-borderWhiteBg border-b-[1px] border-solid ">
          <DialogTitle className="font-lexend font-semibold text-[20px] text-black ">
            {currentErrorFiles.length} Error File
            {currentErrorFiles.length > 1 ? "s" : ""}
          </DialogTitle>
        </DialogHeader>
        {currentErrorFiles.map((file, idx) => {
          const supportedFileType = checkSupportedFileType({
            type: file.file.type,
          });

          return (
            <div
              key={`key#${idx}`}
              className="w-full py-[8px] flex items-center border-borderWhiteBg border-b-[1px] border-solid"
            >
              {supportedFileType === "pdf" ? (
                <DoxlePDFIcon
                  containerStyle={{
                    width: 35,
                  }}
                />
              ) : supportedFileType === "doc" ? (
                <DoxleWordIcon
                  containerStyle={{
                    width: 35,
                  }}
                />
              ) : supportedFileType === "xls" ? (
                <DoxleExcelIcon
                  containerStyle={{
                    width: 35,
                  }}
                />
              ) : supportedFileType === "csv" ? (
                <DoxleCSVIcon
                  containerStyle={{
                    width: 35,
                  }}
                />
              ) : supportedFileType === "text" ? (
                <DoxleTextIcon
                  containerStyle={{
                    width: 35,
                  }}
                />
              ) : (
                <CiFileOff className="text-black" size={35} />
              )}
              <div className="flex-1 flex flex-col ml-[14px]">
                <span className="w-full overflow-hidden whitespace-pre-wrap font-lexend font-semibold text-[15px] mb-[5px] text-black">
                  {file.file.name}
                </span>
                {file.errors.map((error, idx) => (
                  <span
                    key={`error#${idx}`}
                    className="w-full overflow-hidden whitespace-pre-wrap font-lexend font-normal text-[13px] text-black mb-[2px]"
                  >
                    * {error.message}
                  </span>
                ))}
              </div>
            </div>
          );
        })}

        <DialogFooter className="justify-end p-0">
          <DialogClose asChild>
            <Button
              type="button"
              className="bg-black text-white text-[14px] font-medium font-lexend  px-[20px] "
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
