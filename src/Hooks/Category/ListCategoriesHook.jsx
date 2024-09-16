import { useEffect, useState } from "react";
import axios from "axios";
import { getCategoriesPage } from "../../Api's/CategoriesApi";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategoriesRedux,
  pagination,
} from "../../Redux/slice/categoriesSlice";

const ListCategoriesHook = () => {
  const [page, setPage] = useState(1);
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  const dispatch = useDispatch();
  const limit = useSelector((state) => state.categories.limit);
  const currentPage = useSelector((state) => state.categories.currentPage);
  console.log(limit);
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get(getCategoriesPage(limit, page));
      console.log(response);
      dispatch(getAllCategoriesRedux(response.data));
      dispatch(pagination(response.data));
    };

    fetchCategories();

    // eslint-disabe-next-line react-hooks/exhaustive-deps
  }, [page]);

  const res = useSelector((state) => state.categories.listCategories);
  const results = useSelector((state) => state.categories.results);
  const numberOfPages = useSelector((state) => state.categories.numberOfPages);
  const nextPage = useSelector((state) => state.categories.nextPage);

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

export default ListCategoriesHook;
