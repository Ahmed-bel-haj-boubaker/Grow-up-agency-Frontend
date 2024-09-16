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
import { useEffect, useState } from "react";

import { addDeliveryNoteApi } from "../../Api's/DeleveryNoteApi";
import GetAllOrders from "../../Hooks/Order/GetAllOrders";

const AddDeliveryNote = () => {
  const [open, setOpen] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");

  const { allOrders } = GetAllOrders();
  console.log(allOrders);
  useEffect(() => {});

  const handleOpen = () => setOpen(!open);

  const addDeliveryNoteHandler = async (e) => {
    e.preventDefault();
    const data = {
      orderId,
      deliveryAddress,
      deliveryDate,
      trackingNumber,
    };

    const response = await axios.post(addDeliveryNoteApi, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    setOpen(!open);
    window.location.reload();
  };

  return (
    <>
      <Button
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
        onClick={handleOpen}
      >
        Ajouter bons livraison
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
                Ajouter bons livraison
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
          <form onSubmit={addDeliveryNoteHandler}>
            <DialogBody>
              <div className="grid gap-6">
                <div>
                  <Typography className="mb-1 text-black font-semibold">
                    Commande
                  </Typography>
                  <Select
                    label="Select an order"
                    value={orderId}
                    onChange={(value) => setOrderId(value)}
                    className="flex items-center justify-center"
                  >
                    {allOrders.map((order) => (
                      <Option key={order._id} value={order._id}>
                        {order.customerName}
                      </Option>
                    ))}
                  </Select>
                </div>
                <div>
                  <Typography className="mb-1 text-black font-semibold">
                    Addresse de livraison
                  </Typography>
                  <Input
                    type="text"
                    value={deliveryAddress}
                    onChange={(event) => setDeliveryAddress(event.target.value)}
                  />
                </div>
                <div>
                  <Typography className="mb-1 text-black font-semibold">
                    Date de livraison
                  </Typography>
                  <Input
                    type="date"
                    value={deliveryDate}
                    onChange={(event) => setDeliveryDate(event.target.value)}
                  />
                </div>
                <div>
                  <Typography className="mb-1 text-black font-semibold">
                    Tracking Number
                  </Typography>
                  <Input
                    type="text"
                    value={trackingNumber}
                    onChange={(event) => setTrackingNumber(event.target.value)}
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
};

export default AddDeliveryNote;
