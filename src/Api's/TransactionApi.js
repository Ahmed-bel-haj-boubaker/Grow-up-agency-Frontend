export const host = "http://localhost:8000";
export const addTransactionTypeIn = `${host}/api/transactions/transaction-type-in`;
export const addTransactionTypeOut = `${host}/api/transactions/transaction-type-out`;
export const getAllTransactionTypeIn = `${host}/api/transactions/transaction-type-in`;
export const getAllTransactionTypeOut = `${host}/api/transactions/transaction-type-out`;
export const deleteTransaction = (id) =>`${host}/api/transactions/${id}`;
