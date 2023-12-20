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
import { useEffect, useState } from "react";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import { searchProduct } from "../../redux/slides/productSlice";

const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [valueName, setValueName] = useState("");
  const [valueAvatar, setValueAvatar] = useState("");

  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };

  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    setValueName(user?.name);
    setValueAvatar(user?.avatar);
    setIsLoading(false);
  }, [user?.name, user?.avatar]);

  const handleLogout = async () => {
    setIsLoading(true);
    navigate("/");
    localStorage.removeItem("access_token");
    await UserService.logOutUser();
    dispatch(resetUser());
    setIsLoading(false);
  };

  const handleClickNavigate = (type) => {
    switch (type) {
      case "profile":
        navigate("/user-detail");
        break;
      case "admin":
        navigate("/system/admin");
        break;
      case "order":
        navigate("/my-order");
        break;
      default:
        handleLogout();
    }
  };

  const content = (
    <div>
      <WrapperContentPopover onClick={() => handleClickNavigate("profile")}>
        Thông tin người dùng
      </WrapperContentPopover>
      {user?.isAdmin === true && (
        <WrapperContentPopover onClick={() => handleClickNavigate("admin")}>
          Quản lý hệ thống
        </WrapperContentPopover>
      )}
      <WrapperContentPopover onClick={() => handleClickNavigate("order")}>
        Đơn hàng của tôi
      </WrapperContentPopover>
      <WrapperContentPopover onClick={() => handleClickNavigate()}>
        Đăng xuất
      </WrapperContentPopover>
    </div>
  );

  const handleProductSearch = (e) => {
    dispatch(searchProduct({ search: e.target.value }));
  };

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
        <WrapperHeader
          style={{
            justifyContent:
              isHiddenSearch && isHiddenCart ? "space-between" : "unset",
          }}
        >
          <Col span={6}>
            <WrapperLogo onClick={() => navigate("/")}>My Shop</WrapperLogo>
          </Col>

          {!isHiddenSearch && (
            <Col span={12}>
              <ButtonInputSearch
                size="large"
                buttonText="Tìm kiếm"
                inputText="Vui lòng nhập"
                onChange={handleProductSearch}
              />
            </Col>
          )}

          <Col span={6}>
            <WrapperUserAll>
              <WrapperUser>
                {valueAvatar ? (
                  <img
                    src={valueAvatar}
                    alt="avatar"
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div style={{ fontSize: "30px", color: "#fff" }}>
                    <UserOutlined />
                  </div>
                )}

                {user?.access_token ? (
                  <LoadingComponent isLoading={isLoading}>
                    <Popover content={content} trigger="hover">
                      <span
                        style={{
                          color: "rgba(255, 255, 255)",
                          display: "block",
                          cursor: "pointer",
                          marginLeft: "4px",
                        }}
                      >
                        {valueName || user?.email || "User"}
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
              {!isHiddenCart && (
                <WrapperCart onClick={() => navigate("/order")}>
                  <Badge count={order.orderItems?.length} size="small">
                    <div style={{ fontSize: "30px", color: "#fff" }}>
                      <ShoppingCartOutlined />
                    </div>
                  </Badge>
                  <span style={{ color: "#fff", marginLeft: "6px" }}>
                    Giỏ hàng
                  </span>
                </WrapperCart>
              )}
            </WrapperUserAll>
          </Col>
        </WrapperHeader>
      </div>
    </>
  );
};

export default HeaderComponent;
