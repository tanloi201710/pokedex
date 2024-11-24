"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export default function ErrorMessage({ error }: { error: Error }) {
  useEffect(() => {
    toast.error(error.message || "Something went wrong");
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{error.message}</p>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
