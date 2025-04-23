import { createContext } from "react";
import { GameState } from "./model/GameModel";

const GameContext = createContext<GameState | undefined>(undefined);

export default GameContext;
