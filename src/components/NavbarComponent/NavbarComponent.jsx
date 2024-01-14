import { Checkbox, Rate } from "antd";
import {
  WrapperContent,
  WrapperItemCategory,
  WrapperNavbar,
  WrapperPriceText,
  WrapperTitleText,
} from "./styles";
import * as ProductService from "../../services/ProductService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const NavbarComponent = () => {
  const [typeProduct, setTypeProduct] = useState([]);
  const onChange = () => {};
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
            <Checkbox onChange={onChange} key={index} value={item.value}>
              <span style={{ fontFamily: "Time New Roman", fontSize: "14px" }}>
                {item.text}
              </span>
            </Checkbox>
          );
        });
      case "price":
        return option.map((item, index) => {
          return <WrapperPriceText key={index}>{item}</WrapperPriceText>;
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

  useEffect(() => {
    fetchAllTypeProduct();
  });

  return (
    <WrapperNavbar>
      <WrapperTitleText>Danh mục sách</WrapperTitleText>
      <WrapperContent>{renderContent("text", typeProduct)}</WrapperContent>
      <WrapperTitleText>Dịch vụ</WrapperTitleText>
      <WrapperContent>
        {renderContent("checkbox", [
          { value: "Trả góp 0%", text: "Trả góp 0%" },
          { value: "Vận chuyển", text: "Vận chuyển" },
          { value: "Giảm mạnh", text: "Giảm mạnh" },
        ])}
      </WrapperContent>
      <WrapperTitleText>Đánh giá</WrapperTitleText>
      <WrapperContent>{renderContent("review", [5, 4, 3])}</WrapperContent>
      <WrapperTitleText>Giá</WrapperTitleText>
      <WrapperContent>
        {renderContent("price", ["Dưới 2.000.000", "Trên 12.000.000"])}
      </WrapperContent>
    </WrapperNavbar>
  );
};

export default NavbarComponent;
