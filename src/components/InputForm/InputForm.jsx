import { WrapperInput } from "./styles";

const InputForm = (props) => {
  const { placeholder, value, onChange, onKeyDown, style, ...rests } = props;
  return (
    <WrapperInput
      placeholder={placeholder}
      value={value}
      style={style}
      onChange={onChange}
      onKeyDown={onKeyDown}
      {...rests}
    />
  );
};

export default InputForm;
