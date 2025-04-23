import {
  GameState,
  createNewGame,
} from "../components/context/model/GameModel";

import { TileProps } from "../components/context/model/TileModel";

// this is to give spawning animations to all tiles when we load it in
function setSpawningAnimationsForTiles(state: GameState): GameState {
  const respawnedTiles: (TileProps | null)[][] = state.tiles.map((row) =>
    row.map((tile) =>
      tile ? { ...tile, lastIndex: undefined, merged: undefined } : null
    )
  );

  return { ...state, tiles: respawnedTiles };
}

export function serializeGameState(state: GameState): void {
  localStorage.setItem(
    "game",
    JSON.stringify(setSpawningAnimationsForTiles(state))
  );
}

export function deserializeGameState(state: GameState): GameState {
  const gameJSON = localStorage.getItem("game");

  if (gameJSON) {
    return JSON.parse(gameJSON);
  }

  return createNewGame(state);
}
