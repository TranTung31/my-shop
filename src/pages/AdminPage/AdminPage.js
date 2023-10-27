import React, { useState } from "react";
import { AppstoreOutlined, UserOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { getItem } from "../../utils";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import AdminUser from "../../components/AdminUser/AdminUser";
import AdminProduct from "../../components/AdminProduct/AdminProduct";
import { WrapperContent } from "./styles";

const AdminPage = () => {
  const renderKey = (key) => {
    switch (key) {
      case "user":
        return <AdminUser />;
      case "product":
        return <AdminProduct />;
      default:
        return <></>;
    }
  };
  const items = [
    getItem("Người dùng", "user", <UserOutlined />),
    getItem("Sản phẩm", "product", <AppstoreOutlined />),
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
