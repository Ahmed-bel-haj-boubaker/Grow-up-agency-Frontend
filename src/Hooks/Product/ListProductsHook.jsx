import { useEffect, useState } from "react";
import axios from "axios";
import { getAllProducts, getProductsPage } from "../../Api's/ProductApi";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProductsRedux,
  pagination,
} from "../../Redux/slice/productsSlice";

const ListProductsHook = () => {
  const [page, setPage] = useState(1);
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  const dispatch = useDispatch();
  const limit = useSelector((state) => state.products.limit);
  const currentPage = useSelector((state) => state.products.currentPage);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get(getProductsPage(limit, page));
      console.log(response);
      dispatch(getAllProductsRedux(response.data));
      dispatch(pagination(response.data));
    };

    fetchCategories();

    // eslint-disabe-next-line react-hooks/exhaustive-deps
  }, [getAllProducts, page]);

  const res = useSelector((state) => state.products.listProducts);
  const results = useSelector((state) => state.products.results);
  const numberOfPages = useSelector((state) => state.products.numberOfPages);
  const nextPage = useSelector((state) => state.products.nextPage);

  return {
    res,
    results,
    numberOfPages,
    nextPage,
    currentPage,
    limit,
    handlePageChange,
  };
};

export default ListProductsHook;
