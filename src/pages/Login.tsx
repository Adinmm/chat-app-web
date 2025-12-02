import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/hooks/useAuth";
import type { LoginModel } from "@/Models/AuthModels";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { form, mutation } = useLogin();
  const navigate = useNavigate();
  const handleLogin = (data: LoginModel) => {
    console.log(data);
    mutation.mutate(data);
  };
  return (
    <div className="flex justify-center items-center w-full h-screen p-5">
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Masukkan email dan password untuk masuk ke akun Anda.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                {...form.register("email")}
                id="email"
                type="email"
                placeholder="m@example.com"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                {...form.register("password")}
                id="password"
                type="password"
              />
            </div>

            <Button type="submit" className="w-full mt-2">
              Login
              {mutation.isPending && (
                <span>
                  <Loader className="animate-spin" />
                </span>
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            Belum punya akun?{" "}
            <Button
              onClick={() => navigate("/register")}
              variant="link"
              className="p-0 h-auto"
            >
              Daftar
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
