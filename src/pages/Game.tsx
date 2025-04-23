import { useEffect } from "react";
import { Stack } from "@mui/material";

import GameHeader from "../components/header/GameHeader";
import Board from "../components/body/Board";
import GameFooter from "../components/footer/GameFooter";
import { CONTROLS } from "../utilities/Controls";
import useGame from "../hooks/useGame";

const Game = () => {
  const { gameState, dispatch } = useGame();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (gameState.gameOver) return;
      if (gameState.gameWon && !gameState.freeMode) return;

      const action = CONTROLS[event.code];
      if (action) {
        dispatch(action);
      }
    }

    document.addEventListener("keydown", onKeyDown, false);

    return () => document.removeEventListener("keydown", onKeyDown, false);
  }, [gameState, dispatch]);

  // remember to add back the header and footer...
  return (
    <Stack spacing={2}>
      <GameHeader />
      <Board />
      <GameFooter />
    </Stack>
  );
};

export default Game;
