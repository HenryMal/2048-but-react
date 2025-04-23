export type TileProps = {
  id: string;
  currentIndex: number[];
  lastIndex?: number[];
  value: number;
  merged?: TileProps[];
};

export function newTileValue(): number {
  return Math.random() > 0.9 ? 4 : 2;
}

export function tilePositionsMatch(
  currentIndex: number[],
  lastIndex: number[]
): boolean {
  if (currentIndex.length !== lastIndex.length) {
    return false;
  }

  for (let i = 0; i < currentIndex.length; i++) {
    if (currentIndex[i] !== lastIndex[i]) {
      return false;
    }
  }

  return true;
}
