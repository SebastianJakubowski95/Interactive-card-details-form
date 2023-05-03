import classes from "./CardMockups.module.css";
import logo from "../assets/icons/card-logo.svg";
import frontCard from "../assets/bg-card-front.png";
import cardBack from "../assets/bg-card-back.png";
import FourDigits from "./FourDigits";
import { useSelector } from "react-redux";

export default function CardMockups() {
  const cardHolderName = useSelector((store) => store.form.cardHolderName);
  const cardNumber = useSelector((store) => store.form.cardNumber);
  const mm = useSelector((store) => store.form.mm);
  const yy = useSelector((store) => store.form.yy);
  const cvc = useSelector((store) => store.form.cvc);

  return (
    <div className={classes.bg}>
      <div className={classes["card-front"]}>
        <img className={classes.frontCard} src={frontCard} alt="bg card" />
        <div>
          <img className={classes.logo} src={logo} alt="logo" />
          <div>
            <div className={classes.digits}>
              <FourDigits numberArr={cardNumber.slice(0, 4)} />
              <FourDigits numberArr={cardNumber.slice(4, 8)} />
              <FourDigits numberArr={cardNumber.slice(8, 12)} />
              <FourDigits numberArr={cardNumber.slice(12, 16)} />
            </div>
            <div className={classes["second-row"]}>
              <p>{cardHolderName}</p>
              <p>
                {mm}/{yy}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={classes["card-back"]}>
        <p>{cvc}</p>
        <img src={cardBack} alt="card back" />
      </div>
    </div>
  );
}
