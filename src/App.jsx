import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./index.css";
import { UserProvider } from "./UserContext";

import Login from "./Components/Auth/Login";
import ForgetPassword from "./Components/Auth/ForgetPassword";
import Register from "./Components/Auth/Register";
import ResetPassword from "./Components/Auth/ResetPassword";
import VerifyResetCode from "./Components/Auth/VerifyResetCode";
import { Layout } from "./Components/Shared/Layout";
import ListCategories from "./Pages/Categories/ListCategories";
import Dashboard from "./Pages/Dashboard/Dashboard";
import ListProducts from "./Pages/Products/ListProducts";
import TransactionTypeIn from "./Pages/Transactions/TransactionTypeIn";
import TransactionTypeOut from "./Pages/Transactions/TransactionTypeOut";
import AddSales from "./Pages/Sales/AddSales";
import SalesList from "./Pages/Sales/SalesList";
import ListSupplier from "./Pages/Suppliers/ListSupplier";
import ListOrders from "./Pages/Order/ListOrders";
import ListQuote from "./Pages/Devis/ListQuote";
import ListOfPastOrders from "./Pages/Order/ListOfPastOrders";
import ListInvoice from "./Pages/Invoice/ListInvoice";
import ListPurchaseOrder from "./Pages/PurchaseOrder/ListPurchaseOrder";
import ListDelivery from "./Pages/deliveryNote/ListDelivery";
import LoadingSpinner from "./Components/Shared/LoadingSpinner";
import UserProfile from "./Components/Auth/UserProfile";

function App() {
  const { pathname } = useLocation();

  const ScrollToTop = () => {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <UserProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={loading ? <LoadingSpinner /> : <Login />} />
          <Route
            path="/register"
            element={loading ? <LoadingSpinner /> : <Register />}
          />
          {/* <Route
            path="/profile"
            element={
              <Layout>{loading ? <LoadingSpinner /> : <UserProfile />}</Layout>
            }
          /> */}
          <Route
            path="/forgetPassword"
            element={loading ? <LoadingSpinner /> : <ForgetPassword />}
          />
          <Route
            path="/verifyResetCode"
            element={loading ? <LoadingSpinner /> : <VerifyResetCode />}
          />
          <Route
            path="/resetPassword"
            element={loading ? <LoadingSpinner /> : <ResetPassword />}
          />
          <Route
            path="/categories"
            element={
              <Layout>
                {loading ? <LoadingSpinner /> : <ListCategories />}
              </Layout>
            }
          />
          <Route
            path="/products"
            element={
              <Layout>{loading ? <LoadingSpinner /> : <ListProducts />}</Layout>
            }
          />
          <Route
            path="/suppliers"
            element={
              <Layout>{loading ? <LoadingSpinner /> : <ListSupplier />}</Layout>
            }
          />
          <Route
            path="/dashboard"
            element={
              <Layout>{loading ? <LoadingSpinner /> : <Dashboard />}</Layout>
            }
          />
          <Route
            path="/sales"
            element={
              <Layout>{loading ? <LoadingSpinner /> : <AddSales />}</Layout>
            }
          />{" "}
          <Route
            path="/salesList"
            element={
              <Layout>{loading ? <LoadingSpinner /> : <SalesList />}</Layout>
            }
          />
          <Route
            path="/transactions-type-in"
            element={
              <Layout>
                {loading ? <LoadingSpinner /> : <TransactionTypeIn />}
              </Layout>
            }
          />
          <Route
            path="/transactions-type-out"
            element={
              <Layout>
                {loading ? <LoadingSpinner /> : <TransactionTypeOut />}
              </Layout>
            }
          />{" "}
          <Route
            path="/ListCurrentOrders"
            element={
              <Layout>{loading ? <LoadingSpinner /> : <ListOrders />}</Layout>
            }
          />{" "}
          <Route
            path="/devis"
            element={
              <Layout>{loading ? <LoadingSpinner /> : <ListQuote />}</Layout>
            }
          />{" "}
          <Route
            path="/ListOfPastOrders"
            element={
              <Layout>
                {loading ? <LoadingSpinner /> : <ListOfPastOrders />}
              </Layout>
            }
          />
          <Route
            path="/facture"
            element={
              <Layout>{loading ? <LoadingSpinner /> : <ListInvoice />}</Layout>
            }
          />
          <Route
            path="/bonCommande"
            element={
              <Layout>
                {loading ? <LoadingSpinner /> : <ListPurchaseOrder />}
              </Layout>
            }
          />{" "}
          <Route
            path="/list-delivery"
            element={
              <Layout>{loading ? <LoadingSpinner /> : <ListDelivery />}</Layout>
            }
          />
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
