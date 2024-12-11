"use client";
import React, { useRef, useState } from "react";
import CodeInput from "./CodeInput";
import { Button } from "@/components/ui/button";

type Props = {};

const CodeInputForm = (props: Props) => {
  const [code, setCode] = useState("");

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

    // Update code state with single digit
    const newCode = [...code];
    // Convert lowercase letters to uppercase
    if (/^[a-z]+$/.test(input.value)) {
      const uc = input.value.toUpperCase();
      newCode[index] = uc;
      if (inputRefs[index] && inputRefs[index].current)
        inputRefs[index].current.value = uc;
    } else {
      newCode[index] = input.value;
    }
    setCode(newCode.join(""));

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
      setCode(
        (prevCode) => prevCode.slice(0, index) + prevCode.slice(index + 1)
      );
      if (previousInput && previousInput.current) {
        previousInput.current.focus();
      }
    }
  }

  // Capture pasted characters
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedCode = e.clipboardData.getData("text");
    if (pastedCode.length === 6) {
      setCode(pastedCode);
      inputRefs.forEach((inputRef, index) => {
        if (inputRef.current) inputRef.current.value = pastedCode.charAt(index);
      });
    }
  };
  return (
    <form className="max-w-md w-full flex flex-col font-lexend text-black">
      <h1 className="text-2xl laptop:text-3xl  mb-8 text-start font-bold">
        Verify code
      </h1>

      <h3 className="text-sm laptop:text-base mb-3 text-start font-medium">
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
          />
        ))}
      </div>
      <p className="font-thin text-xs text-opacity-60 mb-5">
        code expires in 30 minutes
      </p>

      <Button
        type="submit"
        className="font-lexend text-base bg-doxleColor hover:bg-doxleColor hover:scale-105 self-start rounded-none px-7 transition-all ease-linear duration-50"
      >
        Submit
      </Button>
    </form>
  );
};

export default CodeInputForm;
