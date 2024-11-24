"use client";

import { useEffect } from "react";
import { useLoading } from "./LoadingContext";
import PokemonCard from "./PokemonCard";
import { Pokemon } from "@/types/pokemon";

interface PokemonGridClientProps {
  pokemonList: Pokemon[];
}

export default function PokemonGridClient({
  pokemonList,
}: PokemonGridClientProps) {
  const { setIsLoading } = useLoading();

  useEffect(() => {
    setIsLoading(false);
  }, [pokemonList, setIsLoading]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {pokemonList.map((pokemon, index) => (
        <PokemonCard 
          key={pokemon.id} 
          pokemon={pokemon} 
          priority={index === 0}
        />
      ))}
    </div>
  );
}
