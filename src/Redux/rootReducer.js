import { combineReducers } from "redux";
import { productsSlice } from "./slice/productsSlice";
import { categoriesSlice } from "./slice/categoriesSlice";
import { transactionTypeInSlice } from "./slice/transactionTypeInSlice";
import { transactionTypeOutSlice } from "./slice/transactionTypeOutSlice";
import { RESET_STORE } from "./action";
import { salesSlice } from "./slice/salesSlice";
import { supplierSlice } from "./slice/supplierSlice";
import { orderSlice } from "./slice/OrderSlice";
import { DevisSlice } from "./slice/DevisSlice";

const appReducer = combineReducers({
  products: productsSlice.reducer,
  categories: categoriesSlice.reducer,
  sales: salesSlice.reducer,
  transactionTypeIn: transactionTypeInSlice.reducer,
  transactionTypeOut: transactionTypeOutSlice.reducer,
  supplier: supplierSlice.reducer,
  order: orderSlice.reducer,
  devis: DevisSlice.reducer,
});
const rootReducer = (state, action) => {
  if (action.type === RESET_STORE) {
    state = undefined;
  }
  return appReducer(state, action);
};
export { rootReducer };
