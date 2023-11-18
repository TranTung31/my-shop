import { Col, Pagination, Row } from "antd";
import CardProduct from "../../components/CardProduct/CardProduct";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import { WrapperProducts } from "./styles";
import * as ProductService from "../../services/ProductService";
import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";

const TypeProductPage = () => {
  const { state: stateType } = useLocation();
  const param = useParams();
  const [productType, setProductType] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllProductType = async (type) => {
    setIsLoading(true);
    const res = await ProductService.getAllProductType(type);
    if (res?.status === "OK") {
      setProductType(res?.data);
    }
    setIsLoading(false);
    return res.data;
  };

  useEffect(() => {
    fetchAllProductType(stateType);
  }, [stateType]);

  return (
    <div style={{ width: "100%", backgroundColor: "rgb(239, 239, 239)" }}>
      <div style={{ width: "1285px", margin: "0 auto" }}>
        <LoadingComponent isLoading={isLoading}>
          <Row style={{ padding: "20px 0" }}>
            <Col span={4}>
              <NavbarComponent />
            </Col>
            <Col span={20}>
              <WrapperProducts>
                {productType?.map((product, index) => (
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
                total={50}
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
