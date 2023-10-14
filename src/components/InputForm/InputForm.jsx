import { WrapperInput } from "./styles";

const InputForm = (props) => {
  const { placeholder, value, onChange, ...rests } = props;
  return (
    <WrapperInput placeholder={placeholder} value={value} onChange={onChange} {...rests} />
  );
};

export default InputForm;
