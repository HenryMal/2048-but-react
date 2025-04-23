const valuePrefixTable: Record<number, string> = {
  1: "k",
  2: "M",
  3: "G",
};

function truncateDecimalValue(value: number, nthPlace: number): number {
  const baseTen: number = 10;
  const nthPlaceDecimalValue: number = Math.pow(baseTen, nthPlace);

  return Math.trunc(value * nthPlaceDecimalValue) / nthPlaceDecimalValue;
}

export function formatScore(value: number, accumulator = 0): string {
  if (value < 1000) {
    return (
      truncateDecimalValue(value, 2) + (valuePrefixTable[accumulator] || "")
    );
  } else {
    return formatScore(value / 1000, accumulator + 1);
  }
}
