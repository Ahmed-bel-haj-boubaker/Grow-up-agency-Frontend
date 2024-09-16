import { useState, useEffect } from "react";
import {
  FiMenu,
  FiChevronLeft,
  FiHome,
  FiPackage,
  FiList,
  FiFileText,
  FiCreditCard,
  FiArrowUpRight, // Icon for Transaction IN
  FiArrowDownLeft,
  FiShoppingCart,
  FiPlusCircle,
  FiUsers,
  FiBox,
  FiLogOut, // Icon for Transaction OUT
} from "react-icons/fi";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import ReportButton from "../../Pages/Dashboard/ReportButton";

const Sidebar = ({ childrenC }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isTransactionsOpen, setIsTransactionsOpen] = useState(false);
  const [isSalesOpen, setIsSalesOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleTransactions = () => {
    setIsTransactionsOpen(!isTransactionsOpen);
  };
  const toggleSales = () => {
    setIsSalesOpen(!isSalesOpen);
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };
  return (
    <div className="flex h-screen overflow-hidden bg-gray-900">
      <div
        className={`bg-gray-800 text-white h-full flex flex-col transition-all duration-300 ${
          isOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="py-4 px-6 flex items-center justify-between">
          <h1
            className={`text-3xl font-extrabold tracking-wider ${
              isOpen ? "" : "hidden"
            }`}
          >
            GROW UP
          </h1>
          <button
            onClick={toggleSidebar}
            className="text-3xl focus:outline-none transition-colors duration-300 ease-in-out transform hover:text-gray-400 hover:scale-110"
          >
            {isOpen ? <FiChevronLeft /> : <FiMenu />}
          </button>
        </div>
        <div className="flex-grow">
          <div className="flex flex-col mt-6 px-4">
            <SidebarItem
              icon={<FiHome />}
              label="Dashboard"
              isOpen={isOpen}
              to="/dashboard"
            />
            <SidebarItem
              icon={<FiPackage />}
              label="Produits"
              isOpen={isOpen}
              to="/products"
            />
            <SidebarItem
              icon={<FiList />}
              label="Categories"
              isOpen={isOpen}
              to="/categories"
            />{" "}
            <SidebarItem
              icon={<FiUsers />} // Use the new icon here
              label="Fournisseurs"
              isOpen={isOpen}
              to="/suppliers"
            />
            <div>
              <SidebarItem
                icon={<FiShoppingCart />}
                label="Commandes"
                isOpen={isOpen}
                onClick={toggleSales}
              />
              {isSalesOpen && (
                <div className={`mt-2 ${isOpen ? "block" : "hidden"}`}>
                  <SidebarSubItem
                    icon={<FiList />}
                    label="Liste des Commandes en cours"
                    to="/ListCurrentOrders"
                  />
                  <SidebarSubItem
                    icon={<FiList />}
                    label="Liste Commandes passé"
                    to="/ListOfPastOrders"
                  />
                  <SidebarSubItem
                    icon={<FiPlusCircle />}
                    label="Devis"
                    to="/devis"
                  />
                  <SidebarSubItem
                    icon={<FiFileText />}
                    label="Facture"
                    to="/facture"
                  />
                </div>
              )}
              <SidebarItem
                icon={<FiPackage />}
                label="Bons Commandes"
                isOpen={isOpen}
                to="/bonCommande"
              />
              <SidebarItem
                icon={<FiBox />}
                label="Bons Livraison"
                isOpen={isOpen}
                to="/list-delivery"
              />
            </div>
            {/* <div>
              <SidebarItem
                icon={<FiCreditCard />} // Updated icon for Transactions
                label="Transactions"
                isOpen={isOpen}
                onClick={toggleTransactions}
              />
              {isTransactionsOpen && (
                <div className={`pl-8 mt-2 ${isOpen ? "block" : "hidden"}`}>
                  <SidebarSubItem
                    icon={<FiArrowUpRight />} // Icon for Transaction IN
                    label="Transaction IN"
                    to="/transactions-type-in"
                  />
                  <SidebarSubItem
                    icon={<FiArrowDownLeft />} // Icon for Transaction OUT
                    label="Transaction OUT"
                    to="/transactions-type-out"
                  />
                </div>
              )}
            </div> */}
          </div>
        </div>
        <div className="mt-4 flex items-center justify-center">
          <button
            onClick={logout}
            className="flex items-center text-white hover:text-gray-900 font-medium py-2 px-4 rounded "
          >
            <FiLogOut className="mr-2" />
            se deconnecter
          </button>
        </div>

        {/* <ReportButton
          format="csv"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        /> */}
      </div>

      <div className="flex flex-col flex-grow">
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="p-6 flex-grow bg-gray-100 overflow-y-auto">
          {childrenC}
        </div>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, isOpen, to, onClick }) => {
  return (
    <Link to={to} onClick={onClick}>
      <div className="flex items-center gap-4 py-3 cursor-pointer transition-all duration-300">
        <div
          className={`rounded-full h-12 w-12 flex items-center justify-center ${
            isOpen ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-600"
          } transition-all duration-300`}
        >
          {icon}
        </div>
        <p
          className={`text-lg font-semibold ${
            isOpen ? "" : "hidden"
          } transition-opacity duration-300`}
        >
          {label}
        </p>
      </div>
    </Link>
  );
};

const SidebarSubItem = ({ icon, label, to }) => {
  return (
    <Link to={to}>
      <div className="flex items-center gap-4 py-2 pl-4 cursor-pointer text-gray-400 hover:text-white transition-colors duration-300">
        <div className="rounded-full h-10 w-10 flex items-center justify-center bg-gray-600">
          {icon}
        </div>
        <p className="text-sm font-medium">{label}</p>
      </div>
    </Link>
  );
};

export default Sidebar;
