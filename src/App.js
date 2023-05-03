import { Provider } from "react-redux";
import { store } from "./store/store";
import { useState } from "react";
import CardMockups from "./components/CardMockups";
import ThxMess from "./components/ThxMess";
import InputForm from "./components/InputForm";

export default function App() {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1111);
  const [formIsDone, setFormIsDone] = useState(false);

  return (
    <Provider store={store}>
      <div className={isLargeScreen ? "row" : "column"}>
        <CardMockups />
        {formIsDone ? (
          <ThxMess
            continueForm={() => {
              setFormIsDone(false);
            }}
            isFormValid={formIsDone}
          />
        ) : (
          <InputForm
            isFormValid={() => {
              setFormIsDone(true);
            }}
          />
        )}
      </div>
    </Provider>
  );
}
