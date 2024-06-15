import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "@/components/login/login-form";
import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }
  return (
    <div className="w-full h-screen flex justify-center  pt-[15vh] bg-[#F0F2F5]">
      <div className="flex flex-col min-w-[320px] items-center gap-12">
        <Link href="/" className="">
          <Image alt="Logo" src="/shoqan-edu.svg" width={230} height={90} />
        </Link>
        <Card className="w-full sm:w-[320px] md:w-[320px]">
          <CardHeader>
            <CardTitle className="text-center">Кіру</CardTitle>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
