import { createSlice, configureStore } from "@reduxjs/toolkit";

const initialState = {
  cardHolderName: "JANE APPLESEED",
  cardNumber: "0000000000000000",
  mm: "00",
  yy: "00",
  cvc: "000",
};

const formSlice = createSlice({
  name: "formSlice",
  initialState,
  reducers: {
    setCardHolderName(state, action) {
      state.cardHolderName = action.payload;
    },
    setCardNumber(state, action) {
      state.cardNumber = action.payload;
    },
    setMm(state, action) {
      state.mm = action.payload;
    },
    setYy(state, action) {
      state.yy = action.payload;
    },
    setCvc(state, action) {
      state.cvc = action.payload;
    },
  },
});

export const formActions = formSlice.actions;
export default formSlice;

export const store = configureStore({
  reducer: {
    form: formSlice.reducer,
  },
});
