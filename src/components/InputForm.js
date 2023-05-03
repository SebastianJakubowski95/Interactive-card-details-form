import classes from "./InputForm.module.css";
import Input from "./Input";
import Button from "./Button";
import correctIcon from "../assets/icons/icon-correct.svg";
import incorrectIcon from "../assets/icons/icon-incorrent.svg";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { formActions } from "../store/store";

export default function InputForm(props) {
  const [cardHolderName, setCardHolderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [mm, setMm] = useState("");
  const [yy, setYy] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardHolderNameTouched, setCardHolderNameTouched] = useState(false);
  const [cardNumberTouched, setCardNumberTouched] = useState(false);
  const [mmTouched, setMmTouched] = useState(false);
  const [yyTouched, setYyTouched] = useState(false);
  const [cvcTouched, setCvcTouched] = useState(false);
  const [isCardHolderNameValid, setIsCardHolderNameValid] = useState(false);
  const [isCardNumberValid, setIsCardNumberValid] = useState(false);
  const [isMmValid, setIsMmValid] = useState(false);
  const [isYyValid, setIsYyValid] = useState(false);
  const [isExpDateValid, setIsExpDateValid] = useState(false);
  const [isCvcValid, setIsCvcValid] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const dispatch = useDispatch();

  function submitForm() {
    props.isFormValid();
  }

  useEffect(() => {
    if (
      isCardHolderNameValid &&
      isCardNumberValid &&
      isMmValid &&
      isYyValid &&
      isExpDateValid &&
      isCvcValid
    ) {
      setIsFormValid(true);
    }
  }, [
    isCardHolderNameValid,
    isCardNumberValid,
    isMmValid,
    isYyValid,
    isExpDateValid,
    isCvcValid,
    isFormValid,
  ]);

  useEffect(() => {
    if (isMmValid && isYyValid) {
      setIsExpDateValid(true);
    } else {
      setIsExpDateValid(false);
    }
  }, [isMmValid, isYyValid]);

  function onChangeHandler(event) {
    let newValue = event.target.value;
    const nameOfInput = event.target.name;
    switch (nameOfInput) {
      case "cardHolderName":
        cardHolderNameRef.current.checkValidify();
        setCardHolderName(newValue);
        newValue = newValue.toUpperCase();
        dispatch(formActions.setCardHolderName(newValue));
        break;
      case "cardNumber":
        cardNumberRef.current.checkValidify();
        setCardNumber(newValue.slice(0, 16));
        dispatch(formActions.setCardNumber(newValue.slice(0, 16)));
        break;
      case "mm":
        mmRef.current.checkValidify();
        setMm(newValue.slice(0, 2));
        dispatch(formActions.setMm(newValue.slice(0, 2)));
        break;
      case "yy":
        yyRef.current.checkValidify();
        setYy(newValue.slice(0, 2));
        dispatch(formActions.setYy(newValue.slice(0, 2)));
        break;
      case "cvc":
        cvcRef.current.checkValidify();
        setCvc(newValue.slice(0, 3));
        dispatch(formActions.setCvc(newValue.slice(0, 3)));
        break;
      default:
        break;
    }
  }
  function changeValidyfy(nameOfInput, boolean) {
    switch (nameOfInput) {
      case "cardHolderName":
        setIsCardHolderNameValid(boolean);
        setCardHolderNameTouched(true);
        break;
      case "cardNumber":
        setIsCardNumberValid(boolean);
        setCardNumberTouched(true);
        break;
      case "mm":
        setIsMmValid(boolean);
        setMmTouched(true);
        break;
      case "yy":
        setIsYyValid(boolean);
        setYyTouched(true);
        break;
      case "cvc":
        setIsCvcValid(boolean);
        setCvcTouched(true);
        break;

      default:
        break;
    }
  }

  const lettersOnlyError = (
    <div className={classes.info}>
      <img src={incorrectIcon} alt="incorrect icon" />
      <p className={classes["warning-info"]}>Wrong format, letters only</p>
    </div>
  );
  const numbersOnlyError = (
    <div className={classes.info}>
      <img src={incorrectIcon} alt="incorrect icon" />
      <p className={classes["warning-info"]}>Wrong format, numbers only</p>
    </div>
  );

  const cellBlankError = (
    <div className={classes.info}>
      <img src={incorrectIcon} alt="incorrect icon" />
      <p className={classes["warning-info"]}>Can't be blank</p>
    </div>
  );
  const cellIsValidIcon = (
    <div className={classes.info}>
      <img src={correctIcon} alt="correct icon" />
    </div>
  );
  const cardHolderNameRef = useRef();
  const cardNumberRef = useRef();
  const mmRef = useRef();
  const yyRef = useRef();
  const cvcRef = useRef();

  return (
    <form className={classes.form}>
      <div>
        <div className={`${classes["input-cell"]} ${classes["cell-regular"]}`}>
          <h2 className={classes.label}>CARDHOLDER NAME</h2>
          <Input
            ref={cardHolderNameRef}
            size="large"
            type="string"
            name="cardHolderName"
            placeholder="e.g. Jane Appleseed"
            value={cardHolderName}
            onChange={onChangeHandler}
            isValid={changeValidyfy}
            onFocus={() => {
              setIsTyping(true);
            }}
            onBlur={() => {
              setIsTyping(false);
            }}
          />
          {!isCardHolderNameValid &&
            cardHolderName.length > 1 &&
            lettersOnlyError}
          {!isCardHolderNameValid &&
            cardHolderName.length == 0 &&
            cardHolderNameTouched &&
            cellBlankError}
          {isCardHolderNameValid && cellIsValidIcon}
        </div>
        <div className={`${classes["input-cell"]} ${classes["cell-regular"]}`}>
          <h2 className={classes.label}>CARD NUMBER</h2>
          <Input
            ref={cardNumberRef}
            size="large"
            type="number"
            name="cardNumber"
            placeholder="e.g. 1234567891230000"
            value={cardNumber}
            onChange={onChangeHandler}
            isValid={changeValidyfy}
            onFocus={() => {
              setIsTyping(true);
            }}
            onBlur={() => {
              setIsTyping(false);
            }}
          />
          {!isCardNumberValid &&
            cardNumber.length == 16 &&
            numbersOnlyError &&
            !isTyping &&
            document.activeElement !== cardNumberRef.current}
          {!isCardNumberValid &&
            cardNumber.length == 0 &&
            cardNumberTouched &&
            cellBlankError}
          {isCardNumberValid && cellIsValidIcon}
        </div>
        <div className={`${classes["input-cell"]} ${classes["cell-divided"]}`}>
          <div className={classes["exp-date"]}>
            <h2 className={classes.label}>EXP.DATE (MM/YY)</h2>
            <div className={classes.expDivs}>
              <Input
                ref={mmRef}
                size="short"
                type="number"
                name="mm"
                placeholder="MM"
                value={mm}
                onChange={onChangeHandler}
                isValid={changeValidyfy}
                onFocus={() => {
                  setIsTyping(true);
                }}
                onBlur={() => {
                  setIsTyping(false);
                }}
              />
              <Input
                ref={yyRef}
                size="short"
                type="number"
                name="yy"
                placeholder="YY"
                value={yy}
                onChange={onChangeHandler}
                isValid={changeValidyfy}
                onFocus={() => {
                  setIsTyping(true);
                }}
                onBlur={() => {
                  setIsTyping(false);
                }}
              />
            </div>
            {!isExpDateValid &&
              (mm.length == 0 || yy.length == 0) &&
              (mmTouched || yyTouched) &&
              cellBlankError}
            {(!isMmValid || !isYyValid) &&
              mm.length == 2 &&
              yy.length == 2 &&
              document.activeElement !== (mmRef.current || yyRef.current) &&
              numbersOnlyError}
            {isExpDateValid && cellIsValidIcon}
          </div>
          <div>
            <h2 className={classes.label}>CVC</h2>
            <Input
              ref={cvcRef}
              size="medium"
              type="number"
              name="cvc"
              placeholder="e.g. 123"
              value={cvc}
              onChange={onChangeHandler}
              isValid={changeValidyfy}
              onFocus={() => {
                setIsTyping(true);
              }}
              onBlur={() => {
                setIsTyping(false);
              }}
            />
            {!isCvcValid && cvc.length == 0 && cvcTouched && cellBlankError}
            {!isCvcValid && cvc.length == 3 && !isTyping && numbersOnlyError}
            {isCvcValid && cellIsValidIcon}
          </div>
        </div>
      </div>
      <Button
        buttonMess="Confirm"
        onClick={submitForm}
        isFormValid={isFormValid}
      />
    </form>
  );
}
