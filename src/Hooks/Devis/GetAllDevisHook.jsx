import axios from "axios";
import { useEffect, useState } from "react";
import { getAllQuoteApi } from "../../Api's/QuoteApi";
import { useDispatch, useSelector } from "react-redux";
import { getAllDevisRedux } from "../../Redux/slice/DevisSlice";

const useGetAllDevisHook = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.devis.listOfAllDevis);
  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const res = await axios.get(getAllQuoteApi, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });

        dispatch(getAllDevisRedux(res.data.data));
      } catch (error) {
        console.error("Error fetching quotes", error);
      }
    };

    if (data.length === 10) {
      fetchQuotes();
    }
  }, [dispatch, data.length]);

  return { data };
};

export default useGetAllDevisHook;
