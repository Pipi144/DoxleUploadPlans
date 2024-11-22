import { IoCloseCircleOutline, IoVideocamOutline } from "react-icons/io5";
import { memo } from "react";
import { checkSupportedFileType } from "@/Utilities/MimeFileType";
import {
  DoxleCSVIcon,
  DoxleExcelIcon,
  DoxlePDFIcon,
  DoxleTextIcon,
  DoxleWordIcon,
} from "@/components/DoxleIcons";
import { addMiddleEllipsisText } from "@/Utilities/FunctionUtility";
import Image from "next/image";

type Props = {
  file: File;
  handleRemoveFile: (index: number) => void;
  index: number;
};

const AddedFileItem = ({ file, handleRemoveFile, index }: Props) => {
  const supportedFileType = checkSupportedFileType({ type: file.type });
  const imgUrl = URL.createObjectURL(file);
  return (
    <div className="flex items-center self-start border-[1px] border-dxBorder border-solid rounded-[100px] py-[4px] px-[8px] mr-[8px] mb-[8px]">
      {supportedFileType === "pdf" ? (
        <DoxlePDFIcon
          containerStyle={{
            width: 18,
          }}
        />
      ) : supportedFileType === "doc" ? (
        <DoxleWordIcon
          containerStyle={{
            width: 18,
          }}
        />
      ) : supportedFileType === "xls" ? (
        <DoxleExcelIcon
          containerStyle={{
            width: 18,
          }}
        />
      ) : supportedFileType === "csv" ? (
        <DoxleCSVIcon
          containerStyle={{
            width: 18,
          }}
        />
      ) : supportedFileType === "text" ? (
        <DoxleTextIcon
          containerStyle={{
            width: 18,
          }}
        />
      ) : supportedFileType === "video" ? (
        <IoVideocamOutline className="text-white" size={18} />
      ) : (
        supportedFileType === "image" && (
          <Image
            alt={"file-prev"}
            className="mr-[4px] w-[18px] object-contain aspect-square"
            src={imgUrl}
          />
        )
      )}

      <span className="font-lexend mx-[5px] text-white font-normal text-[12px]">
        {addMiddleEllipsisText(file.name, 18)}
      </span>

      <IoCloseCircleOutline
        size={18}
        className="cursor-pointer text-white"
        onClick={() => handleRemoveFile(index)}
      />
    </div>
  );
};

export default memo(AddedFileItem);
