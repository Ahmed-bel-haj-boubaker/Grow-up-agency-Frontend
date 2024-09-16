import { useState } from "react";
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
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addPurchaseOrderApi } from "../../Api's/PurchaseOrderApi";
//import { addPurchaseOrderRedux } from "../../Redux/slice/purchaseOrderSlice";

function AddPurchseOrder() {
  const [open, setOpen] = useState(false);
  const [supplierId, setSupplierId] = useState("");
  const [product, setProductId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const suppliers = useSelector((state) => state.supplier.listAllSupplier);
  console.log(suppliers);
  const allProd = useSelector((state) => state.products.listofAllProducts);

  console.log(suppliers);
  const handleOpen = () => setOpen(!open);

  const dispatch = useDispatch();

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
        Ajouter une bons commande
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
                Ajouter une bons commande
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
                  <Select
                    className="flex items-center justify-center"
                    label="Select a supplier"
                    value={supplierId}
                    onChange={(e) => setSupplierId(e)}
                  >
                    {suppliers?.map((supplier) => (
                      <Option key={supplier._id} value={supplier._id}>
                        {supplier.name}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div>
                  <Typography className="mb-1 text-black font-semibold">
                    Produit
                  </Typography>
                  <Select
                    className="flex items-center justify-center"
                    label="Select a supplier"
                    value={product}
                    onChange={(e) => setProductId(e)}
                  >
                    {allProd?.map((p) => (
                      <Option key={p._id} value={p._id}>
                        <div className="flex items-center">
                          <img src={p.image} alt="" className="h-6 w-6 mr-2" />
                          {p.title}
                        </div>
                      </Option>
                    ))}
                  </Select>
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
                Cancel
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
