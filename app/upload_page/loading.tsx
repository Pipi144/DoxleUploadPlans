import DoxleIconPlain from "@/components/DoxleIcons";
import GradualSpacing from "@/components/ui/gradual-spacing";
import React from "react";

type Props = {};

const loading = (props: Props) => {
  return (
    <>
      <DoxleIconPlain
        overwrittenColor="black"
        containerStyle={{
          marginBottom: 20,
          width: 100,
        }}
      />
      <GradualSpacing
        text="Initializing session..."
        className="text-black text-[18px] tablet:text-[20px] font-lexend font-semibold leading-1"
        duration={1}
      />
    </>
  );
};

export default loading;
