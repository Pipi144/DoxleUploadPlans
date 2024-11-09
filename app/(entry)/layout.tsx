import HomeMenu from "@/components/DesignPatterns/HomeMenu";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full   flex flex-col items-center bg-gridBg bg-grid-bg-size bg-primaryBg">
      <HomeMenu />

      <div className="w-full flex flex-1 flex-col items-center justify-center overflow-hidden ">
        {children}
      </div>
    </div>
  );
}
