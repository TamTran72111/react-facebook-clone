import React, { useState } from "react";

const RequiredInput = ({
  label,
  icon,
  type,
  placeholder,
  validate,
  value,
  onChange,
}) => {
  const [danger, setDanger] = useState("");
  const hasIconLeft = icon ? "has-icons-left" : "";

  const onFocus = () => {
    setDanger("");
  };

  const onBlur = () => {
    if (validate) {
      validate(value);
    }
    if (value === "") {
      setDanger("is-danger");
    }
  };

  return (
    <div className="field">
      {label && <label className="label">{label}</label>}
      <div className={`control has-icons-right ${hasIconLeft}`}>
        <input
          className={`input ${danger}`}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          required
        />
        {icon && (
          <span className="icon is-small is-left">
            <i className="`fas ${icon}`"></i>
          </span>
        )}
        {danger && (
          <span class="icon is-small is-right has-text-danger">
            <i class="fas fa-exclamation-circle"></i>
          </span>
        )}
      </div>
    </div>
  );
};

export default RequiredInput;
