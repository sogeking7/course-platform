import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "@/components/login/login-form";
import { LogoHome } from "@/components/logo";
import { MyContainer } from "@/components/container";

export default async function LoginPage() {
  return (
    <MyContainer>
      <main className="w-full flex items-center">
        <div className=" w-full flex flex-col items-center justify-center">
          <div className="mb-4">
            <LogoHome />
          </div>
          <Card className="w-full sm:w-[400px] xl:w-[500px]">
            <CardHeader>
              <CardTitle className="text-center">Кіру</CardTitle>
            </CardHeader>
            <CardContent>
              <LoginForm />
            </CardContent>
          </Card>
        </div>
      </main>
    </MyContainer>
  );
}
