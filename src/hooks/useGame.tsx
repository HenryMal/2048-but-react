import { useContext } from "react";

import GameContext from "../components/context/GameContext";
import GameDispatchContext from "../components/context/GameDispatchContext";

export default function useGame() {
  const gameState = useContext(GameContext);
  const dispatch = useContext(GameDispatchContext);

  if (!gameState || !dispatch) {
    throw new Error("useGame needs to be inside GameContextProvider");
  }

  return { gameState, dispatch };
}
