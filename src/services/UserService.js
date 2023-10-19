import axios from "axios";

export const axiosJWT = axios.create();

export const loginUser = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API}/user/sign-in`,
    data
  );
  return res.data;
};

export const signupUser = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API}/user/sign-up`,
    data
  );
  return res.data;
};

export const getDetailUser = async (id, access_token) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API}/user/get-detail-user/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const refreshToken = async () => {
  const res = await axios.post(
    `${process.env.REACT_APP_API}/user/refresh-token`,
    {
      withCredentials: true,
    }
  );
  return res.data;
};
