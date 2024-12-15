import { memo } from "react";

import { IoClose } from "react-icons/io5";

import { CgRedo } from "react-icons/cg";
import { AnimatePresence, motion } from "framer-motion";
import { ILocalUploadedFile } from "@/Models/FileUpload";
import useLocalItem from "./hooks/useLocalItem";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

type Props = {
  item: ILocalUploadedFile;
  projectId: string | undefined;
};
const AnimatedButton = motion.create(Button);
const LocalItem = ({ item, projectId }: Props) => {
  const { progress, estimatedTime, handleCancelFile, handleRetry } =
    useLocalItem({ item, projectId });

  const bannerColor = `rgba(46,103,254,${
    item.fileState === "Completed"
      ? 1
      : item.fileState === "Uploading"
      ? progress / 100
      : 0.4
  })`;
  return (
    <div
      className={`flex flex-col rounded-[8px] relative m-[10px] tablet:m-[20px] laptop:m-[30px] bg-white border-[2px] border-solid border-borderWhiteBg self-start aspect-[0.95] w-[calc(50%-20px)] tablet:w-[calc(50%-40px)] laptop:w-[calc(50%-60px)] p-[14px] transition-all duration-200 ease-linear`}
    >
      <div
        style={{
          aspectRatio: 89 / 76,
        }}
        className="aspect-[89/76] w-1/2 self-center my-auto"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 89 76"
          fill="none"
        >
          <path
            fill={bannerColor ?? "#9BB6FE"}
            d="M.51 0h87.303v3.909H.51zm0 71.668h88.107v3.402H.51zM28 38.191h58.015v3.402H28zM.994 38.105h15.401v3.402H.994z"
          />
          <path
            fill={bannerColor ?? "#9BB6FE"}
            d="M16.943 29.969v11.347h-3.402V29.969zm13.03 0v11.347h-3.402V29.969zm19.761 33.449v8.677h-3.402v-8.677zM35.691 13.551h9.345v3.402h-9.345z"
          />
          <path
            fill={bannerColor ?? "#9BB6FE"}
            d="M42.207 16.938V1.302h3.909v15.636zM.51 72.754V-.001h3.402v72.755zm84.697 1.336V0h3.402v74.09z"
          />
        </svg>
      </div>

      <span className="text-black text-[16px] tablet:text-[22px] font-lexend font-normal mt-[8px] tablet:mt-[14px] whitespace-nowrap overflow-hidden overflow-ellipsis">
        {item.fileItem.name}
      </span>
      {item.fileState === "Failed" && (
        <span
          className={`text-10px tablet:text-[14px] font-lexend font-light mt-[5px] mb-[8px] text-[#CA0730]`}
        >
          Error, try again, {(item.fileItem.size / (1024 * 1024)).toFixed(2)} MB
        </span>
      )}

      {item.fileState === "Completed" && (
        <span
          className={`text-10px tablet:text-[14px] font-lexend font-light  mb-[5px] text-[rgba(0,0,0,0.5)]`}
        >
          Completed - {(item.fileItem.size / (1024 * 1024)).toFixed(2)} MB
        </span>
      )}
      {item.fileState !== "Failed" && item.fileState !== "Completed" && (
        <span
          className={`text-8px tablet:text-[14px] font-lexend font-light  mb-[5px] text-[rgba(0,0,0,0.5)]`}
        >
          {(item.fileItem.size / (1024 * 1024)).toFixed(2)} MB °
          {item.fileState !== "Uploading" && item.fileState}{" "}
          {item.fileState === "Uploading" &&
            ` ${Math.floor(
              estimatedTime >= 60 ? estimatedTime / 60 : estimatedTime
            )} ${estimatedTime >= 60 ? "mins" : "secs"} remaining`}
        </span>
      )}

      <Progress
        value={
          item.fileState === "Processing"
            ? progress
            : item.fileState === "Completed" || item.fileState === "Failed"
            ? 100
            : item.fileState === "Cancelled"
            ? 0
            : 5
        }
        className="h-[5px]"
        indicatorClassName={`h-full w-full flex-1 ${
          item.fileState === "Completed" // complete status
            ? "bg-[#11B221]"
            : item.fileState === "Failed"
            ? "bg-[#CA0730]"
            : "bg-doxleColor"
        }   transition-all`}
      />

      <div className="absolute -top-[8px] -right-[8px] z-[5] flex items-center">
        <AnimatePresence>
          {(item.fileState === "Failed" || item.fileState === "Cancelled") && (
            <AnimatedButton
              onClick={handleRetry}
              layout="position"
              animate={{
                scale: [0, 1],
              }}
              viewport={{ once: true }}
              exit={{ scale: 0 }}
              transition={{
                duration: 0.2,
              }}
              className="bg-[rgba(0,0,0,0.8)] flex flex-row items-center w-[30px] tablet:w-[33px] h-[30px] tablet:h-[33px] rounded-[50%] justify-center active:bg-[rgba(0,0,0,0.25)] hover:opacity-80 ml-[8px]"
            >
              <CgRedo className="text-white text-[18px] tablet:text-[20px] flex-shrink-0 " />
            </AnimatedButton>
          )}
        </AnimatePresence>
        {item.fileState !== "Completed" && (
          <AnimatedButton
            onClick={handleCancelFile}
            className="bg-[rgba(0,0,0,0.8)] flex flex-row items-center w-[30px] tablet:w-[33px] h-[30px] tablet:h-[33px] rounded-[50%] justify-center active:bg-[rgba(0,0,0,0.25)] hover:opacity-80 ml-[8px]"
          >
            <IoClose className="text-white text-[18px] tablet:text-[20px] flex-shrink-0 " />
          </AnimatedButton>
        )}
      </div>
    </div>
  );
};

export default memo(LocalItem);
