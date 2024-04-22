import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import * as React from "react";

const allowedFileMimes = [
  "image/png",
  "image/jpeg",
  "image/bmp",
  "image/tiff",
  "image/webp",
];

const formSchema = z.object({
  userName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  userEmail: z.string().email({ message: "Provide valid email" }),
  file: z.instanceof(File).superRefine((file: File, ctx) => {
    if (file.size > 5000000) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Maximum file size (...). Max is 5MB`,
        fatal: true,
      });
    } else if (!allowedFileMimes.includes(file.type)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Unsupported filetype. Please use one of ${allowedFileMimes.join()}`,
        fatal: true,
      });
    }
  }),
});

export function UploadForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userName: "Fooobar Name",
      userEmail: "foobar@dummy.com",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload a file</CardTitle>
        <CardDescription>
          File must be at most 5MB. Minimal dimensions is 200x200.{" "}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 text-xl"
          >
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="userEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="file"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel className="text-xl">File</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        ref={field.ref}
                        name={field.name}
                        onBlur={field.onBlur}
                        disabled={field.disabled}
                        onChange={(e) => {
                          form.setValue("file", e.target.files[0]);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <Button type="submit">Upload</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
