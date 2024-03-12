import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Image } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import imageForm from "../../assets/images/logo-signin.png";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputForm from "../../components/InputForm/InputForm";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import * as Message from "../../components/Message/Message";
import useMutationHook from "../../hooks/useMutationHook";
import * as UserService from "../../services/UserService";
import {
  WrapperContainer,
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperForm,
  WrapperTextLight,
} from "./styles";

const STYLES_ICON = {
  fontSize: "16px",
  position: "absolute",
  zIndex: "10",
  top: "14px",
  right: "16px",
  cursor: "pointer",
};

const STYLES_MESSAGE = {
  fontSize: "15px",
  color: "red",
  display: "block",
  paddingTop: "10px",
};

const SignUpPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const mutation = useMutationHook((data) => UserService.signupUser(data));

  const { data, isLoading, isSuccess, isError } = mutation;

  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      Message.success("Đăng ký tài khoản thành công!");
      handleNavigateLogin();
    } else if (isError) {
      Message.error(data?.message);
    }
  }, [isSuccess]);

  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };

  const handleKeyDown = (e) => {
    if (email && password && confirmPassword) {
      if (e.key === "Enter") {
        mutation.mutate({ email, password, confirmPassword });
      }
    }
  };

  const handleSignUp = () => {
    mutation.mutate({ email, password, confirmPassword });
  };

  return (
    <WrapperContainer>
      <WrapperForm>
        <WrapperContainerLeft>
          <h1 style={{ fontSize: "2.4rem", fontWeight: "590" }}>Xin chào</h1>
          <span style={{ fontSize: "1.6rem", lineHeight: "20px" }}>
            Đăng nhập và tạo tài khoản
          </span>
          <InputForm
            placeholder="abc@gmail.com"
            style={{ margin: "10px 0" }}
            type="email"
            size="large"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <div style={{ position: "relative" }}>
            <span
              onClick={() => {
                setIsShowPassword(!isShowPassword);
              }}
              style={STYLES_ICON}
            >
              {isShowPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </span>
            <InputForm
              placeholder="password"
              size="large"
              type={isShowPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div style={{ position: "relative", marginTop: "10px" }}>
            <span
              onClick={() => {
                setIsShowConfirm(!isShowConfirm);
              }}
              style={STYLES_ICON}
            >
              {isShowConfirm ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </span>
            <InputForm
              placeholder="confirm password"
              size="large"
              type={isShowConfirm ? "text" : "password"}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {data?.status === "ERROR" && (
              <span style={STYLES_MESSAGE}>{data?.message}</span>
            )}
          </div>

          <LoadingComponent isLoading={isLoading}>
            <ButtonComponent
              buttonText="Đăng ký"
              styleButton={{
                backgroundColor: "rgb(255, 66, 78)",
                width: "100%",
                height: "48px",
                border: "none",
                margin: "26px 0 10px",
              }}
              styleTextButton={{
                color: "#fff",
                fontSize: "15px",
                fontWeight: "700",
              }}
              disabled={!email || !password || !confirmPassword}
              onClick={handleSignUp}
            />
          </LoadingComponent>
          <p style={{ fontSize: "1.5rem" }}>
            Đã có tài khoản?{" "}
            <WrapperTextLight onClick={handleNavigateLogin}>
              Đăng nhập
            </WrapperTextLight>
          </p>
        </WrapperContainerLeft>

        <WrapperContainerRight>
          <Image src={imageForm} width="203px" height="203px" preview={false} />
          <h4
            style={{
              color: "rgb(11, 116, 229)",
              fontSize: "1.7rem",
              fontWeight: "500",
            }}
          >
            Mua sắm tại My Shop
          </h4>
        </WrapperContainerRight>
      </WrapperForm>
    </WrapperContainer>
  );
};

export default SignUpPage;
