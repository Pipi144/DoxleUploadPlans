"use client";
import React from "react";
import useRegister, { Checkbox_Values } from "./_hooks/useRegister";
import RequestInputField from "./_components/RequestInputField";
import { checkEmailValid } from "@/Utilities/FunctionUtility";
import { Checkbox } from "@/components/ui/checkbox";
import { produce } from "immer";
import { Button } from "@/components/ui/button";
import RequestTextArea from "./_components/RequestTextArea";
import GradualSpacing from "@/components/ui/gradual-spacing";
import DoxleIconPlain from "@/components/DoxleIcons";
import SuccessBanner from "@/components/DesignPatterns/SuccessBanner";
function Register() {
  const {
    register,
    errors,
    setValue,
    onSubmit,
    preferredSoftware,
    showSuccessBanner,
    isSubmitting,
  } = useRegister();

  if (showSuccessBanner)
    return <SuccessBanner text="Your request is submitted!" />;
  return (
    <>
      <div className="overflow-auto flex justify-center h-full flex-1 px-[20px] pt-[10px] laptop:pt-[20px] pb-[20px] w-full relative">
        <form
          className="animate-slide-in-up h-fit w-full max-w-[700px] flex flex-col "
          onSubmit={onSubmit}
        >
          <span className="text-doxleColor text-[25px] laptop:text-[30px] font-lexend font-medium mb-[20px] ">
            Request Form
          </span>
          <div className="flex flex-wrap justify-between w-full">
            <RequestInputField
              fieldLabel="First name"
              isRequired={true}
              halfWidth={true}
              {...register("fName", {
                required: true,
              })}
              errorText={errors.fName ? "This field is required" : undefined}
            />
            <RequestInputField
              fieldLabel="Last name"
              isRequired={true}
              halfWidth={true}
              {...register("lName", {
                required: true,
              })}
              errorText={errors.lName ? "This field is required" : undefined}
            />
          </div>
          <RequestInputField
            fieldLabel="Email"
            isRequired={true}
            {...register("email", {
              validate: {
                require: (value) => {
                  if (!value) {
                    return "This field is required";
                  } else if (!checkEmailValid(value)) {
                    return "Invalid email address";
                  }
                  return true;
                },
              },
            })}
            errorText={errors.email?.message}
          />
          <RequestInputField
            fieldLabel="Company"
            {...register("company", {})}
            errorText={errors.company?.message}
          />
          <RequestInputField
            fieldLabel="Number of employees"
            {...register("numOfEmployee", {})}
            errorText={errors.numOfEmployee?.message}
            inputMode="numeric"
          />
          <div className="w-full flex flex-col mb-[15px] laptop:mb-[30px]">
            <span className="text-black text-[12px] font-lexend font-medium mb-[4px]">
              What is your preferred software?
            </span>

            {Checkbox_Values.map((val, idx) => (
              <div
                key={idx}
                className="flex flex-row items-center my-[8px] cursor-pointer"
              >
                <Checkbox
                  className="bg-[#E1EBFB] border-none mr-[12px]  size-[18px] data-[state=checked]:bg-[#E1EBFB]"
                  id={`${val}-${idx}`}
                  checked={preferredSoftware.includes(val)}
                  onCheckedChange={(checked) => {
                    setValue(
                      "preferredSoftware",
                      produce(preferredSoftware, (draft) => {
                        if (checked) draft.push(val);
                        else draft.splice(draft.indexOf(val), 1);
                        return draft;
                      })
                    );
                  }}
                />
                <label
                  htmlFor={`${val}-${idx}`}
                  className="text-[14px] text-black font-lexend font-normal cursor-pointer"
                >
                  {val}
                </label>
              </div>
            ))}
          </div>
          <RequestTextArea
            fieldLabel="How do you think Doxle could help you build better?"
            {...register("helpStatement", {})}
            errorText={errors.helpStatement?.message}
          />
          <RequestTextArea
            fieldLabel="What problem would like Doxle to solve for you?"
            {...register("problemStatement", {})}
            errorText={errors.problemStatement?.message}
          />
          <div className="text-black text-[14px] font-lexend font-light">
            Doxle needs the contact information you provide to us to contact you
            about our products and services. You may unsubscribe from these
            communications at any time. For information on how to unsubscribe,
            as well as our privacy practices and commitment to protecting your
            privacy, please review our{" "}
            <span className="underline capitalize">Privacy Policy</span>.
          </div>
          <Button
            className="bg-doxleColor py-[8px] px-[24px] text-white text-[14px] font-lexend font-medium transition-all duration-200 ease-linear self-start mt-[20px] laptop:mt-[30px] rounded-none hover:rounded-[8px] hover:underline hover:bg-doxleColor hover:opacity-90 "
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
      {isSubmitting && (
        <div className="z-[10] bg-slate-100 bg-opacity-80 top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center absolute animate-scale-up">
          <DoxleIconPlain
            overwrittenColor="black"
            className="!w-[100px] mb-[20px]"
          />
          <GradualSpacing
            text="Submitting your request"
            duration={1}
            className="text-[20px] font-lexend font-medium text-black"
          />
        </div>
      )}
    </>
  );
}

export default Register;
