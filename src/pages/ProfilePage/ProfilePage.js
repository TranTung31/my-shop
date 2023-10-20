import { useEffect, useState } from "react";
import InputForm from "../../components/InputForm/InputForm";
import {
  WrapperContent,
  WrapperHeader,
  WrapperInput,
  WrapperLable,
  WrapperUpload,
} from "./styles";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserService";
import useMutationHook from "../../hooks/useMutationHook";
import * as Message from "../../components/Message/Message";
import { updateUser } from "../../redux/slides/userSlide";
import { Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { getBase64 } from "../../utils";

const ProfilePage = () => {
  const user = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    setName(user?.name);
    setEmail(user?.email);
    setPhone(user?.phone);
    setAddress(user?.address);
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

  const handleOnChangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setAvatar(file.preview);
  };

  const mutation = useMutationHook(({ id, access_token, ...rests }) =>
    UserService.updateUser(id, rests, access_token)
  );

  const { isSuccess, isError } = mutation;

  console.log("isSuccess: ", isSuccess);

  useEffect(() => {
    if (isSuccess) {
      Message.success("Success");
      handleGetDetailUser(user?.id, user?.access_token);
    } else if (isError) {
      Message.error();
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
      avatar,
      access_token: user?.access_token,
    });
  };
  return (
    <div style={{ width: "1285px", margin: "0 auto" }}>
      <WrapperHeader>Thông tin người dùng</WrapperHeader>
      <WrapperContent>
        <WrapperInput>
          <WrapperLable>Name</WrapperLable>
          <InputForm
            value={name}
            onChange={handleOnChangeName}
            style={{ width: "300px", border: "1px solid #ccc" }}
          ></InputForm>
          <ButtonComponent
            buttonText="Cập nhật"
            disabled={false}
            styleButton={{
              backgroundColor: "#fff",
              marginLeft: "20px",
              border: "1px solid #007fff",
              color: "#007fff",
            }}
            onClick={handleUpdate}
          ></ButtonComponent>
        </WrapperInput>

        <WrapperInput>
          <WrapperLable>Email</WrapperLable>
          <InputForm
            value={email}
            onChange={handleOnChangeEmail}
            style={{ width: "300px", border: "1px solid #ccc" }}
          ></InputForm>
          <ButtonComponent
            buttonText="Cập nhật"
            disabled={false}
            styleButton={{
              backgroundColor: "#fff",
              marginLeft: "20px",
              border: "1px solid #007fff",
              color: "#007fff",
            }}
            onClick={handleUpdate}
          ></ButtonComponent>
        </WrapperInput>

        <WrapperInput>
          <WrapperLable>Phone</WrapperLable>
          <InputForm
            value={phone}
            onChange={handleOnChangePhone}
            style={{ width: "300px", border: "1px solid #ccc" }}
          ></InputForm>
          <ButtonComponent
            buttonText="Cập nhật"
            disabled={false}
            styleButton={{
              backgroundColor: "#fff",
              marginLeft: "20px",
              border: "1px solid #007fff",
              color: "#007fff",
            }}
            onClick={handleUpdate}
          ></ButtonComponent>
        </WrapperInput>

        <WrapperInput>
          <WrapperLable>Address</WrapperLable>
          <InputForm
            value={address}
            onChange={handleOnChangeAddress}
            style={{ width: "300px", border: "1px solid #ccc" }}
          ></InputForm>
          <ButtonComponent
            buttonText="Cập nhật"
            disabled={false}
            styleButton={{
              backgroundColor: "#fff",
              marginLeft: "20px",
              border: "1px solid #007fff",
              color: "#007fff",
            }}
            onClick={handleUpdate}
          ></ButtonComponent>
        </WrapperInput>

        <WrapperInput>
          <WrapperLable>Avatar</WrapperLable>
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
          <ButtonComponent
            buttonText="Cập nhật"
            disabled={false}
            styleButton={{
              backgroundColor: "#fff",
              marginLeft: "20px",
              border: "1px solid #007fff",
              color: "#007fff",
            }}
            onClick={handleUpdate}
          ></ButtonComponent>
        </WrapperInput>
      </WrapperContent>
    </div>
  );
};

export default ProfilePage;
