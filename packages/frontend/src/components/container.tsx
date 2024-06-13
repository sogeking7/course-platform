export const MyContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="px-4 py-6 md:p-6 w-full max-w-[1248px] mx-auto">{children}</div>;
};

export const WhiteBox = ({ children }: { children: React.ReactNode }) => {
  return <div className="p-6 border bg-white rounded-3xl shadow-sm mb-6">{children}</div>;
};
