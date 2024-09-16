import { FaSearch, FaSort } from "react-icons/fa";
import Pagination from "../../Components/Shared/Pagination";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ListProductsHook from "../../Hooks/Product/ListProductsHook";
import { deleteProducts } from "../../Api's/ProductApi";
import { deleteProductsRedux } from "../../Redux/slice/productsSlice";
import { AddProduct } from "./AddProduct";
import { UpdateProducts } from "./UpdateProducts";
import soldOut from "../../../public/images/soldOut.png";
import ReportButton from "../Dashboard/ReportButton";

const ListProducts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const { res, numberOfPages, currentPage, limit, handlePageChange } =
    ListProductsHook();
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.listProducts);
  const categories = useSelector((state) => state.categories.listCategories);
  const suppliers = useSelector((state) => state.supplier.listAllSupplier);

  useEffect(() => {
    const filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        getCategoryNameById(product.category)
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        getSupplierNameById(product.supplier)
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDelete = async (id) => {
    await axios.delete(deleteProducts(id), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    });

    dispatch(deleteProductsRedux({ _id: id }));
  };

  const getCategoryNameById = (id) => {
    const category = categories.find((cat) => cat._id === id);
    return category ? category.name : "Unknown";
  };
  const getSupplierNameById = (id) => {
    const supp = suppliers.find((cat) => cat._id === id);
    return supp ? supp.name : "Unknown";
  };
  return (
    <div>
      <AddProduct />

      <div className="container mx-auto px-4 py-6 bg-white mt-5 rounded-xl shadow-xl">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Listes des produits: </h1>
          <div className="relative mt-2 sm:mt-0">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
              className="border border-gray-300 rounded py-2 px-4 pl-10 w-full sm:w-80 lg:w-96"
            />
            <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div className="p-2">
          <ReportButton
            format="csv"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          />
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
                <th className="py-3 px-4 border-b font-semibold cursor-pointer">
                  Categorie <FaSort className="inline ml-1" />
                </th>{" "}
                <th className="py-3 px-4 border-b font-semibold cursor-pointer">
                  Fournisseur <FaSort className="inline ml-1" />
                </th>
                <th className="py-3 px-4 border-b font-semibold cursor-pointer">
                  Description <FaSort className="inline ml-1" />
                </th>
                <th className="py-3 px-4 border-b font-semibold cursor-pointer">
                  Prix <FaSort className="inline ml-1" />
                </th>
                <th className="py-3 px-4 border-b font-semibold cursor-pointer">
                  Quantité <FaSort className="inline ml-1" />
                </th>
                <th className="py-3 px-4 border-b font-semibold cursor-pointer">
                  Prix total <FaSort className="inline ml-1" />
                </th>
                <th className="py-3 px-4 border-b font-semibold">Image</th>
                <th className="py-3 px-4 border-b font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((row, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition duration-150 text-center"
                >
                  <td className="py-3 px-4 border-b font-medium truncate">
                    {row._id}
                  </td>
                  <td className="py-3 px-4 border-b truncate">{row.title}</td>
                  <td className="py-3 px-4 border-b truncate">
                    {getCategoryNameById(row.category)}
                  </td>{" "}
                  <td className="py-3 px-4 border-b truncate">
                    {getSupplierNameById(row.supplier)}
                  </td>
                  <td className="py-3 px-4 border-b truncate max-w-80">
                    {row.description}
                  </td>
                  <td className="py-3 px-4 border-b truncate">
                    {row.price} DT
                  </td>
                  <td className="py-3 px-4 border-b truncate">
                    {row.stockQuantity}
                  </td>
                  <td className="py-3 px-4 border-b truncate font-bold">
                    {row.stockQuantity * row.price}{" "}
                    <span className="font-bold text-green-700">DT</span>
                  </td>
                  <td className="py-3 px-4 border-b size-20">
                    {row.stockQuantity === 0 ? (
                      <img
                        src={soldOut}
                        alt="Product"
                        className="size-16 object-cover rounded"
                      />
                    ) : (
                      <img
                        src={row.image}
                        alt="Product"
                        className="size-20 object-cover rounded"
                      />
                    )}
                  </td>
                  <td className="py-10 -px-56 border-b flex space-x-2 pl-7">
                    <button
                      onClick={() => handleDelete(row._id)}
                      className=" bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                    >
                      SUPPRIMER
                    </button>

                    <UpdateProducts
                      productId={row._id}
                      initialImage={row.image}
                      categoryId={row.category}
                      initialTitle={row.title}
                      initialDescription={row.description}
                      initialPrice={row.price}
                      initialQuantity={row.stockQuantity}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

export default ListProducts;
