import {
  WrapperCardStyle,
  StyleNameProduct,
  WrapperPriceDiscount,
  WrapperPriceProduct,
  WrapperReportProduct,
} from "./styles";
import { StarFilled } from "@ant-design/icons";
import logo from "../../assets/images/logo.png";

const CardProduct = () => {
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
      <StyleNameProduct>Iphone 14 Pro</StyleNameProduct>
      <WrapperReportProduct>
        <span style={{ marginRight: "5px" }}>
          2.5 <StarFilled style={{ color: "yellow" }} />{" "}
        </span>
        <span> | Đã bán 10+</span>
      </WrapperReportProduct>
      <WrapperPriceProduct>
        1.000.000 VND <WrapperPriceDiscount>- 10 %</WrapperPriceDiscount>
      </WrapperPriceProduct>
    </WrapperCardStyle>
  );
};

export default CardProduct;
