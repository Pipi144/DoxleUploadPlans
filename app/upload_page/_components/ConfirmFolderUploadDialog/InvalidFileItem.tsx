import {
  DoxleCSVIcon,
  DoxleExcelIcon,
  DoxlePDFIcon,
  DoxleTextIcon,
  DoxleWordIcon,
  DoxleZipIcon,
} from "@/components/DoxleIcons";
import { addMiddleEllipsisText } from "@/Utilities/FunctionUtility";
import { checkSupportedFileType } from "@/Utilities/MimeFileType";
import { FileRejection } from "react-dropzone";

import { CiFileOff } from "react-icons/ci";

import { IoVideocamOutline } from "react-icons/io5";

type Props = {
  file: FileRejection;
};

const InvalidFileItem = ({ file }: Props) => {
  const supportedFileType = checkSupportedFileType({
    type: file.file.type,
  });
  return (
    <div className="w-full flex flex-col">
      <div className="main-info-wrapper">
        {supportedFileType === "pdf" ? (
          <DoxlePDFIcon
            containerStyle={{
              width: 18,
              marginRight: 7,
            }}
          />
        ) : supportedFileType === "doc" ? (
          <DoxleWordIcon
            containerStyle={{
              width: 18,
              marginRight: 7,
            }}
          />
        ) : supportedFileType === "xls" ? (
          <DoxleExcelIcon
            containerStyle={{
              width: 18,
              marginRight: 7,
            }}
          />
        ) : supportedFileType === "csv" ? (
          <DoxleCSVIcon
            containerStyle={{
              width: 18,
              marginRight: 7,
            }}
            staticColor={"white"}
          />
        ) : supportedFileType === "text" ? (
          <DoxleTextIcon
            containerStyle={{
              width: 18,
              marginRight: 7,
            }}
            staticColor={"black"}
          />
        ) : supportedFileType === "zip" ? (
          <DoxleZipIcon
            containerStyle={{
              width: 18,
              marginRight: 7,
            }}
          />
        ) : supportedFileType === "video" ? (
          <IoVideocamOutline size={18} className="z-[3] mr-[7px] text-white" />
        ) : (
          <CiFileOff className="z-[3] mr-[7px] text-white" size={18} />
        )}

        {addMiddleEllipsisText(file.file.name, 25)}
      </div>

      <div className="error-info-wrapper">{file.errors[0].message}</div>
    </div>
  );
};

export default InvalidFileItem;
