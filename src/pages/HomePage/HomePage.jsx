import SlitherComponent from "../../components/SliderComponent/SliderComponent";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { WrapperProducts, WrapperTypeProduct } from "./styles";
import slider1 from "../../assets/images/slider1.webp";
import slider2 from "../../assets/images/slider2.webp";
import slider3 from "../../assets/images/slider3.webp";
import CardProduct from "../../components/CardProduct/CardProduct";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../services/ProductService";

const HomePage = () => {
  const arr = ["TV", "Iphone", "SamSung"];

  const getAllProduct = async () => {
    const res = await ProductService.getAllProduct();
    return res;
  };

  const { data: products } = useQuery(["products"], getAllProduct);

  console.log("products: ", products);

  return (
    <>
      <div style={{ width: "1285px", margin: "0 auto" }}>
        <WrapperTypeProduct>
          {arr.map((item, index) => (
            <TypeProduct name={item} key={index} />
          ))}
        </WrapperTypeProduct>
      </div>

      <div
        style={{
          backgroundColor: "#efefef",
          width: "100%",
        }}
        className="body"
      >
        <div style={{ width: "1285px", margin: "0 auto" }}>
          <SlitherComponent arrImages={[slider1, slider2, slider3]} />
          <WrapperProducts>
            {products?.data?.map((product, index) => (
              <CardProduct
                key={product._id}
                name={product.name}
                price={product.price}
                image={product.image}
                rating={product.rating}
                description={product.description}
                countInStock={product.countInStock}
                type={product.type}
                discount={product.discount}
                selled={product.selled}
              />
            ))}
          </WrapperProducts>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ButtonComponent
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
      </div>
    </>
  );
};

export default HomePage;
