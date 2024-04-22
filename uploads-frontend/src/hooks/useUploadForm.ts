import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useConfig } from "@/hooks/useConfig.ts";
import { useMemo } from "react";

function createSchema(config: {
  maxFileSize: number;
  allowedFileTypes: string[];
}) {
  return z.object({
    userName: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    userEmail: z.string().email({ message: "Provide valid email" }),
    file: z.instanceof(File).superRefine((file: File, ctx) => {
      if (file.size > config.maxFileSize) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Maximum file size (...). Max is ${config.maxFileSize} bytes`,
          fatal: true,
        });
      } else if (!config.allowedFileTypes.includes(file.type)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Unsupported filetype. Please use one of ${config.allowedFileTypes.join()}`,
          fatal: true,
        });
      }
    }),
  });
}

export type UploadFormSchema = z.infer<ReturnType<typeof createSchema>>;

export function useUploadForm() {
  const config = useConfig();

  const schema = useMemo(() => {
    return createSchema({
      maxFileSize: config.maxFileSize,
      allowedFileTypes: config.allowedFileTypes,
    });
  }, [config.maxFileSize, config.allowedFileTypes]);

  const form = useForm<UploadFormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      userName: "Fooobar Name",
      userEmail: "foobar@dummy.com",
    },
  });
  return form;
}
