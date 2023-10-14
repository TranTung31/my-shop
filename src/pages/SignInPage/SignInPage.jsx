import { Image } from "antd";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputForm from "../../components/InputForm/InputForm";
import {
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperForm,
  WrapperTextLight,
} from "./styles";
import imageForm from "../../assets/images/logo-signin.png";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleNavigateSignUp = () => {
    navigate("/sign-up");
  };
  const handleOnChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleOnChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSignIn = () => {
    console.log("sign in: ", email, password);
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ccc",
        height: "100vh",
      }}
    >
      <WrapperForm>
        <WrapperContainerLeft>
          <h1 style={{ fontSize: "24px", fontWeight: "590" }}>Xin chào</h1>
          <span style={{ fontSize: "16px", lineHeight: "20px" }}>
            Đăng nhập và tạo tài khoản
          </span>
          <InputForm
            placeholder="abc@gmail.com"
            style={{ margin: "10px 0" }}
            size="large"
            value={email}
            onChange={handleOnChangeEmail}
          />
          <div style={{ position: "relative" }}>
            <span
              onClick={() => {
                setIsShowPassword(!isShowPassword);
              }}
              style={{
                fontSize: "16px",
                position: "absolute",
                zIndex: "10",
                top: "14px",
                right: "16px",
                cursor: "pointer",
              }}
            >
              {isShowPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </span>
            <InputForm
              placeholder="password"
              size="large"
              type={isShowPassword ? "text" : "password"}
              value={password}
              onChange={handleOnChangePassword}
            />
          </div>
          <ButtonComponent
            buttonText="Đăng nhập"
            styleButton={{
              backgroundColor: "rgb(255, 66, 78)",
              width: "100%",
              height: "48px",
              border: "none",
              margin: "26px 0 30px",
            }}
            styleTextButton={{
              color: "#fff",
              fontSize: "15px",
              fontWeight: "700",
            }}
            disabled={!email || !password}
            onClick={handleSignIn}
          />
          <WrapperTextLight>Quên mật khẩu?</WrapperTextLight>
          <p style={{ fontSize: "1.5rem" }}>
            Chưa có tài khoản?{" "}
            <WrapperTextLight onClick={handleNavigateSignUp}>
              Tạo tài khoản
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
    </div>
  );
};

export default SignInPage;
