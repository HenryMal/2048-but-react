import { Typography } from "@mui/material";
import { ReactNode } from "react";

export type GameTextProps = {
  color: string;
  children: ReactNode;
};

const GameText = ({ color, children }: GameTextProps) => {
  return (
    <Typography color={`${color}`} fontSize="18px" textAlign="start">
      {children}
    </Typography>
  );
};

export default GameText;
