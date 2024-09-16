import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  listOfSales: [],
};

export const salesSlice = createSlice({
  name: "salesSlice",
  initialState: initialState,
  reducers: {
    addSalesRedux(state, action) {
      const sales = action.payload;
      console.log("salkes", sales);
      state.listOfSales.push(sales);
      console.log("first", state.listOfSales);
    },

    getAllSalesRedux(state, action) {
      const sales = action.payload.sales;
      state.listOfSales = [...sales];
      console.log("list sales", state.listOfSales);
    },
    deleteSalesInRedux(state, action) {
      const id = action.payload._id;
      console.log(id);
      const index = state.listOfSales.findIndex((a) => a._id === id);

      state.listOfSales.splice(index, 1);
    },
    reset(state) {
      Object.assign(state, initialState);
    },
  },
});
export const { getAllSalesRedux, addSalesRedux, deleteSalesInRedux, reset } =
  salesSlice.actions;
