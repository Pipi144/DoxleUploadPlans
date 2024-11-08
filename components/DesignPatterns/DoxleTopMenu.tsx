import DoxleIconPlain from "@/components/DoxleIcons";
import { openDoxleHelpEmail } from "@/Utilities/FunctionUtility";
import Link from "next/link";
import React from "react";

const DoxleTopMenu = () => {
  return (
    <div className="max-w-[1280px] w-[calc(100%-40px)] flex fixed top-[20px] justify-between mx-[20px]">
      <Link href={"/"}>
        <DoxleIconPlain
          overwrittenColor="black"
          containerStyle={{ width: 33 }}
          className="cursor-pointer"
        />
      </Link>

      <span
        onClick={openDoxleHelpEmail}
        className="text-black text-[14px] font-lexend font-semibold cursor-pointer hover:text-doxleColor transition-all duration-200 ease-linear"
      >
        help@doxle.com
      </span>
    </div>
  );
};

export default DoxleTopMenu;
