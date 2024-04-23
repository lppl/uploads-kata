import { z } from "zod";
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
import { UploadFormSchema, useUploadForm } from "@/hooks/useUploadForm.ts";
import {useConfig} from "@/hooks/useConfig.ts";

export function UploadForm() {
  const form = useUploadForm();
  const config = useConfig();

  function onSubmit(values: UploadFormSchema) {
    const formData = new FormData();
    formData.append("user_name", values.userName);
    formData.append("user_email", values.userEmail);
    formData.append("file", values.file, values.file.name);

    fetch(config.storeUploadEndpoint, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((data) => {
        console.log("Post response: ", data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });

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
