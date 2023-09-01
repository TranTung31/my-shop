import SlitherComponent from "../../components/SliderComponent/SliderComponent";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { WrapperButtonMore, WrapperTypeProduct } from "./styles";
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
      <div
        style={{
          backgroundColor: "#efefef",
          padding: "0 120px",
          height: "2000px",
        }}
      >
        <SlitherComponent arrImages={[slider1, slider2, slider3]} />
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <WrapperButtonMore
            buttonText={"Xem thêm"}
            styleButton={{
              width: "240px",
              height: "38px",
              border: "1px solid #0060ff",
              borderRadius: "6px",
              color: "rgb(0, 96, 255)",
              fontSize: "1.6rem",
              fontWeight: 600,
              marginTop: "20px",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;
