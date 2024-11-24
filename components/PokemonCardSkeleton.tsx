export default function PokemonCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 animate-pulse rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="relative w-full h-48 bg-foreground/10 rounded-lg animate-pulse" />
      <div className="mt-4 space-y-3">
        <div className="h-6 bg-foreground/10 rounded animate-pulse w-2/3" />
        <div className="flex gap-2">
          <div className="h-6 bg-foreground/10 rounded-full animate-pulse w-20" />
          <div className="h-6 bg-foreground/10 rounded-full animate-pulse w-20" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <div className="h-4 bg-foreground/10 rounded animate-pulse w-16 mb-1" />
            <div className="h-4 bg-foreground/10 rounded animate-pulse w-12" />
          </div>
          <div>
            <div className="h-4 bg-foreground/10 rounded animate-pulse w-16 mb-1" />
            <div className="h-4 bg-foreground/10 rounded animate-pulse w-12" />
          </div>
        </div>
      </div>
    </div>
  );
}
