"use client";

import { useEffect } from "react";
import ErrorMessage from "./ErrorMessage";

export default function ErrorBoundary({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error("Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <ErrorMessage error={error} />
    </div>
  );
}
