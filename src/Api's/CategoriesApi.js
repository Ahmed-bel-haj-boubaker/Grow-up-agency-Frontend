export const host = "http://localhost:8000";
export const getAllCategories = `${host}/api/category`;
export const getAllCat = `${host}/api/category/all`;
export const getCategoriesPage = (limit, page) =>
  `${host}/api/category?limit=${limit}&page=${page}`;
export const addCategories = `${host}/api/category`;
export const updateCategories = (id) => `${host}/api/category/${id}`;
export const deleteCategories = (id) => `${host}/api/category/${id}`;
export const searchCategories = (queryString) =>
  `${host}/api/category?name=${queryString}`;
