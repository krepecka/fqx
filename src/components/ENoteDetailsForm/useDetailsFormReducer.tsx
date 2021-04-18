import { useReducer } from 'react';

import {
  calculateAgioPercentage,
  calculateAgioValue,
  calculateAprPercentage,
  calculateMaturity,
  // face value re-calculations
  calculateFaceValueByAgioValue,
  calculateFaceValueByAgioPercentage,
  calculateFaceValueByAprPercentage,
  // floating point rounding
  roundAndBoundNumeric,
} from './eNoteDetailsCalculations';

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
      return handleMaturityChange({ ...state, paymentDate: action.value });
    }
    case 'DUE_DATE_CHANGE': {
      return handleMaturityChange({ ...state, dueDate: action.value });
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
