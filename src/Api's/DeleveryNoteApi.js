export const host = "http://localhost:8000";
export const addDeliveryNoteApi = `${host}/api/deliveryNote`;
export const getDeliveryNoteApi = `${host}/api/deliveryNote`;
export const updateDeliveryNoteApi = (id) => `${host}/api/deliveryNote/${id}`;
export const deleteDeliveryNoteApi = (id) => `${host}/api/deliveryNote/${id}`;
