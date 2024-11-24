"use client";

import { useEffect } from "react";
import { useLoading } from "./LoadingContext";
import ClientPagination from "./ClientPagination";

interface PokemonServerWrapperProps {
  children: React.ReactNode;
  currentPage: number;
  totalPages: number;
}

export default function PokemonServerWrapper({
  children,
  currentPage,
  totalPages,
}: PokemonServerWrapperProps) {
  const { setIsLoading } = useLoading();

  useEffect(() => {
    setIsLoading(false);
  }, [currentPage, setIsLoading]);

  return (
    <>
      {children}
      <ClientPagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}
