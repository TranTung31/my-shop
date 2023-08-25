import { Input } from "antd";

const InputComponent = ({ placeholder, size, style, ...rests }) => {
  return (
    <Input placeholder={placeholder} size={size} style={style} {...rests} />
  );
};

export default InputComponent;
