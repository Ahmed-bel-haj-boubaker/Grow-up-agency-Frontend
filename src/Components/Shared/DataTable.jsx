/* eslint-disable react/prop-types */

import { FaSearch } from "react-icons/fa";

const DataTable = ({
  data,
  searchTerm,
  handleSearch,
  numberOfPages,
  results,
}) => {
  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col sm:flex-row justify-between items-center my-4">
        <h1 className="text-xl sm:text-2xl font-bold">List of Categories</h1>
        <div className="relative mt-2 sm:mt-0">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="border border-gray-300 rounded py-2 px-4 pl-10 w-full sm:w-64"
          />
          <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full max-w-screen-lg mx-auto bg-white border border-gray-200 text-sm">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Image</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b font-bold truncate">
                  {row._id}
                </td>
                <td className="py-2 px-4 border-b truncate">{row.name}</td>
                <td className="py-2 px-4 border-b">
                  <img
                    src={row.image}
                    alt="Image"
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="py-2 px-4 border-b">
                  <button className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition duration-300 text-xs">
                    DELETE
                  </button>
                  <button className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 transition duration-300 ml-2 text-xs">
                    UPDATE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
