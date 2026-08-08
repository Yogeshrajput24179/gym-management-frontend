"use client";

import Link from "next/link";
import { useMemo } from "react";
import DynamicForm from "@/components/common/DynamicForm";
import api from "@/src/app/lib/axios"
import { useRouter } from "next/navigation";


export default function LoginPage() {
const router = useRouter();

  const sections = useMemo(
    () => [
      {
        fields: [
          {
            name: "email",
            label: "Email",
            type: "email",
            placeholder: "Enter your email",
            required: true,
          },
          {
            name: "password",
            label: "Password",
            type: "password",
            placeholder: "Enter your password",
            required: true,
          },
        ],
      },
    ],
    []
  );

  const handleSubmit = async (data: Record<string, any>) => {
    console.log(data);
    const res = await api.post("/auth/login", data);

    localStorage.setItem("token", res.data.token);

    localStorage.setItem(
      "user",
      JSON.stringify(res.data.user)
    );

    router.push("/dashboard");
  };

  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome Back 👋
        </h1>

        <p className="mt-2 text-gray-500">
          Sign in to your Gym AI account
        </p>
      </div>

      <DynamicForm
        sections={sections}
        submitLabel="Login"
        onSubmit={handleSubmit}
      />

      <div className="mt-6 text-center">
        <Link
          href="/auth/forgot-password"
          className="text-sm text-blue-600 hover:underline"
        >
          Forgot Password?
        </Link>
      </div>

      <div className="mt-6 text-center text-sm">
        Don't have an account?{" "}
        <Link
          href="/auth/register"
          className="font-semibold text-blue-600"
        >
          Register
        </Link>
      </div>
    </div>
  );
}