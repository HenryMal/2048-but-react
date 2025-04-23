import { Stack, styled, Tooltip, Typography } from "@mui/material";

import { formatScore } from "../../../utilities/ScoreFormatter";

const ScoreContainer = styled(Stack)<{ color: string }>(({ color }) => ({
  padding: "5px 10px",
  borderRadius: "3px",
  backgroundColor: color,
}));

export type ScoreProps = {
  color: string;
  label: string;
  score: number;
};

const Score = ({ color, label, score }: ScoreProps) => {
  return (
    <Tooltip title={`${score}`} placement="top">
      <ScoreContainer color={color}>
        <Typography
          color="#eee4da"
          fontSize="12.5px"
          fontWeight="bold"
          textTransform="uppercase"
        >
          {label}
        </Typography>
        <Typography color="#f9f6f2" fontSize="25px" fontWeight="bold">
          {formatScore(score)}
        </Typography>
      </ScoreContainer>
    </Tooltip>
  );
};

export default Score;
