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
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan(state, action) {
      if (state.loan > 0) return state;

      state.loan = action.payload.amount;
      state.loanPurpose = action.payload.purpose;
      state.balance += Number(action.payload.amount);
    },

    payLoan(state, action) {
      state.loan = 0;
      state.loanPurpose = "";
      state.balance = state.balance - state.loan;
    },
  },
});

console.log(accountSlice);

export const { deposit, withdraw, requestLoan, payLoan } = accountSlice.actions;

export default accountSlice.reducer;

/*
export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + Number(action.payload.amount),
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    case "account/currencyGettingConverted":
      return {
        ...state,
        isLoading: true,
      };

    default:
      return state;
  }
}

// Account actions functions

export function deposit(amount, currency) {
  //if currency is dollar then return action
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  console.log(amount, currency);

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

export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

export function requestLoan(amount, purpose) {
  return { type: "account/requestLoan", payload: { amount, purpose } };
}

export function payLoan() {
  return { type: "account/payLoan" };
}
*/
