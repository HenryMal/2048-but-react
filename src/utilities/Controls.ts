import { GameAction } from "../components/context/GameContextProvider";

export const CONTROLS: Record<string, GameAction> = {
  ArrowLeft: { type: "MOVE_LEFT" },
  ArrowDown: { type: "MOVE_DOWN" },
  ArrowRight: { type: "MOVE_RIGHT" },
  ArrowUp: { type: "MOVE_UP" },
  KeyA: { type: "MOVE_LEFT" },
  KeyS: { type: "MOVE_DOWN" },
  KeyD: { type: "MOVE_RIGHT" },
  KeyW: { type: "MOVE_UP" },
  KeyR: { type: "START_NEW_GAME" },
};
