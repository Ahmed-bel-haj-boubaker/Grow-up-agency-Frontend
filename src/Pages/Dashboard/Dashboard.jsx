import { useEffect, useState } from "react";

import BarChart from "./BarChart";
import Chart from "./Chart";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../Api's/ProductApi";
import axios from "axios";
import { getListOfAllProduct } from "../../Redux/slice/productsSlice";

import userIcon from "../../../public/images/user.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faDollar,
  faShoppingCart,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { getAllCustomers } from "../../Api's/CustomersApi";
import { getsalesCount } from "../../Api's/SalesApi";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [customersArray, setCustomers] = useState([]);
  const [allProduct, setallProduct] = useState([]);

  useEffect(() => {
    const fetchAllProduct = async () => {
      const res = await axios.get(getAllProducts, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setallProduct(res.data.data.products);
      dispatch(getListOfAllProduct(res.data.data.products));
    };

    const fetchAllCustomers = async () => {
      const res = await axios.get(getAllCustomers, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setCustomers(res.data.data);
    };
    const fetchSalesCount = async () => {
      const res = await axios.get(getsalesCount, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
    };

    fetchSalesCount();
    fetchAllProduct();
    fetchAllCustomers();
  }, [getAllProducts, getAllCustomers, getsalesCount, dispatch]);
  const suppliers = useSelector((state) => state.supplier.listAllSupplier);

  const sales = useSelector((state) => state.sales.listOfSales);
  console.log(sales);

  const totalAmmount = sales.reduce((a, c) => {
    return a + c.total_amount;
  }, 0);
  console.log(totalAmmount);
  const stats = [
    { label: "Clients", count: customersArray.length, icon: faUser },
    { label: "Fournisseurs", count: suppliers.length, icon: faUser },
    { label: "Produits", count: allProduct.length, icon: faBox },
    { label: "Ventes", count: sales.length, icon: faShoppingCart },
    { label: "Revenu total", count: totalAmmount, icon: faDollar },
  ];
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="  gap-8 mb-12 w-full flex justify-evenly  ">
        {stats.map((stat, index) => (
          <StatsBox
            key={index}
            icon={stat.icon}
            label={stat.label}
            count={stat.count}
          />
        ))}
      </div>
      <div className="flex space-x-2 mb-8">
        <div className="bg-white shadow-lg rounded-lg p-6 w-1/2 h-[500px]">
          <Chart products={allProduct} />
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 w-1/2 h-[500px]">
          <BarChart />
        </div>
      </div>
      <hr className="my-6 border-t border-gray-300" />

      <div className="flex justify-between">
        <div className="flex flex-row space-x-2">
          <div className=" ">
            <CustomerTable customers={customersArray} />
          </div>
        </div>
        <div className=" ">
          <div className=" ">
            <SupplierTable suppliers={suppliers} />
          </div>
        </div>
      </div>
    </div>
  );
};
const SupplierTable = ({ suppliers }) => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [suppliersPerPage] = useState(5);

  // Calculate the current suppliers to display
  const indexOfLastSupplier = currentPage * suppliersPerPage;
  const indexOfFirstSupplier = indexOfLastSupplier - suppliersPerPage;
  const currentSuppliers = suppliers.slice(
    indexOfFirstSupplier,
    indexOfLastSupplier
  );

  // Calculate the total number of pages
  const totalPages = Math.ceil(suppliers.length / suppliersPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="w-full ">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 ">Liste des Fournisseurs</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">
                Nom
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">
                Téléphone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Adresse
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 ">
            {currentSuppliers.map((supplier, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center gap-4 ">
                  <img
                    src={userIcon}
                    className="w-10 h-10 rounded-full"
                    alt="User Icon"
                  />{" "}
                  {supplier.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {supplier.contact_info?.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {supplier.contact_info?.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {supplier.contact_info?.address}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <div className="inline-flex -space-x-px">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-l-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-100 ${
                currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              Précédent
            </button>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-r-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-100 ${
                currentPage === totalPages
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
            >
              Suivant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CustomerTable = ({ customers }) => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [customersPerPage] = useState(5);

  // Calculate the current customers to display
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = customers.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );

  // Calculate the total number of pages
  const totalPages = Math.ceil(customers.length / customersPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="w-full ">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 ">Liste des Clients</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">
                Nom Complet
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>{" "}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ">
                Téléphone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Adresse
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 ">
            {currentCustomers.map((customer, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex  items-center gap-4 ">
                  <img
                    src={userIcon}
                    className="w-10 h-10 rounded-full"
                    alt="User Icon"
                  />{" "}
                  {customer.fullName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap  text-sm text-gray-500">
                  {customer.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap  text-sm text-gray-500">
                  {customer.phoneNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap  text-sm text-gray-500">
                  {customer.adresse}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <div className="inline-flex -space-x-px">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-l-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-100 ${
                currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              Précédent
            </button>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-r-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-100 ${
                currentPage === totalPages
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
            >
              Suivant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatsBox = ({ icon, label, count }) => {
  return (
    <div className="bg-gradient-to-r from-blue-400 to-blue-600 shadow-lg rounded-lg p-6 flex items-center space-x-4 text-white transform transition duration-500 hover:scale-105">
      <div className="bg-white bg-opacity-20 p-4 rounded-full">
        <FontAwesomeIcon icon={icon} className="text-3xl" />
      </div>
      <div>
        <p className="text-3xl font-bold">{count}</p>
        <p className="text-lg">{label}</p>
      </div>
    </div>
  );
};
export default Dashboard;
