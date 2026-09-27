"use client";

import { useState } from "react";
import { Button, Card, Separator, Form, RadioGroup, Radio, Spinner } from "@heroui/react";
import {
  Envelope,
  Eye,
  EyeSlash,
  Person,
  ShieldKeyhole,
} from "@gravity-ui/icons";
import { InputGroup, Label, TextField } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignupPage() {
  const router= useRouter()
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const user = Object.fromEntries(form.entries());

    const plan = user.role === 'seeker' ? 'seeker_free' : 'recruiter_free';

    const { data, error } = await authClient.signUp.email({
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
      plan,
    });
    if(data){
      toast.success("You have Registered Successfully!")
      router.push(redirectTo)
    }else{
      toast.error("Registration Failed!")
    }
    setLoading(false);
  };


  return (
    <main className="min-h-screen bg-[#07070A] pt-30">
      <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-10">
        <Card className="w-full max-w-md">
          <div className="p-8">
            {/* Header */}

            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold ">Create Account</h1>

              <p className="mt-2 text-sm">
                Join JobNest and start your career journey.
              </p>
            </div>

            <div className="my-6">
              <Separator />
            </div>

            {/* Form */}

            <Form onSubmit={handleSubmit} className="space-y-5">
              <TextField
                isRequired
                className="w-full"
                name="name"
                type="text"
                validate={(value) => {
                  if (value.length < 3) {
                    return "Name must be at least 3 characters";
                  }
                  return null;
                }}
              >
                <Label className="">Full Name</Label>
                <InputGroup>
                  <InputGroup.Prefix>
                    <Person className="size-4" />
                  </InputGroup.Prefix>
                  <InputGroup.Input
                    className="w-full"
                    placeholder="Enter your name"
                  />
                </InputGroup>
              </TextField>

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
                <Label className="">Email address</Label>
                <InputGroup>
                  <InputGroup.Prefix>
                    <Envelope className="size-4" />
                  </InputGroup.Prefix>
                  <InputGroup.Input
                    className="w-full"
                    placeholder="name@email.com"
                  />
                </InputGroup>
              </TextField>

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
                <Label className="">Password</Label>
                <InputGroup>
                  <InputGroup.Prefix>
                    <ShieldKeyhole className="size-4" />
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

              {/* Radio for role */}

              <div className="flex flex-col gap-4">
                <Label>Your Role</Label>
                <RadioGroup
                  className=""
                  defaultValue="seeker"
                  name="role"
                  orientation="horizontal"
                >
                  <Radio value="seeker">
                    <Radio.Control>
                      <Radio.Indicator />
                    </Radio.Control>
                    <Radio.Content>
                      <Label>Job Seeker</Label>
                    </Radio.Content>
                  </Radio>
                  <Radio value="recruiter">
                    <Radio.Control>
                      <Radio.Indicator />
                    </Radio.Control>
                    <Radio.Content>
                      <Label>Recruiter</Label>
                    </Radio.Content>
                  </Radio>
                </RadioGroup>
              </div>

              <Button
                type="submit"
                className="h-12 w-full bg-linear-to-r from-violet-600 to-indigo-600 font-medium"
                disabled={loading}
              >
                {loading ? (
                  <Spinner color="white" size="sm" />
                ) : (
                  "Create Account"
                )}
              </Button>
            </Form>

            {/* Footer */}

            <div className="mt-6 text-center">
              <span className="text-sm text-gray-400">
                Already have an account?
              </span>

              <Link
                href={`/signin?redirect=${redirectTo}`}
                className="ml-2 text-sm font-medium text-violet-400 hover:text-violet-300"
              >
                Sign In
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
