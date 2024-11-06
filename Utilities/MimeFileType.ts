import { Accept } from 'react-dropzone';

export const DOXLE_MIME_TYPE = {
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  pdf: 'application/pdf',
  images: 'image',
  csv: 'text/csv',
  text: 'text/plain',
  richText: 'application/rtf',
  png: 'png',
  jpeg: 'jpeg',
  jpg: 'jpg',
  mp4: 'mp4',
  video: 'video',
  zip: 'application/zip',
};

export const DOXLE_ACCEPTED_MIME: Accept = {
  'image/png': ['.png'],
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/webp': ['.webp'],
  'image/tiff': ['.tif', '.tiff'],
  'application/pdf': ['.pdf'],
  'application/vnd.ms-excel': ['.xls'],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
    '.xlsx',
  ],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [
    '.docx',
  ],
  'text/plain': ['.txt'],
  'application/rtf': ['.rtf'],
  'text/csv': ['.csv'],
  'video/mp4': ['.mp4'],
};
export const DOXLE_ACCEPTED_IMAGE_MIME: Accept = {
  'image/png': ['.png'],
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/webp': ['.webp'],
  'image/tiff': ['.tif', '.tiff'],
};

type IDoxleSupportedFiles =
  | 'xls'
  | 'pdf'
  | 'doc'
  | 'image'
  | 'csv'
  | 'text'
  | 'video'
  | 'zip';

interface CheckSupportedFileTypeProps {
  name?: string;
  type?: string;
}
export const checkSupportedFileType = ({
  name = '',
  type = '',
}: CheckSupportedFileTypeProps): IDoxleSupportedFiles | undefined => {
  if (
    name.endsWith('.doc') ||
    name.endsWith('.docx') ||
    type.includes(DOXLE_MIME_TYPE.doc) ||
    type.includes(DOXLE_MIME_TYPE.docx)
  )
    return 'doc';
  else if (
    name.endsWith('.xls') ||
    name.endsWith('.xlsx') ||
    type.includes(DOXLE_MIME_TYPE.xls) ||
    type.includes(DOXLE_MIME_TYPE.xlsx)
  )
    return 'xls';
  else if (name.endsWith('.csv') || type.includes(DOXLE_MIME_TYPE.csv))
    return 'csv';
  else if (name.endsWith('.pdf') || type.includes(DOXLE_MIME_TYPE.pdf))
    return 'pdf';
  else if (
    name.endsWith('.png') ||
    name.endsWith('.jpg') ||
    name.endsWith('.jpeg') ||
    type.includes(DOXLE_MIME_TYPE.images)
  )
    return 'image';
  else if (
    name.endsWith('.txt') ||
    name.endsWith('.rtf') ||
    type.includes(DOXLE_MIME_TYPE.text) ||
    type.includes(DOXLE_MIME_TYPE.richText)
  )
    return 'text';
  else if (type.includes('video')) return 'video';
  else if (type.includes('zip')) return 'zip';
  else return undefined;
};
