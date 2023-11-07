import { WrapperButton, WrapperHeader } from "./styles";
import { PlusOutlined } from "@ant-design/icons";
import TableComponent from "../TableComponent/TableComponent";
import { Modal } from "antd";
import { useState } from "react";

const AdminUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  
  return (
    <div>
      <WrapperHeader>Quản lý người dùng</WrapperHeader>
      <WrapperButton type="dashed" onClick={showModal}>
        Thêm <PlusOutlined />
      </WrapperButton>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
      <div style={{ marginTop: "20px" }}>
        <TableComponent />
      </div>
    </div>
  );
};

export default AdminUser;
