"use client";
import { DoxleRoutes } from "@/DoxleRoutes";
import Link from "next/link";
import React from "react";
import useRegister from "./_hooks/useRegister";
import { BiHide, BiShow } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { FaFacebook, FaGithub } from "react-icons/fa";
function Register() {
  const { setShowPassword, showPassword } = useRegister();
  return (
    <>
      <form className="animate-scale-up bg-white p-[20px] shadow-black-soft rounded-[14px] w-[90%] max-w-[600px] flex flex-col items-center">
        <span className="text-[25px] font-lexend font-semibold mt-[20px]">
          Create an account
        </span>

        <span className="text-[14px] font-lexend font-thin mt-[10px] mb-[30px]">
          Already have an account?{" "}
          <Link href={DoxleRoutes.Login} className="text-doxleColor">
            Login
          </Link>
        </span>

        <input
          placeholder="Email address"
          className="w-full bg-inputBg text-inputText text-[16px] font-lexend font-normal py-[10px] px-[20px] rounded-[14px] mb-[20px] max-w-[400px] focus-visible:outline-none"
          type="text"
          name="name"
          required
        />
        <div className="w-full flex items-center max-w-[400px] relative mb-[20px]">
          <input
            placeholder="Password"
            className="w-full text-inputText text-[16px] font-lexend font-normal bg-inputBg rounded-[14px]  py-[10px] px-[20px] 
          focus-visible:outline-none "
            type={showPassword ? "text" : "Password"}
            name="name"
            required
          />

          {!showPassword ? (
            <BiShow
              className="text-inputText text-[22px] absolute right-2 self-center cursor-pointer z-10"
              onClick={() => setShowPassword(true)}
            />
          ) : (
            <BiHide
              className="text-inputText text-[22px] absolute right-2 self-center cursor-pointer z-10"
              onClick={() => setShowPassword(false)}
            />
          )}
        </div>

        <Button
          className="w-full flex items-center max-w-[400px] mt-[10px] bg-doxleColor"
          type="submit"
        >
          Create account
        </Button>

        <div className="w-full flex flex-row items-center max-w-[400px] my-[30px]">
          <div className="flex-1 h-[1px] bg-slate-200" />
          <span className="text-[14px] font-lexend font-thin text-[#9D9D9D] mx-[10px]">
            or sign up with
          </span>
          <div className="flex-1 h-[1px] bg-slate-200" />
        </div>

        <div className="w-full flex flex-row items-center max-w-[400px] justify-center">
          <FaFacebook className="text-[30px] mx-[10px] text-[#1877F2] cursor-pointer" />
          <FaGithub className="text-[30px] mx-[10px] text-[#181717] cursor-pointer" />

          <div className="w-[29px] mx-[10px] flex aspect-[256/262]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 256 262"
            >
              <path
                fill="#4285f4"
                d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
              />
              <path
                fill="#34a853"
                d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
              />
              <path
                fill="#fbbc05"
                d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602z"
              />
              <path
                fill="#eb4335"
                d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
              />
            </svg>
          </div>
        </div>
      </form>
    </>
  );
}

export default Register;
