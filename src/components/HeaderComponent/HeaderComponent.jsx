import {
  CaretDownOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined
} from "@ant-design/icons";
import { Badge, Popover } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchProduct } from "../../redux/slides/productSlice";
import { resetUser } from "../../redux/slides/userSlice";
import * as UserService from "../../services/UserService";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import {
  WrapperCart,
  WrapperContentPopover,
  WrapperHeader,
  WrapperLogo,
  WrapperSearch,
  WrapperUser,
  WrapperUserAll,
  WrapperUserText,
} from "./styles";

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
    localStorage.removeItem("refresh_token");
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
        navigate("/my-order", {
          state: {
            id: user?.id,
            token: user?.access_token,
          },
        });
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
          backgroundColor: "#189eff",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <WrapperHeader>
          <div>
            <WrapperLogo onClick={() => navigate("/")}>My Shop</WrapperLogo>
          </div>

          {!isHiddenSearch && (
            <div>
              <WrapperSearch
                placeholder="Vui lòng nhập..."
                allowClear
                enterButton={<div><SearchOutlined /> Tìm kiếm</div>}
                size="large"
                onChange={handleProductSearch}
              />
            </div>
          )}

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
        </WrapperHeader>
      </div>
    </>
  );
};

export default HeaderComponent;
