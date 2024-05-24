type props = {
  children: React.ReactNode;
};

export function TypographyH1({ children }: props) {
  return (
    <h1 className="text-slate-900 tracking-[0.015em] mb-6 scroll-m-20 text-32xl font-normal  lg:text-3xl">
      {children}
    </h1>
  );
}

export function TypographyH2({ children }: props) {
  return (
  <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold first:mt-0">
      {children}
    </h2>
  );
}

export function TypographyH3({ children }: props) {
  return (
    <h3 className="scroll-m-20 text-xl font-semibold">
      {children}
    </h3>
  );
}

export function TypographyH4({ children }: props) {
  return (
    <h4 className="scroll-m-20 text-lg font-semibold">
      {children}
    </h4>
  );
}

export function TypographyP({ children }: props) {
  return <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>;
}

export function TypographyBlockquote({ children }: props) {
  return (
    <blockquote className="mt-6 border-l-2 pl-6 italic">{children}</blockquote>
  );
}

export function TypographySmall({ children }: props) {
  return <small className="text-sm font-medium leading-none">{children}</small>;
}

export function TypographyMuted({ children }: props) {
  return <p className="text-sm text-muted-foreground">{children}</p>;
}
export function TypographyLarge({ children }: props) {
  return <div className="text-lg font-semibold">{children}</div>;
}
