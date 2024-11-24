import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <Loader2 className="w-8 h-8 animate-spin" />
    </div>
  );
}
