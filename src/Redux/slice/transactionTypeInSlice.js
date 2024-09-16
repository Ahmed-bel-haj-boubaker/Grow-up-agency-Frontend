import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  listOfTransactionsTypeIn: [],
};

export const transactionTypeInSlice = createSlice({
  name: "transactionTypeInSlice",
  initialState: initialState,
  reducers: {
    addTransactionTypeInRedux(state, action) {
      const transaction = action.payload;
      console.log("transaction", transaction);
      state.listOfTransactionsTypeIn.push(transaction);
      console.log("first", state.listOfTransactionsTypeIn);
    },

    getAllTransactionTypeInRedux(state, action) {
      const transaction = action.payload.transaction;
      state.listOfTransactionsTypeIn = [...transaction];
    },
    deleteTransactionInRedux(state, action) {
      const id = action.payload._id;
      console.log(id);
      const index = state.listOfTransactionsTypeIn.findIndex(
        (a) => a._id === id
      );

      state.listOfTransactionsTypeIn.splice(index, 1);
    },
    reset(state) {
      Object.assign(state, initialState);
    },
  },
});
export const {
  addTransactionTypeInRedux,
  getAllTransactionTypeInRedux,
  reset,
  deleteTransactionInRedux,
} = transactionTypeInSlice.actions;
