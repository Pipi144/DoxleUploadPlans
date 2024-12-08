"use client";

import React, { createContext, PropsWithChildren, useContext } from "react";
import { IUploadPageContextValue } from "./useUploadPage";

const UploadPageContext = createContext<IUploadPageContextValue | null>(null);
const UploadProvider = ({
  children,
  ...props
}: PropsWithChildren & IUploadPageContextValue) => {
  return (
    <UploadPageContext.Provider value={props}>
      {children}
    </UploadPageContext.Provider>
  );
};

export default UploadProvider;
export const useUploadPageContext = () =>
  useContext(UploadPageContext) as IUploadPageContextValue;
