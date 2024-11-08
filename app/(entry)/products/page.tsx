import React from "react";


function Products() {
  return (
    <>
      <span
        className="font-lora text-[35px] tablet:text-[50px] laptop:text-[64px] text-[#315CDB] font-medium"
        contentEditable={false}
      >
        Coming soon...
      </span>
      <span className="text-[14px]  font-normal font-plexSanThai max-w-[75%] tablet:max-w-[70%] laptop:max-w-[600px] text-justify my-[10px] laptop:my-[14px] whitespace-pre-wrap">
        Doxle is currently in its beta phase, actively collaborating with
        builders to test and refine our platform. Stay tuned! Our official
        launch is just around the corner.
      </span>
    </>
  );
}

export default Products;
