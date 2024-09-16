export const host = "http://localhost:8000";
export const addQuoteApi = `${host}/api/quote`;
export const getAllQuoteApi = `${host}/api/quote`;

export const updateQuoteApi = (id) => `${host}/api/quote/${id}`;
export const deleteQuoteApi = (id) => `${host}/api/quote/${id}`;
