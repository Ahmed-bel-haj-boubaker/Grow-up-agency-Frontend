import { useState, useEffect } from "react";
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
import { useDispatch } from "react-redux";
import { updateDeliveryNoteApi } from "../../Api's/DeleveryNoteApi";
//import { updateDeliveryNoteRedux } from "../../Redux/slice/DeliveryNoteSlice";

export function UpdateDeliveryNote({
  initialStatus,
  id,
  deliveryAddress,
  deliveryDate,
  trackingNumber,
}) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(initialStatus || "");
  const [address, setAddress] = useState(deliveryAddress || "");
  const [date, setDate] = useState(deliveryDate || "");
  const [trackingNumbers, setTrackingNumber] = useState(trackingNumber || "");

  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    setStatus(initialStatus || "");
    setAddress(deliveryAddress || "");
    setDate(deliveryDate || "");
    setTrackingNumber(trackingNumber || "");
  }, [initialStatus, deliveryAddress, deliveryDate, trackingNumber]);

  const dispatch = useDispatch();

  const updateDeliveryNoteDetails = async () => {
    const data = {
      status,
      trackingNumber: trackingNumbers,
      deliveryAddress: address,
      deliveryDate: date,
    };
    console.log(data);
    try {
      const response = await axios.put(updateDeliveryNoteApi(id), data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      window.location.reload();
      if (response.status === 200) {
        setOpen(false);
      }
    } catch (error) {
      console.error("Error updating delivery note:", error);
    }
  };

  return (
    <>
      <Button
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
        onClick={handleOpen}
      >
        Mise à jour
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
                Mise à jour bons livraison
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
          <form>
            <DialogBody>
              <div className="grid gap-6">
                <div>
                  <Typography className="mb-1 text-black font-semibold">
                    Status
                  </Typography>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="border rounded px-2 py-1 w-full"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
                <div>
                  <Typography className="mb-1 text-black font-semibold">
                    Addresse de livraison
                  </Typography>
                  <Input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div>
                  <Typography className="mb-1 text-black font-semibold">
                    Date de livraison
                  </Typography>
                  <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full"
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
                onClick={updateDeliveryNoteDetails}
              >
                Mise à jour
              </Button>
            </DialogFooter>
          </form>
        </div>
      </Dialog>
    </>
  );
}
