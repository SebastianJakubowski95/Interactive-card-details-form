import classes from "./Button.module.css";

export default function Button(props) {
  function onClick(event) {
    event.preventDefault();
    if (props.isFormValid) {
      props.onClick();
    }
  }
  return (
    <button
      onClick={onClick}
      className={props.isFormValid ? classes.valid : classes.invalid}>
      <p>{props.buttonMess}</p>
    </button>
  );
}
