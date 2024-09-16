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
import { updateProducts } from "../../Api's/ProductApi";
import { useDispatch } from "react-redux";
import { updateProductsRedux } from "../../Redux/slice/productsSlice";

export function UpdateProducts({
  productId,
  categoryId,
  initialTitle,
  initialImage,
  initialDescription,
  initialPrice,
  initialQuantity,
}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(initialTitle || "");
  const [description, setDescription] = useState(initialDescription || "");
  const [price, setPrice] = useState(initialPrice || 0);
  const [stockQuantity, setQuantity] = useState(initialQuantity || 0);
  const [image, setImage] = useState(null);

  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    setTitle(initialTitle || "");
    setDescription(initialDescription || "");
    setPrice(initialPrice || 0);
    setQuantity(initialQuantity || 0);
    setImage(null);
  }, [
    initialTitle,
    initialDescription,
    initialPrice,
    initialQuantity,
    initialImage,
  ]);

  const dispatch = useDispatch();

  const updateProductDetails = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stockQuantity", stockQuantity);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.put(updateProducts(productId), formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      dispatch(updateProductsRedux({ product: response.data.updatedDocument }));

      if (response.status === 200) {
        setOpen(false);
      }
    } catch (error) {
      console.error("Error updating product:", error);
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
                Mise à jour du Produit
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
                    Titre
                  </Typography>
                  <Input
                    label=""
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div>
                  <Typography className="mb-1 text-black font-semibold">
                    Description
                  </Typography>
                  <Input
                    label=""
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div>
                  <Typography className="mb-1 text-black font-semibold">
                    Prix
                  </Typography>
                  <Input
                    label=""
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div>
                  <Typography className="mb-1 text-black font-semibold">
                    Quantité
                  </Typography>
                  <Input
                    label=""
                    type="number"
                    value={stockQuantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div>
                  <Typography className="mb-1 text-black font-semibold">
                    Image
                  </Typography>
                  <Input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
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
                onClick={updateProductDetails}
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
