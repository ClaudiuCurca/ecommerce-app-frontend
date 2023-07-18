import React from "react";

function Input({
  fieldError,
  value,
  onChange,
  id,
  type,
  label,
  maxLength,
  placeholder,
  height,
  list,
}) {
  const handleChangeNumber = (e) => {
    const re = /^[0-9\b]+$/;

    // if value is not blank, then test the regex

    if (e.target.value === "" || re.test(e.target.value)) {
      onChange(e);
    }
  };

  return (
    <div className={`form-input ${fieldError !== undefined ? "error" : ""}`}>
      <label htmlFor={id} className="form-input-label">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          className="form-input-textarea"
          id={id}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          placeholder={placeholder}
          style={{ height: `${height}rem` }}
        ></textarea>
      ) : (
        <>
          {type === "number" ? (
            <input
              type="text"
              className="form-input-input"
              pattern="[0-9]*"
              id={id}
              value={value}
              onChange={handleChangeNumber}
              maxLength={maxLength}
              placeholder={placeholder}
              style={{ height: `${height}rem` }}
            ></input>
          ) : (
            <input
              type={type ? type : "text"}
              className="form-input-input"
              id={id}
              value={value}
              onChange={onChange}
              maxLength={maxLength}
              placeholder={placeholder}
              style={{ height: `${height}rem` }}
              list={list}
              autoComplete="off"
            ></input>
          )}
        </>
      )}
      <p className="form-input-error">{fieldError}</p>
    </div>
  );
}

export default Input;
