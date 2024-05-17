import { StarFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { convertPrice } from "../../utils/utils";
import {
  StyleNameProduct,
  WrapperCardStyle,
  WrapperPriceProduct,
  WrapperReportProduct,
  WrapperStyleDiscount,
  WrapperStyleTextSell,
} from "./styles";

const CardProduct = (props) => {
  const {
    name,
    image,
    price,
    rating,
    countInStock,
    discount,
    selled,
    id,
    productRef,
  } = props;

  const navigate = useNavigate();

  const handleProductDetail = (id) => {
    navigate(`/product-detail/${id}`);
  };

  return (
    <WrapperCardStyle
      ref={productRef}
      hoverable
      headStyle={{ width: "200px", height: "200px" }}
      style={{
        width: 200,
      }}
      bodyStyle={{ padding: "10px" }}
      cover={<img alt="example" src={image} style={{ objectFit: "cover" }} />}
      onClick={() => countInStock !== 0 && handleProductDetail(id)}
      disabled={countInStock === 0}
    >
      <img
        src={logo}
        alt="logo"
        style={{
          width: "68px",
          height: "14px",
          position: "absolute",
          top: "-1px",
          left: "-1px",
          borderTopLeftRadius: "8px",
        }}
      />
      <WrapperStyleDiscount>{`-${discount}%`}</WrapperStyleDiscount>
      <StyleNameProduct>{name}</StyleNameProduct>
      <WrapperReportProduct>
        <span style={{ marginRight: "5px" }}>
          {rating || 5} <StarFilled style={{ color: "#FFC400" }} />{" "}
        </span>
        <WrapperStyleTextSell> | Đã bán {selled || 100}+</WrapperStyleTextSell>
      </WrapperReportProduct>
      <WrapperPriceProduct>
        <div>{`${convertPrice(price - price * (discount / 100))}₫`}</div>
        <s style={{ color: "#ccc" }}>{`${convertPrice(price)}₫`}</s>
      </WrapperPriceProduct>
    </WrapperCardStyle>
  );
};

export default CardProduct;
