import { MouseEventHandler } from "react";
import Overlay from "./Overlay";
import GameButton from "../../GameButton";

export type GameWinOverlayProps = {
  keepPlayingOnClick: MouseEventHandler<HTMLButtonElement>;
  tryAgainOnClick: MouseEventHandler<HTMLButtonElement>;
};

const GameWinOverlay = ({
  keepPlayingOnClick,
  tryAgainOnClick,
}: GameWinOverlayProps) => {
  return (
    <Overlay
      backgroundColor="#edc22e80"
      textColor="#f9f6f2"
      overlayText="You win!"
    >
      <GameButton text="Keep playing?" onClickFunction={keepPlayingOnClick} />
      <GameButton text="Try again?" onClickFunction={tryAgainOnClick} />
    </Overlay>
  );
};

export default GameWinOverlay;
