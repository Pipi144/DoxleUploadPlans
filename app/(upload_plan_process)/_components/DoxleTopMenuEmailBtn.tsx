"use client";
import { openDoxleHelpEmail } from "@/Utilities/FunctionUtility";
import React from "react";

const DoxleTopMenuEmailBtn = () => {
  return (
    <span
      onClick={openDoxleHelpEmail}
      className="text-black text-[14px] font-lexend font-semibold cursor-pointer hover:text-doxleColor transition-all duration-200 ease-linear"
    >
      help@doxle.com
    </span>
  );
};

export default DoxleTopMenuEmailBtn;
