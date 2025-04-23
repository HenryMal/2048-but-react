import { Box, styled, Typography } from "@mui/material";
import {
  BACKGROUND_COLOR_TABLE,
  BOX_SHADOW_TABLE,
  convertIndexToPosition,
  DEFAULT_TILE_BACKGROUND_COLOR,
  DEFAULT_TILE_FONT_COLOR,
  DEFAULT_TILE_FONT_SIZE,
  EMPTY_TILE_BACKGROUND_COLOR,
  FONT_COLOR_TABLE,
  FONT_SIZE_TABLE,
  TILE_SLIDE_ANIMATION_KEYFRAME,
  TILE_ANIMATION_SPEED,
  TILE_MERGE_ANIMATION_DELAY,
  TILE_MERGE_ANIMATION_KEYFRAME,
  TILE_SIZE,
  TILE_SPAWN_ANIMATION_DELAY,
  TILE_SPAWN_ANIMATION_KEYFRAME,
} from "./TileConfigs";

import { TileProps } from "../../context/model/TileModel";

export const EmptyTileContainer = styled(Box)(() => ({
  width: `${TILE_SIZE}px`,
  height: `${TILE_SIZE}px`,
  borderRadius: "3px",
  backgroundColor: EMPTY_TILE_BACKGROUND_COLOR,
}));

export const TileContainer = styled(Box)<{
  currentIndex: number[];
  lastIndex?: number[];
  value: number;
  merged?: TileProps[];
}>(({ currentIndex, lastIndex, value, merged }) => {
  const [xCurrentIndexPixels, yCurrentIndexPixels]: number[] = currentIndex.map(
    (index) => convertIndexToPosition(index)
  );

  const [xLastIndexPixels, yLastIndexPixels]: number[] = lastIndex
    ? lastIndex.map((index) => convertIndexToPosition(index))
    : [];

  const top: string = lastIndex
    ? `${yLastIndexPixels}px`
    : `${yCurrentIndexPixels}px`;

  const left: string = lastIndex
    ? `${xLastIndexPixels}px`
    : `${xCurrentIndexPixels}px`;

  const zIndex: number = merged ? 1 : 0;

  const xPixelsToMove: number = lastIndex
    ? xCurrentIndexPixels - xLastIndexPixels
    : 0;

  const yPixelsToMove = lastIndex ? yCurrentIndexPixels - yLastIndexPixels : 0;

  let animation: string = "none";

  if (!lastIndex && !merged)
    animation = `${TILE_SPAWN_ANIMATION_KEYFRAME} ${TILE_ANIMATION_SPEED} ease ${TILE_SPAWN_ANIMATION_DELAY} backwards`;
  else if (merged) {
    animation = ` ${TILE_MERGE_ANIMATION_KEYFRAME} ${TILE_ANIMATION_SPEED} ease ${TILE_MERGE_ANIMATION_DELAY} backwards`;
  } else if (lastIndex) {
    animation = `${TILE_SLIDE_ANIMATION_KEYFRAME(
      xPixelsToMove,
      yPixelsToMove
    )} ${TILE_ANIMATION_SPEED} ease-in-out forwards`;
  }

  return {
    position: "absolute",
    top,
    left,
    zIndex,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: `${TILE_SIZE}px`,
    height: `${TILE_SIZE}px`,
    borderRadius: "3px",
    backgroundColor:
      BACKGROUND_COLOR_TABLE[value] || DEFAULT_TILE_BACKGROUND_COLOR,
    boxShadow: BOX_SHADOW_TABLE[value] || "none",
    animation,
  };
});

export const TileContainerText = styled(Typography)<{ value: number }>(
  ({ value }) => ({
    color: FONT_COLOR_TABLE[value] || DEFAULT_TILE_FONT_COLOR,
    textAlign: "center",
    fontSize: `${FONT_SIZE_TABLE[value] || DEFAULT_TILE_FONT_SIZE}px`,
    fontWeight: "bold",
  })
);
