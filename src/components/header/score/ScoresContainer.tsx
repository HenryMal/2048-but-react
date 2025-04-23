import { Stack } from "@mui/material";

import Score from "./Score";

export type ScoresContainerProps = {
  currentScore: number;
  bestScore: number;
};

const ScoresContainer = ({ currentScore, bestScore }: ScoresContainerProps) => {
  return (
    <Stack direction="row" spacing={1}>
      <Score color="#bbada0" label="score" score={currentScore} />
      <Score color="#776e65" label="best" score={bestScore} />
    </Stack>
  );
};

export default ScoresContainer;
