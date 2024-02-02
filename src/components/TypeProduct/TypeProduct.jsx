import { useNavigate } from "react-router-dom";
import { WrapperTextProduct } from "./styles";

const TypeProduct = ({ type, genre }) => {
  const navigate = useNavigate();

  const handleTypeProduct = () => {
    navigate(
      `/product/${type
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        ?.replace(/ /g, "_")}`,
      { state: genre }
    );
  };
  return (
    <WrapperTextProduct onClick={handleTypeProduct}>{type}</WrapperTextProduct>
  );
};

export default TypeProduct;
