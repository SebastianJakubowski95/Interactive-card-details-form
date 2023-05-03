import classes from "./Input.module.css";
import React, { useState, useRef, useImperativeHandle } from "react";

const Input = React.forwardRef((props, ref) => {
  const [isTouched, setIsTouched] = useState(false);
  const [borderColor, setBorderColor] = useState("default");

  const inputRef = useRef();
  useImperativeHandle(ref, () => {
    return {
      isInputTouched: isTouched,
      checkValidify: checkValidify,
    };
  });

  function checkValidify() {
    const value = props.value.trim();
    switch (props.name) {
      case "cardHolderName":
        if (value.length > 0 && !/[0-9]/.test(value)) {
          props.isValid(props.name, true);
          setBorderColor("valid");
        } else {
          props.isValid(props.name, false);
          setBorderColor("invalid");
        }
        break;
      case "cardNumber":
        if (value.length > 14 && !/[a-zA-Z]/.test(value)) {
          props.isValid(props.name, true);
          setBorderColor("valid");
        } else {
          props.isValid(props.name, false);
          setBorderColor("invalid");
        }
        break;
      case "mm":
        if (value.length > 0 && !/[a-zA-z]/.test(value)) {
          props.isValid(props.name, true);
          setBorderColor("valid");
        } else {
          props.isValid(props.name, false);
          setBorderColor("invalid");
        }
        break;
      case "yy":
        if (value.length > 0 && !/[a-zA-z]/.test(value)) {
          props.isValid(props.name, true);
          setBorderColor("valid");
        } else {
          props.isValid(props.name, false);
          setBorderColor("invalid");
        }
        break;
      case "cvc":
        if (value.length > 1 && !/[a-zA-z]/.test(value)) {
          props.isValid(props.name, true);
          setBorderColor("valid");
        } else {
          props.isValid(props.name, false);
          setBorderColor("invalid");
        }
        break;
      default:
        break;
    }
  }

  function onBlur() {
    setIsTouched(true);
    checkValidify();
    props.onBlur();
  }

  return (
    <input
      ref={inputRef}
      type="text"
      className={`${classes.input} ${classes[borderColor]} ${
        classes[props.size]
      }`}
      name={props.name}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      onBlur={onBlur}
      onKeyDown={() => {
        checkValidify();
      }}
      onFocus={props.onFocus}
    />
  );
});
export default Input;
