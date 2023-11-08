import { Table } from "antd";
import LoadingComponent from "../LoadingComponent/LoadingComponent";

const TableComponent = (props) => {
  const {
    selectionType = "checkbox",
    isLoading = false,
    columns = [],
    data = [],
  } = props;

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };
  return (
    <LoadingComponent isLoading={isLoading}>
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
    </LoadingComponent>
  );
};

export default TableComponent;
