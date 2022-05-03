import React from 'react';

interface OptionsType {
  id: string;
  checked: boolean;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface CheckboxFilterProps {
  options: OptionsType[];
}

const CheckboxFilter: React.FC<CheckboxFilterProps> = ({ options }) => {
  return (
    <>
      {options.map(({ id, checked, label, onChange }) => (
        <span className="checkbox js-postback" key={id}>
          <input
            id={id}
            type="checkbox"
            checked={checked}
            onChange={onChange}
          />
          <label htmlFor={id}>{label}</label>
        </span>
      ))}
    </>
  );
};

export default CheckboxFilter;
