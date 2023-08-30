import SlitherComponent from "../../components/SliderComponent/SliderComponent";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { WrapperTypeProduct } from "./styles";
import slider1 from "../../assets/images/slider1.webp";
import slider2 from "../../assets/images/slider2.webp";
import slider3 from "../../assets/images/slider3.webp";
import CardProduct from "../../components/CardProduct/CardProduct";

const HomePage = () => {
  const arr = ["TV", "Iphone", "SamSung"];
  return (
    <>
      <div style={{ padding: "0 120px" }}>
        <WrapperTypeProduct>
          {arr.map((item, index) => (
            <TypeProduct name={item} key={index} />
          ))}
        </WrapperTypeProduct>
      </div>
      <div style={{ backgroundColor: "#efefef", padding: "0 120px", height: "1000px" }}>
        <SlitherComponent arrImages={[slider1, slider2, slider3]} />
        <div style={{ marginTop: "20px", display: "flex", alignItems: "center", gap: "20px" }}>
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
        </div>
      </div>
    </>
  );
};

export default HomePage;
