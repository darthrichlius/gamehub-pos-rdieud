import { GameCard, GameCardSkeleton } from "@/components";
import { useGames } from "@/hooks";
import { ApiGameQuery } from "@/typing/api";
import { ArrayUtils } from "@/utils";
import { SimpleGrid, Text } from "@chakra-ui/react";
import { compact as _compact } from "lodash";

const GameGrid = ({ filters, ordering }: ApiGameQuery) => {
  const skeletons = ArrayUtils.newRandomArray(6);
  const { games, loading, error } = useGames({
    filters: {
      genres: _compact(filters?.genres ?? []),
      platforms: _compact(filters?.platforms ?? []),
    },
    ordering,
  });

  if (error) null;

  return (
    <>
      <SimpleGrid
        columns={{
          sm: 1,
          md: 2,
          lg: 3,
        }}
        padding={10}
        spacing={10}
      >
        {loading && skeletons.map((i) => <GameCardSkeleton key={i} />)}
        {!loading &&
          games &&
          games.map((game) => <GameCard key={game.id} game={game} />)}
      </SimpleGrid>
      {error && <Text>{error.message}</Text>}
    </>
  );
};

export default GameGrid;
