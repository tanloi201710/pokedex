import BackButton from "@/components/BackButton";
import { getPokemon } from "@/lib/pokemon";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTypeColor } from "@/lib/typeColors";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PokemonPage({ params }: PageProps) {
  try {
    const resolvedParams = await params;
    const pokemon = await getPokemon(resolvedParams.id);

    return (
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <BackButton />
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mt-4">
            <div className="relative w-full h-64 mb-6">
              <Image
                src={pokemon.sprites.other["official-artwork"].front_default}
                alt={pokemon.name}
                fill
                priority
                className="object-contain"
              />
            </div>
            <h1 className="text-3xl font-bold capitalize mb-4">{pokemon.name}</h1>
            
            {/* Types */}
            <div className="flex gap-2 mb-6">
              {pokemon.types.map((type) => (
                <span
                  key={type.type.name}
                  className="px-4 py-2 text-sm text-white rounded-full"
                  style={{ backgroundColor: getTypeColor(type.type.name) }}
                >
                  {type.type.name}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Physical</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Height</p>
                      <p className="text-lg">{pokemon.height / 10}m</p>
                    </div>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">Weight</p>
                      <p className="text-lg">{pokemon.weight / 10}kg</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-2">Abilities</h2>
                  <ul className="space-y-1">
                    {pokemon.abilities.map((ability) => (
                      <li key={ability.ability.name} className="capitalize">
                        {ability.ability.name.replace("-", " ")}
                        {ability.is_hidden && (
                          <span className="text-sm text-gray-500 ml-2">(Hidden)</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Base Stats</h2>
                  <div className="space-y-2">
                    {pokemon.stats.map((stat) => (
                      <div key={stat.stat.name}>
                        <div className="flex justify-between mb-1">
                          <span className="capitalize text-gray-600 dark:text-gray-400">
                            {stat.stat.name.replace("-", " ")}
                          </span>
                          <span>{stat.base_stat}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                          <div
                            className="bg-blue-500 h-2.5 rounded-full"
                            style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.log(error);
    notFound();
  }
}
