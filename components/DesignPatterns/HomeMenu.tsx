import React from "react";
import DoxleIconPlain from "../DoxleIcons";
import Link from "next/link";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

const HomeMenu = () => {
  return (
    <div className="fixed top-0 w-full flex flex-row items-center  px-[15px] tablet:px-[20px] py-[8px] tablet:py-[10px] bg-white ">
      <DoxleIconPlain className="flex !w-[40px] tablet:!w-[45px] transition-all duration-200 ease-linear " />
      <Link
        href={"/register"}
        className="font-sourcecode text-[14px] text-black font-thin mx-[30px] hover:text-doxleColor hover:underline transition-all duration-200 ease-linear hidden laptop:block"
      >
        Register
      </Link>
      <Link
        href={"/mission"}
        className="font-sourcecode text-[14px] text-black font-thin mr-[30px] hover:text-doxleColor hover:underline transition-all duration-200 ease-linear hidden laptop:block"
      >
        Mission
      </Link>
      <Link
        href={"/about"}
        className="font-sourcecode text-[14px] text-black font-thin hover:text-doxleColor hover:underline transition-all duration-200 ease-linear hidden laptop:block"
      >
        About
      </Link>

      <Button className="w-[75px] h-[30px] rounded-[4px]  items-center justify-center text-black bg-white hover:bg-[#6868684b] font-lexend border-[1px] border-solid border-[#E6E6E6] ml-auto hidden laptop:flex">
        Login
      </Button>
      <Button className="w-[75px] h-[30px] rounded-[4px]  items-center justify-center text-white bg-doxleColor hover:bg-doxleColor hover:opacity-80  font-lexend border-[1px] border-solid border-[#E6E6E6] ml-[14px] shadow-sm hidden laptop:flex">
        Login
      </Button>

      <Sheet>
        <SheetTrigger asChild>
          <div className="bg-transparent flex laptop:hidden !w-[35px] border-none ml-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 32 31"
              fill="none"
            >
              <rect
                width={31}
                height={30}
                x={0.5}
                y={0.5}
                stroke="#D8DADA"
                rx={3.5}
              />
              <path stroke="#214BC7" d="M11 12.5h11M11 16h11m-11 3.5h11" />
            </svg>
          </div>
        </SheetTrigger>
        <SheetContent className="border-none flex flex-col shadow-white-3d-left max-w-[60%]"></SheetContent>
      </Sheet>
    </div>
  );
};

export default HomeMenu;
