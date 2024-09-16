export const host = "http://localhost:8000";
export const addPurchaseOrderApi = `${host}/api/purchaseOrder`;

export const getPurchaseOrdersApi = `${host}/api/purchaseOrder`;
export const updatePurchaseOrdersApi = (id) =>
  `${host}/api/purchaseOrder/${id}`;
export const deletePurchaseOrdersApi = (id) =>
  `${host}/api/purchaseOrder/${id}`;
