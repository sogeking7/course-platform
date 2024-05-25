import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "@/components/login/login-form";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="w-full flex justify-center items-center pt-[25vh]">
      <div className="flex flex-col min-w-[320px] items-center gap-6">
        <Link href="/" className="">
          <Image alt="Logo" src="/shoqan-edu.svg" width={200} height={90} />
        </Link>
        <Card className="w-full sm:w-[400px] xl:w-[500px]">
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
