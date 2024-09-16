import { FaSearch, FaSort } from "react-icons/fa";
import Pagination from "../../Components/Shared/Pagination";
import ListCategoriesHook from "../../Hooks/Category/ListCategoriesHook";
import { AddCategorie } from "./AddCategorie";
import axios from "axios";
import { deleteCategories, searchCategories } from "../../Api's/CategoriesApi";
import { useDispatch } from "react-redux";
import {
  deleteCategoriesRedux,
  searchCategoryRedux,
} from "../../Redux/slice/categoriesSlice";
import { UpdateCategories } from "./UpdateCategories";
import { useEffect, useState } from "react";

const ListCategories = () => {
  const [search, setSearch] = useState([]);
  const [activeSearch, setActiveSearch] = useState(false);

  const {
    res,
    numberOfPages,
    currentPage,
    limit,

    handlePageChange,
  } = ListCategoriesHook();

  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    await axios.delete(deleteCategories(id), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    });

    dispatch(deleteCategoriesRedux({ _id: id }));
  };

  const handleSearch = async (searchedCategory) => {
    if (searchedCategory) {
      const response = await axios.get(searchCategories(searchedCategory));

      dispatch(searchCategoryRedux({ category: searchedCategory }));
      setActiveSearch(true);
      setSearch(response.data.data);
    } else {
      setActiveSearch(false);
      setSearch([]);
    }
  };
  useEffect(() => {
    handleSearch();
  }, []);
  return (
    <div>
      <AddCategorie />

      <div className="container mx-auto px-4 py-6 bg-white mt-5 rounded-xl shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">List of Categories</h1>
          <div className="relative mt-2 sm:mt-0">
            <input
              type="text"
              placeholder="Search..."
              onChange={(e) => handleSearch(e.target.value)}
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
                  Titre <FaSort className="inline ml-1" />
                </th>
                <th className="py-3 px-4 border-b font-semibold">Image</th>
                <th className="py-3 px-4 border-b font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {(activeSearch ? search : res).map((row, index) => (
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
                  <td className="py-3 px-4 border-b flex justify-center ">
                    <img
                      src={row.image}
                      alt="Category"
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>

                  <td className="py-3 px-4 border-b  space-x-2">
                    <button
                      onClick={() => handleDelete(row._id)}
                      className=" bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                    >
                      SUPPRIMER
                    </button>

                    <UpdateCategories
                      initialImage={row.image}
                      categoryId={row._id}
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

export default ListCategories;
