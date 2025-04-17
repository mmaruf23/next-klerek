export const isZip = (mime : string): boolean => {
  return [
        'application/zip',
        'application/x-zip-compressed',
        'application/octet-stream',
      ].includes(mime) ||
      mime.toLowerCase().endsWith('.zip');

}