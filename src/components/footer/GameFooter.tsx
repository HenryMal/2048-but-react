import { Divider, Stack } from "@mui/material";

import GameText from "../GameText";

const GameFooter = () => {
  return (
    <Stack alignItems="flex-start" width="100%" maxWidth="500px" spacing={2}>
      <GameText color="#776e65">
        <strong>HOW TO PLAY:</strong> Use the <strong>arrow keys</strong> or
        <strong> WASD</strong> to move the tiles. When two tiles with the same
        number collide, they <strong>merge!</strong>
      </GameText>

      <Divider flexItem />

      <GameText color="#776e65">
        <strong>DESCRIPTION:</strong> A 2048 clone made in React by{" "}
        <strong>H. MAL. </strong>
        Original game by <strong>Gabriele Cirulli.</strong>
      </GameText>
    </Stack>
  );
};

export default GameFooter;
