import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  downloadInvoiceApi,
  getInvoiceAcceptedApi,
} from "../../Api's/InvoiceApi";
import { FaFileDownload } from "react-icons/fa";
import { UpdateInvoiceStatus } from "./UpdateInvoiceStatus";

const PAGE_SIZE = 10; // Number of invoices per page

const InvoiceAccepted = () => {
  const [acceptedInvoices, setAcceptedInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchAcceptedInvoices = async () => {
      setLoading(true);
      try {
        const response = await axios.get(getInvoiceAcceptedApi, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          params: {
            page: currentPage,
            pageSize: PAGE_SIZE,
          },
        });

        setAcceptedInvoices(response.data.data);

        const totalItems = response.data.totalItems;
        setTotalPages(Math.ceil(totalItems / PAGE_SIZE));
      } catch (error) {
        setError("Error fetching accepted invoices");
        console.error("Error fetching accepted invoices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAcceptedInvoices();
  }, [currentPage]);

  const downloadInvoice = async (invoiceId) => {
    try {
      const response = await axios.get(downloadInvoiceApi(invoiceId), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice_${invoiceId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error downloading invoice:", error);
    }
  };

  if (loading) return <p className="text-gray-500">Loading...</p>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6">
        Les Factures
      </h2>
      {acceptedInvoices.length === 0 ? (
        <p className="text-gray-500">No accepted invoices found.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Facture id
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Montant total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {acceptedInvoices.map((invoice) => (
                  <tr key={invoice._id} className="hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {invoice._id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {invoice.totalAmount} DT
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          invoice.status === "Unpaid"
                            ? "bg-red-200 text-red-800"
                            : "bg-green-200 text-green-800"
                        }`}
                      >
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2 flex items-center">
                      <button
                        onClick={() => downloadInvoice(invoice._id)}
                        className="flex items-center justify-center text-white bg-blue-600 hover:bg-blue-800 p-2 rounded-lg"
                      >
                        <FaFileDownload className="mr-2" /> Download
                      </button>

                      <UpdateInvoiceStatus
                        initialStatus={invoice.status}
                        invoiceId={invoice._id}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`bg-gray-200 p-2 rounded-lg ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`bg-gray-200 p-2 rounded-lg ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default InvoiceAccepted;
