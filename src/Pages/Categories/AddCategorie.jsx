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
import { addCategories } from "../../Api's/CategoriesApi";
import { useDispatch } from "react-redux";
import { addCategoryRedux } from "../../Redux/slice/categoriesSlice";

export function AddCategorie() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  const handleOpen = () => setOpen(!open);

  const handleCategoryName = (value) => {
    setName(value);
  };

  const handleCategoryImage = (file) => {
    setImage(file);
  };
  const dispatch = useDispatch();
  const addCategory = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    try {
      const response = await axios.post(addCategories, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      dispatch(addCategoryRedux({ category: response.data.data }));
      console.log(response);
      if (response.status === 201) {
        setOpen(!open);
      }
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
    <>
      <Button
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
        onClick={handleOpen}
      >
        Ajouter une Categorie
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
                Ajouter une Categorie
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
          <form onSubmit={addCategory}>
            <DialogBody>
              <div className="grid gap-6">
                <div>
                  <Typography className="mb-1 text-black font-semibold">
                    Le Titre Categorie
                  </Typography>
                  <Input
                    label=""
                    type="text"
                    value={name}
                    onChange={(e) => handleCategoryName(e.target.value)}
                  />
                </div>
                <div>
                  <Typography className="mb-1 text-black font-semibold">
                    l'image du Categorie
                  </Typography>
                  <Input
                    type="file"
                    onChange={(e) => handleCategoryImage(e.target.files[0])}
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
