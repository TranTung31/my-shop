import { Checkbox, Rate } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as ProductService from "../../services/ProductService";
import * as PublisherService from "../../services/PublisherService";
import {
  WrapperContent,
  WrapperItemCategory,
  WrapperNavbar,
  WrapperPriceText,
  WrapperTitleText,
} from "./styles";

const NavbarComponent = ({ onStateChangeCheckPublisher }) => {
  const [typeProduct, setTypeProduct] = useState([]);
  const [publisher, setPublisher] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const user = useSelector((state) => state.user);
  const onChangeCheckbox = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setSelectedValues((prevValues) => [...prevValues, value]);
    } else {
      setSelectedValues((prevValues) =>
        prevValues.filter((item) => item !== value)
      );
    }
    onStateChangeCheckPublisher(selectedValues);
  };

  const navigate = useNavigate();
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
              value={item.value}
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
    const res = await PublisherService.getAllPublisher(user?.access_token);
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

  return (
    <WrapperNavbar>
      <WrapperTitleText>Danh mục sách</WrapperTitleText>
      <WrapperContent>{renderContent("text", typeProduct)}</WrapperContent>
      <WrapperTitleText>Nhà xuất bản</WrapperTitleText>
      <WrapperContent>
        {renderContent("checkbox", dataCheckBoxPublisher)}
      </WrapperContent>
      <WrapperTitleText>Đánh giá</WrapperTitleText>
      <WrapperContent>{renderContent("review", [5, 4, 3])}</WrapperContent>
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
  );
};

export default NavbarComponent;
