import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Image } from "antd";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import imageForm from "../../assets/images/logo-signin.png";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputForm from "../../components/InputForm/InputForm";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import * as Message from "../../components/Message/Message";
import useMutationHook from "../../hooks/useMutationHook";
import { updateUser } from "../../redux/slides/userSlice";
import * as UserService from "../../services/UserService";
import {
  WrapperContainer,
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperForm,
  WrapperTextLight,
} from "./styles";

const SignInPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { state: pathProductDetail } = useLocation();

  const handleNavigateSignUp = () => {
    navigate("/sign-up");
  };

  const mutation = useMutationHook((data) => UserService.loginUser(data));

  const { data, isLoading } = mutation;

  useEffect(() => {
    if (data?.status === "OK") {
      if (!!pathProductDetail) {
        navigate(`${pathProductDetail}`);
        Message.success("Đăng nhập thành công!");
        localStorage.setItem(
          "access_token",
          JSON.stringify(data?.access_token)
        );
        localStorage.setItem(
          "refresh_token",
          JSON.stringify(data?.refresh_token)
        );

        if (data?.access_token) {
          // Giải mã access_token bằng JWT decoded
          const decoded = jwt_decode(data?.access_token);
          if (decoded?.id) {
            handleGetDetailUser(decoded?.id, data?.access_token);
          }
        }
        return;
      }

      navigate("/");
      Message.success("Đăng nhập thành công!");
      localStorage.setItem("access_token", JSON.stringify(data?.access_token));
      localStorage.setItem(
        "refresh_token",
        JSON.stringify(data?.refresh_token)
      );

      if (data?.access_token) {
        // Giải mã access_token bằng JWT decoded
        const decoded = jwt_decode(data?.access_token);
        if (decoded?.id) {
          handleGetDetailUser(decoded?.id, data?.access_token);
        }
      }
    }

    if (data?.status === "ERR") {
      Message.error("Đăng nhập thất bại!");
    }
  }, [data?.status]);

  const handleGetDetailUser = async (id, token) => {
    const storage = localStorage.getItem("refresh_token");
    const refresh_token = JSON.parse(storage);
    const res = await UserService.getDetailUser(id, token);
    dispatch(
      updateUser({
        ...res?.data,
        access_token: token,
        refresh_token: refresh_token,
      })
    );
  };

  const handleSignIn = () => {
    mutation.mutate({ email, password });
  };

  const handleKeyDown = (e) => {
    if (email && password) {
      if (e.key === "Enter") {
        mutation.mutate({ email, password });
      }
    }
  };

  return (
    <WrapperContainer>
      <WrapperForm>
        <WrapperContainerLeft>
          <h1 style={{ fontSize: "24px", fontWeight: "590" }}>Xin chào</h1>
          <span style={{ fontSize: "16px", lineHeight: "20px" }}>
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
              onClick={() => setIsShowPassword(!isShowPassword)}
              style={{
                fontSize: "16px",
                position: "absolute",
                zIndex: "10",
                top: "10px",
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
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {data?.status === "ERR" && (
              <span
                style={{
                  fontSize: "15px",
                  color: "red",
                  display: "block",
                  paddingTop: "10px",
                }}
              >
                {data?.message}
              </span>
            )}
          </div>
          <LoadingComponent isLoading={isLoading}>
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
          </LoadingComponent>
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
    </WrapperContainer>
  );
};

export default SignInPage;
