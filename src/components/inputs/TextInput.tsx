import TextField from '@material-ui/core/TextField';
import { FC, ChangeEvent } from 'react';

type Props = {
  id: string;
  label: string;
  value: string;
  error?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
};

const TextInput: FC<Props> = ({
  id,
  label,
  value,
  error,
  disabled,
  onChange,
}) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange(e.target.value);
  };

  return (
    <TextField
      id={id}
      label={label}
      disabled={disabled}
      value={value}
      onChange={handleChange}
      variant="outlined"
      type="text"
      fullWidth
    />
  );
};

export default TextInput;
