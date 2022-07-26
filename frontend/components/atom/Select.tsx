import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import MuiSelect, { SelectChangeEvent } from '@mui/material/Select';

interface SelectProps {
  id: string;
  label?: string;
  state: string | number;
  style?: React.CSSProperties;
  variant?: 'standard' | 'outlined' | 'filled';
  setState: React.Dispatch<React.SetStateAction<string>> | React.Dispatch<React.SetStateAction<number>>;
  data: {
    key: string;
    value: string | number;
  }[];
}

export const Select = (props: SelectProps) => {
  const handleChange = (e: SelectChangeEvent<any>) => {
    props.setState(e.target.value);
  };

  return (
    <FormControl>
      <InputLabel id={props.id}>{props.label}</InputLabel>
      <MuiSelect
        autoWidth={false}
        variant={props.variant}
        labelId={props.id}
        value={props.state}
        label={props.label}
        onChange={handleChange}
        style={{ ...props.style }}
      >
        {props.data.map((item, index) => (
          <MenuItem value={item.value} key={index}>
            {item.key}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
};
