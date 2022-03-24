import React from 'react';

const CheckboxFilter = ({ options }) => {
  return options.map(({ id, checked, label, onChange }) => {
    return (
      <span className="checkbox js-postback" key={id}>
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
        />
        <label htmlFor={id}>{label}</label>
      </span>
    );
  });
};

export default CheckboxFilter;
