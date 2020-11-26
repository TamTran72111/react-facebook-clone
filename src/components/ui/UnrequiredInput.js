import React from 'react';

const UnrequiredInput = ({
  label,
  type,
  icon,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="field">
      {label && <label className="label">{label}</label>}
      <div className={`control ${icon ? 'has-icons-left' : ''}`}>
        <input
          className="input"
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {icon && (
          <span className="icon is-small is-left">
            <i className={`fas ${icon}`}></i>
          </span>
        )}
      </div>
    </div>
  );
};

export default UnrequiredInput;
