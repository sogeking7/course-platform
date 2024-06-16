import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { Loader2, Trash } from "lucide-react";
import { UseMutationResult } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

type Props = {
  size?: "icon" | "default";
  mutation: UseMutationResult<any, Error, any, unknown>;
  id: number | string;
  name: string;
};

export const MyAlert = ({ size = "default", mutation, id, name }: Props) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className={cn(size === "icon" ? "!min-w-8 !min-h-8 !rounded-lg" : "")}
          size={"icon"}
          variant={"destructive"}
        >
          <Trash size={size === "icon" ? 14 : 16} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center">
            <Trash size={20} className="inline-block mr-2 text-destructive" />
            {name}
          </AlertDialogTitle>
          <AlertDialogDescription>
            Бұл әрекетті қайтару мүмкін емес. Бұл сіздің есептік жазбаңызды
            біржола жояды және деректеріңізді біздің серверлерден жояды.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Болдырмау</AlertDialogCancel>
          <AlertDialogAction onClick={() => mutation.mutate(id)}>
            {mutation.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Жалғастыру
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
