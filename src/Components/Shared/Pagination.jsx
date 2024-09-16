import { useState } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const Pagination = ({ page, limit, onPageChange, numberOfPages }) => {
  const [active, setActive] = useState(page);

  const getItemProps = (index) => ({
    variant: active === index ? "filled" : "text",
    color: active === index ? "blue" : "gray",
    onClick: () => {
      setActive(index);
      onPageChange(index);
    },
    className: `rounded-full transition-all duration-300 ${
      active === index
        ? "bg-blue-500 text-white"
        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
    }`,
  });

  const next = () => {
    if (active < numberOfPages) {
      const newPage = active + 1;
      setActive(newPage);
      onPageChange(newPage);
    }
  };

  const prev = () => {
    if (active > 1) {
      const newPage = active - 1;
      setActive(newPage);
      onPageChange(newPage);
    }
  };

  return (
    <div className="w-full flex items-center justify-between bg-white border-t border-gray-200 mt-4 p-4 rounded-lg shadow-lg">
      <Button
        variant="text"
        className={`flex items-center gap-2 rounded-full transition-all duration-300 ${
          active === 1 ? "text-gray-400 cursor-not-allowed" : "text-blue-500"
        }`}
        onClick={prev}
        disabled={active === 1}
      >
        <FiArrowLeft strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2 mt-3 mb-3 justify-center">
        {[...Array(numberOfPages)].map((_, index) => (
          <IconButton key={index} {...getItemProps(index + 1)}>
            {index + 1}
          </IconButton>
        ))}
      </div>
      <Button
        variant="text"
        className={`flex items-center gap-2 rounded-full transition-all duration-300 ${
          active === numberOfPages
            ? "text-gray-400 cursor-not-allowed"
            : "text-blue-500"
        }`}
        onClick={next}
        disabled={active === numberOfPages}
      >
        Next
        <FiArrowRight strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;
