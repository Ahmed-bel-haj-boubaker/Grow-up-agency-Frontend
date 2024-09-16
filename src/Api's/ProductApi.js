export const host = "http://localhost:8000";
export const getAllProducts = `${host}/api/product/allProducts`;
export const getProductsPage = (limit, page) =>
  `${host}/api/product?limit=${limit}&page=${page}`;
export const addProducts = `${host}/api/product`;
export const updateProducts = (id) => `${host}/api/product/${id}`;
export const deleteProducts = (id) => `${host}/api/product/${id}`;
export const searchProducts = (queryString) =>
  `${host}/api/product?title=${queryString}`;
