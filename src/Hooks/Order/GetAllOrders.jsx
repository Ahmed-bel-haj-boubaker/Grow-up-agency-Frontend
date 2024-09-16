import axios from "axios";
import { useEffect, useState } from "react";
import { getAllOrderApi } from "../../Api's/OrderApi";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrderRedux } from "../../Redux/slice/OrderSlice";

const GetAllOrders = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchOrders = async () => {
      const res = await axios.get(getAllOrderApi, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      setData(res.data.data);
      dispatch(getAllOrderRedux(res.data.data));
      console.log(res);
    };
    fetchOrders();
  }, [getAllOrderApi]);

  const allOrders = useSelector((state) => state.order.listOfallOrders);
  return { allOrders };
};

export default GetAllOrders;
