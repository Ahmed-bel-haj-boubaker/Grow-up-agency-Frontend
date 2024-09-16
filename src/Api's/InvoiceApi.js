export const host = "http://localhost:8000";
export const generateInvoiceApi = (id) => `${host}/api/invoice/${id}/generate`;
export const getInvoiceAcceptedApi = `${host}/api/invoice/accepted`;
export const getInvoiceNotAcceptedApi = `${host}/api/invoice/pending`;
export const downloadInvoiceApi = (id) => `${host}/api/invoice/download/${id}`;
export const updateInvoiceApi = (id) =>
  `${host}/api/invoice/updateInvoince/${id}`;
