import {
  WrapperCardStyle,
  StyleNameProduct,
  WrapperPriceDiscount,
  WrapperPriceProduct,
  WrapperReportProduct,
  WrapperStyleTextSell,
} from "./styles";
import { StarFilled } from "@ant-design/icons";
import logo from "../../assets/images/logo.png";

const CardProduct = (props) => {
  const {
    name,
    price,
    image,
    rating,
    description,
    countInStock,
    type,
    discount,
    selled,
  } = props;
  return (
    <WrapperCardStyle
      hoverable
      headStyle={{ width: "200px", height: "200px" }}
      style={{
        width: 200,
      }}
      bodyStyle={{ padding: "10px" }}
      cover={
        <img
          alt="example"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        />
      }
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
      <StyleNameProduct>{name}</StyleNameProduct>
      <WrapperReportProduct>
        <span style={{ marginRight: "5px" }}>
          {rating} <StarFilled style={{ color: "#FFC400" }} />{" "}
        </span>
        <WrapperStyleTextSell> | Đã bán {selled || 100}+</WrapperStyleTextSell>
      </WrapperReportProduct>
      <WrapperPriceProduct>
        {price} <WrapperPriceDiscount>- {discount || 5} %</WrapperPriceDiscount>
      </WrapperPriceProduct>
    </WrapperCardStyle>
  );
};

export default CardProduct;
