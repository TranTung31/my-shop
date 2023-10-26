import React, { useState } from "react";
import {
  AppstoreOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { getItem } from "../../utils";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";

const AdminPage = () => {
  const items = [
    getItem("Người dùng", "sub1", <UserOutlined />, [
      getItem("Option 1", "1"),
      getItem("Option 2", "2"),
      getItem("Option 3", "3"),
      getItem("Option 4", "4"),
    ]),
    getItem("Sản phẩm", "sub2", <AppstoreOutlined />, [
      getItem("Option 5", "5"),
      getItem("Option 6", "6"),
      getItem("Submenu", "sub3", null, [
        getItem("Option 7", "7"),
        getItem("Option 8", "8"),
      ]),
    ])
  ];
  const rootSubmenuKeys = ["sub1", "sub2", "sub4"];
  const [openKeys, setOpenKeys] = useState(["sub1"]);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const [keySelected, setKeySelected] = useState("");

  const handleClick = ({ item, key }) => {
    setKeySelected(key)
  }

  return (
    <>
      <HeaderComponent isHiddenSearch isHiddenCart/>
      <div style={{ display: "flex" }}>
        <Menu
          mode="inline"
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          onClick={handleClick}
          style={{
            width: 256,
          }}
          items={items}
        />
        <div>{`Value option ${keySelected}`}</div>
      </div>
    </>
  );
};

export default AdminPage;
