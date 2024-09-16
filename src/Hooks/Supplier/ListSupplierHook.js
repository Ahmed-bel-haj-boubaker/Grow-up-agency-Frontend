import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addSupplierRedux, pagination } from "../../Redux/slice/supplierSlice";
import { getSupplierPage } from "../../Api's/SupplierApi";

const ListSupplierHook = () => {
  const [page, setPage] = useState(1);
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  const dispatch = useDispatch();
  const limit = useSelector((state) => state.supplier.limit);
  const currentPage = useSelector((state) => state.supplier.currentPage);

  useEffect(() => {
    const fetchSuppliers = async () => {
      const response = await axios.get(getSupplierPage(limit, page), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("response.data.data: ", response.data.data);
      dispatch(addSupplierRedux(response.data.data));
      dispatch(pagination(response.data));
    };

    fetchSuppliers();

    // eslint-disabe-next-line react-hooks/exhaustive-deps
  }, [getSupplierPage, page]);

  const res = useSelector((state) => state.supplier.listSupplierPaginated);

  const results = useSelector((state) => state.supplier.results);
  const numberOfPages = useSelector((state) => state.supplier.numberOfPages);
  const nextPage = useSelector((state) => state.supplier.nextPage);

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

export default ListSupplierHook;
