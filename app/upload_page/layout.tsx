import TopBar from "./_components/TopBar";

// limitations under the License.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-1 justify-center items-center bg-grid-bg-size bg-gridBg bg-primaryBg relative overflow-auto p-[20px]">
      <TopBar />
      {children}
    </div>
  );
}
