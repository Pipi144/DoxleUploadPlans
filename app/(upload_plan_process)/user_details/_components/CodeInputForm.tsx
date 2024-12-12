"use client";
import React, { useActionState, useRef } from "react";
import CodeInput from "./CodeInput";
import { Button } from "@/components/ui/button";
import AnimatedDiv from "@/components/AnimatedComponents/AnimatedDiv";
import { verifyCode } from "../../action";
import ResendCodeBtn from "./ResendCodeBtn";

export type TCodeInputState = {
  errors?: string[];
  isExpired?: boolean;
};
const CodeInputForm = () => {
  const [state, action, isPending] = useActionState<TCodeInputState, FormData>(
    async (data, payload) => {
      return (await verifyCode(payload)) ?? data;
    },
    {}
  );
  // Refs to control each digit input element
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Handle input
  function handleInput(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const input = e.target;
    const previousInput = inputRefs[index - 1];
    const nextInput = inputRefs[index + 1];

    // Convert lowercase letters to uppercase
    if (/^[a-z]+$/.test(input.value)) {
      const uc = input.value.toUpperCase();
      if (inputRefs[index] && inputRefs[index].current)
        inputRefs[index].current.value = uc;
    }

    input.select();

    if (input.value === "") {
      // If the value is deleted, select previous input, if exists
      if (previousInput && previousInput.current) {
        previousInput.current.focus();
      }
    } else if (nextInput && nextInput.current) {
      // Select next input on entry, if exists
      nextInput.current.select();
    }
  }

  // Handle backspace key
  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) {
    const input = e.target as HTMLInputElement;
    const previousInput = inputRefs[index - 1];

    if ((e.key === "Backspace" || e.key === "Delete") && input.value === "") {
      e.preventDefault();

      if (previousInput && previousInput.current) {
        previousInput.current.focus();
      }
    } else if (e.key === "-" && inputRefs[index] && inputRefs[index].current) {
      //prevent - from being entered
      e.preventDefault();
      inputRefs[index].current.value = "";
    }
  }

  // Capture pasted characters
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedCode = e.clipboardData.getData("text");
    if (pastedCode.length === 6) {
      e.preventDefault();
      inputRefs.forEach((inputRef, index) => {
        if (inputRef.current) inputRef.current.value = pastedCode.charAt(index);
      });
    }
  };
  return (
    <form
      className="max-w-md w-full flex flex-col font-lexend text-black"
      action={action}
    >
      <h1 className="text-2xl laptop:text-3xl  mb-8 text-start font-bold">
        Verify code
      </h1>

      <h3 className="text-xs laptop:text-base mb-3 text-start font-medium">
        Six digit code
      </h3>

      <div className="flex flex-row items-center justify-between w-full mb-3">
        {[0, 1, 2, 3, 4, 5].map((c, i) => (
          <CodeInput
            key={i}
            onChange={(e) => handleInput(e, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            onPaste={handlePaste}
            ref={inputRefs[i]}
            autoFocus={i === 0}
            onFocus={(e) => e.target.select()}
            disabled={isPending}
            name={`code-${i}`}
          />
        ))}
      </div>
      <p className="font-thin text-xs text-opacity-60 mb-5">
        code expires in 30 minutes
      </p>
      <div className="flex flex-row items-center">
        <Button
          type="submit"
          className="font-lexend text-base bg-doxleColor hover:bg-doxleColor hover:scale-105 self-start rounded-none px-7 transition-all ease-linear duration-50"
          disabled={isPending}
        >
          {isPending ? "Verifying..." : "Submit"}
        </Button>

        {state.isExpired && <ResendCodeBtn />}
      </div>

      {state.errors && (
        <AnimatedDiv
          className="input-error !mt-4"
          animate={{ x: [-5, 0], opacity: [0, 1] }}
        >
          {state.errors.join(", ")}
        </AnimatedDiv>
      )}
    </form>
  );
};

export default CodeInputForm;
