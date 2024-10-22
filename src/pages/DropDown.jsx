import { Select } from '@chakra-ui/react';
import React from 'react';

const DropDown = ({ placeholder, options }) => {
  return (
    <Select placeholder={placeholder}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
};

export default DropDown;
