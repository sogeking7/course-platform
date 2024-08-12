export const MyContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="px-4 py-6 md:py-8 md:px-10 w-full max-w-[1400px] mx-auto">
      {children}
    </div>
  );
};

export const WhiteBox = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-4 lg:p-6 border bg-white rounded-lg shadow-sm ">
      {children}
    </div>
  );
};
