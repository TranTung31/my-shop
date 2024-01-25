import { Checkbox, Col, Pagination, Rate, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import CardProduct from "../../components/CardProduct/CardProduct";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { useDebounceHook } from "../../hooks/useDebounceHook";
import * as ProductService from "../../services/ProductService";
import * as PublisherService from "../../services/PublisherService";
import {
  WrapperContent,
  WrapperItemCategory,
  WrapperItemPublisher,
  WrapperNavbar,
  WrapperNavigation,
  WrapperNavigationHome,
  WrapperPagination,
  WrapperPriceText,
  WrapperProducts,
  WrapperPublisher,
  WrapperTitleText,
  WrapperTypeProduct,
} from "./styles";

const TypeProductPage = () => {
  const { state: stateType } = useLocation();
  const { search: valueSearch } = useSelector((state) => state.product);
  const searchDebound = useDebounceHook(valueSearch, 1000);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [productType, setProductType] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalProduct, setTotalProduct] = useState(1);
  const [pageProduct, setPageProduct] = useState({
    limit: 10,
    page: 0,
  });
  const [sortValue, setSortValue] = useState("");
  const [typeProduct, setTypeProduct] = useState([]);
  const [publisher, setPublisher] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [selectedNames, setSelectedNames] = useState([]);

  const onChangeCheckbox = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (e.target.checked) {
      setSelectedValues((prevValues) => [...prevValues, value]);
      setSelectedNames((prevNames) => [...prevNames, name]);
    } else {
      setSelectedValues((prevValues) =>
        prevValues.filter((item) => item !== value)
      );
      setSelectedNames((prevNames) =>
        prevNames.filter((item) => item !== name)
      );
    }
  };

  const fetchAllProductType = async (
    type,
    limit,
    page,
    selectedValues,
    sortValue
  ) => {
    setIsLoading(true);
    const res = await ProductService.getAllProductType(
      type,
      limit,
      page,
      selectedValues,
      sortValue
    );
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
    fetchAllProductType(
      stateType,
      pageProduct.limit,
      pageProduct.page,
      selectedValues,
      sortValue
    );
  }, [stateType, pageProduct, selectedValues, sortValue]);

  useEffect(() => {
    fetchNewAllProductType(stateType);
  }, []);

  const onChange = (page, pageSize) => {
    setPageProduct({
      ...pageProduct,
      page: page - 1,
    });
  };

  const renderContent = (type, option) => {
    switch (type) {
      case "text":
        return option.map((item, index) => {
          return (
            <WrapperItemCategory
              key={index}
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate(
                  `/product/${item
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    ?.replace(/ /g, "_")}`,
                  { state: item }
                );
              }}
            >
              {item}
            </WrapperItemCategory>
          );
        });
      case "checkbox":
        return option.map((item, index) => {
          return (
            <Checkbox
              onChange={onChangeCheckbox}
              key={index}
              name={item.text}
              value={item.value}
              checked={selectedValues.includes(item.value)}
            >
              <span style={{ fontFamily: "Time New Roman", fontSize: "14px" }}>
                {item.text}
              </span>
            </Checkbox>
          );
        });
      case "price":
        return option.map((item, index) => {
          return (
            <WrapperPriceText key={index} style={{ cursor: "pointer" }}>
              {item}
            </WrapperPriceText>
          );
        });
      case "review":
        return option.map((item, index) => {
          return (
            <div style={{ display: "flex", alignItems: "center" }} key={index}>
              <Rate style={{ fontSize: "12px" }} value={item} />
              <span
                style={{
                  fontSize: "14px",
                  color: "#242424",
                  paddingLeft: "4px",
                  position: "relative",
                  top: "2px",
                }}
              >
                {" "}
                từ {item} sao
              </span>
            </div>
          );
        });
      default:
        return {};
    }
  };

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllType();
    if (res?.status === "OK") {
      setTypeProduct(res?.data);
    }
    return res.data;
  };

  const fetchAllPublisher = async () => {
    const res = await PublisherService.getAllPublisher();
    if (res?.status === "OK") {
      setPublisher(res?.data);
    }
  };

  useEffect(() => {
    fetchAllTypeProduct();
    fetchAllPublisher();
  }, []);

  const dataCheckBoxPublisher = publisher?.map((item, index) => {
    return {
      value: item._id,
      text: item.name,
    };
  });

  const handleChange = (value) => {
    setSortValue(value);
  };

  return (
    <WrapperTypeProduct>
      <div style={{ width: "1285px", height: "100%", margin: "0 auto" }}>
        <WrapperNavigation>
          <WrapperNavigationHome onClick={() => navigate("/")}>
            Trang chủ
          </WrapperNavigationHome>
          <span> -- Xem sản phẩm theo danh mục</span>
        </WrapperNavigation>
        <Row
          style={{ flexWrap: "nowrap", paddingBottom: "20px", height: "100%" }}
        >
          <Col span={4}>
            <WrapperNavbar>
              <WrapperTitleText>Danh mục sách</WrapperTitleText>
              <WrapperContent>
                {renderContent("text", typeProduct)}
              </WrapperContent>
              <WrapperTitleText>Nhà xuất bản</WrapperTitleText>
              <WrapperContent>
                {renderContent("checkbox", dataCheckBoxPublisher)}
              </WrapperContent>
              <WrapperTitleText>Đánh giá</WrapperTitleText>
              <WrapperContent>
                {renderContent("review", [5, 4, 3])}
              </WrapperContent>
              <WrapperTitleText>Giá</WrapperTitleText>
              <WrapperContent>
                {renderContent("price", [
                  "Dưới 50.000",
                  "Từ 50.000 -> 120.000",
                  "120.000 -> 280.000",
                  "Trên 280.000",
                ])}
              </WrapperContent>
            </WrapperNavbar>
          </Col>
          <Col span={20}>
            <LoadingComponent isLoading={isLoading}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <ButtonComponent
                  onClick={() => {
                    setSelectedValues([]);
                    setSelectedNames([]);
                    setSortValue("");
                  }}
                  buttonText="Xóa bộ lọc"
                >
                  Xóa tất cả
                </ButtonComponent>
                <WrapperPagination>
                  <Pagination
                    defaultCurrent={1}
                    total={totalProduct}
                    pageSize={10}
                    onChange={onChange}
                    style={{ textAlign: "center", marginTop: "20px" }}
                  />
                  <Select
                    defaultValue="asc"
                    style={{
                      width: 160,
                    }}
                    onChange={handleChange}
                    options={[
                      {
                        value: "asc",
                        label: "Giá thấp đến cao",
                      },
                      {
                        value: "desc",
                        label: "Giá cao đến thấp",
                      },
                    ]}
                  />
                </WrapperPagination>
              </div>
              <WrapperPublisher>
                {selectedNames.length > 0
                  ? selectedNames.map((item, index) => (
                      <WrapperItemPublisher key={index}>
                        {item}
                      </WrapperItemPublisher>
                    ))
                  : null}
              </WrapperPublisher>
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
            </LoadingComponent>
          </Col>
        </Row>
      </div>
    </WrapperTypeProduct>
  );
};

export default TypeProductPage;
