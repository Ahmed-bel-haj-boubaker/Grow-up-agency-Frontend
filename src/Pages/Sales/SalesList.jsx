import React, { useEffect, useMemo, useState } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { deletSalesApi, getsales } from "../../Api's/SalesApi";
import {
  deleteSalesInRedux,
  getAllSalesRedux,
} from "../../Redux/slice/salesSlice";

const SalesList = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.listofAllProducts);
  const sales = useSelector((state) => state.sales.listOfSales);

  const getProductNameById = (id) => {
    const product = products.find((a) => a._id === id);
    return product ? product.title : "Unknown";
  };

  const getImageById = (id) => {
    const product = products.find((e) => e._id === id);
    return product ? product.image : undefined;
  };

  const deleteSaleById = async (id) => {
    try {
      await axios.delete(deletSalesApi(id), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      dispatch(deleteSalesInRedux({ _id: id }));
    } catch (error) {
      console.error("Failed to delete sale", error);
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "_id",
      },
      {
        Header: "Product",
        accessor: "product",
        Cell: ({ value }) => getProductNameById(value),
      },
      {
        Header: "Product Image",
        accessor: "product",
        Cell: ({ value }) => {
          const imageUrl = getImageById(value);
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
        Header: "Total Price",
        accessor: "totalPrice",
      },
      {
        Header: "Customer Name",
        accessor: "customerName",
      },
      {
        Header: "Customer Email",
        accessor: "customerEmail",
      },
      {
        Header: "Date",
        accessor: "date",
        Cell: ({ value }) => new Date(value).toLocaleDateString(),
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Action",
        accessor: "Action",
        Cell: ({ row }) => (
          <button
            onClick={() => deleteSaleById(row.original._id)}
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
      data: sales,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    useSortBy,
    usePagination
  );

  return (
    <div className=" mx-auto p-6 bg-white rounded-lg shadow-lg w-full">
      <h2 className="text-2xl font-bold mb-4">Sales List</h2>
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

export default SalesList;
