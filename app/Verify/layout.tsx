import { Suspense } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense>
      <div className="w-full h-full bg-gridBg bg-grid-bg-size bg-primaryBg p-[20px] overflow-auto flex flex-col items-center justify-center relative ">
        {children}
      </div>
    </Suspense>
  );
}
