import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  listOfCurrentOrder: [],
  listOfPastOrder: [],
  listOfallOrders: [],
};

export const orderSlice = createSlice({
  name: "orderSlice",
  initialState: initialState,
  reducers: {
    addCurrentOrderRedux(state, action) {
      const orders = action.payload;
      console.log(orders);
      if (Array.isArray(orders)) {
        state.listOfCurrentOrder = [...orders];
      } else {
        state.listOfCurrentOrder.push(orders);
      }
    },
    addPastOrderRedux(state, action) {
      const orders = action.payload;
      state.listOfPastOrder = orders;
    },

    getAllOrderRedux(state, action) {
      const orders = action.payload;
      console.log("first", orders);
      if (Array.isArray(orders)) {
        state.listOfallOrders = [...orders];
      } else {
        state.listOfallOrders.push(orders);
      }

      console.log(" state.listOfallOrders", state.listOfallOrders);
    },

    updateOrderRedux(state, action) {
      const Order = action.payload.order;
      const index = state.listOfCurrentOrder.findIndex(
        (order) => order._id === order._id
      );
      if (index !== -1) {
        state.listOfCurrentOrder[index] = Order;
      }

      state.listOfPastOrder.push(Order);
    },
    reset(state) {
      Object.assign(state, initialState);
    },
  },
});
export const {
  addCurrentOrderRedux,
  addPastOrderRedux,
  updateOrderRedux,
  getAllOrderRedux,
} = orderSlice.actions;
