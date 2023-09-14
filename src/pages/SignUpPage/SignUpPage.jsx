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

const SignUpPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
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
            />
          </div>

          <div style={{ position: "relative", marginTop: "10px" }}>
            <span
              onClick={() => {
                setIsShowConfirm(!isShowConfirm);
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
              {isShowConfirm ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </span>
            <InputForm
              placeholder="confirm password"
              size="large"
              type={isShowConfirm ? "text" : "password"}
            />
          </div>

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
          />
          <p style={{ fontSize: "1.5rem" }}>
            Đã có tài khoản?{" "}
            <WrapperTextLight>Đăng nhập</WrapperTextLight>
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

export default SignUpPage;
