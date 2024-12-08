import { Metadata } from "next";
import DoxleTopMenu from "./_components/DoxleTopMenu";

// limitations under the License.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-1 flex-col justify-center items-center bg-grid-bg-size bg-gridBg bg-primaryBg relative overflow-auto p-[20px]">
      <DoxleTopMenu />
      {children}
    </div>
  );
}
