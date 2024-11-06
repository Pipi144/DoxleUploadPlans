import { create } from "zustand";
import { FileRejection } from "react-dropzone";
import { immer } from "zustand/middleware/immer";

interface DoxleErrorWarningState {
  currentErrorFiles: FileRejection[];
  addCurrentErrorFiles: (files: FileRejection[]) => void;
  clearCurrentErrorFiles: () => void;
}

export const useDoxleErrorWarningStore = create(
  immer<DoxleErrorWarningState>((set, get) => ({
    currentErrorFiles: [],
    addCurrentErrorFiles: (files: FileRejection[]) =>
      set((state) => {
        state.currentErrorFiles.push(...files);
      }),
    clearCurrentErrorFiles: () =>
      set((state) => {
        state.currentErrorFiles = [];
      }),
  }))
);
