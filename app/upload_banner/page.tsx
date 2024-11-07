import React from "react";
import UploadBannerBgLine from "./UploadBannerBgLine";
import DoxleIconPlain from "@/components/DoxleIcons";
import UploadBtn from "./_components/UploadBtn";

export default async function UploadBanner() {
  return (
    <div className="flex w-full h-full justify-between transition-all duration-200 ease-linear overflow-hidden flex-col-reverse landscape:flex-row tablet:flex-row ">
      <div className="flex flex-col justify-end w-full tablet:w-1/2 laptop:w-2/5 landscape:w-1/2 h-fit tablet:h-full landscape:h-full pb-[20px] tablet:pb-[50px] landscape:pb-[20px] pl-[20px] tablet:pl-[50px] landscape:pl-[50px] transition-all duration-200 ease-linear">
        <DoxleIconPlain className="w-[50px] tablet:w-[60px] laptop:w-[80px] transition-all duration-200 ease-linear" />
        <div className="max-w-[420px] text-black text-[16px] my-[10px] mr-[50px] font-lexend font-medium no-underline normal-case">
          Estimate in <span className="font-extrabold underline">minutes</span>.
          Upload your working drawings, engineering, drainage, soil report etc.
          <br />
          <span className="text-[12px] font-normal">
            (Pdf format only - max size 50MB)
          </span>
        </div>

        <UploadBtn />
      </div>

      <div className="flex relative max-w-[768px] w-full tablet:w-1/2 laptop:w-3/5 landscape:w-2/5 tablet:h-[95%] laptop:h-full landscape:h-full flex-1 tablet:flex-none ml-[20%] mobileMd:ml-[15%] tablet:mb-0 mb-[20px] mobileMd:mb-[40px] tablet:ml-0 transition-all duration-200 ease-linear">
        <div className="absolute w-[30%] top-1/2 tablet:top-[52%] laptop:top-1/2 min-w-[140px]  laptop:min-w-[180px] max-w-[400px] aspect-square bg-[#8eb5f0] -translate-x-[50%] -translate-y-[40%] laptop:-translate-y-[40%] landscape:-translate-y-[40%] z-[1] transition-all duration-200 ease-linear" />

        <div className="absolute w-1/2 max-w-[500px] aspect-square left-[2%] rounded-[50%] bg-[#285cf2] z-0 min-w-[200px] mobileMd:min-w-[285px] landscape:min-w-[180px] top-[52%] tablet:top-3/5 laptop:top-1/2  transition-all duration-200 ease-linear" />

        <div className="absolute z-[6] top-1/2 scale-y-[1.1] w-[30%] left-[32%] max-w-[400px] aspect-[1.25] bg-[#1e1e1e] min-w-[140px] mobileMd:min-w-[180px] clip-triangle transition-all duration-200 ease-linear" />

        <UploadBannerBgLine />
      </div>
    </div>
  );
}
