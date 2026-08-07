"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthModal } from "@/components/auth/AuthModal";

export default function AuthPage() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
      <AuthModal isOpen={isOpen} onClose={handleClose} initialMode="login" />
    </main>
  );
}
