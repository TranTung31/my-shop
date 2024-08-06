import {
  CaretDownOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Badge, Popover } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetUser } from "../../redux/slides/userSlice";
import * as UserService from "../../services/UserService";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import { WrapperContentPopover, WrapperSearch } from "./styles";

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
      case "password":
        navigate("/change-password");
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
      <WrapperContentPopover onClick={() => handleClickNavigate("password")}>
        Đổi mật khẩu
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
    <div className="bg-[#189eff] flex justify-center">
      <div className="w-[1285px] h-[70px] flex items-center justify-between py-[10px] overflow-x-auto whitespace-nowrap">
        <div
          onClick={() => navigate("/")}
          className="text-lg cursor-pointer text-white font-semibold mr-4"
        >
          PeggyBooks Shop
        </div>

        {!isHiddenSearch && (
          <div className="mx-4">
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

        <div className="flex items-center gap-[30px] ml-4">
          <div className="flex items-center gap-1">
            {valueAvatar && (
              <img
                src={valueAvatar}
                alt="avatar"
                className="w-[36px] h-[36px] rounded-[50%] object-cover flex-shrink-0"
              />
            )}

            {user?.access_token ? (
              <LoadingComponent isLoading={isLoading}>
                <Popover content={content} trigger="hover">
                  <span className="text-white block cursor-pointer">
                    {valueName || user?.email}
                  </span>
                </Popover>
              </LoadingComponent>
            ) : (
              <div
                className="flex flex-col text-white cursor-pointer"
                onClick={() => navigate("/sign-in")}
              >
                <span>Đăng nhập/Đăng ký</span>
                <span className="flex items-center gap-1">
                  Tài khoản <CaretDownOutlined />
                </span>
              </div>
            )}
          </div>

          {!isHiddenCart && (
            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => navigate("/order")}
            >
              <Badge count={order.orderItems?.length} size="small">
                <div className="text-[30px] text-white">
                  <ShoppingCartOutlined />
                </div>
              </Badge>
              <span className="text-white">Giỏ hàng</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderComponent;
