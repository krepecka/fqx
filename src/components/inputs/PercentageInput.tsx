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

const PercentageInput: FC<Props> = ({ id, label, value, error, onChange }) => {
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
      inputProps={{ step: 0.01, min: 0 }}
      InputProps={{
        endAdornment: <InputAdornment position="end">%</InputAdornment>,
      }}
      fullWidth
    />
  );
};

export default PercentageInput;
