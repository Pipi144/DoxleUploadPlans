export type TLocalFileUploadState =
  | 'Preparing'
  | 'Uploading'
  | 'Processing'
  | 'Finalising'
  | 'Cancelled'
  | 'Completed'
  | 'Failed';

export interface ILocalUploadedFile {
  fileTempId: string;

  fileState: TLocalFileUploadState;
  fileItem: File;
  awsUrl?: string;
}

export type TUploadFilterStatus =
  | 'All uploads'
  | 'Completed'
  | 'Failed'
  | 'Processing';

export const FILTER_UPLOAD_STATUS: TUploadFilterStatus[] = [
  'All uploads',
  'Processing',
  'Completed',
  'Failed',
];
