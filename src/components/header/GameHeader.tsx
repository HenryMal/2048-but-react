import { Stack, Typography } from "@mui/material";
import ScoresContainer from "./score/ScoresContainer";
import GameButton from "../GameButton";
import GameText from "../GameText";
import useGame from "../../hooks/useGame";

const GameHeader = () => {
  const { gameState, dispatch } = useGame();

  const startNewGame = () => {
    dispatch({ type: "START_NEW_GAME" });
  };

  return (
    <Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography color="#776e65" fontSize="80px" fontWeight="bold">
          2048
        </Typography>
        <ScoresContainer
          currentScore={gameState.score || 0}
          bestScore={gameState.bestScore || 0}
        />
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      ></Stack>

      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <GameText color="#776e65">
          Join the numbers to get the <strong>2048 tile!</strong>
        </GameText>

        <GameButton onClickFunction={startNewGame} text="New Game" />
      </Stack>
    </Stack>
  );
};

export default GameHeader;
