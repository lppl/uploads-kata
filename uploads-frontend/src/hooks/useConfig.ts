export function useConfig() {
  return {
    storeUploadEndpoint:'http://localhost:8000/api/upload',
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

// import {
//     useQuery,
// } from 'react-query'
// import {z} from "zod";
//
// const configEndpoint = import.meta.env.CONFIG_ENDPOINT;
//
// const configSchema = z.object({
//     token: z.string(),
//     uploadsEndpoint: z.string(),
//     maxFileSize: z.number(),
//     minimumWidth: z.number(),
//     minimumHeight: z.number(),
//     allowedFileTypes: z.array(z.string()),
// });
//
// const ConfigSchemaType = z.infer<typeof configSchema>;
//
// export function useConfig() {
//
//     const {isLoading, data} = useQuery({queryKey: 'config', queryFn: async () => {
//             const response = await fetch(configEndpoint);
//             if (!response.ok) {
//                 throw new Error('Network response was not ok')
//             }
//             return configSchema.parse(await response.json());
//         }});
//
//     return isLoading ? data : undefined;
// }
