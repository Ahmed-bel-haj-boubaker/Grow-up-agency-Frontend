/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Swal from "sweetalert2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ products }) => {
  const [productData, setProductData] = useState({
    labels: [],
    quantities: [],
  });

  useEffect(() => {
    if (products.length > 0) {
      const labels = products.map((product) => product.title);
      const quantities = products.map((product) => product.stockQuantity);

      setProductData({ labels, quantities });

      checkLowQuantities(labels, quantities);
    }
  }, [products]);

  const checkLowQuantities = (labels, quantities) => {
    const lowQuantityProducts = labels.filter(
      (label, index) => quantities[index] < 5
    );

    if (lowQuantityProducts.length > 0) {
      Swal.fire({
        title: "Attention!",
        text: `Quantité en Stock faible pour les produits: ${lowQuantityProducts.join(
          ", "
        )}`,
        icon: "warning",
        confirmButtonText: "OK",
      });
    }
  };
  const chartData = {
    labels: productData.labels,
    datasets: [
      {
        label: "Quantité en Stock élevé",
        data: productData.quantities,
        backgroundColor: productData.quantities.map((quantity) =>
          quantity < 5 ? "rgba(255, 99, 132, 0.6)" : "rgba(75, 192, 192, 0.6)"
        ),
        borderColor: productData.quantities.map((quantity) =>
          quantity < 5 ? "rgba(255, 99, 132, 1)" : "rgba(75, 192, 192, 1)"
        ),
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="chart">
      <h2 className="text-xl font-bold mb-4">Quantité de Stock par Produit</h2>
      <div className="chart-container">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default Chart;
