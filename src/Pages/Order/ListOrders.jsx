import AddOrders from "./AddOrders";
import ListOfCurrentOrders from "./ListOfCurrentOrders";

const ListOrders = () => {
  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <AddOrders />
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <ListOfCurrentOrders />
      </div>

      <hr className="my-6 border-gray-300" />
    </div>
  );
};

export default ListOrders;
