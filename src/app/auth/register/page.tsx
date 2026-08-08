"use client";

import Link from "next/link";
import { useMemo } from "react";
import DynamicForm from "@/components/common/DynamicForm";
import { FormSection } from "@/components/common/Types";
import api from "@/src/app/lib/axios"
import { useRouter } from "next/navigation";




const sections: FormSection[] = [
  {
    title: "Registration Form",
    fields: [
      {
        name: "name",
        label: "Full Name",
        type: "text",
        placeholder: "John Doe",
        required: true,
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "john@example.com",
        required: true,
      }, {
        name: "phone",
        label: "Phone",
        type: "number",
        placeholder: "9653245896",
        required: true,
      },
      {
        name: "password",
        label: "Password",
        type: "password",
        placeholder: "Create password",
        required: true,
      },
      {
        name: "confirmPassword",
        label: "Confirm Password",
        type: "password",
        placeholder: "Confirm password",
        required: true,
      },
    ],
  }
]


export default function RegisterPage() {
const router = useRouter();

const handleSubmit = async (data: Record<string, any>) => {
  try {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const payload = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
    };

    console.log(payload)

    const res = await api.post("/auth/register", payload);

    alert(res.data.message);

    router.push("/auth/login");
  } catch (err: any) {
    console.log(err.response?.status);
    console.log(err.response?.data);
  }
};

  return (
    <div className="w-full max-w-md rounded-2xl bg-white text-black p-8 shadow-xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Create Account
        </h1>

        <p className="mt-2 text-gray-500">
          Register to start managing your gym
        </p>
      </div>

      <DynamicForm
        sections={sections}
        submitLabel="Register"
        onSubmit={handleSubmit}
      />

      <div className="mt-6 text-center text-sm">
        Already have an account?{" "}
        <Link
          href="/auth/login"
          className="font-semibold text-blue-600"
        >
          Login
        </Link>
      </div>
    </div>
  );
}