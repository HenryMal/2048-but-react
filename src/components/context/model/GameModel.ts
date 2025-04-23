import { v4 as uuidv4 } from "uuid";
import {
  BOARD_COLUMN_SIZE,
  BOARD_ROW_SIZE,
  NUMBER_OF_INITIAL_TILES,
} from "./GameConfig";
import { TileProps, newTileValue, tilePositionsMatch } from "./TileModel";
import { serializeGameState } from "../../../utilities/LocalStorageHandler";

export type GameState = {
  tiles: (TileProps | null)[][];
  score: number;
  bestScore: number;
  gameOver: boolean;
  gameWon: boolean;
  freeMode: boolean;
};

export function createNewGame(state: GameState): GameState {
  const tiles: (TileProps | null)[][] = Array.from(
    { length: BOARD_COLUMN_SIZE },
    () => Array(BOARD_ROW_SIZE).fill(null)
  );

  state = {
    ...state,
    tiles: tiles,
    score: 0,
    gameOver: false,
    gameWon: false,
    freeMode: false,
  };

  for (let i = 0; i < NUMBER_OF_INITIAL_TILES; i++) {
    state = spawnNewTile(state);
  }

  serializeGameState(state);

  return { ...state };
}

function findEmptyTilesSpaces(tiles: (TileProps | null)[][]): number[][] {
  const emptyTileSpaces: number[][] = [];

  for (let i = 0; i < tiles.length; i++) {
    for (let j = 0; j < tiles[i].length; j++) {
      if (!tiles[i][j]) {
        emptyTileSpaces.push([j, i]);
      }
    }
  }

  return emptyTileSpaces;
}

function getRandomEmptyTileSpaces(
  tiles: (TileProps | null)[][]
): number[] | undefined {
  const emptyTileSpaces: number[][] = findEmptyTilesSpaces(tiles);

  if (emptyTileSpaces.length !== 0) {
    const randomIndex: number = Math.floor(
      Math.random() * emptyTileSpaces.length
    );
    return emptyTileSpaces[randomIndex];
  }

  return undefined;
}

function spawnNewTile(state: GameState): GameState {
  const tiles: (TileProps | null)[][] = copyTiles(state);

  const randomEmptyTileSpace: number[] | undefined =
    getRandomEmptyTileSpaces(tiles);

  if (randomEmptyTileSpace) {
    tiles[randomEmptyTileSpace[1]][randomEmptyTileSpace[0]] = {
      id: uuidv4(),
      currentIndex: [randomEmptyTileSpace[0], randomEmptyTileSpace[1]],
      value: newTileValue(),
    };
  }

  return { ...state, tiles: tiles };
}

function inBounds(point: number[]): boolean {
  return (
    point[0] >= 0 &&
    point[0] < BOARD_COLUMN_SIZE &&
    point[1] >= 0 &&
    point[1] < BOARD_ROW_SIZE
  );
}

function mergeTiles(
  state: GameState,
  tiles: (TileProps | null)[][],
  row: number,
  column: number
): GameState {
  const nextColumn: number = column - 1;
  const freeMode: boolean = state.freeMode;

  let newScore: number = state.score;
  let bestScore: number = state.bestScore;

  let isGameOver: boolean = state.gameOver;
  let isGameWon: boolean = state.gameWon;

  if (inBounds([nextColumn, row])) {
    const currentTile: TileProps | null = tiles[row][column];
    const otherTile: TileProps | null = tiles[row][nextColumn];

    if (currentTile && otherTile) {
      if (
        !currentTile.merged &&
        !otherTile.merged &&
        currentTile.value === otherTile.value
      ) {
        tiles[row][nextColumn] = {
          id: uuidv4(),
          currentIndex: [nextColumn, row],
          value: currentTile.value * 2,
          merged: [currentTile, otherTile],
        };

        tiles[row][column] = null;

        newScore += currentTile.value * 2;
        if (newScore >= bestScore) {
          bestScore = newScore;
        }

        if (currentTile.value * 2 === 2048 && !freeMode) {
          isGameOver = true;
          isGameWon = true;
        }
      }
    }
  }

  return {
    ...state,
    tiles: tiles,
    score: newScore,
    bestScore: bestScore,
    gameOver: isGameOver,
    gameWon: isGameWon,
  };
}

function shiftTile(state: GameState, row: number, column: number): GameState {
  const tiles: (TileProps | null)[][] = copyTiles(state);

  let nextColumn: number = column - 1;

  while (inBounds([nextColumn, row]) && !tiles[row][nextColumn]) {
    tiles[row][nextColumn] = tiles[row][column];
    tiles[row][column] = null;

    column = nextColumn;
    nextColumn = nextColumn - 1;
  }

  return mergeTiles(state, tiles, row, column);
}

