import SlitherComponent from "../../components/SliderComponent/SliderComponent";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import {
  WrapperButtonComponent,
  WrapperProducts,
  WrapperTypeProduct,
} from "./styles";
import slider1 from "../../assets/images/slider1.webp";
import slider2 from "../../assets/images/slider2.webp";
import slider3 from "../../assets/images/slider3.webp";
import CardProduct from "../../components/CardProduct/CardProduct";
import * as ProductService from "../../services/ProductService";
import { useSelector } from "react-redux";
import { useState } from "react";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { useDebounceHook } from "../../hooks/useDebounceHook";
import { useQuery } from "@tanstack/react-query";

const HomePage = () => {
  const arr = ["TV", "Iphone", "SamSung"];
  const [isLoading, setIsLoading] = useState(false);
  const [limitProduct, setLimitProduct] = useState(6);

  const valueSearchInput = useSelector((state) => state.product.search);
  const valueDebounce = useDebounceHook(valueSearchInput, 800);

  const fetchProduct = async (context) => {
    const valueSearch = context?.queryKey ? context?.queryKey[2] : "";
    const limit = context?.queryKey ? context?.queryKey[1] : null;
    setIsLoading(true);
    const res = await ProductService.getAllProduct(limit, valueSearch);
    setIsLoading(false);
    return res;
  };

  const { data: products } = useQuery(
    ["products", limitProduct, valueDebounce],
    fetchProduct,
    {
      retry: 3,
      retryDelay: 1000,
      keepPreviousData: true,
    }
  );

  const handleLoadMore = () => {
    console.log("abc");
    setLimitProduct((prev) => prev + 6);
  };

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
          </LoadingComponent>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <WrapperButtonComponent
              buttonText={"Xem thêm"}
              disabled={
                products?.totalProduct === products?.data?.length ||
                products?.totalPage === 1
              }
              onClick={handleLoadMore}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
