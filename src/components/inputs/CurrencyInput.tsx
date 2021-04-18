import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { FC, ChangeEvent } from 'react';

type Props = {
  id: string;
  label: string;
  value: number;
  error?: string;
  onChange: (value: number) => void;
};

const CurrencyInput: FC<Props> = ({ id, label, value, error, onChange }) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange(+e.target.value);
  };

  return (
    <TextField
      id={id}
      label={label}
      value={Number(value).toString()}
      onChange={handleChange}
      variant="outlined"
      type="number"
      InputProps={{
        startAdornment: <InputAdornment position="start">CHF</InputAdornment>,
      }}
      fullWidth
    />
  );
};

export default CurrencyInput;
