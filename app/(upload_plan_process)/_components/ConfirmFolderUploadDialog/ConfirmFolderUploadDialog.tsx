import FolderUploadDetailItem from "./FolderUploadDetailItem";
import { IFolderUploadDetails } from "@/Models/UtilitiModels";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import "./styles.css";
interface Props {
  folders: IFolderUploadDetails[] | null;
  setFolder: React.Dispatch<
    React.SetStateAction<IFolderUploadDetails[] | null>
  >;
  uploadFn: () => void;
}

const ConfirmFolderUploadDialog = ({ folders, setFolder, uploadFn }: Props) => {
  const handleUploadButton = () => {
    uploadFn();
    setFolder(null);
  };
  return (
    <Dialog
      open={Boolean(folders)}
      onOpenChange={(open) => {
        if (!open) setFolder(null);
      }}
    >
      <DialogContent className="bg-slate-500">
        <DialogHeader>
          <DialogTitle>Upload Folder?</DialogTitle>
        </DialogHeader>
        {folders?.map((folder, idx) => (
          <FolderUploadDetailItem
            item={folder}
            itemIndex={idx}
            setFolder={setFolder}
            key={`folder#${idx}`}
          />
        ))}

        <DialogFooter>
          <Button
            onClick={handleUploadButton}
            className="flex items-center flex-row mx-[4px] rounded-[8px] font-lexend font-normal text-[15px] bg-black text-white hover:bg-[#3F8AE2]"
          >
            Upload
          </Button>
          <Button
            className="flex items-center flex-row mx-[4px] rounded-[8px] font-lexend font-normal text-[15px] bg-transparent text-white hover:bg-transparent"
            onClick={() => setFolder(null)}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmFolderUploadDialog;
