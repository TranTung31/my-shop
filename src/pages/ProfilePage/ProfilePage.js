import { UploadOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputForm from "../../components/InputForm/InputForm";
import * as Message from "../../components/Message/Message";
import useMutationHook from "../../hooks/useMutationHook";
import { updateUser } from "../../redux/slides/userSlice";
import * as UserService from "../../services/UserService";
import { getBase64 } from "../../utils/utils";
import {
  WrapperButtonComponent,
  WrapperContent,
  WrapperHeader,
  WrapperInput,
  WrapperLable,
  WrapperUpload,
} from "./styles";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

const ProfilePage = () => {
  const user = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    setName(user?.name);
    setEmail(user?.email);
    setPhone(user?.phone);
    setAddress(user?.address);
    setCity(user?.city);
    setAvatar(user?.avatar);
  }, [user]);

  const handleOnChangeName = (e) => {
    setName(e.target.value);
  };

  const handleOnChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleOnChangePhone = (e) => {
    setPhone(e.target.value);
  };

  const handleOnChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleOnChangeCity = (e) => {
    setCity(e.target.value);
  };

  const handleOnChangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setAvatar(file.preview);
  };

  const mutation = useMutationHook(({ id, access_token, ...rests }) => {
    const res = UserService.updateUser(id, rests, access_token);
    return res;
  });

  const { data, isSuccess, isError } = mutation;

  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      Message.success("Cập nhật thông tin người dùng thành công!");
      handleGetDetailUser(user?.id, user?.access_token);
    } else if (isError) {
      Message.error("Cập nhật thông tin người dùng thất bại!");
    }
  }, [isSuccess, isError]);

  const dispatch = useDispatch();

  const handleGetDetailUser = async (id, token) => {
    const res = await UserService.getDetailUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  const handleUpdate = () => {
    mutation.mutate({
      id: user?.id,
      name,
      email,
      phone,
      address,
      city,
      avatar,
      access_token: user?.access_token,
    });
  };
  return (
    <div style={{ width: "1285px", margin: "0 auto" }}>
      <WrapperHeader>Thông tin người dùng</WrapperHeader>
      <WrapperContent>
        <WrapperInput>
          <WrapperLable>Họ và tên</WrapperLable>
          <InputForm
            value={name}
            onChange={handleOnChangeName}
            style={{ width: "300px", border: "1px solid #ccc" }}
          ></InputForm>
        </WrapperInput>

        <WrapperInput>
          <WrapperLable>Email</WrapperLable>
          <InputForm
            value={email}
            onChange={handleOnChangeEmail}
            style={{ width: "300px", border: "1px solid #ccc" }}
          ></InputForm>
        </WrapperInput>

        <WrapperInput>
          <WrapperLable>Số điện thoại</WrapperLable>
          <InputForm
            value={phone}
            type="number"
            onChange={handleOnChangePhone}
            style={{ width: "300px", border: "1px solid #ccc" }}
          ></InputForm>
        </WrapperInput>

        <WrapperInput>
          <WrapperLable>Địa chỉ</WrapperLable>
          <InputForm
            value={address}
            onChange={handleOnChangeAddress}
            style={{ width: "300px", border: "1px solid #ccc" }}
          ></InputForm>
        </WrapperInput>

        <WrapperInput>
          <WrapperLable>Thành phố</WrapperLable>
          <InputForm
            value={city}
            onChange={handleOnChangeCity}
            style={{ width: "300px", border: "1px solid #ccc" }}
          ></InputForm>
        </WrapperInput>

        <WrapperInput>
          <WrapperLable>Hình ảnh</WrapperLable>
          <WrapperUpload onChange={handleOnChangeAvatar} maxCount={1}>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </WrapperUpload>
          {avatar && (
            <img
              src={avatar}
              alt="avatar"
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                objectFit: "cover",
                marginLeft: "20px",
              }}
            />
          )}
        </WrapperInput>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <ButtonComponent
            buttonText="Cập nhật"
            disabled={false}
            onClick={handleUpdate}
          />
        </div>
      </WrapperContent>
    </div>
  );
};

export default ProfilePage;
