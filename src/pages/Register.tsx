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
import { useRegister } from "@/hooks/useAuth";
import type { RegisterModel } from "@/Models/AuthModels";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { form, mutation } = useRegister();
  const navigate = useNavigate();
  const handleRegister = (data: RegisterModel) => {
    mutation.mutate(data);
  };
  return (
    <div className="flex justify-center items-center w-full h-screen p-5">
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Create your account</CardTitle>
          <CardDescription>
            Enter your data below to create a new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(handleRegister)}>
            <div className="flex flex-col gap-6">
              {/* Username */}
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Amylya Nurul"
                  {...form.register("username")}
                />
              </div>

              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...form.register("email")}
                />
              </div>

              {/* Password */}
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...form.register("password")}
                />
              </div>

              {/* Confirm Password */}
              <div className="grid gap-2">
                <Label htmlFor="confirm_password">Confirm Password</Label>
                <Input
                  id="confirm_password"
                  type="password"
                  placeholder="Re-type your password"
                  {...form.register("confirm_password")}
                />
              </div>
            </div>

            <Button type="submit" className="w-full mt-4">
              Register
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
            Sudah punya akun?{" "}
            <Button
              onClick={() => navigate("/login")}
              variant="link"
              className="p-0 h-auto"
            >
              Login
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
