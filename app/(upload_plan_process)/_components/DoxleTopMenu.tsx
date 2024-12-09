"use client";
import DoxleIconPlain from "@/components/DoxleIcons";
import Link from "next/link";
import React from "react";
import DoxleTopMenuEmailBtn from "./DoxleTopMenuEmailBtn";

const DoxleTopMenu = () => {
  return (
    <div className="max-w-[1280px] w-[calc(100%-40px)] flex fixed top-[20px] justify-between mx-[20px]">
      <Link href={"/"} prefetch={true}>
        <DoxleIconPlain
          overwrittenColor="black"
          containerStyle={{ width: 33 }}
          className="cursor-pointer"
        />
      </Link>

      <DoxleTopMenuEmailBtn />
    </div>
  );
};

export default DoxleTopMenu;
