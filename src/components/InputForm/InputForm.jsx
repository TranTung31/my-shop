import { Input } from "antd";

const InputForm = (props) => {
  const { placeholder, value, onChange, onKeyDown, style, ...rests } = props;
  return (
    <Input
      placeholder={placeholder}
      value={value}
      style={style}
      onChange={onChange}
      onKeyDown={onKeyDown}
      {...rests}
      className=""
    />
  );
};

export default InputForm;
