import { createContext, Dispatch } from "react";
import { GameAction } from "./GameContextProvider";

const GameDispatchContext = createContext<Dispatch<GameAction> | undefined>(
  undefined
);

export default GameDispatchContext;
