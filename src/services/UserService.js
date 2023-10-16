import axios from "axios";

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
  const res = await axios.get(
    `${process.env.REACT_APP_API}/user/get-detail-user/${id}`,
    {
      headers: {
        token: `Beare ${access_token}`,
      },
    }
  );
  return res.data;
};
