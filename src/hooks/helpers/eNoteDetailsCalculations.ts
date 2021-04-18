import type { State } from '../useDetailsFormReducer';

export function calculateMaturity(state: State): number {
  const dateDiff = Number(state.dueDate) - Number(state.paymentDate);
  const fullDays = dateDiff > 0 ? dateDiff / 86400000 : 0;

  return Math.round(fullDays);
}

export function calculateAgioValue(state: State): number {
  const { faceValue, purchasePrice } = state;
  const agioValue = faceValue - purchasePrice;

  return roundAndBoundNumeric(agioValue);
}

export function calculateAgioPercentage(state: State): number {
  const { faceValue, purchasePrice } = state;
  const agioPercentage = ((faceValue - purchasePrice) / purchasePrice) * 100;

  return roundAndBoundNumeric(agioPercentage);
}

export function calculateAprPercentage(state: State): number {
  const { faceValue, purchasePrice, maturity } = state;
  const aprPercentage = ((faceValue - purchasePrice) / maturity / 100) * 365;

  return roundAndBoundNumeric(aprPercentage);
}

export function calculateFaceValueByAgioPercentage(state: State): number {
  const { agioPercentage, purchasePrice } = state;

  return roundAndBoundNumeric(
    (agioPercentage / 100) * purchasePrice + purchasePrice
  );
}

export function calculateFaceValueByAgioValue(state: State): number {
  const { agioValue, purchasePrice } = state;

  return agioValue + purchasePrice;
}

export function calculateFaceValueByAprPercentage(state: State): number {
  const { aprPercentage, purchasePrice, maturity } = state;

  return roundAndBoundNumeric(
    (aprPercentage / 365) * 100 * maturity + purchasePrice
  );
}

export function roundAndBoundNumeric(value: number): number {
  return +Math.max(0, value).toFixed(2);
}
