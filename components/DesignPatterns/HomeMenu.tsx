"use client";
import React, { useState } from "react";
import DoxleIconPlain from "../DoxleIcons";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { DoxleRoutes } from "@/DoxleRoutes";
import { usePathname } from "next/navigation";

const HomeMenu = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const pathName = usePathname();

  return (
    <div className="fixed top-0 w-full flex flex-row items-center  px-[15px] tablet:px-[20px] py-[8px] tablet:py-[10px] bg-white ">
      <Link href={"/"}>
        <DoxleIconPlain
          className="flex !w-[40px] tablet:!w-[45px] transition-all duration-200 ease-linear "
          overwrittenColor="#4652FF"
        />
      </Link>

      <Link
        href={DoxleRoutes.Research}
        className={`font-plexSanJp text-[14px] text-black font-normal mx-[30px] hover:text-doxleColor hover:underline transition-all duration-200 ease-linear hidden laptop:block ${
          pathName === DoxleRoutes.Research ? "underline text-doxleColor" : ""
        }`}
      >
        Research
      </Link>
      <Link
        href={DoxleRoutes.Products}
        className={`font-plexSanJp text-[14px] text-black font-normal mr-[30px] hover:text-doxleColor hover:underline transition-all duration-200 ease-linear hidden laptop:block ${
          pathName === DoxleRoutes.Products ? "underline text-doxleColor" : ""
        }`}
      >
        Products
      </Link>

      <Link
        href={DoxleRoutes.Login}
        className="w-[85px] h-[30px] rounded-[4px]  items-center justify-center text-black bg-white hover:bg-[#6868684b] font-lexend border-[1px] border-solid border-[#E6E6E6] ml-auto hidden laptop:flex"
      >
        Login
      </Link>
      <Link
        href={DoxleRoutes.Register}
        className="w-[85px] h-[30px] rounded-[4px]  items-center justify-center text-white bg-[#214BC7] hover:bg-[#214BC790]   font-lexend border-[1px] border-solid border-[#16368E] ml-[14px] shadow-sm hidden laptop:flex"
      >
        Register
      </Link>

      <Sheet open={openMenu} onOpenChange={(isOpen) => setOpenMenu(isOpen)}>
        <SheetTrigger asChild>
          <div className="bg-transparent   !w-[35px] border-none ml-auto flex tablet:hidden">
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
        <SheetContent className="!border-none flex flex-col  outline-none max-w-[40%] p-[20px] bg-transparent">
          <SheetHeader className="w-full flex flex-row items-center justify-end border-b-[1px] border-solid border-borderWhiteBg pb-[8px] mb-[5px]">
            <SheetTitle className="w-[100px] flex aspect-[88/13]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                viewBox="0 0 88 13"
                fill="none"
              >
                <path
                  fill="#fff"
                  fillRule="evenodd"
                  d="M33.722 1.56C33.278 1.191 32.706.925 32 .755c-.703-.169-1.556-.252-2.558-.252h-6.11c-.999 0-1.85.083-2.546.252-.7.17-1.27.436-1.714.803-.44.366-.762.841-.968 1.421-.201.58-.304 1.29-.304 2.128v3c0 .836.103 1.547.304 2.135.206.588.527 1.065.968 1.43.444.367 1.014.63 1.714.793.696.164 1.547.247 2.546.247h6.11c1.002 0 1.854-.083 2.557-.247.706-.162 1.278-.425 1.722-.792.44-.367.76-.843.956-1.431.2-.588.297-1.299.297-2.134v-3c0-.837-.097-1.547-.297-2.128a3.09 3.09 0 0 0-.956-1.42Zm-1.76 6.345c0 .448-.046.826-.13 1.13a1.475 1.475 0 0 1-.426.729c-.198.177-.465.304-.8.38-.338.073-.762.109-1.278.109h-5.883c-.513 0-.939-.036-1.276-.11-.335-.075-.604-.202-.8-.379-.2-.18-.343-.422-.428-.728-.086-.304-.127-.683-.127-1.131v-2.59c0-.45.041-.828.127-1.132a1.47 1.47 0 0 1 .427-.725c.197-.18.466-.306.801-.382a6.174 6.174 0 0 1 1.276-.112h5.883c.516 0 .94.04 1.277.112.336.076.603.202.8.382.202.177.342.42.427.725.084.304.13.682.13 1.132v2.59ZM53.596.67c-.015-.11-.112-.166-.303-.166h-2.747c-.161 0-.29.023-.383.061a.818.818 0 0 0-.258.184l-4.581 4.137L40.744.75a.811.811 0 0 0-.261-.184A1.025 1.025 0 0 0 40.1.504h-2.746c-.188 0-.288.055-.303.166a.341.341 0 0 0 .101.289l6.26 5.656-6.246 5.643c-.095.083-.13.177-.111.288.021.11.123.167.31.167h2.748c.162 0 .29-.02.384-.054a.66.66 0 0 0 .26-.193l4.567-4.127 4.569 4.127a.64.64 0 0 0 .26.193c.09.034.22.054.379.054h2.75c.188 0 .29-.057.309-.167.021-.11-.017-.205-.107-.287l-6.25-5.644 6.26-5.656a.34.34 0 0 0 .102-.29Zm16.771 9.62H62.21c-.522 0-.958-.038-1.298-.114-.345-.074-.615-.202-.815-.384a1.477 1.477 0 0 1-.434-.732c-.087-.309-.13-.694-.13-1.16V.943c0-.255-.149-.383-.444-.383h-2.173c-.308 0-.467.128-.467.383v7.221c0 .836.107 1.546.312 2.134.21.588.54 1.065.987 1.431.451.367 1.034.63 1.743.792.712.165 1.58.248 2.599.248h8.277c.296 0 .446-.13.446-.387v-1.707c0-.256-.15-.384-.446-.384ZM87.919.203C87.847.074 87.723 0 87.53 0H74.07c-.189.002-.31.074-.38.201a.618.618 0 0 0-.048.116.624.624 0 0 0-.02.166v2.088a.61.61 0 0 0 .02.165.605.605 0 0 0 .048.117c.07.127.191.199.38.199h13.461c.192 0 .315-.072.388-.2a.835.835 0 0 0 .044-.114c.01-.052.022-.104.022-.167V.485a.766.766 0 0 0-.022-.168.852.852 0 0 0-.044-.114ZM13.646 1.682c-.46-.401-1.05-.696-1.771-.89C11.154.6 10.29.505 9.284.505H.423C.246.506.131.563.065.664A.488.488 0 0 0 .02.756.518.518 0 0 0 0 .888v1.658c0 .05.01.091.02.131a.475.475 0 0 0 .045.093c.066.1.18.158.358.158H9.21c.545 0 1.007.049 1.379.14.373.093.674.244.907.454.228.21.393.487.49.837.101.348.15.778.15 1.291v1.916c0 .514-.049.942-.15 1.292a1.76 1.76 0 0 1-.49.838c-.233.21-.535.359-.907.45-.372.095-.834.14-1.379.14H.423c-.177.002-.292.059-.358.16a.473.473 0 0 0-.045.093.51.51 0 0 0-.02.131v1.657c0 .05.01.09.02.133a.398.398 0 0 0 .045.091c.066.102.18.162.358.162h8.86c1.008 0 1.87-.1 2.591-.292.723-.188 1.311-.485 1.772-.888.46-.398.8-.912 1.016-1.534.218-.621.326-1.357.326-2.205v-2.37c0-.849-.108-1.585-.326-2.207a3.527 3.527 0 0 0-1.016-1.535ZM87.919 9.91c-.072-.128-.196-.203-.388-.203H74.07c-.189.003-.31.075-.38.202a.6.6 0 0 0-.048.116.615.615 0 0 0-.02.166v2.083a.64.64 0 0 0 .02.167.504.504 0 0 0 .048.115c.07.128.191.203.38.203h13.461c.192 0 .315-.075.388-.203a.78.78 0 0 0 .044-.115c.01-.053.022-.103.022-.167v-2.08a.754.754 0 0 0-.022-.169.765.765 0 0 0-.044-.114Zm.015-4.792c-.072-.129-.195-.204-.388-.204h-13.46c-.189.006-.311.075-.38.203a.636.636 0 0 0-.048.115.625.625 0 0 0-.021.166v2.087a.595.595 0 0 0 .069.283c.069.126.191.196.38.198h13.46c.193 0 .316-.072.388-.2a.807.807 0 0 0 .045-.114.773.773 0 0 0 .021-.167V5.398a.764.764 0 0 0-.021-.166.734.734 0 0 0-.045-.114Z"
                  clipRule="evenodd"
                />
                <path
                  fill="transparent"
                  d="M44.809 4.129h1.001v5.007h-1.001z"
                />
              </svg>
            </SheetTitle>
          </SheetHeader>

          <Link
            onClick={() => setOpenMenu(false)}
            href={DoxleRoutes.Research}
            className={`w-full text-end font-plexSanJp text-[16px] text-white font-normal  hover:text-doxleColor hover:underline transition-all duration-200 ease-linear ${
              pathName === DoxleRoutes.Research
                ? "underline text-doxleColor"
                : ""
            }  py-[5px] `}
          >
            Research
          </Link>
          <Link
            onClick={() => setOpenMenu(false)}
            href={DoxleRoutes.Products}
            className={`w-full text-end font-plexSanJp text-[16px] text-white font-normal  hover:text-doxleColor hover:underline transition-all duration-200 ease-linear ${
              pathName === DoxleRoutes.Products
                ? "underline text-doxleColor"
                : ""
            } py-[5px]`}
          >
            Products
          </Link>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default HomeMenu;
