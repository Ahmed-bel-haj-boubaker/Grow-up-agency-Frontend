import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { useDispatch } from "react-redux";
import {
  deleteDeliveryNoteApi,
  getDeliveryNoteApi,
} from "../../Api's/DeleveryNoteApi";
import { UpdateDeliveryNote } from "./UpdateDeliveryNote";
import AddDeliveryNote from "./AddDeliveryNote";

const ListDelivery = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchDeliveryNotes = async () => {
      try {
        const res = await axios.get(getDeliveryNoteApi, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        if (res.data && Array.isArray(res.data)) {
          setData(res.data);
          console.log(res.data);
        } else {
          console.error("Invalid data format received from API");
        }
      } catch (error) {
        console.error("Error fetching delivery notes", error);
      }
    };

    fetchDeliveryNotes();
  }, [dispatch]);

  const deleteDelivery = async (id) => {
    try {
      console.log(id);
      await axios.delete(deleteDeliveryNoteApi(id), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      window.location.reload();
    } catch (error) {
      console.error("Error deleting Delivery :", error);
      throw error;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500";

      case "Delivered":
        return "bg-green-500";

      default:
        return "bg-gray-500";
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "Commande id",
        accessor: "_id",
      },
      {
        Header: " Addresse de livraison",
        accessor: "deliveryAddress",
      },
      {
        Header: " Date de livraison",
        accessor: "deliveryDate",
      },
      {
        Header: "Tracking Number",
        accessor: "trackingNumber",
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
          <div className="flex space-x-2">
            <UpdateDeliveryNote
              initialStatus={row.status}
              id={row._id}
              deliveryAddress={row.deliveryAddress}
              deliveryDate={row.deliveryDate}
              trackingNumber={row.trackingNumber}
            />
            <button
              onClick={() => deleteDelivery(row._id)}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            >
              SUPPRIMER
            </button>
          </div>
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
    <div className="container mx-auto p-4 bg-white rounded-xl">
      <div className="mb-6">
        <AddDeliveryNote />
      </div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-700 ">
        List of Delivery Notes:
      </h2>
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
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={column.id}
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
                key={row.id}
                className="hover:bg-gray-100 font-bold"
              >
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    key={cell.column.id}
                    className="py-2 px-4 border-b"
                  >
                    {cell.render("Cell")}
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

export default ListDelivery;
