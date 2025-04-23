import { keyframes } from "@mui/material/styles";

export const BACKGROUND_COLOR_TABLE: Record<number, string> = {
  2: "#eee4da",
  4: "#ede0c8",
  8: "#f2b179",
  16: "#f59563",
  32: "#f67c5f",
  64: "#f65e3b",
  128: "#edcf72",
  256: "#edcc61",
  512: "#edc850",
  1024: "#edc53f",
  2048: "#edc22e",
};

export const BOX_SHADOW_TABLE: Record<number, string> = {
  128: "0 0 30px 10px rgba(243, 215, 116, 0.2381), inset 0 0 0 1px rgba(255, 255, 255, 0.14286)",
  256: "0 0 30px 10px rgba(243, 215, 116, 0.31746), inset 0 0 0 1px rgba(255, 255, 255, 0.19048)",
  512: "0 0 30px 10px rgba(243, 215, 116, 0.39683), inset 0 0 0 1px rgba(255, 255, 255, 0.2381)",
  1024: "0 0 30px 10px rgba(243, 215, 116, 0.47619), inset 0 0 0 1px rgba(255, 255, 255, 0.28571)",
  2048: "0 0 30px 10px rgba(243, 215, 116, 0.55556), inset 0 0 0 1px rgba(255, 255, 255, 0.33333)",
};

export const FONT_COLOR_TABLE: Record<number, string> = {
  2: "#776e65",
  4: "#776e65",
};

export const FONT_SIZE_TABLE: Record<number, number> = {
  2: 55,
  4: 55,
  8: 55,
  16: 55,
  32: 55,
  64: 55,
  128: 45,
  256: 45,
  512: 45,
  1024: 35,
  2048: 35,
};

export const TILE_SPAWN_ANIMATION_KEYFRAME = keyframes`
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
`;

export const TILE_MERGE_ANIMATION_KEYFRAME = keyframes`
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

export const TILE_SLIDE_ANIMATION_KEYFRAME = (
  xPixelsToMove: number,
  yPixelsToMove: number
) => keyframes`
  0% {
    transform: translate(0px, 0px);
  }
  100% {
    transform: translate(${xPixelsToMove}px, ${yPixelsToMove}px);
  }
`;

export const TILE_ANIMATION_SPEED = "100ms"; // was 100ms
export const TILE_MERGE_ANIMATION_DELAY = "200ms"; // was 200ms
export const TILE_SPAWN_ANIMATION_DELAY = "200ms"; // was 200ms
export const TILE_HIDE_ANIMATION_DELAY = "200ms";

export const GRID_OFFSET = 15;
export const TILE_SIZE = 106.25;

export const DEFAULT_TILE_BACKGROUND_COLOR = "#3c3a32";
export const DEFAULT_TILE_FONT_COLOR = "#f9f6f2";
export const DEFAULT_TILE_FONT_SIZE = 30;

export const EMPTY_TILE_BACKGROUND_COLOR = "#cdc1b4";

export function convertIndexToPosition(index: number): number {
  return GRID_OFFSET + (GRID_OFFSET + TILE_SIZE) * index;
}
