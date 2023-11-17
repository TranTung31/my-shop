import SlitherComponent from "../../components/SliderComponent/SliderComponent";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { WrapperProducts, WrapperTypeProduct } from "./styles";
import slider1 from "../../assets/images/slider1.webp";
import slider2 from "../../assets/images/slider2.webp";
import slider3 from "../../assets/images/slider3.webp";
import CardProduct from "../../components/CardProduct/CardProduct";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import * as ProductService from "../../services/ProductService";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { useDebounceHook } from "../../hooks/useDebounceHook";

const HomePage = () => {
  const arr = ["TV", "Iphone", "SamSung"];
  const [isLoading, setIsLoading] = useState(false);
  const [dataProduct, setDataProduct] = useState([]);
  const isFirstRender = useRef(true);

  const valueSearchInput = useSelector((state) => state.product.search);
  const valueSearch = useDebounceHook(valueSearchInput, 800);

  // Delay lần đầu tiên gọi API
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const fetchProduct = async () => {
      setIsLoading(true);
      const res = await ProductService.getAllProduct(valueSearch);
      setDataProduct(res.data);
      setIsLoading(false);
    };

    fetchProduct();
  }, [valueSearch]);

  const getAllProduct = async () => {
    const res = await ProductService.getAllProduct();
    setDataProduct(res.data);
    return res;
  };

  useEffect(() => {
    getAllProduct();
  }, []);

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
          <LoadingComponent isLoading={isLoading}>
            <WrapperProducts>
              {dataProduct?.map((product, index) => (
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
          </LoadingComponent>
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
