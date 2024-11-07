import React from "react";
import DoxleIconPlain from "../DoxleIcons";
import Link from "next/link";

type Props = {};

const HomeMenu = (props: Props) => {
  return (
    <div className="fixed top-0 w-full flex flex-row items-center  px-[10px] tablet:px-[20px] py-[8px] tablet:py-[10px] bg-white ">
      <DoxleIconPlain className="flex !w-[40px] tablet:!w-[45px] transition-all duration-200 ease-linear " />
      <Link
        href={"/register"}
        className="font-sourcecode text-[14px] text-black font-thin mx-[16px] hover:text-doxleColor hover:underline transition-all duration-200 ease-linear hidden laptop:block"
      >
        Register
      </Link>
      <Link
        href={"/mission"}
        className="font-sourcecode text-[14px] text-black font-thin mr-[16px] hover:text-doxleColor hover:underline transition-all duration-200 ease-linear hidden laptop:block"
      >
        Mission
      </Link>
      <Link
        href={"/about"}
        className="font-sourcecode text-[14px] text-black font-thin hover:text-doxleColor hover:underline transition-all duration-200 ease-linear hidden laptop:block"
      >
        About
      </Link>
    </div>
  );
};

export default HomeMenu;
