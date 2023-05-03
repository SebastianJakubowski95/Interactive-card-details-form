import classes from "./ThxMess.module.css";
import image from "../assets/icons/icon-complete.svg";
import Button from "./Button";

export default function ThxMess(props) {
  return (
    <div className={classes.content}>
      <img src={image} alt="success image" />
      <div>
        <h2>THANK YOU!</h2>
        <p>We’ve added your card details</p>
      </div>
      <Button
        buttonMess="Continue"
        onClick={() => {
          props.continueForm();
        }}
        isFormValid={props.isFormValid}
      />
    </div>
  );
}