function shiftAllTiles(state: GameState): GameState {
  for (let i = 0; i < state.tiles.length; i++) {
    for (let j = 0; j < state.tiles[i].length; j++) {
      if (state.tiles[i][j]) {
        state = shiftTile(state, i, j);
      }
    }
  }

  return { ...state };
}

export function prepareTiles(state: GameState): GameState {
  const tiles: (TileProps | null)[][] = state.tiles.map((row) =>
    row.map((tile) =>
      tile ? { ...tile, lastIndex: tile.currentIndex, merged: undefined } : null
    )
  );

  return { ...state, tiles: tiles };
}

function updateTiles(state: GameState): GameState {
  const tiles: (TileProps | null)[][] = copyTiles(state);

  for (let i = 0; i < tiles.length; i++) {
    for (let j = 0; j < tiles[i].length; j++) {
      const currentTile: TileProps | null = tiles[i][j];

      if (currentTile) {
        currentTile.currentIndex = [j, i];

        if (currentTile.merged) {
          currentTile.merged.forEach((tile) => (tile.currentIndex = [j, i]));
        }
      }
    }
  }

  return { ...state, tiles: tiles };
}

function didBoardChange(state: GameState): boolean {
  for (let i = 0; i < state.tiles.length; i++) {
    for (let j = 0; j < state.tiles[i].length; j++) {
      const currentTile: TileProps | null = state.tiles[i][j];

      if (currentTile) {
        if (
          currentTile.lastIndex &&
          !tilePositionsMatch([j, i], currentTile.lastIndex)
        ) {
          return true;
        }

        if (currentTile.merged) {
          return true;
        }
      }
    }
  }

  return false;
}

// i know theres most likely better ways to do this, i just dont know
function isGameOver(state: GameState): GameState {
  const emptyTileSpaces: number[][] = findEmptyTilesSpaces(state.tiles);

  if (emptyTileSpaces.length !== 0) {
    return { ...state, gameOver: false };
  }

  // we dont have to check the tile above and to the left since we are
  // iterating from top left to bottom right
  const directionsToCheck: number[][] = [
    [1, 0],
    [0, 1],
  ];

  for (let i = 0; i < state.tiles.length; i++) {
    for (let j = 0; j < state.tiles[i].length; j++) {
      const currentTile: TileProps | null = state.tiles[i][j];

      if (currentTile) {
        for (let k = 0; k < directionsToCheck.length; k++) {
          const direction: number[] = directionsToCheck[k];
          const x: number = j + direction[0];
          const y: number = i + direction[1];

          if (inBounds([x, y])) {
            const nextTile: TileProps | null = state.tiles[y][x];

            if (nextTile && currentTile.value === nextTile.value) {
              return { ...state, gameOver: false };
            }
          }
        }
      }
    }
  }

  return { ...state, gameOver: true };
}

export function move(state: GameState, rotations: number): GameState {
  const oldState: GameState = { ...state };
  const rotationsBack: number = rotations === 0 ? 0 : 4 - rotations;

  state = prepareTiles(state);

  for (let i = 0; i < rotations; i++) {
    state = rotateTilesClockwise(state);
  }

  state = shiftAllTiles(state);

  for (let i = 0; i < rotationsBack; i++) {
    state = rotateTilesClockwise(state);
  }

  if (didBoardChange(state)) {
    state = updateTiles(state);
    state = spawnNewTile(state);
    state = isGameOver(state);
    serializeGameState(state);
    return { ...state };
  }

  serializeGameState(oldState);
  return { ...oldState };
}

export function keepPlaying(state: GameState): GameState {
  state = prepareTiles(state);
  state = { ...state, gameOver: false, freeMode: true };

  serializeGameState(state);
  return { ...state };
}

function rotateTilesClockwise(state: GameState): GameState {
  const rows: number = state.tiles.length;
  const columns: number = state.tiles[0].length;

  const rotatedTiles: (TileProps | null)[][] = Array.from(
    { length: columns },
    () => Array(rows).fill(null)
  );

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      rotatedTiles[j][rows - i - 1] = state.tiles[i][j];
    }
  }

  return { ...state, tiles: rotatedTiles };
}

export function copyTiles(state: GameState): (TileProps | null)[][] {
  return state.tiles.map((row) =>
    row.map((tile) => (tile ? { ...tile } : null))
  );
}
