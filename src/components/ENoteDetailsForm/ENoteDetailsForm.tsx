import { FC } from 'react';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import CurrencyInput from '../inputs/CurrencyInput';
import DateInput from '../inputs/DateInput';
import TextInput from '../inputs/TextInput';
import PercentageInput from '../inputs/PercentageInput';

import useDetailsFormReducer from './useDetailsFormReducer';
import './ENoteDetailsForm.scss';

const ENoteDetailsForm: FC = () => {
  const [state, dispatch] = useDetailsFormReducer();

  const {
    paymentDate,
    purchasePrice,
    dueDate,
    maturity,
    agioPercentage,
    agioValue,
    aprPercentage,
    faceValue,
  } = state;

  return (
    <div className="formContainer">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div className="dividerText">Financing terms</div> <Divider />
        </Grid>

        <Grid item xs={12}>
          <CurrencyInput
            id="purchasePrice"
            label="Financing Amount (Purchase Price)"
            value={purchasePrice}
            onChange={(value) =>
              dispatch({ type: 'PURCHASE_PRICE_CHANGE', value })
            }
          />
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12} md={6}>
            <DateInput
              id="paymentDate"
              label="Payment date"
              onChange={(value) =>
                dispatch({ type: 'PAYMENT_DATE_CHANGE', value })
              }
              value={paymentDate}
              minDate={new Date()}
            />
          </Grid>
          <Grid item xs={false} lg={6}></Grid>
        </Grid>

        <Grid item xs={12}>
          <div className="dividerText">eNote terms</div> <Divider />
        </Grid>

        <Grid item xs={12} sm={6}>
          <DateInput
            id="dueDate"
            label="eNote Due Date"
            onChange={(value) => dispatch({ type: 'DUE_DATE_CHANGE', value })}
            value={dueDate}
            minDate={paymentDate}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextInput
            id="maturity"
            label="Maturity"
            value={`${maturity} days`}
            disabled
          />
        </Grid>

        <Grid item xs={12} sm={4} md={3}>
          <PercentageInput
            id="agioPercentage"
            label="Agio %"
            value={agioPercentage}
            onChange={(value) =>
              dispatch({ type: 'AGIO_PERCENTAGE_CHANGE', value })
            }
          />
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <CurrencyInput
            id="agioValue"
            label="Agio CHF"
            value={agioValue}
            onChange={(value) => dispatch({ type: 'AGIO_VALUE_CHANGE', value })}
          />
        </Grid>

        <Grid item xs={12} sm={4} md={6}>
          <PercentageInput
            id="aprPercentage"
            label="APR %"
            value={aprPercentage}
            onChange={(value) =>
              dispatch({ type: 'APR_PERCENTAGE_CHANGE', value })
            }
          />
        </Grid>

        <Grid item xs={12}>
          <CurrencyInput
            id="faceValue"
            label="eNote Face Value"
            value={faceValue}
            onChange={(value) => dispatch({ type: 'FACE_VALUE_CHANGE', value })}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default ENoteDetailsForm;
