import DoxleTopMenu from "@/components/DesignPatterns/DoxleTopMenu";
import { TSvgWrapper } from "@/Models/UtilitiModels";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full bg-gridBg bg-grid-bg-size bg-primaryBg p-[20px] overflow-auto flex flex-col items-center justify-center relative ">
      <DoxleTopMenu />

      {children}
    </div>
  );
}
