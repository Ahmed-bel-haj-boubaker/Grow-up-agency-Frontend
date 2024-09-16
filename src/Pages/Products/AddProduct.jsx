import React, { useState } from "react";
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
import { addProducts } from "../../Api's/ProductApi";
import { addProductRedux } from "../../Redux/slice/productsSlice";

export function AddProduct() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stockQuantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [supplier, setSupplier] = useState("");
  const categories = useSelector((state) => state.categories.listCategories);
  const suppliers = useSelector((state) => state.supplier.listAllSupplier);
  console.log(suppliers);
  const handleOpen = () => setOpen(!open);

  const handleProductTitle = (value) => setTitle(value);
  const handleProductDescription = (value) => setDescription(value);
  const handleProductQuantity = (value) => setQuantity(value);
  const handleProductPrice = (value) => setPrice(value);
  const handleProductCategory = (value) => setCategory(value);
  const handleSupplier = (value) => setSupplier(value);
  const dispatch = useDispatch();
  const addProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("stockQuantity", stockQuantity);
    formData.append("price", price);
    formData.append("image", image);
    formData.append("category", category);
    formData.append("supplier", supplier);

    try {
      const response = await axios.post(addProducts, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(addProductRedux({ product: response.data.data }));
      if (response.status === 201) {
        setOpen(!open);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <>
      <Button
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
        onClick={handleOpen}
      >
        Ajouter un Produit
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
                Ajouter un Produit
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
          <form onSubmit={addProduct}>
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
                    onChange={(e) => handleProductTitle(e.target.value)}
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
                    onChange={(e) => handleProductDescription(e.target.value)}
                  />
                </div>
                <div>
                  <Typography className="mb-1 text-black font-semibold">
                    prix
                  </Typography>
                  <Input
                    label=""
                    type="number"
                    value={price}
                    min={0}
                    onChange={(e) => handleProductPrice(e.target.value)}
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
                    min={0}
                    onChange={(e) => handleProductQuantity(e.target.value)}
                  />
                </div>
                <div>
                  <Typography className="mb-1 text-black font-semibold">
                    Image du Produit
                  </Typography>
                  <Input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
                <div>
                  <Typography className="mb-1 text-black font-semibold">
                    La Categorie du Produit
                  </Typography>
                  <Select
                    value={category}
                    onChange={(e) => handleProductCategory(e)}
                    className="flex items-center justify-center"
                  >
                    {categories.map((category) => (
                      <Option key={category._id} value={category._id}>
                        {category.name}
                      </Option>
                    ))}
                  </Select>
                </div>{" "}
                <div>
                  <Typography className="mb-1 text-black font-semibold">
                    Fournisseur
                  </Typography>
                  <Select
                    className="flex items-center justify-center"
                    value={supplier}
                    onChange={(e) => handleSupplier(e)}
                  >
                    {suppliers?.map((supplier) => (
                      <Option key={supplier._id} value={supplier._id}>
                        {supplier.name}
                      </Option>
                    ))}
                  </Select>
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
