import classes from "./FourDigits.module.css";

export default function FourDigits(props) {
  return (
    <div>
      <p className={classes["four-digits"]}>{props.numberArr[0]}</p>
      <p className={classes["four-digits"]}>{props.numberArr[1]}</p>
      <p className={classes["four-digits"]}>{props.numberArr[2]}</p>
      <p className={classes["four-digits"]}>{props.numberArr[3]}</p>
    </div>
  );
}
