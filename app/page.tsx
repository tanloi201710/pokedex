import { LoadingProvider } from "@/components/LoadingContext";
import PokemonContent from "@/components/PokemonContent";
import PokemonServer from "@/components/PokemonServer";
import PokemonSearch from "@/components/PokemonSearch";

interface PageProps {
  searchParams: Promise<{ page?: string; search?: string }>;
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const search = params.search || '';

  return (
    <LoadingProvider>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Pokédex</h1>
        <PokemonSearch />
        <PokemonContent>
          <PokemonServer currentPage={currentPage} search={search} />
        </PokemonContent>
      </main>
    </LoadingProvider>
  );
}
