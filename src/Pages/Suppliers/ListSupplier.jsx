import { FaSearch, FaSort } from "react-icons/fa";
import Pagination from "../../Components/Shared/Pagination";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import AddSuppliers from "./AddSuppliers";
import ListSupplierHook from "../../Hooks/Supplier/ListSupplierHook";
import { deletSupplierApi } from "../../Api's/SupplierApi";
import {
  deleteSupplierRedux,
  searchSupplierRedux,
} from "../../Redux/slice/supplierSlice";
import { UpdateFournisseur } from "./UpdateFournisseur";
import { store } from "../../Redux/store";
import { resetStore } from "../../Redux/action";

const ListSupplier = () => {
  const { numberOfPages, currentPage, limit, handlePageChange } =
    ListSupplierHook();
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  const res = useSelector((state) => state.supplier.listSupplierPaginated);
  const suppliers = useSelector((state) => state.supplier.listAllSupplier);

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id) => {
    try {
      await axios.delete(deletSupplierApi(id), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      dispatch(deleteSupplierRedux({ _id: id }));
    } catch (error) {
      console.error("Error deleting supplier", error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    dispatch(searchSupplierRedux(query));
  };

  const handleReset = () => {
    store.dispatch(resetStore());
  };

  return (
    <div>
      <AddSuppliers />
      <button className="hidden" onClick={handleReset}>
        reset
      </button>
      <div className="container mx-auto px-4 py-6 bg-white mt-5 rounded-xl shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">List of Suppliers</h1>
          <div className="relative mt-2 sm:mt-0">
            <input
              type="text"
              placeholder="Search by name..."
              onChange={(e) => handleSearch(e.target.value)}
              value={searchQuery}
              className="border border-gray-300 rounded py-2 px-4 pl-10 w-full sm:w-80 lg:w-96"
            />
            <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full bg-white border border-gray-200 text-sm">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-4 border-b font-semibold cursor-pointer">
                  ID <FaSort className="inline ml-1" />
                </th>
                <th className="py-3 px-4 border-b font-semibold cursor-pointer">
                  Nom & prénom <FaSort className="inline ml-1" />
                </th>
                <th className="py-3 px-4 border-b font-semibold">email</th>
                <th className="py-3 px-4 border-b font-semibold">télèphone</th>
                <th className="py-3 px-4 border-b font-semibold">adresse</th>
                <th className="py-3 px-4 border-b font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {(searchQuery ? filteredSuppliers : res).map((row, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition duration-150 text-center"
                >
                  <td className="py-3 px-4 border-b font-medium truncate text-center">
                    {row._id}
                  </td>
                  <td className="py-3 px-4 border-b font-medium truncate text-center">
                    {row.name}
                  </td>
                  <td className="py-3 px-4 border-b font-medium truncate text-center">
                    {row.contact_info?.email}
                  </td>
                  <td className="py-3 px-4 border-b font-medium truncate text-center">
                    {row.contact_info?.phone}
                  </td>
                  <td className="py-3 px-4 border-b font-medium truncate text-center">
                    {row.contact_info?.address}
                  </td>
                  <td className="py-3 px-4 border-b  space-x-2">
                    <button
                      onClick={() => handleDelete(row._id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                    >
                      SUPPRIMER
                    </button>
                    <UpdateFournisseur
                      initialEmail={row.contact_info?.email}
                      initialPhone={row.contact_info?.phone}
                      initialAddress={row.contact_info?.address}
                      fournisseurId={row._id}
                      initialName={row.name}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6">
          <Pagination
            limit={limit}
            page={currentPage}
            numberOfPages={numberOfPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ListSupplier;
