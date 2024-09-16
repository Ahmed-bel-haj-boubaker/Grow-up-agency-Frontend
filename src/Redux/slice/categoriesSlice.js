import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  listCategories: [],
  listOfAllCat: [],
  results: 0,
  limit: 0,
  currentPage: 1,
  nextPage: 1,
  totalItemInPage: 0,
  numberOfPages: 0,
  searchedItem: "",
};
export const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {
    getAllCategoriesRedux(state, action) {
      const categories = action.payload.data;

      console.log("categories slice", categories);
      state.listCategories = [...categories];
      console.log(state.listCategories);
    },

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

    addCategoryRedux(state, action) {
      const category = action.payload.category;
      state.listCategories.push(category);
    },

    deleteCategoriesRedux(state, action) {
      const id = action.payload._id;
      console.log(id);
      const index = state.listCategories.findIndex(
        (category) => category._id === id
      );
      console.log(index);
      state.listCategories.splice(index, 1);
    },

    updateCategoriesRedux(state, action) {
      const category = action.payload.category;
      console.log(category);
      const index = state.listCategories.findIndex(
        (category) => category._id === category._id
      );
      if (index !== -1) {
        state.listCategories[index] = category;
      }
    },

    searchCategoryRedux(state, action) {
      const category = action.payload.category;
      console.log("searched category ", category);
      state.searchedItem = category;
    },
  },
});

export const {
  getAllCategoriesRedux,
  pagination,
  addCategoryRedux,
  deleteCategoriesRedux,
  updateCategoriesRedux,
  searchCategoryRedux,
} = categoriesSlice.actions;
