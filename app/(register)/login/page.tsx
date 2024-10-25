import LoginForm from "@/components/module/Login";
import React, { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="h-screen m-auto w-full">
        <LoginForm />
      </div>
    </Suspense>
  );
}
