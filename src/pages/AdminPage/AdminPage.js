import React, { useState } from "react";
import {
  AppstoreOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { getItem } from "../../utils";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import AdminHome from "../../components/AdminHome/AdminHome";
import AdminUser from "../../components/AdminUser/AdminUser";
import AdminOrder from "../../components/AdminOrder/AdminOrder";
import AdminProduct from "../../components/AdminProduct/AdminProduct";
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
      default:
        return <></>;
    }
  };
  const items = [
    getItem("Trang chủ", "home", <HomeOutlined />),
    getItem("Người dùng", "user", <UserOutlined />),
    getItem("Sản phẩm", "product", <AppstoreOutlined />),
    getItem("Đơn hàng", "order", <ShoppingCartOutlined />),
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
