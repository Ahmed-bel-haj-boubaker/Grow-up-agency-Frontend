import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listProducts: [],
  listofAllProducts: [],
  results: 0,
  limit: 0,
  currentPage: 1,
  nextPage: 1,
  totalItemInPage: 0,
  numberOfPages: 0,
  searchedItem: "",
};
export const productsSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    getListOfAllProduct(state, action) {
      const allProducts = action.payload;
      console.log("allProducts", allProducts);
      if (Array.isArray(allProducts)) {
        state.listofAllProducts = [...allProducts];
      } else {
        console.error("Expected an array of products");
      }
    },
    getAllProductsRedux(state, action) {
      const products = action.payload.data;

      state.listProducts = [...products];
    },

    pagination(state, action) {
      const nbItems = action.payload.results;
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

    addProductRedux(state, action) {
      const product = action.payload.product;
      state.listProducts.push(product);
    },

    deleteProductsRedux(state, action) {
      const id = action.payload._id;
      console.log(id);
      const index = state.listProducts.findIndex(
        (product) => product._id === id
      );
      console.log(index);
      state.listProducts.splice(index, 1);
    },

    updateProductsRedux(state, action) {
      const product = action.payload.product;
      console.log(product);
      const index = state.listProducts.findIndex(
        (product) => product._id === product._id
      );
      if (index !== -1) {
        state.listProducts[index] = product;
      }
    },

    searchProductRedux(state, action) {
      const product = action.payload.category;
      console.log("searched product ", product);
      state.searchedItem = product;
    },
  },
});

export const {
  getAllProductsRedux,
  pagination,
  addProductRedux,
  deleteProductsRedux,
  updateProductsRedux,
  searchProductRedux,
  getListOfAllProduct,
} = productsSlice.actions;
