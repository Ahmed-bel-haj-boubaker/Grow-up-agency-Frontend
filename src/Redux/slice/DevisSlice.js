import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listOfDevis: [],
  listOfAllDevis: [],
};

export const DevisSlice = createSlice({
  name: "devis",
  initialState,
  reducers: {
    addDevisRedux(state, action) {
      const devis = action.payload;
      if (Array.isArray(devis)) {
        state.listOfDevis = [...devis];
      } else {
        state.listOfDevis.push(devis);
      }
    },
    getAllDevisRedux(state, action) {
      const devis = action.payload;
      console.log("first", devis);
      if (Array.isArray(devis)) {
        state.listOfAllDevis = [...devis];
      } else {
        state.listOfAllDevis.push(devis);
      }
    },
  },
});

export const { addDevisRedux, getAllDevisRedux } = DevisSlice.actions;
