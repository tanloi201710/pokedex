'use client'

import Image from "next/image";
import { Pokemon } from "@/types/pokemon";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { getTypeColor } from "@/lib/typeColors";

const DEFAULT_POKEMON_IMAGE = "/pikachu-placeholder.png";

interface PokemonCardProps {
  pokemon: Pokemon;
  priority?: boolean;
}

export default function PokemonCard({ pokemon, priority = false }: PokemonCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isNameTruncated, setIsNameTruncated] = useState(false);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const imageUrl = !imageError && pokemon.sprites.other["official-artwork"]?.front_default
    ? pokemon.sprites.other["official-artwork"].front_default
    : DEFAULT_POKEMON_IMAGE;

  useEffect(() => {
    const element = nameRef.current;
    if (!element) return;

    const checkTruncation = () => {
      setIsNameTruncated(element.scrollWidth > element.clientWidth);
    };

    // Check initial truncation
    checkTruncation();

    // Create ResizeObserver
    const resizeObserver = new ResizeObserver(checkTruncation);
    resizeObserver.observe(element);

    return () => {
      resizeObserver.disconnect();
    };
  }, [pokemon.name]);

  return (
    <Link href={`/pokemon/${pokemon.id}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow h-[400px]">
        <div className="relative w-full h-48">
          <Image
            src={imageUrl}
            alt={pokemon.name}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain"
            onError={() => setImageError(true)}
            loading={priority ? undefined : "lazy"}
          />
        </div>
        <div className="mt-4">
          <div className="group relative">
            <h2 ref={nameRef} className="text-xl font-bold capitalize truncate">
              {pokemon.name}
            </h2>
            {isNameTruncated && (
              <div className="absolute left-0 -top-8 w-full opacity-0 group-hover:opacity-100 bg-gray-800 dark:bg-gray-700 text-white dark:text-gray-100 px-2 py-1 rounded text-sm z-10 transition-opacity capitalize">
                {pokemon.name}
              </div>
            )}
          </div>
          <div className="flex gap-2 mt-2">
            {pokemon.types.map((type) => (
              <span
                key={type.type.name}
                className="px-3 py-1 text-sm text-white rounded-full"
                style={{ backgroundColor: getTypeColor(type.type.name) }}
              >
                {type.type.name}
              </span>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div>
              <p className="text-gray-600 dark:text-gray-400">Height</p>
              <p>{pokemon.height / 10}m</p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400">Weight</p>
              <p>{pokemon.weight / 10}kg</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
