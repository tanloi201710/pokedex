import { getPokemonCount } from "@/lib/pokemon";
import PokemonGrid from "./PokemonGrid";
import PokemonServerWrapper from "./PokemonServerWrapper";
import ErrorMessage from "./ErrorMessage";

const ITEMS_PER_PAGE = 12;

interface PokemonServerProps {
  currentPage: number;
  search?: string;
}

export default async function PokemonServer({
  currentPage,
  search,
}: PokemonServerProps) {
  try {
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;
    const count = await getPokemonCount();
    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);

    return (
      <PokemonServerWrapper currentPage={currentPage} totalPages={totalPages}>
        <PokemonGrid offset={offset} search={search} />
      </PokemonServerWrapper>
    );
  } catch (error) {
    return <ErrorMessage error={error as Error} />;
  }
}
