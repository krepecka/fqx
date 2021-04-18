import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import DatePicker from '@material-ui/lab/DatePicker';
import { FC } from 'react';

type Props = {
  id: string;
  label: string;
  value: Date | null;
  error?: string;
  minDate?: Date;
  maxDate?: Date;
  onChange: (date: Date) => void;
};

const DateInput: FC<Props> = ({
  id,
  label,
  value,
  error,
  onChange,
  minDate,
  maxDate,
}) => {
  return (
    <DatePicker
      label={label}
      value={value}
      onChange={(date: Date | null) => onChange(date ?? new Date())}
      minDate={minDate}
      maxDate={maxDate}
      inputFormat="yyyy-MM-dd"
      /* 
        Trying to solve this problem.
        https://github.com/mui-org/material-ui-pickers/issues/1776
        Does not work, would need further investigation
      */
      mask="____-___-__"
      renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => (
        <TextField
          {...params}
          variant="outlined"
          fullWidth
          id={id}
          helperText={null}
        />
      )}
    />
  );
};

export default DateInput;
