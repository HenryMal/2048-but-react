import { MouseEventHandler } from "react";
import Overlay from "./Overlay";

import GameButton from "../../GameButton";

export type GameOverOverlayProps = {
  tryAgainOnClick: MouseEventHandler<HTMLButtonElement>;
};

const GameOverOverlay = ({ tryAgainOnClick }: GameOverOverlayProps) => {
  return (
    <Overlay
      backgroundColor="#eee4da80"
      textColor="#776e65"
      overlayText="Game over!"
    >
      <GameButton text="Try again?" onClickFunction={tryAgainOnClick} />
    </Overlay>
  );
};

export default GameOverOverlay;
