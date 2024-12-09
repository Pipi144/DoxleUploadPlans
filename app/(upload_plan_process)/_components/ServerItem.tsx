import { BiErrorCircle } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { ProjectFile } from "../../../services/ProjectFilesQuery";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import useServerItem from "./hooks/useServerItem";

type Props = {
  item: ProjectFile;
};

const ServerItem = ({ item }: Props) => {
  const { handleRemoveFile } = useServerItem({
    item,
  });
  return (
    <div className="flex flex-col rounded-[8px] relative m-[10px] tablet:m-[20px] laptop:m-[30px] bg-white border-[2px] border-solid border-borderWhiteBg self-start aspect-[0.95] w-[calc(50%-20px)] tablet:w-[calc(50%-40px)] laptop:w-[calc(50%-60px)] p-[14px] transition-all duration-200 ease-linear">
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
            fill={`rgba(46,103,254,1)`}
            d="M.51 0h87.303v3.909H.51zm0 71.668h88.107v3.402H.51zM28 38.191h58.015v3.402H28zM.994 38.105h15.401v3.402H.994z"
          />
          <path
            fill={`rgba(46,103,254,1)`}
            d="M16.943 29.969v11.347h-3.402V29.969zm13.03 0v11.347h-3.402V29.969zm19.761 33.449v8.677h-3.402v-8.677zM35.691 13.551h9.345v3.402h-9.345z"
          />
          <path
            fill={`rgba(46,103,254,1)`}
            d="M42.207 16.938V1.302h3.909v15.636zM.51 72.754V-.001h3.402v72.755zm84.697 1.336V0h3.402v74.09z"
          />
        </svg>
      </div>
      <div className="w-full flex items-center mt-[14px]">
        <span className="text-black text-[16px] tablet:text-[22px] font-lexend font-normal whitespace-nowrap overflow-hidden overflow-ellipsis flex-1 mr-[4px]">
          {item.fileName}
        </span>
        {item.status === "Failed" && (
          <TooltipProvider>
            <Tooltip delayDuration={0}>
              <TooltipTrigger>
                <BiErrorCircle className="text-[20px] text-[#ca0730] self-center ml-auto flex-shrink-0 cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent>
                <span className="font-lexend text-[12px] tablet:text-[14px] font-medium">
                  {item.statusDetail || "Failed to process"}
                </span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      <span className="text-10px tablet:text-[14px] font-lexend font-light  mb-[5px] text-[rgba(0,0,0,0.5)]">
        {(item.fileSize / (1024 * 1024)).toFixed(2)} MB
      </span>

      <Progress
        value={100}
        className="h-[5px]"
        indicatorClassName="h-full w-full flex-1 bg-[#11b221] transition-all"
      />
      <div className="absolute -top-[8px] -right-[8px] z-[5] flex items-center">
        <Button
          onClick={handleRemoveFile}
          className="bg-[rgba(0,0,0,0.8)] flex flex-row items-center w-[30px] tablet:w-[33px] h-[30px] tablet:h-[33px] rounded-[50%] justify-center active:bg-[rgba(0,0,0,0.25)] hover:opacity-80"
        >
          <IoClose className="text-white text-[18px] tablet:text-[20px] flex-shrink-0 " />
        </Button>
      </div>
    </div>
  );
};

export default ServerItem;
