import axios from "axios";
import { getReport } from "../../Api's/ReportApi";

const ReportButton = ({ format }) => {
  const handleGenerateReport = async () => {
    try {
      const response = await axios.get(
        getReport(format),
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        },
        {
          responseType: "blob",
        }
      );
      const date = new Date();
      const dateToday = `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`;

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `reportStockProduit-(${dateToday}).csv`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Failed to generate report", error);
    }
  };

  return (
    <button
      onClick={handleGenerateReport}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Generate {format.toUpperCase()} Report
    </button>
  );
};

export default ReportButton;
