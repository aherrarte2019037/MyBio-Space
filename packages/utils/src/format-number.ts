const DefaultNumber = "NaN";

export const shortNumber = (num: number | undefined | null) => {
  if (num === null || num === undefined) return DefaultNumber;

  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(num);
};
