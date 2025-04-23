import { ReactNode, useEffect, useReducer } from "react";
import GameContext from "./GameContext";
import GameDispatchContext from "./GameDispatchContext";
import { GameState, createNewGame, keepPlaying, move } from "./model/GameModel";
import { deserializeGameState } from "../../utilities/LocalStorageHandler";

export type GameAction =
  | { type: "MOVE_LEFT" }
  | { type: "MOVE_DOWN" }
  | { type: "MOVE_RIGHT" }
  | { type: "MOVE_UP" }
  | { type: "START_NEW_GAME" }
  | { type: "KEEP_PLAYING" }
  | { type: "LOAD_GAME" };

const initialGameState: GameState = {
  tiles: [],
  score: 0,
  bestScore: 0,
  gameOver: false,
  gameWon: false,
  freeMode: false,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "START_NEW_GAME": {
      state = createNewGame(state);
      return { ...state };
    }
    case "MOVE_LEFT": {
      state = move(state, 0);
      return { ...state };
    }
    case "MOVE_DOWN": {
      state = move(state, 1);
      return { ...state };
    }
    case "MOVE_RIGHT": {
      state = move(state, 2);
      return { ...state };
    }
    case "MOVE_UP": {
      state = move(state, 3);
      return { ...state };
    }
    case "KEEP_PLAYING": {
      state = keepPlaying(state);
      return { ...state };
    }
    case "LOAD_GAME": {
      state = deserializeGameState(state);
      return { ...state };
    }
    default:
      throw new Error("Unknown action");
  }
}

export const GameContextProvider = ({ children }: { children: ReactNode }) => {
  const [gameState, dispatch] = useReducer(gameReducer, initialGameState);

  useEffect(() => {
    dispatch({ type: "LOAD_GAME" });
  }, []);

  return (
    <GameContext.Provider value={gameState}>
      <GameDispatchContext.Provider value={dispatch}>
        {children}
      </GameDispatchContext.Provider>
    </GameContext.Provider>
  );
};
