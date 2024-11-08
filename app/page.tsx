import HomeMenu from "@/components/DesignPatterns/HomeMenu";
import FileErrorWarning from "./@file_error_warning/page";
import introImg from "../public/images/introImage.png";
import Link from "next/link";
import { DoxleRoutes } from "@/DoxleRoutes";
const descriptionText =
  "Doxle.ai simplifies estimating, budgeting, and engineering by using machine learning to autonomously interpret working drawings. Our technology generates a 3D model with IFC components, allowing framing elements to be visualised directly on site. This streamlines time-consuming task";

export default async function Home() {
  return (
    <div className="w-full h-full p-[20px] overflow-auto flex flex-col items-center bg-gridBg bg-grid-bg-size bg-primaryBg">
      <HomeMenu />

      <div className="w-full flex flex-1 flex-col items-center justify-center">
        <span
          className="font-lora text-[35px] tablet:text-[50px] laptop:text-[64px] text-[#315CDB] font-normal"
          contentEditable={false}
        >
          The future of estimating
        </span>

        <span className="text-[12px] tablet:text-[14px] font-normal font-sourcecode max-w-[85%] tablet:max-w-[70%] laptop:max-w-[40%] text-left my-[10px] laptop:my-[14px]">
          {descriptionText}
        </span>

        <Link
          className="bg-black active:bg-slate-500 cursor-pointer hover:opacity-70 disabled:bg-slate-500 min-w-[70px] tablet:min-w-[80px] flex text-white disabled:text-[rgba(255,255,255,0.5)] text-[14px] tablet:text-[16px]  font-lexend font-normal justify-center items-center rounded-[4px] hover:rounded-[8px]  py-[10px] tablet:py-[12px] px-[20px] tablet:px-[24px] leading-normal mt-[20px] mb-[40px] transition-all duration-200 ease-linear"
          href={DoxleRoutes.UploadBanner}
          prefetch={true}
        >
          Try for free
        </Link>
        <img
          src={introImg.src}
          alt="intro image"
          className="w-[90%] max-w-[600px] object-contain "
        />
      </div>

      <FileErrorWarning />
    </div>
  );
}
