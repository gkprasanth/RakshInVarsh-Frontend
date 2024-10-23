import { Select } from '@chakra-ui/react';
import React from 'react';

const DropDown = ({ placeholder, options, onChange }) => {
  return (
    <Select placeholder={placeholder} onChange={onChange}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
};


export default DropDown;
