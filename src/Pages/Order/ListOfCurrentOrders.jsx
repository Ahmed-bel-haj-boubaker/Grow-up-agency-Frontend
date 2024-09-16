import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { getCurrentOrderApi } from "../../Api's/OrderApi";
import { useDispatch, useSelector } from "react-redux";
import { UpdateOrder } from "./UpdateOrder";
import { addCurrentOrderRedux } from "../../Redux/slice/OrderSlice";
import AddOrders from "./AddOrders";

const ListOfCurrentOrders = () => {
  const dispatch = useDispatch();
  const [data, setDate] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(getCurrentOrderApi, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        dispatch(addCurrentOrderRedux(res.data));
        setDate(res.data);
      } catch (error) {
        console.error("Error fetching current orders", error);
      }
    };

    fetchOrders();
  }, [dispatch]);
  

  const allProd =
    useSelector((state) => state.products.listofAllProducts) || [];

  const fetchImage = useCallback(
    (id) => {
      const prod = allProd.find((e) => e._id === id);
      return prod ? prod.image : "";
    },
    [allProd]
  );

  const fetchprodName = useCallback(
    (id) => {
      const prod = allProd.find((e) => e._id === id);
      return prod ? prod.title : "";
    },
    [allProd]
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500";
      case "Cancelled":
        return "bg-red-500";
      case "Completed":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "l'image du produit",
        accessor: (row) =>
          row.order_items.map((item) => (
            <img
              key={item._id}
              src={fetchImage(item.product_id)}
              alt={item.product_id.title}
              className="h-16 w-16 object-cover"
            />
          )),
      },
      {
        Header: "Titre du produit",
        accessor: (row) =>
          row.order_items.map((item) => (
            <h3 key={item.product_id}>{fetchprodName(item.product_id)}</h3>
          )),
      },
      {
        Header: "le nom du client",
        accessor: (row) => <h3>{row.customerName}</h3>,
      },
      {
        Header: "l'email du client ",
        accessor: (row) => <h3>{row.customerEmail}</h3>,
      },

      {
        Header: "Quantité",
        accessor: (row) =>
          row.order_items
            .map((item) => item.quantity)
            .reduce((a, b) => a + b, 0),
      },
      {
        Header: "Montant total",
        accessor: (row) => row.total_amount + " DT",
      },
      {
        Header: "Status",
        accessor: (row) => (
          <div className="flex items-center">
            <span
              className={`inline-block w-3 h-3 rounded-full mr-2 ${getStatusColor(
                row.status
              )}`}
            ></span>
            {row.status}
          </div>
        ),
      },

      {
        Header: "Actions",
        accessor: (row) => (
          <UpdateOrder
            initialStatus={row.status}
            product_id={row.order_items.map((item) => item.product_id)}
            quantity={row.order_items.map((item) => item.quantity)}
            id={row._id}
          />
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    usePagination
  );

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">
        la liste des commande en cours:
      </h2>{" "}
      <table
        {...getTableProps()}
        className="min-w-full bg-white border border-gray-300 "
      >
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              key={index}
              className="bg-gray-800"
            >
              {headerGroup.headers.map((column, index) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={index}
                  className="py-2 px-4 border-b text-left font-semibold text-white"
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                key={i}
                className="hover:bg-gray-100 font-bold"
              >
                {row.cells.map((cell, index) => (
                  <td
                    {...cell.getCellProps()}
                    key={index}
                    className="py-2 px-4 border-b"
                  >
                    <div className="grid grid-flow-col justify-between space-x-1">
                      {" "}
                      {cell.render("Cell")}
                    </div>
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination mt-4 flex justify-between items-center">
        <div>
          <button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            className="px-3 py-1 border rounded mr-2"
          >
            {"<<"}
          </button>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="px-3 py-1 border rounded mr-2"
          >
            {"<"}
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="px-3 py-1 border rounded mr-2"
          >
            {">"}
          </button>
          <button
            onClick={() => gotoPage(pageOptions.length - 1)}
            disabled={!canNextPage}
            className="px-3 py-1 border rounded mr-2"
          >
            {">>"}
          </button>
        </div>
        <div>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </div>
        <div>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            className="border rounded w-16 text-center"
          />
        </div>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="border rounded ml-2"
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ListOfCurrentOrders;
