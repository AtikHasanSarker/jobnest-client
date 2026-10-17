"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Card, Separator } from "@heroui/react";
import { Envelope, Eye, EyeSlash, ShieldKeyhole } from "@gravity-ui/icons";
import { InputGroup, Label, TextField } from "@heroui/react";
import { authClient, signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || `/`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const user = Object.fromEntries(form.entries());
    const { data, error } = await signIn.email({
      email: user.email,
      password: user.password,
    });
    if (data) {
      toast.success("Sign In Successful! Redirecting...");
      const { data: sessionData, error: sessionError } =
        await authClient.getSession();

      if (sessionError || !sessionData?.user) {
        toast.error("Unable to retrieve your session.");
        return;
      }

      const redirect =
        searchParams.get("redirect") || `/dashboard/${sessionData.user.role}`;

      router.replace(redirect);
    } else {
      toast.error("Sign In Failed!");
    }
  };

  return (
    <main className="min-h-screen bg-[#07070A] pt-30">
      <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-10">
        <Card
          className="w-full max-w-md border border-white/10 bg-white/3 backdrop-blur-xl"
        >
          <div className="p-8">
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold ">Welcome Back</h1>

              <p className="mt-2 text-sm text-gray-400">
                Sign in to continue your journey with JobNest.
              </p>
            </div>

            <div className="my-6">
              <Separator />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <TextField
                isRequired
                className="w-full"
                name="email"
                type="email"
                validate={(value) => {
                  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                    return "Please enter a valid email address";
                  }
                  return null;
                }}
              >
                <Label>Email address</Label>
                <InputGroup>
                  <InputGroup.Prefix>
                    <Envelope className="size-4 text-muted" />
                  </InputGroup.Prefix>

                  <InputGroup.Input
                    className="w-full"
                    placeholder="name@email.com"
                  />
                </InputGroup>
              </TextField>

              {/* Password */}
              <TextField
                isRequired
                className="w-full"
                name="password"
                type="password"
                validate={(value) => {
                  if (value.length < 8) {
                    return "Password must be at least 8 characters";
                  }
                  return null;
                }}
              >
                <div className="mb-2 flex items-center justify-between">
                  <Label>Password</Label>

                  <Link href="/forgot-password">
                    <span>Forgot Password?</span>
                  </Link>
                </div>

                <InputGroup>
                  <InputGroup.Prefix>
                    <ShieldKeyhole className="size-4 text-muted" />
                  </InputGroup.Prefix>
                  <InputGroup.Input
                    className="w-full"
                    type={isVisible ? "text" : "password"}
                    placeholder="Enter your password"
                  />
                  <InputGroup.Suffix className="pr-0">
                    <Button
                      isIconOnly
                      aria-label={isVisible ? "Hide password" : "Show password"}
                      size="sm"
                      variant="ghost"
                      onPress={() => setIsVisible(!isVisible)}
                    >
                      {isVisible ? (
                        <Eye className="size-4" />
                      ) : (
                        <EyeSlash className="size-4" />
                      )}
                    </Button>
                  </InputGroup.Suffix>
                </InputGroup>
              </TextField>

              {/* Submit */}
              <Button
                type="submit"
                className="h-12 w-full bg-linear-to-r from-violet-600 to-indigo-600 font-medium"
              >
                Sign In
              </Button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center">
              <span className="text-sm text-gray-400">
                Don&apos;t have an account?
              </span>

              <Link
                href={`/signup?redirect=${redirectTo}`}
                className="ml-2 text-sm font-medium text-violet-400 hover:text-violet-300"
              >
                Create Account
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
