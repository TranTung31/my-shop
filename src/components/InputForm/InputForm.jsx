import { WrapperInput } from "./styles";

const InputForm = (props) => {
  const { placeholder, value, onChange, style, ...rests } = props;
  return (
    <WrapperInput
      placeholder={placeholder}
      value={value}
      style={style}
      onChange={onChange}
      {...rests}
    />
  );
};

export default InputForm;
