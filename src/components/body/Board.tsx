import { Box, Stack, styled } from "@mui/material";
import Grid from "./Grid";
import { FilledTile } from "./tile/Tile";
import GameOverOverlay from "./overlay/GameOverOverlay";
import GameWinOverlay from "./overlay/GameWinOverlay";
import useGame from "../../hooks/useGame";

const BoardContainer = styled(Box)(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "500px",
  height: "500px",
  borderRadius: "6px",
  backgroundColor: "#bbada0",
}));

const Board = () => {
  const { gameState, dispatch } = useGame();

  const startNewGame = () => {
    dispatch({ type: "START_NEW_GAME" });
  };

  const keepPlayingGame = () => {
    dispatch({ type: "KEEP_PLAYING" });
  };

  return (
    <Stack position="relative">
      <BoardContainer>
        <Grid />
      </BoardContainer>

      {gameState.tiles.map((row) =>
        row
          .filter((tile) => tile !== null)
          .map((tile) => {
            const tileComponent = (
              <FilledTile
                key={`${tile.id}-${tile.currentIndex[0]}-${tile.currentIndex[1]}`}
                {...tile}
              />
            );

            const mergedTileComponents = tile.merged
              ? tile.merged.map((mergedTile) => (
                  <FilledTile
                    key={`${mergedTile.id}-${mergedTile.currentIndex[0]}-${mergedTile.currentIndex[1]}`}
                    {...mergedTile}
                  />
                ))
              : [];

            return [tileComponent, ...mergedTileComponents];
          })
      )}

      {gameState.gameOver && <GameOverOverlay tryAgainOnClick={startNewGame} />}

      {gameState.gameWon && !gameState.freeMode && (
        <GameWinOverlay
          keepPlayingOnClick={keepPlayingGame}
          tryAgainOnClick={startNewGame}
        />
      )}
    </Stack>
  );
};

export default Board;
