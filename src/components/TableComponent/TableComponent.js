import { Table } from "antd";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { useState } from "react";

const TableComponent = (props) => {
  const [isSelectedRowKeys, setIsSelectedRowKeys] = useState([]);
  const {
    selectionType = "checkbox",
    isLoading = false,
    columns = [],
    data = [],
    handleDelete,
  } = props;

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setIsSelectedRowKeys(selectedRowKeys);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  const handleDeleteMany = () => {
    handleDelete(isSelectedRowKeys);
  };

  return (
    <LoadingComponent isLoading={isLoading}>
      {isSelectedRowKeys.length > 0 && (
        <ButtonComponent
          buttonText="Xóa tất cả"
          styleButton={{
            backgroundColor: "#fff",
            marginBottom: "20px",
            color: "#007fff",
            border: "1px solid #007fff",
            fontWeight: 600,
          }}
          size="large"
          className="wrapper-button"
          onClick={handleDeleteMany}
        />
      )}
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        {...props}
      />
    </LoadingComponent>
  );
};

export default TableComponent;
