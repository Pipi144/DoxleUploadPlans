import HomeMenu from "@/components/DesignPatterns/HomeMenu";
import FileErrorWarning from "./@file_error_warning/page";
import introImg from "../public/images/introImage.png";
import Link from "next/link";
import { DoxleRoutes } from "@/DoxleRoutes";
import UploadBannerBgLine from "@/components/UploadBannerBgLine";
const descriptionText =
  "Doxle.ai simplifies estimating, budgeting, and engineering by using machine learning to autonomously interpret working drawings. Our technology generates a 3D model with IFC components, allowing framing elements to be visualised directly on site. This streamlines time-consuming task";

export default async function Home() {
  return (
    <div className="w-full h-full  overflow-auto flex flex-col items-center bg-gridBg bg-grid-bg-size bg-primaryBg">
      <HomeMenu />

      <div className="flex w-full flex-1 justify-between transition-all duration-200 ease-linear overflow-hidden flex-col-reverse laptop:flex-row landscape:flex-row  ">
        <div className="hidden laptop:block landscape:block w-[max(10%,100px)] " />
        <div className="flex flex-col justify-center items-center w-full laptop:w-[unset] laptop:flex-1 h-fit laptop:h-full landscape:h-full   transition-all duration-200 ease-linear">
          <span
            className="font-lora text-[35px] tablet:text-[40px]  desktop:text-[55px] text-[#315CDB] font-normal text-center desktop:min-w-[535px]"
            contentEditable={false}
          >
            The future of estimating
          </span>

          <span className="text-[12px] tablet:text-[14px] font-normal font-sourcecode w-[90%] max-w-[90%] tablet:max-w-[800px]  text-justify my-[10px] laptop:my-[14px]">
            {descriptionText}
          </span>

          <Link
            className="bg-black active:bg-slate-500 cursor-pointer hover:opacity-70 disabled:bg-slate-500 min-w-[70px] tablet:min-w-[80px] flex text-white disabled:text-[rgba(255,255,255,0.5)] text-[14px] tablet:text-[16px]  font-lexend font-normal justify-center items-center rounded-[4px] hover:rounded-[8px]  py-[10px] tablet:py-[12px] px-[20px] tablet:px-[24px] leading-normal mt-[20px] mb-[40px] transition-all duration-200 ease-linear"
            href={DoxleRoutes.UploadPlanPage}
            prefetch={true}
          >
            Upload plans
          </Link>
          <img
            src={introImg.src}
            alt="intro image"
            className="w-[70%]  max-w-[800px] mt-[30px] object-contain hidden laptop:block landscape:block"
          />
        </div>
        <div className="hidden laptop:block landscape:block w-[max(10%,100px)]" />
        <div className="flex relative laptop:max-w-[768px] w-full laptop:w-2/5 landscape:w-2/5 laptop:h-full landscape:h-full flex-1 laptop:flex-none ml-[18%] mobileMd:ml-[12%] laptop:ml-0 mb-[20px] laptop:mb-0 transition-all duration-200 ease-linear">
          <div className="absolute w-[20%]  top-1/2 min-w-[100px] laptop:min-w-[140px] landscape:min-w-[160px] max-w-[140px] laptop:max-w-[400px] aspect-square bg-[#8eb5f0] -translate-x-[50%] -translate-y-[40%] laptop:-translate-y-[40%] landscape:-translate-y-[40%] z-[1] transition-all duration-200 ease-linear" />

          <div className="absolute w-1/3  laptop:w-2/5 landscape:w-2/5 max-w-[200px] laptop:max-w-[500px] aspect-square left-[2%] rounded-[50%] bg-[#285cf2] z-0 min-w-[120px] mobileMd:min-w-[145px] laptop:min-w-[225px] landscape:min-w-[245px] top-[52%] laptop:top-1/2 landscape:top-1/2  transition-all duration-200 ease-linear" />

          <div className="absolute z-[6] top-[52%] laptop:top-1/2  landscape:top-1/2 scale-y-[1.1] w-[20%] laptop:w-[30%] landscape:w-[30%] left-[22%] laptop:left-[32%] landscape:left-[32%] max-w-[140px] laptop:max-w-[400px] aspect-[1.25] bg-[#1e1e1e] min-w-[90px] tablet:min-w-[10px] laptop:min-w-[140px] landscape:min-w-[160px] clip-triangle transition-all duration-200 ease-linear" />

          <UploadBannerBgLine />
        </div>
      </div>

      <FileErrorWarning />
    </div>
  );
}
