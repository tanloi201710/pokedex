"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-foreground/10 hover:bg-foreground/20 transition-colors"
    >
      <ArrowLeft className="w-4 h-4" />
      Back to list
    </button>
  );
}
