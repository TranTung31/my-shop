import { WrapperButton, WrapperHeader } from "./styles";
import { PlusOutlined } from "@ant-design/icons";
import TableComponent from "../TableComponent/TableComponent";

const AdminProduct = () => {
  return (
    <div>
      <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
      <WrapperButton type="dashed">
        Thêm <PlusOutlined />
      </WrapperButton>
      <div style={{ marginTop: "20px" }}>
        <TableComponent />
      </div>
    </div>
  );
};

export default AdminProduct;
