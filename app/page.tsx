import HomeMenu from "@/components/DesignPatterns/HomeMenu";
import FileErrorWarning from "./@file_error_warning/page";
const descriptionText =
  "Doxle.ai simplifies estimating, budgeting, and engineering by using machine learning to autonomously interpret working drawings. Our technology generates a 3D model with IFC components, allowing framing elements to be visualised directly on site. This streamlines time-consuming task";
export default async function Home() {
  return (
    <div className="w-full h-full p-[20px] overflow-auto flex flex-col items-center bg-gridBg bg-grid-bg-size bg-primaryBg">
      <HomeMenu />
      <FileErrorWarning />
    </div>
  );
}
