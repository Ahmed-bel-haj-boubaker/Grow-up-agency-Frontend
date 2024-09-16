import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  listOfTransactionsTypeOut: [],
};

export const transactionTypeOutSlice = createSlice({
  name: "transactionTypeOutSlice",
  initialState: initialState,
  reducers: {
    addTransactionTypeOutRedux(state, action) {
      const transaction = action.payload;
      state.listOfTransactionsTypeOut.push(transaction);
    },
    getAllTransactionTypeOutRedux(state, action) {
      const transaction = action.payload.transaction;
      state.listOfTransactionsTypeOut = [...transaction];
    },

    deleteTransactionRedux(state, action) {
      const id = action.payload._id;
      console.log(id);
      const index = state.listOfTransactionsTypeOut.findIndex(
        (a) => a._id === id
      );

      state.listOfTransactionsTypeOut.splice(index, 1);
    },

    updateTransaction(state, action) {
      const transaction = action.payload;
      console.log(transaction._id);
      console.log(
        "list",
        state.listOfTransactionsTypeOut.map((e) => e)
      );
      const index = state.listOfTransactionsTypeOut.findIndex(
        (e) => e._id === transaction._id
      );
      console.log(index);

      if (index !== -1) {
        state.listOfTransactionsTypeOut[index] = {
          ...state.listOfTransactionsTypeOut[index],
          ...transaction,
        };
      } else {
        console.warn(`Transaction with ID ${transaction._id} not found`);
      }
    },

    reset(state) {
      Object.assign(state, initialState);
    },
  },
});
export const {
  addTransactionTypeOutRedux,
  reset,
  getAllTransactionTypeOutRedux,
  deleteTransactionRedux,
  updateTransaction,
} = transactionTypeOutSlice.actions;
