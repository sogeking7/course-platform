import { Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
type Props = {
  name: string;
};

const schema = z.object({
  name: z.string().min(1, { message: "Қажет" }),
});

export const EditNameForm = (props: Props) => {
  const form = useForm<z.infer<typeof schema>>({
    defaultValues: {
      name: props.name,
    },
  });
  const [mode, setMode] = useState<"edit" | "default">("default");

  const onSubmit = (data: z.infer<typeof schema>) => {
    setMode("default");
  };

  if (mode === "default") {
    <span className="flex gap-2">
      <span className="text-gray-700 font-normal">{props.name}</span>
      <button onClick={() => setMode("edit")}>
        <Pencil size={16} />
      </button>
    </span>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="mb-4 flex gap-4 items-center">
              <FormControl>
                <input placeholder="Аты" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" size={"sm"}>
          Save
        </Button>
      </form>
    </Form>
  );
};
