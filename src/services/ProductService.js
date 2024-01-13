import axios from "axios";
import { axiosJWT } from "./UserService";

export const getAllProduct = async (limit, search) => {
  let res = {};
  if (search) {
    res = await axios.get(
      `${process.env.REACT_APP_API}/product/get-all?filter=name&filter=${search}&limit=${limit}`
    );
  } else if (limit) {
    res = await axios.get(
      `${process.env.REACT_APP_API}/product/get-all?limit=${limit}`
    );
  } else {
    res = await axios.get(`${process.env.REACT_APP_API}/product/get-all`);
  }
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

export const deleteManyProduct = async (ids, access_token) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API}/product/delete-many`,
    ids,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getAllType = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API}/product/get-all-type`
  );
  return res.data;
};

export const getAllProductType = async (type, limit, page) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API}/product/get-all?filter=type&filter=${type}&limit=${limit}&page=${page}`
  );
  return res.data;
};

export const getCountProduct = async (access_token) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API}/product/get-count-product`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};
