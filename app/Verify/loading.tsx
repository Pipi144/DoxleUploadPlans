import DoxleIconPlain from "@/components/DoxleIcons";
import GradualSpacing from "@/components/ui/gradual-spacing";
import React from "react";


const loading = () => {
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
        text="Getting information..."
        className="text-black text-[18px] tablet:text-[20px] font-lexend font-semibold leading-1"
        duration={1}
      />
    </>
  );
};

export default loading;
