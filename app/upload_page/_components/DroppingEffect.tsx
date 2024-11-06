"use client";
import { IoCloudUploadOutline } from "react-icons/io5";
import { motion } from "framer-motion";

const DroppingEffect = () => {
  return (
    <motion.div
      className="absolute top-[14px]  bg-lightBlackBg rounded-[4px] py-[8px] px-[16px]  text-white text-[16px] font-lexend font-normal flex items-center justify-center shadow-black-soft"
      animate={{
        y: [-50, 0],
        opacity: [0, 1],
      }}
      exit={{
        y: [0, -50],
        opacity: [1, 0],
      }}
    >
      <IoCloudUploadOutline className="text-white mr-[14px]" size={20} />
      Drop your files to upload...
    </motion.div>
  );
};

export default DroppingEffect;
