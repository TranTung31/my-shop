import { Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const ButtonInputSearch = (props) => {
  const {
    size,
    inputText,
    buttonText,
    backGroundInput = "#fff",
    backGroundButton = "#0d5bb5",
  } = props;
  return (
    <div style={{ display: "flex" }}>
      <Input
        placeholder={inputText}
        size={size}
        style={{ backgroundColor: backGroundInput, borderRadius: "inherit" }}
      />
      <Button
        icon={<SearchOutlined />}
        size={size}
        style={{
          backgroundColor: backGroundButton,
          border: "none",
          borderRadius: "inherit",
          color: "#fff",
        }}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default ButtonInputSearch;
