"use client";
import React, { useEffect, useState } from "react";
import DoxleIconPlain from "../DoxleIcons";
import Link from "next/link";
import { DoxleRoutes } from "@/DoxleRoutes";
import { usePathname } from "next/navigation";
import { MdFindInPage } from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";
import { BiLogIn } from "react-icons/bi";
import { PiNotePencilBold } from "react-icons/pi";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { HiMiniHome } from "react-icons/hi2";

import { GoChevronRight } from "react-icons/go";
import { Button } from "../ui/button";
const HomeMenu = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div className="w-full flex flex-row items-center  px-[15px] tablet:px-[20px] py-[8px] tablet:py-[10px] bg-white z-[100]">
      <Link href={"/"}>
        <DoxleIconPlain
          className="flex !w-[40px] tablet:!w-[45px] transition-all duration-200 ease-linear "
          overwrittenColor="#4652FF"
        />
      </Link>

      <Link
        href={DoxleRoutes.Research}
        className={`font-plexSanJp text-[14px] text-black font-normal mx-[30px] hover:text-doxleColor hover:underline transition-all duration-200 ease-linear hidden tablet:block ${
          pathName === DoxleRoutes.Research ? "underline text-doxleColor" : ""
        }`}
        prefetch={true}
      >
        Research
      </Link>
      <Link
        href={DoxleRoutes.Products}
        className={`font-plexSanJp text-[14px]  text-black font-normal mr-[30px] hover:text-doxleColor hover:underline transition-all duration-200 ease-linear hidden tablet:block ${
          pathName === DoxleRoutes.Products ? "underline text-doxleColor" : ""
        }`}
        prefetch={true}
      >
        Products
      </Link>

      <Link
        href={DoxleRoutes.Login}
        className="w-[90px] h-[30px] rounded-[4px]  items-center justify-center text-black bg-white hover:bg-[#6868684b] font-plexSanThai border-[1px] border-solid border-[#E6E6E6] ml-auto hidden tablet:flex text-[14px] font-normal"
        prefetch={true}
      >
        Login
      </Link>
      <Link
        href={DoxleRoutes.Register}
        className="w-[90px] h-[30px] rounded-[4px]  items-center justify-center text-white bg-[#214BC7] hover:bg-[#214BC790]   font-plexSanThai border-[1px] border-solid border-[#16368E] ml-[14px] shadow-sm hidden tablet:flex text-[14px] font-normal"
        prefetch={true}
      >
        Register
      </Link>

      <Drawer open={openMenu} onOpenChange={(isOpen) => setOpenMenu(isOpen)}>
        <DrawerTrigger
          asChild
          className="bg-transparent   !w-[35px] border-none ml-auto flex tablet:hidden cursor-pointer"
        >
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
        </DrawerTrigger>
        <DrawerContent className="!border-none flex flex-col  outline-none  bg-white py-[10px] px-[20px]">
          <DrawerHeader className="w-full flex flex-row items-center justify-end  pb-[8px] mb-[5px] px-0">
            <DrawerTitle className="w-full flex items-center pb-[10px] mb-[10px] border-b-[1px] border-solid border-borderWhiteBg">
              <Link
                href={"/"}
                className="w-full flex flex-row items-center justify-end font-plexSanJp text-[16px] font-light  hover:text-doxleColor hover:underline transition-all duration-200 ease-linear py-[5px]"
              >
                <HiMiniHome className="text-doxleColor text-[20px] mr-[12px]" />
                Go to home
                <GoChevronRight className="text-doxleColor text-[18px] ml-auto" />
              </Link>
            </DrawerTitle>
          </DrawerHeader>

          <Link
            onClick={() => setOpenMenu(false)}
            href={DoxleRoutes.Research}
            className={`w-full flex flex-row items-center justify-end font-plexSanJp text-[16px] font-light   hover:text-doxleColor hover:underline py-[10px] transition-all duration-200 ease-linear ${
              pathName === DoxleRoutes.Research
                ? "underline text-doxleColor"
                : "text-black"
            }`}
            prefetch={true}
          >
            <MdFindInPage className={`text-doxleColor text-[20px] mr-[12px]`} />
            Research
            <GoChevronRight className="text-doxleColor text-[18px] ml-auto" />
          </Link>
          <Link
            prefetch={true}
            onClick={() => setOpenMenu(false)}
            href={DoxleRoutes.Products}
            className={`w-full flex flex-row items-center justify-end font-plexSanJp text-[16px] font-light   hover:text-doxleColor hover:underline py-[10px] transition-all duration-200 ease-linear ${
              pathName === DoxleRoutes.Products
                ? "underline text-doxleColor"
                : "text-black"
            }`}
          >
            <AiOutlineProduct
              className={`text-doxleColor text-[20px] mr-[12px]`}
            />
            Products
            <GoChevronRight className="text-doxleColor text-[18px] ml-auto" />
          </Link>

          <div className="w-full h-[1px] my-[10px] bg-rowBorderColor" />
          <Link
            prefetch={true}
            onClick={() => setOpenMenu(false)}
            href={DoxleRoutes.Login}
            className={`w-full flex flex-row items-center justify-end font-plexSanJp text-[16px] font-light   hover:text-doxleColor hover:underline py-[10px] transition-all duration-200 ease-linear  ${
              pathName === DoxleRoutes.Login
                ? "underline text-doxleColor"
                : "text-black"
            }`}
          >
            <BiLogIn className={`text-doxleColor text-[20px] mr-[12px]`} />
            Login
            <GoChevronRight className="text-doxleColor text-[18px] ml-auto" />
          </Link>
          <Link
            prefetch={true}
            onClick={() => setOpenMenu(false)}
            href={DoxleRoutes.Register}
            className={`w-full flex flex-row items-center justify-end font-plexSanJp text-[16px] font-light   hover:text-doxleColor hover:underline py-[10px] transition-all duration-200 ease-linear ${
              pathName === DoxleRoutes.Register
                ? "underline text-doxleColor"
                : "text-black"
            }`}
          >
            <PiNotePencilBold
              className={`text-doxleColor text-[20px] mr-[12px]`}
            />
            Register
            <GoChevronRight className="text-doxleColor text-[18px] ml-auto" />
          </Link>

          <Button
            className="w-full text-center my-[10px] h-fit py-[10px] text-black hover:underline text-[16px] bg-transparent border-borderWhiteBg border-[1px]"
            onClick={() => setOpenMenu(false)}
          >
            Close Menu
          </Button>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default HomeMenu;
