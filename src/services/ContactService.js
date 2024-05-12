import axios from "axios";
import { axiosJWT } from "./UserService";

export const getAllContact = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API}/contact/get-all-contact`
  );
  return res.data;
};

export const getDetailContact = async (id) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API}/contact/get-contact/${id}`
  );
  return res.data;
};

export const getContactUser = async (id, access_token) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API}/contact/get-contact-user/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getContactAdmin = async (page, limit) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API}/contact?page=${page}&limit=${limit}`
  );
  return res.data;
};

export const createContact = async (data, access_token) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API}/contact/create-contact`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const updateContact = async (id, data, access_token) => {
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API}/contact/update-contact/${id}`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const deleteContact = async (id, access_token) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API}/contact/delete-contact/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const deleteManyContact = async (ids, access_token) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API}/contact/delete-many-contact`,
    ids,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};
