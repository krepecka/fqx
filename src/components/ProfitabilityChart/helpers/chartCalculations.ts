const splitBy = 10;

export function splitDateIntervalIntoParts(
  from: Date,
  to: Date | null
): string[] {
  const step = (Number(to) - Number(from)) / splitBy;
  const beginAt = Number(from);

  const result = [];

  for (let i = 0; i <= splitBy; i++) {
    const date = new Date(beginAt + i * step);
    result.push(date.toISOString().split('T')[0]);
  }

  return result;
}

export function splitValueIntervalIntoParts(
  from: number,
  to: number
): number[] {
  const step = (to - from) / splitBy;
  const beginAt = from;

  const result = [];

  for (let i = 0; i <= splitBy; i++) {
    result.push(beginAt + step * i);
  }

  return result;
}

export function estimateInflationForPeriod(
  from: Date,
  to: Date | null
): number {
  const yearlyInflation = 0.02;
  const days = (Number(to) - Number(from)) / 86400000;

  const inflationForPeriod = yearlyInflation / (365 / days);

  return 1 - inflationForPeriod;
}
