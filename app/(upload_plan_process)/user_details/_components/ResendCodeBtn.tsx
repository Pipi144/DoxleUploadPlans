"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { resendVerification } from "../../action";
import { useToast } from "@/hooks/use-toast";

type Props = {};

const ResendCodeBtn = (props: Props) => {
  const [isPending, setIsPending] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const { toast } = useToast();
  const handleResendCode = async () => {
    try {
      setIsPending(true);
      const response = await resendVerification();
      setIsPending(false);
      if (response.success) setIsCodeSent(true);
      else if (response.error)
        toast({
          title: "Error",
          description: response.error,
          variant: "destructive",
          duration: 1000,
        });
    } catch (error: any) {
      console.log("ERROR in ResendCodeBtn:", error);
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
        duration: 1000,
      });
      setIsPending(false);
    }
  };
  return (
    <Button
      className="font-lexend text-base bg-black hover:bg-black hover:!bg-opacity-80 text-white ml-4 hover:scale-105 self-start rounded-none px-7 transition-all ease-linear duration-50"
      onClick={() => handleResendCode()}
      disabled={isPending || isCodeSent}
    >
      {isPending ? "Sending code..." : isCodeSent ? "Code Sent" : "Resend"}
    </Button>
  );
};

export default ResendCodeBtn;
