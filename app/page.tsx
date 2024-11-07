import HomeMenu from "@/components/DesignPatterns/HomeMenu";
import FileErrorWarning from "./@file_error_warning/page";
import introImg from "../public/images/introImage.png";
import Image, { ImageLoader } from "next/image";
const descriptionText =
  "Doxle.ai simplifies estimating, budgeting, and engineering by using machine learning to autonomously interpret working drawings. Our technology generates a 3D model with IFC components, allowing framing elements to be visualised directly on site. This streamlines time-consuming task";

export default async function Home() {
  return (
    <div className="w-full h-full p-[20px] overflow-auto flex flex-col items-center bg-gridBg bg-grid-bg-size bg-primaryBg">
      <HomeMenu />

      <div className="w-full flex flex-1 flex-col items-center justify-center">
        <span
          className="font-lora text-[35px] tablet:text-[50px] laptop:text-[64px] text-[#315CDB] font-medium"
          contentEditable={false}
        >
          The future of estimating
        </span>
        <span className="text-[12px] tablet:text-[14px] font-normal font-sourcecode max-w-[85%] tablet:max-w-[70%] laptop:max-w-[50%] text-left my-[10px] laptop:my-[14px]">
          {descriptionText}
        </span>
        <img
          src={introImg.src}
          alt="intro image"
          className="w-[90%] max-w-[600px] object-contain mt-[50px] laptop:mt-[120px]"
        />
      </div>

      <FileErrorWarning />
    </div>
  );
}
