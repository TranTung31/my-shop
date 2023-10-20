import axios from "axios";

export const getAllProduct = async () => {
  const res = await axios.get(`${process.env.REACT_APP_API}/product/get-all`);
  return res.data;
};