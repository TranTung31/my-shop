import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { WrapperTypeProduct } from "./styles";

const HomePage = () => {
  const arr = ["TV", "Iphone", "SamSung"];
  return (
    <div style={{ padding: "0 120px" }}>
      <WrapperTypeProduct>
          {arr.map((item, index) => (
            <TypeProduct name={item} key={index} />
          ))}
      </WrapperTypeProduct>
      <h1>HomePage</h1>
    </div>
  );
};

export default HomePage;
