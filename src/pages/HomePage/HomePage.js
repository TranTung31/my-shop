import { useQuery } from "@tanstack/react-query";
import { Space } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
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
import ListProducts from "./ListProducts/ListProducts";
import {
  WrapperButtonComponent,
  WrapperDropdown,
  WrapperNav,
  WrapperProducts,
  WrapperTypeProduct,
} from "./styles";

const HomePage = () => {
  const [genreProduct, setGenreProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingBookVN, setIsLoadingBookVN] = useState(false);
  const [isLoadingBookNN, setIsLoadingBookNN] = useState(false);
  const [isLoadingBookKT, setIsLoadingBookKT] = useState(false);
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

  const navigate = useNavigate();

  const fetchProduct = async (context) => {
    const valueSearch = context?.queryKey ? context?.queryKey[2] : "";
    const limit = context?.queryKey ? context?.queryKey[1] : null;
    setIsLoading(true);
    const res = await ProductService.getAllProduct(limit, valueSearch);
    setIsLoading(false);
    return res;
  };

  const { data: products } = useQuery(
    ["products", limitProduct],
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
    setIsLoadingBookVN(true);
    const res = await ProductService.getAllProductType(genre, limit, page);
    if (res?.status === "OK") {
      setProductVN(res?.data);
    }
    setIsLoadingBookVN(false);
    return res.data;
  };

  const fetchAllBookNuocNgoai = async (genre, limit, page) => {
    setIsLoadingBookNN(true);
    const res = await ProductService.getAllProductType(genre, limit, page);
    if (res?.status === "OK") {
      setProductNuocNgoai(res?.data);
    }
    setIsLoadingBookNN(false);
    return res.data;
  };

  const fetchAllBookKhoaHoc = async (genre, limit, page) => {
    setIsLoadingBookKT(true);
    const res = await ProductService.getAllProductType(genre, limit, page);
    if (res?.status === "OK") {
      setProductKhoaHoc(res?.data);
    }
    setIsLoadingBookKT(false);
    return res.data;
  };

  useEffect(() => {
    fetchAllBookVN("65b36e4471282a077bff5239", 12, pageProduct.page);
    fetchAllBookNuocNgoai("65b36e9e71282a077bff523f", 12, pageProduct.page);
    fetchAllBookKhoaHoc("65b6252b39026dfbaca3ec97", 12, pageProduct.page);
  }, []);

  useEffect(() => {
    fetchAllGenreProduct();
  }, []);

  const items = genreProduct.map((item, index) => ({
    key: `${index}`,
    label: <TypeProduct type={item?.name} genre={item?._id} />,
  }));

  return (
    <>
      <div style={{ width: "1285px", margin: "0 auto" }}>
        <WrapperTypeProduct>
          <WrapperDropdown
            menu={{
              items,
            }}
          >
            <Space>
              {/* <UnorderedListOutlined /> */}
              Danh Mục Sản Phẩm
            </Space>
          </WrapperDropdown>
          <WrapperNav onClick={() => navigate("/intro")}>Giới thiệu</WrapperNav>
          <WrapperNav onClick={() => navigate("/contact")}>Liên hệ</WrapperNav>
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
            <h2 style={{ margin: "20px 0 0", textAlign: "center" }}>
              SÁCH BÁN CHẠY
            </h2>
            <WrapperProducts>
              {products?.data
                ?.filter((product) =>
                  product.name
                    .toLowerCase()
                    .includes(valueDebounce.toLowerCase())
                )
                .map((product, index) => (
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

          <ListProducts
            products={productVN}
            title="SÁCH VĂN HỌC VIỆT NAM"
            isLoading={isLoadingBookVN}
          />
          <ListProducts
            products={productNuocNgoai}
            title="SÁCH VĂN HỌC NƯỚC NGOÀI"
            isLoading={isLoadingBookNN}
          />
          <ListProducts
            products={productKhoaHoc}
            title="SÁCH KIẾN THỨC KHOA HỌC"
            isLoading={isLoadingBookKT}
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;
