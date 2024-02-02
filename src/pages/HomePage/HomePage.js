import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import slider1 from "../../assets/images/slider1.webp";
import slider2 from "../../assets/images/slider2.webp";
import slider3 from "../../assets/images/slider3.webp";
import CardProduct from "../../components/CardProduct/CardProduct";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import SlitherComponent from "../../components/SliderComponent/SliderComponent";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { useDebounceHook } from "../../hooks/useDebounceHook";
import * as GenreService from "../../services/GenreService";
import * as ProductService from "../../services/ProductService";
import {
  WrapperButtonComponent,
  WrapperProducts,
  WrapperTypeProduct,
} from "./styles";

const HomePage = () => {
  const [genreProduct, setGenreProduct] = useState([]);
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

  const fetchAllGenreProduct = async () => {
    const res = await GenreService.getAllGenre();
    setGenreProduct(res?.data);
  };

  const fetchAllBookVN = async (genre, limit, page) => {
    const res = await ProductService.getAllProductType(genre, limit, page);
    if (res?.status === "OK") {
      setProductVN(res?.data);
    }
    return res.data;
  };

  const fetchAllBookNuocNgoai = async (genre, limit, page) => {
    const res = await ProductService.getAllProductType(genre, limit, page);
    if (res?.status === "OK") {
      setProductNuocNgoai(res?.data);
    }
    return res.data;
  };

  const fetchAllBookKhoaHoc = async (genre, limit, page) => {
    const res = await ProductService.getAllProductType(genre, limit, page);
    if (res?.status === "OK") {
      setProductKhoaHoc(res?.data);
    }
    return res.data;
  };

  useEffect(() => {
    fetchAllBookVN(
      "65b36e4471282a077bff5239",
      pageProduct.limit,
      pageProduct.page
    );
    fetchAllBookNuocNgoai(
      "65b36e9e71282a077bff523f",
      pageProduct.limit,
      pageProduct.page
    );
    fetchAllBookKhoaHoc(
      "65b6252b39026dfbaca3ec97",
      pageProduct.limit,
      pageProduct.page
    );
  }, []);

  useEffect(() => {
    fetchAllGenreProduct();
  }, []);

  return (
    <>
      <div style={{ width: "1285px", margin: "0 auto" }}>
        <WrapperTypeProduct>
          {genreProduct.map((item, index) => (
            <TypeProduct type={item?.name} genre={item?._id} key={index} />
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
