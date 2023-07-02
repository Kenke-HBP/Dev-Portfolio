import React from "react";

const FormInput = ({ label, type, value, onChange, name }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        name={name}
      />
    </div>
  );
};

export default FormInput;
