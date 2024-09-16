import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const [categoryData, setCategoryData] = useState({
    categories: [],
    quantities: [],
  });

  const products = useSelector((state) => state.products.listofAllProducts);
  const categories = useSelector((state) => state.categories.listCategories);
  console.log("list Categories", categories);
  const getCategoryNameById = (id) => {
    const category = categories.find((cat) => cat._id === id);

    return category ? category.name : "Unknown";
  };

  useEffect(() => {
    const dataByCategory = products.reduce((acc, product) => {
      console.log(acc[product]);
      if (!acc[product.category]) {
        acc[product.category] = 0;
      }
      acc[product.category] += 1;
      return acc;
    }, {});

    const categoryNames = Object.keys(dataByCategory).map(getCategoryNameById);

    const quantities = Object.values(dataByCategory);
    setCategoryData({ categories: categoryNames, quantities });
  }, [products, categories]);

  const chartData = {
    labels: categoryData.categories,
    datasets: [
      {
        label: "Nombre de produits",
        data: categoryData.quantities,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
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
      <h2 className="text-xl font-bold mb-4">Produits par Catégorie</h2>
      <div className="chart-container">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default BarChart;
