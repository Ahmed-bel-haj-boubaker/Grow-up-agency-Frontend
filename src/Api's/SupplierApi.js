export const host = "http://localhost:8000";
export const addSuppliers = `${host}/api/suppliers`;
export const getSupplier = `${host}/api/suppliers`;

export const deletSupplierApi = (id) => `${host}/api/suppliers/${id}`;
export const updateSupplierApi = (id) => `${host}/api/suppliers/${id}`;
export const getSupplierPage = (limit, page) =>
  `${host}/api/suppliers?limit=${limit}&page=${page}`;
export const searchSupplier = (queryString) =>
  `${host}/api/suppliers?name=${queryString}`;

export const getAllsuppliersApi = `${host}/api/suppliers/allSuppliers`;
