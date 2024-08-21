import { cn } from "@/lib/utils";

export const MyContainer = ({
  children,
  className,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "px-4 py-6 md:py-8 md:px-10 w-full max-w-[1400px] mx-auto",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const WhiteBox = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-4 lg:p-6 border bg-white rounded-lg shadow-sm text-base ">
      {children}
    </div>
  );
};
