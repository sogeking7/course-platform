import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "@/components/login/login-form";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="w-full h-screen flex justify-center  pt-[15vh] bg-[#F5F5F5]">
      <div className="flex flex-col min-w-[360px] items-center gap-12">
        <Link href="/" className="">
          <Image alt="Logo" src="/shoqan-edu.svg" width={230} height={90} />
        </Link>
        <Card className="w-full sm:w-[360px] md:w-[400px]">
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
