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
import { useEffect } from "react";

const HomePage = () => {
  const [typeProduct, setTypeProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [limitProduct, setLimitProduct] = useState(6);

  const valueSearchInput = useSelector((state) => state.product.search);
  const valueDebounce = useDebounceHook(valueSearchInput, 800);

  const [productVN, setProductVN] = useState([]);
  const [productNuocNgoai, setProductNuocNgoai] = useState([]);
  const [productKhoaHoc, setProductKhoaHoc] = useState([]);
  const [pageProduct, setPageProduct] = useState({
    limit: 6,
    page: 0,
  });

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
    setLimitProduct((prev) => prev + 6);
  };

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllType();
    if (res?.status === "OK") {
      setTypeProduct(res?.data);
    }
    return res.data;
  };

  const fetchAllBookVN = async (type, limit, page) => {
    const res = await ProductService.getAllProductType(type, limit, page);
    if (res?.status === "OK") {
      setProductVN(res?.data);
    }
    return res.data;
  };

  const fetchAllBookNuocNgoai = async (type, limit, page) => {
    const res = await ProductService.getAllProductType(type, limit, page);
    if (res?.status === "OK") {
      setProductNuocNgoai(res?.data);
    }
    return res.data;
  };

  const fetchAllBookKhoaHoc = async (type, limit, page) => {
    const res = await ProductService.getAllProductType(type, limit, page);
    if (res?.status === "OK") {
      setProductKhoaHoc(res?.data);
    }
    return res.data;
  };

  useEffect(() => {
    fetchAllBookVN("Văn học Việt Nam", pageProduct.limit, pageProduct.page);
    fetchAllBookNuocNgoai(
      "Văn học nước ngoài",
      pageProduct.limit,
      pageProduct.page
    );
    fetchAllBookKhoaHoc(
      "Kiến thức khoa học",
      pageProduct.limit,
      pageProduct.page
    );
  }, []);

  useEffect(() => {
    fetchAllTypeProduct();
  }, []);

  return (
    <>
      <div style={{ width: "1285px", margin: "0 auto" }}>
        <WrapperTypeProduct>
          {typeProduct.map((item, index) => (
            <TypeProduct type={item} key={index} />
          ))}
        </WrapperTypeProduct>
      </div>

      <div
        style={{
          width: "100%",
          backgroundColor: "#f5f5fa",
          paddingBottom: "30px",
        }}
        className="body"
      >
        <div style={{ width: "1285px", margin: "0 auto" }}>
          <SlitherComponent arrImages={[slider1, slider2, slider3]} />
          <LoadingComponent isLoading={isLoading}>
            <h2 style={{ margin: "16px 0", textAlign: "center" }}>
              SÁCH BÁN CHẠY
            </h2>
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
                  id={product._id}
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
          <LoadingComponent isLoading={isLoading}>
            <h2 style={{ margin: "16px 0", textAlign: "center" }}>
              SÁCH VĂN HỌC VIỆT NAM
            </h2>
            <WrapperProducts>
              {productVN.map((product, index) => (
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
                  id={product._id}
                />
              ))}
            </WrapperProducts>
          </LoadingComponent>
          <LoadingComponent isLoading={isLoading}>
            <h2 style={{ margin: "16px 0", textAlign: "center" }}>
              SÁCH VĂN HỌC NƯỚC NGOÀI
            </h2>
            <WrapperProducts>
              {productNuocNgoai.map((product, index) => (
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
                  id={product._id}
                />
              ))}
            </WrapperProducts>
          </LoadingComponent>
          <LoadingComponent isLoading={isLoading}>
            <h2 style={{ margin: "16px 0", textAlign: "center" }}>
              SÁCH KIẾN THỨC KHOA HỌC
            </h2>
            <WrapperProducts>
              {productKhoaHoc.map((product, index) => (
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
                  id={product._id}
                />
              ))}
            </WrapperProducts>
          </LoadingComponent>
        </div>
      </div>
    </>
  );
};

export default HomePage;
