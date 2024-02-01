import {
  AccountBookOutlined,
  AppstoreOutlined,
  FormOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React, { useState } from "react";
import AdminGenre from "../../components/AdminGenre/AdminGenre";
import AdminHome from "../../components/AdminHome/AdminHome";
import AdminOrder from "../../components/AdminOrder/AdminOrder";
import AdminProduct from "../../components/AdminProduct/AdminProduct";
import AdminPublisher from "../../components/AdminPublisher/AdminPublisher";
import AdminUser from "../../components/AdminUser/AdminUser";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import { getItem } from "../../utils";
import { WrapperContent } from "./styles";

const AdminPage = () => {
  const renderKey = (key) => {
    switch (key) {
      case "home":
        return <AdminHome />;
      case "user":
        return <AdminUser />;
      case "product":
        return <AdminProduct />;
      case "order":
        return <AdminOrder />;
      case "publisher":
        return <AdminPublisher />;
      case "genre":
        return <AdminGenre />;
      default:
        return <></>;
    }
  };
  const items = [
    getItem("Trang chủ", "home", <HomeOutlined />),
    getItem("Người dùng", "user", <UserOutlined />),
    getItem("Sản phẩm", "product", <AppstoreOutlined />),
    getItem("Đơn hàng", "order", <ShoppingCartOutlined />),
    getItem("Nhà xuất bản", "publisher", <FormOutlined />),
    getItem("Thể loại", "genre", <AccountBookOutlined />),
  ];
  const [keySelected, setKeySelected] = useState("");

  const handleClick = ({ item, key }) => {
    setKeySelected(key);
  };

  return (
    <>
      <HeaderComponent isHiddenSearch isHiddenCart />
      <div style={{ display: "flex" }}>
        <Menu
          mode="inline"
          onClick={handleClick}
          style={{
            width: 256,
            height: "100vh",
            borderRight: "2px solid #ccc",
          }}
          items={items}
        />
        <WrapperContent style={{ padding: "10px 15px 15px", flex: 1 }}>
          {renderKey(keySelected)}
        </WrapperContent>
      </div>
    </>
  );
};

export default AdminPage;
