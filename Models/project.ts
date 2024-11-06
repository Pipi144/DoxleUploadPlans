import { TISODateTime } from "./dateFormat";
import { DecimalString } from "./ResponeTypes";

export interface Project {
  projectId: string;
  projectName: string;
  createdOn: TISODateTime;
  totalBudget: DecimalString;
  createStorey?: boolean;
}

export interface IProjectFile {
  fileId: string;
  fileName: string;
  fileSize: number;
  pages: number;
  url: string | null;
  status: "success" | "pending";
}

export interface IProjectDetailWithFiles {
  projectId: string;
  projectName: string;
  createdOn: TISODateTime;
  storeys: number;
  stages: number;
  dockets: number;
  files: IProjectFile[];
}

export interface IPlanProjectDetails extends Project {
  userName: string | null;
  userEmail: string | null;
  userPhone: string | null;
  processClicked: boolean;
  emailVerified: boolean;
}
