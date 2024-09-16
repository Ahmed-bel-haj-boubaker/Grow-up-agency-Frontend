import { useState } from "react";
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
import { useSelector } from "react-redux";
import AsyncSelect from "react-select/async";
import { addPurchaseOrderApi } from "../../Api's/PurchaseOrderApi";

function AddPurchseOrder() {
  const [open, setOpen] = useState(false);
  const [supplierId, setSupplierId] = useState("");
  const [product, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const suppliers = useSelector((state) => state.supplier.listAllSupplier);
  const allProd = useSelector((state) => state.products.listofAllProducts);

  const handleOpen = () => setOpen(!open);

  const filterSuppliers = (inputValue) => {
    return suppliers
      .filter((supplier) =>
        supplier.name.toLowerCase().includes(inputValue.toLowerCase())
      )
      .map((supplier) => ({
        value: supplier._id,
        label: supplier.name,
      }));
  };

  const loadSupplierOptions = (inputValue, callback) => {
    const filteredSuppliers = filterSuppliers(inputValue);
    callback(filteredSuppliers);
  };

  const filterProducts = (inputValue) => {
    return allProd
      .filter((product) =>
        product.title.toLowerCase().includes(inputValue.toLowerCase())
      )
      .map((product) => ({
        value: product._id,
        label: (
          <div className="flex items-center">
            <img src={product.image} alt="" className="h-6 w-6 mr-2" />
            {product.title}
          </div>
        ),
      }));
  };

  const loadProductOptions = (inputValue, callback) => {
    const filteredProducts = filterProducts(inputValue);
    callback(filteredProducts);
  };

  const handleSupplierChange = (selectedOption) => {
    setSupplierId(selectedOption ? selectedOption.value : "");
  };

  const handleProductChange = (selectedOption) => {
    setProductId(selectedOption ? selectedOption.value : "");
  };

  const addPurchaseOrderHandler = async (e) => {
    e.preventDefault();

    const data = {
      supplierId,
      orderItems: [
        {
          product_id: product,
          quantity,
        },
      ],
    };

    try {
      const response = await axios.post(addPurchaseOrderApi, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      setOpen(!open);
      window.location.reload();
    } catch (error) {
      console.error("Error adding purchase order:", error);
    }
  };

  return (
    <>
      <Button
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
        onClick={handleOpen}
      >
        Ajouter une bon de commande
      </Button>
      <Dialog
        open={open}
        size="xs"
        handler={handleOpen}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-md">
          <div className="flex items-center justify-between mb-4">
            <DialogHeader className="flex flex-col items-start">
              <Typography className="mb-1 text-2xl font-bold text-blue-700">
                Ajouter une bon de commande
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
          <form onSubmit={addPurchaseOrderHandler}>
            <DialogBody>
              <div className="grid gap-6">
                <div>
                  <Typography className="mb-1 text-black font-semibold">
                    Fournisseur
                  </Typography>
                  <AsyncSelect
                    cacheOptions
                    loadOptions={loadSupplierOptions}
                    defaultOptions
                    value={
                      suppliers.find((sup) => sup._id === supplierId)
                        ? {
                            value: supplierId,
                            label: suppliers.find(
                              (sup) => sup._id === supplierId
                            ).name,
                          }
                        : null
                    }
                    onChange={handleSupplierChange}
                    placeholder="Select a supplier"
                    className="basic-single"
                    classNamePrefix="select"
                  />
                </div>
                <div>
                  <Typography className="mb-1 text-black font-semibold">
                    Produit
                  </Typography>
                  <AsyncSelect
                    cacheOptions
                    loadOptions={loadProductOptions}
                    defaultOptions
                    value={
                      allProd.find((prod) => prod._id === product)
                        ? {
                            value: product,
                            label: (
                              <div className="flex items-center">
                                <img
                                  src={
                                    allProd.find((prod) => prod._id === product)
                                      .image
                                  }
                                  alt=""
                                  className="h-6 w-6 mr-2"
                                />
                                {
                                  allProd.find((prod) => prod._id === product)
                                    .title
                                }
                              </div>
                            ),
                          }
                        : null
                    }
                    onChange={handleProductChange}
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
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  />
                </div>
              </div>
            </DialogBody>
            <DialogFooter className="space-x-2 mt-4">
              <Button
                variant="text"
                color="gray"
                className="hover:bg-gray-100 transition duration-300"
                onClick={handleOpen}
              >
                Annuler
              </Button>
              <Button
                variant="gradient"
                color="blue"
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white transition duration-300 transform hover:scale-105"
                type="submit"
              >
                Ajouter
              </Button>
            </DialogFooter>
          </form>
        </div>
      </Dialog>
    </>
  );
}

export default AddPurchseOrder;
