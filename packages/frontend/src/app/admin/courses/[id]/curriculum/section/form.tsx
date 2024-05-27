import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Section, createSectionSchema } from "@/types";

type Props = {
  data?: Section;
  mode: "edit" | "new";
  setOpen: Dispatch<SetStateAction<"edit" | "default" | "new">>;
};

export default function SectionForm({ setOpen, data, mode }: Props) {
  const form = useForm<z.infer<typeof createSectionSchema>>({
    resolver: zodResolver(createSectionSchema),
    defaultValues: {
      name: data?.name || "",
      description: data?.description || "",
    },
  });

  const onSubmit = (data: z.infer<typeof createSectionSchema>) => {
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {mode === "new" ? "Жаңа модуль:" : "Mодуль аты:"}
              </FormLabel>
              <FormControl>
                <Input placeholder="Аты" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Сипаттамасы</FormLabel>
              <FormControl>
                <Input
                  placeholder="Модуль не жайлы екенің жазыныз..."
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div className="flex justify-end w-full gap-4">
          <Button
            type="button"
            variant="ghost"
            onClick={() => setOpen("default")}
          >
            Cancel
          </Button>
          <Button type="submit">{mode === "new" ? "Косу" : "Сақтау"}</Button>
        </div>
      </form>
    </Form>
  );
}
