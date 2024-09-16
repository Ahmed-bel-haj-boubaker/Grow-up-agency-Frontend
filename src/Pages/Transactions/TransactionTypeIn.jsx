import { useState } from "react";
import axios from "axios";
import { addTransactionTypeIn } from "../../Api's/TransactionApi";
import { useDispatch, useSelector } from "react-redux";
import { addTransactionTypeInRedux } from "../../Redux/slice/transactionTypeInSlice";
import Select from "react-select";

const TransactionTypeIn = () => {
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [type, setType] = useState("in");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const dispatch = useDispatch();
  // const productList = useSelector((state) => state.products.listProducts);
  const products = useSelector((state) => state.products.listofAllProducts);

  const getImage = (id) => {
    const product = products.find((e) => e._id === id);
    return product ? product.image : undefined;
  };

  const imageProd = getImage(productId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(
        addTransactionTypeIn,
        {
          idProduct: productId,
          quantity: quantity,
          type: type,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(
        addTransactionTypeInRedux({
          transaction: response.data.transaction,
          image: imageProd,
        })
      );
      setSuccess(response.data.msg);
      setProductId("");
      setQuantity("");
    } catch (error) {
      setError("An error occurred while adding the transaction.");
    }
  };

  const customStyles = {
    option: (provided) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
    }),
    singleValue: (provided) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
    }),
  };

  const formatOptionLabel = ({ title, _id, image }) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img
        src={image}
        alt={title}
        style={{ width: 30, height: 30, marginRight: 10 }}
      />
      <span>
        {title} (ID: {_id})
      </span>
    </div>
  );

  const options = products.map((product) => ({
    value: product._id,
    label: product.title,
    title: product.title,
    _id: product._id,
    image: product.image,
  }));

  const handleChange = (selectedOption) => {
    setProductId(selectedOption ? selectedOption.value : "");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Add Stock to Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="productId"
          >
            Product
          </label>
          <Select
            id="productId"
            value={options.find((option) => option.value === productId)}
            onChange={handleChange}
            options={options}
            styles={customStyles}
            formatOptionLabel={formatOptionLabel}
            isClearable
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="quantity"
          >
            Quantity
          </label>
          <input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) =>
              setQuantity(e.target.value >= 0 ? e.target.value : 0)
            }
            min={0}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 border border-red-300 rounded">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-100 text-green-700 border border-green-300 rounded">
            {success}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default TransactionTypeIn;
