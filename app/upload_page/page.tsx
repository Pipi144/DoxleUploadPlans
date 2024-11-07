"use client";
import useUploadPage from "./_components/hooks/useUploadPage";
import { AnimatePresence, motion } from "framer-motion";
import ConfirmFolderUploadDialog from "./_components/ConfirmFolderUploadDialog/ConfirmFolderUploadDialog";
import { Button } from "@/components/ui/button";
import DroppingEffect from "./_components/DroppingEffect";
import { IoAddOutline } from "react-icons/io5";
import UploadProvider from "./_components/hooks/UploadProvider";
import UploadItem from "./_components/UploadItem";
import ProcessedItem from "./_components/ProcessedItem";
import DetailForm from "./_components/DetailForm";


const AnimatedButton = motion.create(Button);
export default function UploadPage() {
  const {
    filesOnDragged,
    handleFileDragEnter,
    handleFileDragLeave,
    getRootProps,
    getInputProps,
    handleFileFolderDrop,
    pendingFolderUpload,
    setPendingFolderUpload,
    contextVal,
    allUploadedFiles,
    uploadFilesInFolder,
    projectId,
    handleProcessFiles,
    processableFiles,
    projectFiles,
    floatingBtnVariants,
    hideAddBtn,
    fileContainerRef,
    setHideAddBtn,
  } = useUploadPage({});
  return (
    <>
      <UploadProvider {...contextVal}>
        <AnimatePresence>
          {contextVal.uploadStage === "DetailEntry" && <DetailForm />}
          {contextVal.uploadStage === "FileUpload" && (
            <motion.div
              className="w-full max-w-[700px] min-w-[300px] flex flex-col py-[30px] px-[20px] rounded-[8px] bg-white relative"
              animate={{
                y: [100, 0],
                opacity: [0, 1],
                transition: {
                  type: "spring",
                  damping: 16,
                  mass: 0.5,
                  stiffness: 120,
                },
              }}
            >
              <div className="w-full flex justify-between items-center mb-[20px]">
                <div className="flex flex-col mr-[10px]">
                  <span className="text-black text-[18px] tablet:text-[20px] laptop:text-[25px] font-lexend font-semibold mb-[4px]">
                    Upload your plans
                  </span>
                  <span className="text-black text-[10px] tablet:text-[12px] laptop:text-[14px] font-lexend font-normal">
                    Only pdf and zip files are allowed. 100MB maximum size
                  </span>
                </div>

                <Button
                  onClick={handleProcessFiles}
                  disabled={!processableFiles}
                  className="bg-black disabled:bg-black active:bg-[rgba(0,0,0,0.25)]  min-w-[70px] flex flex-row items-center rounded-[4px] hover:rounded-[8px] capitalize  hover:opacity-80 text-white disabled:text-[rgba(255,255,255,0.55)] text-[12px] tablet:text-[14px] laptop:text-[16px] py-[8px] px-[16px] h-fit  transition-all duration-200 ease-linear"
                >
                  Process
                </Button>
              </div>

              <div
                className="w-full flex h-[350px] mobileLg:h-[450px] tablet:h-[600px] flex-wrap overflow-auto relative bg-[rgba(242,248,255,1)] border-[1px] border-dashed border-borderWhiteBg rounded-[8px]"
                onDrop={handleFileFolderDrop}
                onDragEnter={handleFileDragEnter}
                onDragOver={handleFileDragEnter}
                onDragLeave={handleFileDragLeave}
                ref={fileContainerRef}
                // onTouchStart={() => {
                //   setTimeout(() => {
                //     setHideAddBtn(true);
                //   }, 500);
                // }}
                // onTouchEnd={() => setHideAddBtn(false)}
              >
                {/* condition when there are no files */}
                {allUploadedFiles.length === 0 && projectFiles.length === 0 && (
                  <span className="absolute left-1/2 top-1/2 -translate-x-[50%] -translate-y-[50%]  text-black text-[14px] tablet:text-[16px] font-lexend font-medium ">
                    drag & drop or{" "}
                    <span
                      className="text-[rgba(43,155,247,1)] hover:text-doxleColor underline cursor-pointer  transition-all duration-200 ease-linear "
                      {...getRootProps({})}
                    >
                      <input {...getInputProps()} />
                      choose your plans
                    </span>{" "}
                    to upload
                  </span>
                )}

                {allUploadedFiles
                  .filter(
                    (item) =>
                      !projectFiles.find(
                        (pf) =>
                          pf.fileId === item.fileTempId &&
                          pf.status !== "Pending Upload"
                      )
                  )
                  .map((item, idx) => (
                    <UploadItem key={idx} item={item} projectId={projectId} />
                  ))}

                {projectFiles
                  .filter(
                    (f) =>
                      (f.status !== "Pending Upload" &&
                        f.fileType !== "application/zip") ||
                      (f.status === "Failed" &&
                        f.fileType === "application/zip")
                  )
                  .map((item, idx) => (
                    <ProcessedItem key={idx} item={item} />
                  ))}
              </div>
              {(allUploadedFiles.length > 0 || projectFiles.length > 0) && (
                <AnimatedButton
                  className="absolute bottom-[40px] right-[30px] z-[100] w-[45px] h-[45px] rounded-full bg-black hover:bg-white text-white hover:text-black  shadow-md shadow-zinc-600 text-[25px]"
                  {...getRootProps({})}
                  variants={floatingBtnVariants}
                  animate={!hideAddBtn ? "initial" : "hidden"}
                >
                  <IoAddOutline className="text-inherit text-[25px] flex-shrink-0" />
                  <input {...getInputProps()} />
                </AnimatedButton>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {filesOnDragged && <DroppingEffect />}
        </AnimatePresence>
      </UploadProvider>
      <ConfirmFolderUploadDialog
        folders={pendingFolderUpload}
        setFolder={setPendingFolderUpload}
        uploadFn={uploadFilesInFolder}
      />
    </>
  );
}
