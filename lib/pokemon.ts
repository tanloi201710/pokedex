import { Pokemon } from "@/types/pokemon";
import { toast } from "sonner";
import { fetchWithRetry } from "./fetchWithRetry";

export async function getPokemonList(
  offset: number = 0,
  limit: number = 12,
  search?: string
): Promise<Pokemon[]> {
  try {
    // If searching, fetch all pokemon first
    if (search) {
      const response = await fetchWithRetry(
        `https://pokeapi.co/api/v2/pokemon?limit=1000`,
        {
          next: {
            revalidate: 3600,
            tags: ["pokemon-list"],
          },
          timeout: 8000,
        }
      );

      const data = await response.json();
      const filteredResults = data.results.filter((pokemon: { name: string }) =>
        pokemon.name.includes(search.toLowerCase())
      );

      // Paginate filtered results
      const paginatedResults = filteredResults.slice(offset, offset + limit);

      const pokemonDetails = await Promise.all(
        paginatedResults.map(async (pokemon: { url: string; name: string }) => {
          const res = await fetchWithRetry(pokemon.url, {
            next: {
              revalidate: 3600,
              tags: [`pokemon-${pokemon.name}`],
            },
            timeout: 5000,
          });
          return res.json();
        })
      );

      return pokemonDetails;
    }

    // If not searching, use regular pagination
    const response = await fetchWithRetry(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`,
      {
        next: {
          revalidate: 3600,
          tags: ["pokemon-list"],
        },
        timeout: 8000,
      }
    );

    const data = await response.json();
    const pokemonDetails = await Promise.all(
      data.results.map(async (pokemon: { url: string; name: string }) => {
        const res = await fetchWithRetry(pokemon.url, {
          next: {
            revalidate: 3600,
            tags: [`pokemon-${pokemon.name}`],
          },
          timeout: 5000,
        });
        return res.json();
      })
    );

    return pokemonDetails;
  } catch (error) {
    toast.error("Failed to fetch Pokemon data");
    throw error;
  }
}

export async function getPokemonCount(): Promise<number> {
  try {
    const response = await fetchWithRetry(
      "https://pokeapi.co/api/v2/pokemon?limit=1",
      {
        next: {
          revalidate: 3600 * 24, // Cache for 24 hours
          tags: ["pokemon-count"],
        },
        timeout: 5000,
      }
    );

    const data = await response.json();
    return data.count;
  } catch (error) {
    toast.error("Failed to fetch Pokemon count");
    throw error;
  }
}

export async function getPokemon(id: string): Promise<Pokemon> {
  try {
    const response = await fetchWithRetry(
      `https://pokeapi.co/api/v2/pokemon/${id}`,
      {
        next: {
          revalidate: 3600,
          tags: [`pokemon-${id}`],
        },
        timeout: 5000,
      }
    );
    return response.json();
  } catch (error) {
    toast.error("Failed to fetch Pokemon details");
    throw error;
  }
}
