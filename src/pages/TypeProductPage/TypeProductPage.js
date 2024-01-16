import { Col, Pagination, Row } from "antd";
import CardProduct from "../../components/CardProduct/CardProduct";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import { WrapperProducts } from "./styles";
import * as ProductService from "../../services/ProductService";
import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { useSelector } from "react-redux";
import { useDebounceHook } from "../../hooks/useDebounceHook";

const TypeProductPage = () => {
  const { state: stateType } = useLocation();
  const { search: valueSearch } = useSelector((state) => state.product);
  const searchDebound = useDebounceHook(valueSearch, 1000);
  const param = useParams();
  const [productType, setProductType] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalProduct, setTotalProduct] = useState(1);
  const [pageProduct, setPageProduct] = useState({
    limit: 10,
    page: 0,
  });
  
  const fetchAllProductType = async (type, limit, page) => {
    setIsLoading(true);
    const res = await ProductService.getAllProductType(type, limit, page);
    if (res?.status === "OK") {
      setProductType(res?.data);
    }
    setIsLoading(false);
    return res.data;
  };

  const fetchNewAllProductType = async (type) => {
    const res = await ProductService.getAllProductType(type);
    if (res?.status === "OK") {
      setTotalProduct(res?.data?.length);
    }
    return res.data;
  };

  useEffect(() => {
    fetchAllProductType(stateType, pageProduct.limit, pageProduct.page);
    fetchNewAllProductType(stateType);
  }, [stateType, pageProduct]);

  const onChange = (page, pageSize) => {
    setPageProduct({
      ...pageProduct,
      page: page - 1,
    });
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "rgb(239, 239, 239)",
      }}
    >
      <div style={{ width: "1285px", height: "100%", margin: "0 auto" }}>
        <LoadingComponent isLoading={isLoading}>
          <Row
            style={{ flexWrap: "nowrap", padding: "20px 0", height: "100%" }}
          >
            <Col span={4}>
              <NavbarComponent />
            </Col>
            <Col span={20}>
              <WrapperProducts>
                {productType
                  ?.filter((product) =>
                    product.name
                      .toLowerCase()
                      .includes(searchDebound.toLowerCase())
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
              <Pagination
                defaultCurrent={1}
                total={totalProduct}
                pageSize={10}
                onChange={onChange}
                style={{ textAlign: "center", marginTop: "20px" }}
              />
            </Col>
          </Row>
        </LoadingComponent>
      </div>
    </div>
  );
};

export default TypeProductPage;
