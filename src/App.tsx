import {
  GameGrid,
  GameSortSelector,
  GenreList,
  NavBar,
  PlatformSelector,
} from "@/components";
import { ApiGameQuery } from "@/typing/api";
import { Grid, GridItem, HStack, Show } from "@chakra-ui/react";
import { useState } from "react";

function App() {
  const [gameQuery, setGameQuery] = useState<ApiGameQuery>({});

  return (
    /** @see https://chakra-ui.com/docs/styled-system/responsive-styles */
    <Grid
      templateAreas={{
        base: `"nav" "main"`, // We are responsive-first
        lg: `"nav nav" "aside main"`, //min: 1024px
      }}
      templateColumns={{
        base: "1fr",
        lg: "200px 1fr",
      }}
    >
      <GridItem area="nav" bg="transparent">
        <NavBar />
      </GridItem>
      <Show above="lg">
        <GridItem area="aside" bg="transparent" paddingX={5}>
          <GenreList
            onSelectedGenre={(genre) =>
              setGameQuery({
                ...gameQuery,
                filters: { ...gameQuery.filters, genres: [genre] },
              })
            }
            selectedGenre={
              gameQuery?.filters?.genres
                ? gameQuery.filters.genres[0] // IF `gameQuery.filters.genres` exists, it is necessarely an Array
                : undefined
            }
          />
        </GridItem>
      </Show>
      <GridItem area="main" bg="transparent">
        <HStack paddingX={10} spacing={5}>
          <PlatformSelector
            selectedPlatform={
              gameQuery?.filters?.platforms
                ? gameQuery.filters.platforms[0] // IF `gameQuery.filters.platforms` exists, it is necessarely an Array
                : undefined
            }
            onSelectedPlatform={(platform) =>
              setGameQuery({
                ...gameQuery,
                filters: { ...gameQuery.filters, platforms: [platform] },
              })
            }
          />
          <GameSortSelector
            onSelectedGameSort={(gameSort) =>
              setGameQuery({
                ...gameQuery,
                ordering: gameSort,
              })
            }
            selectedGameSort={gameQuery.ordering}
          />
        </HStack>
        <GameGrid filters={gameQuery.filters} ordering={gameQuery.ordering} />
      </GridItem>
    </Grid>
  );
}

export default App;
