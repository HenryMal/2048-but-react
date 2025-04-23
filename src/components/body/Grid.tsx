import { Stack } from "@mui/material";

import { EmptyTile } from "./tile/Tile";
import { GRID_OFFSET } from "./tile/TileConfigs";

const GridCellRow = () => {
  return (
    <Stack direction="row" spacing={`${GRID_OFFSET}px`}>
      <EmptyTile />
      <EmptyTile />
      <EmptyTile />
      <EmptyTile />
    </Stack>
  );
};

const Grid = () => {
  return (
    <Stack spacing={`${GRID_OFFSET}px`}>
      <GridCellRow />
      <GridCellRow />
      <GridCellRow />
      <GridCellRow />
    </Stack>
  );
};

export default Grid;
