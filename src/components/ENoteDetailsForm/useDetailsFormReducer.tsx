import { useReducer } from 'react';

interface State {
  purchasePrice: number;
  paymentDate: Date;
  dueDate: Date | null;
  maturity: number;
  agioPercentage: number;
  agioValue: number;
  aprPercentage: number;
  faceValue: number;
}

type Action =
  | { type: 'PURCHASE_PRICE_CHANGE'; value: number }
  | { type: 'PAYMENT_DATE_CHANGE'; value: Date }
  | { type: 'DUE_DATE_CHANGE'; value: Date }
  | { type: 'AGIO_PERCENTAGE_CHANGE'; value: number }
  | { type: 'AGIO_VALUE_CHANGE'; value: number }
  | { type: 'APR_PERCENTAGE_CHANGE'; value: number }
  | { type: 'FACE_VALUE_CHANGE'; value: number };

const initialState: State = {
  purchasePrice: 0,
  paymentDate: new Date(),
  dueDate: null,
  maturity: 0,
  agioPercentage: 0,
  agioValue: 0,
  aprPercentage: 0,
  faceValue: 0,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'PURCHASE_PRICE_CHANGE': {
      return handlePurchasePriceChange({
        ...state,
        purchasePrice: action.value,
      });
    }
    case 'PAYMENT_DATE_CHANGE': {
      return handlePaymentDateChange({ ...state, paymentDate: action.value });
    }
    case 'DUE_DATE_CHANGE': {
      return handleDueDateChange({ ...state, dueDate: action.value });
    }
    case 'AGIO_PERCENTAGE_CHANGE': {
      return handleAgioPercentageChange({
        ...state,
        agioPercentage: roundAndBoundNumeric(action.value),
      });
    }
    case 'AGIO_VALUE_CHANGE': {
      return handleAgioValueChange({ ...state, agioValue: action.value });
    }
    case 'APR_PERCENTAGE_CHANGE': {
      return handleAprPercentageChange({
        ...state,
        aprPercentage: roundAndBoundNumeric(action.value),
      });
    }
    case 'FACE_VALUE_CHANGE': {
      return handleFaceValueChange({ ...state, faceValue: action.value });
    }
    default: {
      return initialState;
    }
  }
}

/**** UTILS ****/

function calculateMaturity(state: State): number {
  const dateDiff = Number(state.dueDate) - Number(state.paymentDate);
  const fullDays = dateDiff > 0 ? dateDiff / 86400000 : 0;

  return Math.round(fullDays);
}

function calculateAgioValue(state: State): number {
  const { faceValue, purchasePrice } = state;
  const agioValue = faceValue - purchasePrice;

  return roundAndBoundNumeric(agioValue);
}

function calculateAgioPercentage(state: State): number {
  const { faceValue, purchasePrice } = state;
  const agioPercentage = ((faceValue - purchasePrice) / purchasePrice) * 100;

  return roundAndBoundNumeric(agioPercentage);
}

function calculateAprPercentage(state: State): number {
  const { faceValue, purchasePrice, maturity } = state;
  const aprPercentage = ((faceValue - purchasePrice) / maturity / 100) * 365;

  return roundAndBoundNumeric(aprPercentage);
}

function calculateFaceValueByAgioPercentage(state: State): number {
  const { agioPercentage, purchasePrice } = state;

  return roundAndBoundNumeric(
    (agioPercentage / 100) * purchasePrice + purchasePrice
  );
}

function calculateFaceValueByAgioValue(state: State): number {
  const { agioValue, purchasePrice } = state;

  return agioValue + purchasePrice;
}

function calculateFaceValueByAprPercentage(state: State): number {
  const { aprPercentage, purchasePrice, maturity } = state;

  return roundAndBoundNumeric(
    (aprPercentage / 365) * 100 * maturity + purchasePrice
  );
}

function roundAndBoundNumeric(value: number): number {
  return +Math.max(0, value).toFixed(2);
}

/**** UTILS ****/

function handleMaturityChange(state: State): State {
  state = { ...state, maturity: calculateMaturity(state) };

  return { ...state, aprPercentage: calculateAprPercentage(state) };
}

function handlePurchasePriceChange(state: State): State {
  return {
    ...state,
    agioPercentage: calculateAgioPercentage(state),
    agioValue: calculateAgioValue(state),
    aprPercentage: calculateAprPercentage(state),
  };
}

function handlePaymentDateChange(state: State): State {
  return handleMaturityChange(state);
}

function handleDueDateChange(state: State): State {
  return handleMaturityChange(state);
}

function handleAgioPercentageChange(state: State): State {
  state = {
    ...state,
    faceValue: calculateFaceValueByAgioPercentage(state),
  };

  return {
    ...state,
    agioValue: calculateAgioValue(state),
    aprPercentage: calculateAprPercentage(state),
  };
}

function handleAgioValueChange(state: State): State {
  state = {
    ...state,
    faceValue: calculateFaceValueByAgioValue(state),
  };

  return {
    ...state,
    agioPercentage: calculateAgioPercentage(state),
    aprPercentage: calculateAprPercentage(state),
  };
}

function handleAprPercentageChange(state: State): State {
  state = {
    ...state,
    faceValue: calculateFaceValueByAprPercentage(state),
  };

  return {
    ...state,
    agioValue: calculateAgioValue(state),
    agioPercentage: calculateAgioPercentage(state),
  };
}

function handleFaceValueChange(state: State): State {
  return {
    ...state,
    agioValue: calculateAgioValue(state),
    agioPercentage: calculateAgioPercentage(state),
    aprPercentage: calculateAprPercentage(state),
  };
}

function useDetailsFormReducer(): [State, React.Dispatch<Action>] {
  const [state, dispatch] = useReducer(reducer, initialState);

  return [state, dispatch];
}

export { reducer };
export type { State, Action };

export default useDetailsFormReducer;
