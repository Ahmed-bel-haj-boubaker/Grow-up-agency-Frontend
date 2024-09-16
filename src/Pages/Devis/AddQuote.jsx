import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaMinus, FaPlus, FaSearch } from "react-icons/fa";
import axios from "axios";
import { addQuoteApi } from "../../Api's/QuoteApi";
import { addDevisRedux } from "../../Redux/slice/DevisSlice";

const AddQuote = () => {
  const [open, setOpen] = useState(false);
  const [product_id, setProduct] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [status, setStatus] = useState("");
  const [price, setPrice] = useState(0);
  const [additionalProducts, setAdditionalProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [show, setShow] = useState(false);
  const allProducts = useSelector((state) => state.products.listofAllProducts);

  const dispatch = useDispatch();

  useEffect(() => {
    if (product_id && quantity) {
      const selectedProduct = allProducts.find(
        (prod) => prod._id === product_id
      );
      if (selectedProduct) {
        setPrice(quantity * selectedProduct.price);
      }
    }
  }, [product_id, quantity, allProducts]);

  const handleOpen = () => setOpen(!open);

  const addAdditionalProduct = () => {
    setAdditionalProducts([
      ...additionalProducts,
      { product_id: "", quantity: 0, searchQuery: "", show: false },
    ]);
  };

  const handleAdditionalProductChange = (index, field, value) => {
    const updatedProducts = [...additionalProducts];
    updatedProducts[index][field] = value;
    setAdditionalProducts(updatedProducts);
  };

  const addQuoteHandler = async (e) => {
    e.preventDefault();

    const quoteItems = [
      { product_id, quantity, price },
      ...additionalProducts.map((prod) => ({
        product_id: prod.product_id,
        quantity: prod.quantity,
        price:
          prod.quantity *
          (allProducts.find((p) => p._id === prod.product_id)?.price || 0),
      })),
    ];

    const data = {
      status,
      quoteItems,
    };

    try {
      const response = await axios.post(addQuoteApi, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      setOpen(false);
      window.location.reload();
      dispatch(addDevisRedux(data));
      console.log(response);
    } catch (error) {
      console.error("Error adding quote:", error);
    }
  };

  useEffect(() => {
    const filtered = allProducts.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, allProducts]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setShow(true);
  };

  const handleProductSelect = (product) => {
    setProduct(product._id);
    setSearchQuery(product.title);
    setShow(false);
  };

  const handleAdditionalSearch = (index, query) => {
    const updatedProducts = [...additionalProducts];
    updatedProducts[index].searchQuery = query;
    updatedProducts[index].show = true;
    setAdditionalProducts(updatedProducts);
  };

  const handleAdditionalProductSelect = (index, product) => {
    const updatedProducts = [...additionalProducts];
    updatedProducts[index].product_id = product._id;
    updatedProducts[index].searchQuery = product.title;
    updatedProducts[index].show = false;
    setAdditionalProducts(updatedProducts);
  };

  return (
    <>
      <Button
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
        onClick={handleOpen}
      >
        Ajouter un Devis
      </Button>
      <Dialog
        open={open}
        size="xs"
        handler={handleOpen}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-lg shadow-lg w-[50%]">
          <div className="items-center justify-between">
            <DialogHeader>
              <Typography className="text-2xl font-bold text-blue-700">
                Ajouter un Devis
              </Typography>
            </DialogHeader>
            <Button
              variant="text"
              className="ml-[90vh] relative bottom-10"
              onClick={handleOpen}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6 text-gray-700"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </div>
          <form onSubmit={addQuoteHandler}>
            <DialogBody>
              <div className="space-y-6">
                <div className="relative mt-2 sm:mt-0">
                  <Typography className="mb-1 text-black font-semibold">
                    Produit
                  </Typography>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="border border-gray-300 py-2 px-4 pl-12 w-full sm:w-80 lg:w-96 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <FaSearch className="absolute top-12 left-4 transform -translate-y-1/2 text-gray-500 text-lg" />
                  {show && filteredProducts.length > 0 && (
                    <ul className="absolute z-10 mt-2 w-full sm:w-80 lg:w-96 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                      {filteredProducts.map((p) => (
                        <li
                          key={p._id}
                          className="cursor-pointer hover:bg-gray-100 px-4 py-2 flex items-center"
                          onClick={() => handleProductSelect(p)}
                        >
                          <img
                            src={p.image}
                            alt={p.title}
                            className="h-8 w-8 mr-3 rounded-full object-cover"
                          />
                          <span className="text-gray-700">{p.title}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div>
                  <Typography className="mb-1 text-black font-semibold">
                    Quantité
                  </Typography>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-full"
                  />
                </div>

                <div>
                  <Typography className="mb-1 text-black font-semibold">
                    Status
                  </Typography>
                  <Select
                    label="Select status"
                    value={status}
                    onChange={(value) => setStatus(value)}
                    className="flex items-center justify-center"
                  >
                    {["Pending", "Accepted", "Rejected"].map((statusOption) => (
                      <Option key={statusOption} value={statusOption}>
                        {statusOption}
                      </Option>
                    ))}
                  </Select>
                </div>

                <div className="space-y-4">
                  <Typography className="mb-1 text-black font-semibold">
                    Produits additionnels
                  </Typography>
                  {additionalProducts.map((additionalProduct, index) => (
                    <div key={index} className="relative">
                      <Input
                        type="text"
                        placeholder="Search additional product..."
                        value={additionalProduct.searchQuery}
                        onChange={(e) =>
                          handleAdditionalSearch(index, e.target.value)
                        }
                        className="border border-gray-300 py-2 px-4 pl-12 w-full sm:w-80 lg:w-96 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <FaSearch className="absolute top-5 left-4 transform -translate-y-1/2 text-gray-500 text-lg" />
                      {additionalProduct.show && (
                        <ul className="absolute z-10 mt-2 w-full sm:w-80 lg:w-96 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                          {allProducts
                            .filter((product) =>
                              product.title
                                .toLowerCase()
                                .includes(
                                  additionalProduct.searchQuery.toLowerCase()
                                )
                            )
                            .map((product) => (
                              <li
                                key={product._id}
                                className="cursor-pointer hover:bg-gray-100 px-4 py-2 flex items-center"
                                onClick={() =>
                                  handleAdditionalProductSelect(index, product)
                                }
                              >
                                <img
                                  src={product.image}
                                  alt={product.title}
                                  className="h-8 w-8 mr-3 rounded-full object-cover"
                                />
                                <span className="text-gray-700">
                                  {product.title}
                                </span>
                              </li>
                            ))}
                        </ul>
                      )}
                      <Input
                        type="number"
                        placeholder="Quantité"
                        value={additionalProduct.quantity}
                        onChange={(e) =>
                          handleAdditionalProductChange(
                            index,
                            "quantity",
                            e.target.value
                          )
                        }
                        className="mt-2"
                      />
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={addAdditionalProduct}
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow-md"
                  >
                    <FaPlus className="inline-block mr-2" />
                    Ajouter un produit additionnel
                  </Button>
                </div>
              </div>
            </DialogBody>
            <DialogFooter>
              <Button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow-md"
              >
                Ajouter un Devis
              </Button>
              <Button
                variant="text"
                className="ml-2 text-gray-500 font-semibold"
                onClick={handleOpen}
              >
                Annuler
              </Button>
            </DialogFooter>
          </form>
        </div>
      </Dialog>
    </>
  );
};

export default AddQuote;
