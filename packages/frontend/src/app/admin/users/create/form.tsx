"use client";

import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { Error, User, createUserSchema } from "@/types";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useUserStore } from "@/store/user";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { PasswordInput } from "@/components/ui/password-input";

export const AdminUsersCreateForm = ({
  mode = "create",
  data,
}: {
  data?: User;
  mode?: "create" | "edit";
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const userStore = useUserStore();
  const authStore = useAuthStore();

  const form = useForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(createUserSchema),
    criteriaMode: "all",
    defaultValues: {
      firstName: data?.firstName || "",
      lastName: data?.lastName || "",
      email: data?.email || "",
      password: "",
      repeatPassword: "",
      changePassword_checked: mode === "create" ? true : false,
    },
  });

  const mutation = useMutation({
    mutationFn: (newData: any) => {
      if (mode === "edit" && data) {
        return userStore.update(data.id, newData);
      }
      return authStore.register(newData);
    },
    onError: (error: AxiosError) => {
      const errorData = error.response?.data as Error;
      if (mode === "create") {
        form.setError("root.serverError", {
          type: errorData.statusCode.toString(),
          message: errorData.message,
        });
      }
    },
    onSuccess: (data) => {
      if (mode === "edit") {
        queryClient.setQueryData(["user", { id: data.id }], data);
        form.resetField("password");
        form.resetField("repeatPassword");
        form.resetField("changePassword_checked");
        form.reset(form.getValues());
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["users"] });
      router.back();
    },
  });

  const onSubmit = (data: z.infer<typeof createUserSchema>) => {
    const { repeatPassword, changePassword_checked, ...resgisterData } = data;

    mutation.mutate(resgisterData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 p-5 bg-white border rounded-lg"
      >
        <div className="space-y-3 max-w-[320px]">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Аты</FormLabel>
                <FormControl>
                  <Input placeholder="Аты" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Тегі</FormLabel>
                <FormControl>
                  <Input placeholder="Тегі" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Почта</FormLabel>
                <FormControl>
                  <Input placeholder="Почта" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="changePassword_checked"
            render={({ field }) => (
              <>
                {mode === "edit" && (
                  <FormItem>
                    <div className="py-5 flex items-center space-x-2">
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Құпия сөзді өзгерту</FormLabel>
                    </div>
                  </FormItem>
                )}
                {form.getValues("changePassword_checked") && (
                  <>
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Құпия сөз</FormLabel>
                          <FormControl>
                            <PasswordInput placeholder="Құпия сөз" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="repeatPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Құпия сөзді қайталау</FormLabel>
                          <FormControl>
                            <PasswordInput
                              placeholder="Құпия сөзді қайталау"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </>
            )}
          />
        </div>
        {form.formState.errors.root?.serverError.type === "400" && (
          <p className="text-sm text-destructive">
            {form.formState.errors.root?.serverError.message}
          </p>
        )}
        {form.formState.isDirty && (
          <div className="flex gap-4">
            <Button variant={"outline"} onClick={() => form.reset()}>
              Болдырмау
            </Button>
            <Button type="submit">
              {mutation.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Сақтау
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
};
