import axios from "axios";
import { axiosJWT } from "./UserService";

export const getAllProduct = async () => {
  const res = await axios.get(`${process.env.REACT_APP_API}/product/get-all`);
  return res.data;
};

export const createProduct = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API}/product/create`,
    data
  );
  return res.data;
};

export const getDetailProduct = async (id) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API}/product/get-detail/${id}`
  );
  return res.data;
};

export const updateProduct = async (id, data, access_token) => {
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API}/product/update/${id}`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const deleteProduct = async (id, access_token) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API}/product/delete/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};
