import HomeLayout from "../home/layout";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <HomeLayout>{children}</HomeLayout>;
}
