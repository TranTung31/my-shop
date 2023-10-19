import { Badge, Col, Popover } from "antd";
import {
  WrapperCart,
  WrapperContentPopover,
  WrapperHeader,
  WrapperLogo,
  WrapperUser,
  WrapperUserAll,
  WrapperUserText,
} from "./styles";
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import * as UserService from "../../services/UserService";
import { useDispatch } from "react-redux";
import { resetUser } from "../../redux/slides/userSlide";
import { useState } from "react";
import LoadingComponent from "../LoadingComponent/LoadingComponent";

const HeaderComponent = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };

  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleLogout = async () => {
    setIsLoading(true);
    localStorage.removeItem("access_token");
    await UserService.logOutUser();
    dispatch(resetUser());
    setIsLoading(false);
  }

  const content = (
    <div>
      <WrapperContentPopover onClick={handleLogout}>Đăng xuất</WrapperContentPopover>
      <WrapperContentPopover>Thông tin người dùng</WrapperContentPopover>
    </div>
  );

  return (
    <>
      <div
        style={{
          width: "100%",
          backgroundColor: "#007fff",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <WrapperHeader>
          <Col span={6}>
            <WrapperLogo>My Shop</WrapperLogo>
          </Col>
          <Col span={12}>
            <ButtonInputSearch
              size="large"
              buttonText="Tìm kiếm"
              inputText="Vui lòng nhập"
            />
          </Col>
          <Col span={6}>
            <WrapperUserAll>
              <WrapperUser>
                <div style={{ fontSize: "30px", color: "#fff" }}>
                  <UserOutlined />
                </div>
                {user?.name ? (
                  <LoadingComponent isLoading={isLoading}>
                  <Popover content={content} trigger="click">
                    <span
                      style={{
                        color: "rgba(255, 255, 255)",
                        display: "block",
                        cursor: "pointer",
                        marginLeft: "4px",
                      }}
                    >
                      {user?.name}
                    </span>
                  </Popover>
                  </LoadingComponent>
                ) : (
                  <WrapperUserText onClick={handleNavigateLogin}>
                    <span>Đăng nhập/Đăng ký</span>
                    <span>
                      Tài khoản <CaretDownOutlined />
                    </span>
                  </WrapperUserText>
                )}
              </WrapperUser>
              <WrapperCart>
                <Badge count={5} size="small">
                  <div style={{ fontSize: "30px", color: "#fff" }}>
                    <ShoppingCartOutlined />
                  </div>
                </Badge>
                <span style={{ color: "#fff", marginLeft: "6px" }}>
                  Giỏ hàng
                </span>
              </WrapperCart>
            </WrapperUserAll>
          </Col>
        </WrapperHeader>
      </div>
    </>
  );
};

export default HeaderComponent;
