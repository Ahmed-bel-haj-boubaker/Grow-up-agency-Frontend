import { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Input,
  Select,
  Option,
  Typography,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { getListOfAllProduct } from "../../Redux/slice/productsSlice";
import { getAllProducts } from "../../Api's/ProductApi";
import { addSales } from "../../Api's/SalesApi";
import {
  addTransactionTypeOutRedux,
  updateTransaction,
} from "../../Redux/slice/transactionTypeOutSlice";
import { addTransactionTypeOut } from "../../Api's/TransactionApi";
import { addSalesRedux } from "../../Redux/slice/salesSlice";

export default function AddSale() {
  const [category, setCategory] = useState("");
  const [product, setProduct] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [quantity, setQuantity] = useState(1);
  let [totalPrice, setTotalPrice] = useState();
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [status, setStatus] = useState("local");
  const [type, setType] = useState("out");

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.listCategories);

  const transactions = useSelector(
    (state) => state.transactionTypeOut.listOfTransactionsTypeOut
  );
  console.log(transactions.map((e) => e));
  const products = useSelector((state) => state.products.listofAllProducts);

  useEffect(() => {
    const fetchAllProduct = async () => {
      try {
        const res = await axios.get(getAllProducts, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        dispatch(getListOfAllProduct(res.data.data.products));
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    };
    fetchAllProduct();
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedProduct = products.find((p) => p._id === product);
    if (!selectedProduct) {
      alert("Product not found");
      return;
    }

    if (quantity > selectedProduct.stockQuantity) {
      alert("Selected quantity exceeds available stock");
      return;
    }
    totalPrice = quantity * selectedProduct.price;
    const saleData = {
      category,
      product,
      customerName,
      customerEmail,
      quantity,
      totalPrice,
      date,
      status,
    };

    console.log(
      transactions.findIndex((e) => e.transaction?.product === product)
    );
    if (
      transactions.findIndex((e) => e.transaction?.product === product) === -1
    ) {
      try {
        const transactionResponse = await axios.post(
          addTransactionTypeOut,
          {
            idProduct: product,
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
          addTransactionTypeOutRedux({
            transaction: transactionResponse.data.transaction,
          })
        );
      } catch (err) {
        console.log(err);
      }
    } else {
      dispatch(
        updateTransaction({
          _id: product,
          quantity: quantity,
          type: type,
          date: Date.now(),
        })
      );
    }
    try {
      const saleResponse = await axios.post(addSales, saleData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      if (saleResponse.status === 201) {
        // Reset form
        setCategory("");
        setProduct("");
        setCustomerName("");
        setCustomerEmail("");
        setQuantity(1);
        setTotalPrice(0);
        setDate(new Date().toISOString().split("T")[0]);
        setStatus("local");
      }
      dispatch(updateTransaction({ _id: product }));
      dispatch(addSalesRedux(saleResponse.data.data));
    } catch (error) {
      console.error("Error adding sale:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <Typography className="text-2xl font-bold mb-4">Add Sale</Typography>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Typography className="mb-1 text-black font-semibold">
            Category
          </Typography>
          <Select value={category} onChange={(e) => setCategory(e)}>
            {categories && categories.length > 0 ? (
              categories.map((category) => (
                <Option key={category._id} value={category._id}>
                  {category.name}
                </Option>
              ))
            ) : (
              <Option value="" disabled>
                No categories available
              </Option>
            )}
          </Select>
        </div>
        <div>
          <Typography className="mb-1 text-black font-semibold">
            Product
          </Typography>
          <Select value={product} onChange={(e) => setProduct(e)}>
            {products && products.length > 0 ? (
              products.map((product) => (
                <Option key={product._id} value={product._id}>
                  {product.title}
                </Option>
              ))
            ) : (
              <Option value="" disabled>
                No products available
              </Option>
            )}
          </Select>
        </div>
        <div>
          <Typography className="mb-1 text-black font-semibold">
            Client
          </Typography>
          <Input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </div>
        <div>
          <Typography className="mb-1 text-black font-semibold">
            Client Email
          </Typography>
          <Input
            type="text"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
          />
        </div>
        <div>
          <Typography className="mb-1 text-black font-semibold">
            Quantity
          </Typography>
          <Input
            type="number"
            value={quantity}
            min={0}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        {/* <div>
          <Typography className="mb-1 text-black font-semibold">
            Total Price
          </Typography>
          <Input
            type="number"
            value={totalPrice}
            onChange={(e) => setTotalPrice(e.target.value)}
          />
        </div> */}
        <div>
          <Typography className="mb-1 text-black font-semibold">
            Date
          </Typography>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <Typography className="mb-1 text-black font-semibold">
            Status
          </Typography>
          <Select value={status} onChange={(e) => setStatus(e)}>
            <Option value="delivery">Delivery</Option>
            <Option value="local">Local</Option>
          </Select>
        </div>
        <Button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
