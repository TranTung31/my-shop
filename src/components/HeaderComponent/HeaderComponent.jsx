import {
  CaretDownOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Badge, Popover } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetUser } from "../../redux/slides/userSlice";
import * as UserService from "../../services/UserService";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import {
  WrapperCart,
  WrapperContainer,
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
  const [valueSearch, setValueSearch] = useState("");

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
      case "contact":
        navigate("/my-contact", {
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
      <WrapperContentPopover onClick={() => handleClickNavigate("contact")}>
        Liên hệ của tôi
      </WrapperContentPopover>
      <WrapperContentPopover onClick={() => handleClickNavigate()}>
        Đăng xuất
      </WrapperContentPopover>
    </div>
  );

  const handleOnChangeSearch = (e) => {
    setValueSearch(e.target.value);
  };

  const handleSearch = () => {
    if (!valueSearch) {
      alert("Vui lòng nhập giá trị để tìm kiếm!");
    } else {
      navigate(`/search?q=${valueSearch}`);
    }
  };

  const handelOnKeyPressSearch = (e) => {
    if (e.keyCode === 13) {
      handleSearch();
    }
  };

  return (
    <WrapperContainer>
      <WrapperHeader>
        <div>
          <WrapperLogo onClick={() => navigate("/")}>
            PeggyBooks Shop
          </WrapperLogo>
        </div>

        {!isHiddenSearch && (
          <div>
            <WrapperSearch
              placeholder="Vui lòng nhập..."
              allowClear
              enterButton={
                <div onClick={handleSearch}>
                  <SearchOutlined /> Tìm kiếm
                </div>
              }
              size="large"
              value={valueSearch}
              onKeyUp={handelOnKeyPressSearch}
              onChange={handleOnChangeSearch}
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
                    {valueName || user?.email}
                  </span>
                </Popover>
              </LoadingComponent>
            ) : (
              <WrapperUserText onClick={() => navigate("/sign-in")}>
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
              <span style={{ color: "#fff", marginLeft: "6px" }}>Giỏ hàng</span>
            </WrapperCart>
          )}
        </WrapperUserAll>
      </WrapperHeader>
    </WrapperContainer>
  );
};

export default HeaderComponent;
