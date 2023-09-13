import { useState } from "react";
import { WrapperInput } from "./styles";

const InputForm = (props) => {
  const [valueInput, setValueInput] = useState();
  const { placeholder, ...rests } = props;
  return (
    <WrapperInput placeholder={placeholder} value={valueInput} {...rests} />
  );
};

export default InputForm;
