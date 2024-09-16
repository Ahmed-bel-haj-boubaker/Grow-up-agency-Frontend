import axios, { all } from "axios";
import { useEffect, useMemo, useState } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { useSelector } from "react-redux";
import { deleteQuoteApi, getAllQuoteApi } from "../../Api's/QuoteApi";
import AddQuote from "./AddQuote";
import { UpdateQuote } from "./UpdateQuote";
import { generateInvoiceApi } from "../../Api's/InvoiceApi";

const ListQuote = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const res = await axios.get(getAllQuoteApi, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        console.log(res);
        setData(res.data.data);
      } catch (error) {
        console.error("Error fetching past orders", error);
      }
    };
    fetchQuotes();
  }, [getAllQuoteApi]);

  const generateInvoice = async (quoteId) => {
    try {
      const id = quoteId;
      const response = await axios.post(generateInvoiceApi(id), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 201) {
        console.log("Invoice generated successfully");
      }
    } catch (error) {
      console.error("Error generating invoice:", error);
    }
  };

  const allProd = useSelector((state) => state.products.listofAllProducts);
  console.log(allProd);

  const fetchImage = (id) => {
    const prod = allProd.find((e) => e._id === id);
    console.log(prod);
    return prod ? prod.image : "";
  };
  const fetchprodName = (id) => {
    const prod = allProd.find((e) => e._id === id);
    console.log(prod);
    return prod ? prod.title : "";
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500";
      case "Rejected":
        return "bg-red-500";
      case "Accepted":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(deleteQuoteApi(id));
    window.location.reload();
  };

  const columns = useMemo(
    () => [
      {
        Header: "Titre du Produit ",
        accessor: (row) =>
          row.quoteItems.map((item) => (
            <h3 key={item.product_id}>{fetchprodName(item.product_id)}</h3>
          )),
      },
      {
        Header: "Image du produit",
        accessor: (row) =>
          row.quoteItems.map((item) => (
            <img
              key={item._id}
              src={fetchImage(item.product_id)}
              alt={item.product_id.title}
              className="h-16 w-16 object-cover"
            />
          )),
      },

      {
        Header: "Quantité",
        accessor: (row) =>
          row.quoteItems
            .map((item) => item.quantity)
            .reduce((a, b) => a + b, 0),
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
        Header: "Montant total",
        accessor: (row) => row.totalAmount + " DT",
      },
      {
        Header: "Action",
        accessor: (row) => (
          <div>
            <button>
              <UpdateQuote
                initialStatus={row.status}
                initialQuoteItems={row.quoteItems}
                quoteId={row._id}
              />
            </button>
            <button
              onClick={() => handleDelete(row._id)}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            >
              SUPPRIMER
            </button>
          </div>
        ),
      },
      {
        Header: "Facture",
        accessor: (row) => (
          <div>
            {row.status === "Accepted" && (
              <button
                onClick={() => generateInvoice(row._id)}
                className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
              >
                Générer une facture
              </button>
            )}
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
      <AddQuote />
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">
        la liste des Devis:
      </h2>
      <table
        {...getTableProps()}
        className="min-w-full bg-white border border-gray-300"
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

export default ListQuote;
