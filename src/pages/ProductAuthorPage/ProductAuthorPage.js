import { useQuery } from "@tanstack/react-query";
import { Checkbox, Col, Pagination, Rate, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import CardProduct from "../../components/CardProduct/CardProduct";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { useDebounceHook } from "../../hooks/useDebounceHook";
import * as AuthorService from "../../services/AuthorService";
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
  WrapperProductAuthor,
  WrapperProducts,
  WrapperPublisher,
  WrapperTitleText,
} from "./styles";

const ProductAuthorPage = () => {
  const { id: authorId } = useParams();
  const { search: valueSearch } = useSelector((state) => state.product);
  const searchDebound = useDebounceHook(valueSearch, 1000);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [productAuthor, setProductAuthor] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalProduct, setTotalProduct] = useState(1);
  const [pageProduct, setPageProduct] = useState({
    limit: 10,
    page: 0,
  });
  const [sortValue, setSortValue] = useState("");
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

  const fetchGetProductAuthor = async () => {
    setIsLoading(true);
    const res = await ProductService.getProductAuthor(
      authorId,
      pageProduct.limit,
      pageProduct.page,
      selectedValues,
      sortValue
    );
    if (res?.data) {
      setProductAuthor(res?.data);
      setTotalProduct(res?.data?.length);
    }
    setIsLoading(false);
    return res.data;
  };

  useEffect(() => {
    fetchGetProductAuthor();
  }, [authorId, pageProduct, selectedValues, sortValue]);

  const fetchGetAuthor = async () => {
    const res = await AuthorService.getDetailAuthor(authorId);
    return res.data;
  };

  const queryGetAuthor = useQuery(["author"], fetchGetAuthor);

  const { data: dataAuthor } = queryGetAuthor;

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
                  `/product/${item?.name
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    ?.replace(/ /g, "_")}`,
                  { state: item?._id }
                );
              }}
            >
              {item?.name}
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

  const fetchAllPublisher = async () => {
    const res = await PublisherService.getAllPublisher();
    if (res?.status === "OK") {
      setPublisher(res?.data);
    }
  };

  useEffect(() => {
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
    <WrapperProductAuthor>
      <div style={{ width: "1285px", height: "100%", margin: "0 auto" }}>
        <WrapperNavigation>
          <WrapperNavigationHome onClick={() => navigate("/")}>
            Trang chủ
          </WrapperNavigationHome>
          <span> -- Các sách của tác giả {dataAuthor?.name}</span>
        </WrapperNavigation>
        <Row
          style={{ flexWrap: "nowrap", paddingBottom: "20px", height: "100%" }}
        >
          <Col span={4}>
            <WrapperNavbar>
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
                {productAuthor
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
    </WrapperProductAuthor>
  );
};

export default ProductAuthorPage;
