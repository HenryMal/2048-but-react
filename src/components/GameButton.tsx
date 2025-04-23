import { Button, styled, Typography } from "@mui/material";
import { MouseEventHandler } from "react";

const GameButtonContainer = styled(Button)(() => ({
  padding: "10px 20px",
  backgroundColor: "#8f7a66",
  color: "#f9f6f2",
  textTransform: "none",
  ":focus": {
    outline: "none",
  },
}));

export type GameButtonProps = {
  text: string;
  onClickFunction: MouseEventHandler<HTMLButtonElement>;
};

const GameButton = ({ text, onClickFunction }: GameButtonProps) => {
  return (
    <GameButtonContainer disableRipple onClick={onClickFunction}>
      <Typography fontSize="18px" fontWeight="bold">
        {text}
      </Typography>
    </GameButtonContainer>
  );
};

export default GameButton;
