import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOrderApi } from "../../Api's/OrderApi";
import { addCurrentOrderRedux } from "../../Redux/slice/OrderSlice";
import { addSalesRedux } from "../../Redux/slice/salesSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AsyncSelect from "react-select/async";

const AddOrders = () => {
  const [open, setOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("");

  const [orderItems, setOrderItems] = useState([
    { product_id: null, quantity: 0, price: 0 },
  ]);

  const allProd = useSelector((state) => state.products.listofAllProducts);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const dispatch = useDispatch();

  const filterProducts = (inputValue) => {
    return allProd.filter((product) =>
      product.title.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const loadOptions = (inputValue, callback) => {
    const filteredProducts = filterProducts(inputValue).map((p) => ({
      value: p._id,
      label: (
        <div className="flex items-center">
          <img src={p.image} alt="" className="h-6 w-6 mr-2" />
          {p.title}
        </div>
      ),
    }));
    callback(filteredProducts);
  };

  const handleProductChange = (index, selectedOption) => {
    const updatedOrderItems = [...orderItems];
    updatedOrderItems[index].product_id = selectedOption
      ? selectedOption.value
      : null;
    setOrderItems(updatedOrderItems);
  };

  const handleQuantityChange = (index, value) => {
    const updatedOrderItems = [...orderItems];
    updatedOrderItems[index].quantity = value;
    setOrderItems(updatedOrderItems);
  };

  const handleAddProduct = () => {
    setOrderItems([...orderItems, { product_id: null, quantity: 0, price: 0 }]);
  };

  const handleRemoveProduct = (index) => {
    const updatedOrderItems = orderItems.filter((_, i) => i !== index);
    setOrderItems(updatedOrderItems);
  };

  const handleOpen = () => setOpen(!open);

  const addOrderHandler = async (e) => {
    e.preventDefault();
    const data = {
      customerEmail,
      customerName,
      address,
      phoneNumber,
      orderItems,
    };
    try {
      const response = await axios.post(addOrderApi, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      setOpen(!open);
      window.location.reload();
      dispatch(addCurrentOrderRedux(response.data));
      if (status === "Completed") {
        dispatch(addSalesRedux(response.data));
      }
    } catch (e) {
      toast.error(e.response.data.message, toastOptions);
    }
  };

  return (
    <>
      <Button
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
        onClick={handleOpen}
      >
        Ajouter une commande
      </Button>
      <Dialog
        open={open}
        size="xs"
        handler={handleOpen}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 "
      >
        <div className="bg-white p-5 rounded-lg shadow-lg max-h-screen overflow-y-auto w-[100vh]">
          <div className="flex items-center justify-between mb-4">
            <DialogHeader className="flex flex-col items-start">
              <Typography className="mb-1 text-2xl font-bold text-blue-700">
                Ajouter une commande
              </Typography>
            </DialogHeader>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6 text-gray-700 cursor-pointer transition duration-300 ease-in-out transform hover:scale-110"
              onClick={handleOpen}
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <form onSubmit={addOrderHandler}>
            <DialogBody className="max-h-[700px] overflow-y-auto">
              <div className="grid gap-6">
                {orderItems.map((item, index) => (
                  <div key={index} className="space-y-4">
                    <div>
                      <Typography className="mb-1 text-black font-semibold">
                        Produit {index + 1}
                      </Typography>
                      <AsyncSelect
                        cacheOptions
                        loadOptions={(inputValue, callback) =>
                          loadOptions(inputValue, callback)
                        }
                        defaultOptions
                        value={allProd.find(
                          (opt) => opt.value === item.product_id
                        )}
                        onChange={(selectedOption) =>
                          handleProductChange(index, selectedOption)
                        }
                        placeholder="Select a product"
                        className="basic-single"
                        classNamePrefix="select"
                      />
                    </div>
                    <div>
                      <Typography className="mb-1 text-black font-semibold">
                        Quantité
                      </Typography>
                      <Input
                        label=""
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(index, e.target.value)
                        }
                      />
                    </div>
                    {index > 0 && (
                      <Button
                        color="red"
                        onClick={() => handleRemoveProduct(index)}
                        className="text-white"
                      >
                        Supprimer
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  color="green"
                  onClick={handleAddProduct}
                  className="text-white"
                >
                  Ajouter un autre produit
                </Button>
                <div>
                  <Typography className="mb-1 text-black font-semibold">
                    le nom du client
                  </Typography>
                  <Input
                    label=""
                    type="text"
                    value={customerName}
                    onChange={(event) => setCustomerName(event.target.value)}
                  />
                </div>
                <div>
                  <Typography className="mb-1 text-black font-semibold">
                    l'email du client
                  </Typography>
                  <Input
                    label=""
                    type="text"
                    value={customerEmail}
                    onChange={(event) => setCustomerEmail(event.target.value)}
                  />
                </div>
                <div>
                  <Typography className="mb-1 text-black font-semibold">
                    Numero télèphone
                  </Typography>
                  <Input
                    label=""
                    type="number"
                    min={0}
                    value={phoneNumber}
                    onChange={(event) => setPhoneNumber(event.target.value)}
                  />
                </div>
                <div>
                  <Typography className="mb-1 text-black font-semibold">
                    l'Addresse du client
                  </Typography>
                  <Input
                    label=""
                    type="text"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                  />
                </div>
              </div>
            </DialogBody>
            <DialogFooter>
              <Button
                variant="text"
                color="red"
                onClick={handleOpen}
                className="mr-1"
              >
                Annuler
              </Button>
              <Button variant="gradient" color="green" type="submit">
                Ajouter
              </Button>
            </DialogFooter>
          </form>
        </div>
      </Dialog>
      <ToastContainer />
    </>
  );
};

export default AddOrders;
