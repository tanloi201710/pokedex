import { getPokemonList } from "@/lib/pokemon";
import PokemonGridClient from "./PokemonGridClient";

export default async function PokemonGrid({
  offset,
  search,
}: {
  offset: number;
  search?: string;
}) {
  const pokemonList = await getPokemonList(offset, undefined, search);
  return <PokemonGridClient pokemonList={pokemonList} />;
}
