//Accounts

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },

    requestLoan: {
      prepare(amount, purpose) {
        return { payload: { amount, purpose } };
      },

      reducer(state, action) {
        if (state.loan > 0) return state;

        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance += Number(action.payload.amount);
      },
    },

    payLoan(state) {
      state.balance = state.balance - state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    currencyGettingConverted(state) {
      state.isLoading = true;
    },
  },
});

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

export default accountSlice.reducer;

export function deposit(amount, currency) {
  //if currency is dollar then return action
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  //if not then lets use redux thunk to convert it into USD  using a API call.
  return async function (dispatch, getState) {
    //setting isLoading to true :
    dispatch({ type: "account/currencyGettingConverted" });

    //API call
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );

    const data = await res.json();
    console.log(data);
    const converted = data.rates.USD;
    //return action
    dispatch({ type: "account/deposit", payload: converted });
  };
}
