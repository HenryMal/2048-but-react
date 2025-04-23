import {
  EmptyTileContainer,
  TileContainer,
  TileContainerText,
} from "./StyledTileContainers";

import { TileProps } from "../../context/model/TileModel";

export const EmptyTile = () => {
  return <EmptyTileContainer />;
};

export const FilledTile = ({
  currentIndex,
  lastIndex,
  value,
  merged,
}: TileProps) => {
  return (
    <TileContainer
      currentIndex={currentIndex}
      lastIndex={lastIndex}
      value={value}
      merged={merged}
    >
      <TileContainerText value={value}>{value}</TileContainerText>
    </TileContainer>
  );
};
