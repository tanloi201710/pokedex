"use client";

import { useLoading } from "./LoadingContext";
import PokemonCardSkeleton from "./PokemonCardSkeleton";
import { Suspense } from "react";

interface PokemonContentProps {
  children: React.ReactNode;
}

export default function PokemonContent({ children }: PokemonContentProps) {
  const { isLoading } = useLoading();

  const skeletonGrid = (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <PokemonCardSkeleton key={i} />
      ))}
    </div>
  );

  return (
    <Suspense fallback={skeletonGrid}>
      <div className={isLoading ? '' : 'hidden'}>{skeletonGrid}</div>
      <div className={isLoading ? 'hidden' : ''}>{children}</div>
    </Suspense>
  );
}
