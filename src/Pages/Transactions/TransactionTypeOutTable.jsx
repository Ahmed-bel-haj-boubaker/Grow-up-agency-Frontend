import React, { useEffect } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTransaction,
  getAllTransactionTypeOut,
} from "../../Api's/TransactionApi";
import axios from "axios";
import {
  deleteTransactionRedux,
  getAllTransactionTypeOutRedux,
} from "../../Redux/slice/transactionTypeOutSlice";

const TransactionTypeOutTable = ({ products }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllTransaction = async () => {
      try {
        const res = await axios.get(getAllTransactionTypeOut, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        dispatch(
          getAllTransactionTypeOutRedux({ transaction: res.data.transaction })
        );
      } catch (error) {
        console.error("Failed to fetch transactions", error);
      }
    };
    fetchAllTransaction();
  }, [dispatch]);

  const transactions = useSelector(
    (state) => state.transactionTypeOut.listOfTransactionsTypeOut
  );

  const getProductNameById = (id) => {
    const product = products.find((cat) => cat._id === id);
    return product ? product.title : "Unknown";
  };
  const getProductImageById = (id) => {
    const product = products.find((a) => a._id === id);
    return product ? product.image : "Unknown";
  };

  const deleteTransactions = async (id) => {
    try {
      const res = await axios.delete(deleteTransaction(id), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      dispatch(deleteTransactionRedux({ _id: id }));
      
    } catch (error) {
      console.error("Failed to delete transaction", error);
    }
  };
  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "_id",
      },
      {
        Header: "Product ",
        accessor: "product",
        Cell: ({ value }) => getProductNameById(value),
      },
      {
        Header: "Product Image",
        accessor: "product",
        Cell: ({ value }) => {
          const imageUrl = getProductImageById(value);
          return imageUrl ? (
            <img
              src={imageUrl}
              alt="Product"
              className="w-16 h-16 object-cover"
            />
          ) : (
            "No Image"
          );
        },
        id: "productImage",
      },
      {
        Header: "Quantity",
        accessor: "quantity",
      },
      {
        Header: "Type",
        accessor: "type",
      },
      {
        Header: "Date",
        accessor: "createdAt",
        Cell: ({ value }) => new Date(value).toLocaleDateString(),
      },
      {
        Header: "Action",
        accessor: "Action",
        Cell: ({ row }) => (
          <button
            onClick={() => deleteTransactions(row.original._id)}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        ),
      },
    ],
    [products]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
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
      data: transactions,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    useSortBy,
    usePagination
  );

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg w-full">
      <h2 className="text-2xl font-bold mb-4">Transaction Type Out List</h2>
      <table
        {...getTableProps()}
        className="w-full border-collapse border border-gray-200"
      >
        <thead>
          {headerGroups.map((headerGroup, index) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              className="bg-gray-100 border-b border-gray-300"
              key={index}
            >
              {headerGroup.headers.map((column, index) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="px-4 py-2 text-left text-gray-600"
                  key={index}
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
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className="border-b border-gray-200 hover:bg-gray-50"
                key={row.id}
              >
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    className="px-4 py-2 text-gray-700"
                    key={cell.column.id}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </span>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TransactionTypeOutTable;
