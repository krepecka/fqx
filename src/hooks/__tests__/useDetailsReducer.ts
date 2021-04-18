import { reducer } from '../useDetailsReducer';
import type { State, Action } from '../useDetailsReducer';

const mockState: State = {
  purchasePrice: 10000,
  paymentDate: new Date('2020-11-05'),
  dueDate: new Date('2020-11-15'),
  maturity: 10,
  agioPercentage: 10,
  agioValue: 1000,
  aprPercentage: 16.59,
  faceValue: 11000,
};

describe('useDetailsReducer', () => {
  let newState: State;
  let action: Action;

  describe('changing purchasePrice', () => {
    beforeEach(() => {
      action = { type: 'PURCHASE_PRICE_CHANGE', value: 8000 };
      newState = reducer(mockState, action);
    });

    it('should change purchasePrice itself', () => {
      expect(newState.purchasePrice).toBe(action.value);
    });
    it('should recalculate agioPercentage', () => {
      expect(newState.agioPercentage).toBe(37.5);
    });
    it('should recalculate agioValue', () => {
      expect(newState.agioValue).toBe(3000);
    });
    it('should recalculate aprPercentage', () => {
      expect(newState.aprPercentage).toBe(1095);
    });
  });

  describe('changing paymentDate', () => {
    beforeEach(() => {
      action = { type: 'PAYMENT_DATE_CHANGE', value: new Date('2020-11-01') };
      newState = reducer(mockState, action);
    });

    it('should change paymentDate itself', () => {
      expect(newState.paymentDate).toBe(action.value);
    });
    it('should recalculate maturity', () => {
      expect(newState.maturity).toBe(14);
    });
    it('should recalculate aprPercentage', () => {
      expect(newState.aprPercentage).toBe(260.71);
    });
  });

  describe('changing dueDate', () => {
    beforeEach(() => {
      action = { type: 'DUE_DATE_CHANGE', value: new Date('2020-11-25') };
      newState = reducer(mockState, action);
    });

    it('should change dueDate itself', () => {
      expect(newState.dueDate).toBe(action.value);
    });
    it('should recalculate maturity', () => {
      expect(newState.maturity).toBe(20);
    });
    it('should recalculate aprPercentage', () => {
      expect(newState.aprPercentage).toBe(182.5);
    });
  });

  describe('changing agioPercentage', () => {
    beforeEach(() => {
      action = { type: 'AGIO_PERCENTAGE_CHANGE', value: 15 };
      newState = reducer(mockState, action);
    });

    it('should change agioPercentage itself', () => {
      expect(newState.agioPercentage).toBe(action.value);
    });
    it('should recalculate faceValue', () => {
      expect(newState.faceValue).toBe(11500);
    });
    it('should recalculate agioValue', () => {
      expect(newState.agioValue).toBe(1500);
    });
    it('should recalculate aprPercentage', () => {
      expect(newState.aprPercentage).toBe(547.5);
    });
  });

  describe('changing agioValue', () => {
    beforeEach(() => {
      action = { type: 'AGIO_VALUE_CHANGE', value: 2000 };
      newState = reducer(mockState, action);
    });

    it('should change agioValue itself', () => {
      expect(newState.agioValue).toBe(action.value);
    });
    it('should recalculate faceValue', () => {
      expect(newState.faceValue).toBe(12000);
    });
    it('should recalculate agioPercentage', () => {
      expect(newState.agioPercentage).toBe(20);
    });
    it('should recalculate aprPercentage', () => {
      expect(newState.aprPercentage).toBe(730);
    });
  });

  describe('changing aprPercentage', () => {
    beforeEach(() => {
      action = { type: 'APR_PERCENTAGE_CHANGE', value: 80 };
      newState = reducer(mockState, action);
    });

    it('should change aprPercentage itself', () => {
      expect(newState.aprPercentage).toBe(action.value);
    });
    it('should recalculate faceValue', () => {
      expect(newState.faceValue).toBe(10219.18);
    });
    it('should recalculate agioPercentage', () => {
      expect(newState.agioPercentage).toBe(2.19);
    });
    it('should recalculate agioValue', () => {
      expect(newState.agioValue).toBe(219.18);
    });
  });

  describe('changing faceValue', () => {
    beforeEach(() => {
      action = { type: 'FACE_VALUE_CHANGE', value: 12000 };
      newState = reducer(mockState, action);
    });

    it('should change faceValue itself', () => {
      expect(newState.faceValue).toBe(action.value);
    });
    it('should recalculate agioPercentage', () => {
      expect(newState.agioPercentage).toBe(20);
    });
    it('should recalculate agioValue', () => {
      expect(newState.agioValue).toBe(2000);
    });
    it('should recalculate aprPercentage', () => {
      expect(newState.aprPercentage).toBe(730);
    });
  });

  describe('percentage values must remain valid', () => {
    it('agioPercentage non negative', () => {
      newState = reducer(mockState, {
        type: 'AGIO_PERCENTAGE_CHANGE',
        value: -100,
      });

      expect(newState.agioPercentage).toBe(0);
    });

    it('aprPercentage non negative', () => {
      newState = reducer(mockState, {
        type: 'APR_PERCENTAGE_CHANGE',
        value: -100,
      });

      expect(newState.aprPercentage).toBe(0);
    });
  });
});
