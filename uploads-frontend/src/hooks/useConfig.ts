export function useConfig() {
  return {
    maxFileSize: 5 * 1024 * 1024,
    allowedFileTypes: [
      "image/png",
      "image/jpeg",
      "image/bmp",
      "image/tiff",
      "image/webp",
    ],
    minimumWidth: 20,
    minimumHeight: 200,
  };
}
