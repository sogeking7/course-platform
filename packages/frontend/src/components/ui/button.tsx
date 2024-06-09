import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center text-base justify-center whitespace-nowrap rounded-sm font-normal ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border border-transparent bg-[#1f2d5a] text-white hover:bg-[#35426a]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-neutral-300 bg-background hover:bg-neutral-100 hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-neutral-100 border border-transparent hover:border-neutral-300 hover:text-accent-foreground",
        link: "text-neutral-500 underline-offset-4 hover:underline",
        sidebar: "",
      },
      size: {
        default: "min-h-10 px-5 py-2",
        sm: "h-9 rounded-sm px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        reset: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  active?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, active, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
