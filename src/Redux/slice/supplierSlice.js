import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listSupplierPaginated: [],
  listAllSupplier: [],
  results: 0,
  limit: 0,
  currentPage: 1,
  nextPage: 1,
  totalItemInPage: 0,
  numberOfPages: 0,
  searchedItem: "",
};
export const supplierSlice = createSlice({
  name: "supplier",
  initialState: initialState,
  reducers: {
    pagination(state, action) {
      const nbItems = action.payload.results;
      console.log(nbItems);
      state.results = nbItems;
      const paginationResult = action.payload.paginationResult;
      const limit = paginationResult.limit;
      state.limit = limit;

      const currentPage = paginationResult.currentPage;
      state.currentPage = currentPage;

      const nextPage = paginationResult.nextPage;
      state.nextPage = nextPage;

      const numberOfPages = paginationResult.numberOfPages;
      state.numberOfPages = numberOfPages;
    },
    addAllSupplierRedux(state, action) {
      const supplier = action.payload.supplier;
      console.log(supplier);
      if (Array.isArray(supplier)) {
        // Replace the list with the new suppliers
        state.listAllSupplier = [...supplier];
      } else {
        // This is where you can use push
        state.listAllSupplier.push(supplier); // Immer will handle this immutably
      }
    },
    addSupplierRedux(state, action) {
      const supplier = action.payload;
      console.log(supplier);

      if (Array.isArray(supplier)) {
        // Replace the list with the new suppliers
        state.listSupplierPaginated = [...supplier];
      } else {
        // This is where you can use push
        state.listSupplierPaginated.push(supplier); // Immer will handle this immutably
      }
    },

    deleteSupplierRedux(state, action) {
      const id = action.payload._id;
      console.log(id);
      const index = state.listSupplierPaginated.findIndex(
        (supplier) => supplier._id === id
      );
      console.log(index);
      state.listSupplierPaginated.splice(index, 1);
      state.listAllSupplier.splice(index, 1);
    },

    updateSupplierRedux(state, action) {
      const supplier = action.payload.supplier;
      console.log(supplier);
      const index = state.listSupplierPaginated.findIndex(
        (supplier) => supplier._id === supplier._id
      );
      if (index !== -1) {
        state.listSupplierPaginated[index] = supplier;
      }
    },

    searchSupplierRedux(state, action) {
      const supplier = action.payload.supplier;
      console.log("searched supplier ", supplier);
      state.searchedItem = supplier;
    },
    reset(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  pagination,
  addSupplierRedux,

  deleteSupplierRedux,
  updateSupplierRedux,
  addAllSupplierRedux,
  searchSupplierRedux,
} = supplierSlice.actions;
