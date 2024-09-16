export const host = "http://localhost:8000";
export const addOrderApi = `${host}/api/orders`;
export const getAllOrderApi = `${host}/api/orders`;

export const updateOrderApi = (id) => `${host}/api/orders/${id}`;
export const getpastOrderApi = `${host}/api/orders/past`;
export const getCurrentOrderApi = `${host}/api/orders/current`;
