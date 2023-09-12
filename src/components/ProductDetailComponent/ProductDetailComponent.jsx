import { Col, Image, InputNumber, Row } from "antd";
import imageProduct from "../../assets/images/imageProduct.webp";
import imageProductSmall from "../../assets/images/imageProductSmall.webp";
import {
  WrapperCurrentAddress,
  WrapperCurrentPrice,
  WrapperIcon,
  WrapperImageProductSmall,
  WrapperInputNumber,
  WrapperStyleTextHeader,
  WrapperStyleTextSell,
  WrapperTextQuantity,
} from "./styles";
import { PlusOutlined, MinusOutlined, StarFilled } from "@ant-design/icons";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const ProductDetailComponent = () => {
  const onChange = () => {};
  return (
    <Row style={{ padding: "10px", backgroundColor: "#fff" }}>
      <Col span={10}>
        <Image
          src={imageProduct}
          alt="image product"
          style={{ width: "526px" }}
          preview={false}
        />
        <Row>
          <Col span={4}>
            <WrapperImageProductSmall
              src={imageProductSmall}
              alt="image product small"
              preview={false}
            />
          </Col>
          <Col span={4}>
            <WrapperImageProductSmall
              src={imageProductSmall}
              alt="image product small"
              preview={false}
            ></WrapperImageProductSmall>
          </Col>
          <Col span={4}>
            <WrapperImageProductSmall
              src={imageProductSmall}
              alt="image product small"
              preview={false}
            ></WrapperImageProductSmall>
          </Col>
          <Col span={4}>
            <WrapperImageProductSmall
              src={imageProductSmall}
              alt="image product small"
              preview={false}
            ></WrapperImageProductSmall>
          </Col>
          <Col span={4}>
            <WrapperImageProductSmall
              src={imageProductSmall}
              alt="image product small"
              preview={false}
            ></WrapperImageProductSmall>
          </Col>
          <Col span={4}>
            <WrapperImageProductSmall
              src={imageProductSmall}
              alt="image product small"
              preview={false}
            ></WrapperImageProductSmall>
          </Col>
        </Row>
      </Col>
      <Col span={14} style={{ padding: "16px" }}>
        <WrapperStyleTextHeader>
          Điện thoại Samsung Galaxy A54 5G (8GB/256gb) - Hàng chính hãng
        </WrapperStyleTextHeader>
        <div>
          <StarFilled style={{ color: "#FFC400" }} />{" "}
          <StarFilled style={{ color: "#FFC400" }} />{" "}
          <StarFilled style={{ color: "#FFC400" }} />{" "}
          <StarFilled style={{ color: "#FFC400" }} />{" "}
          <StarFilled style={{ color: "#FFC400" }} />{" "}
          <WrapperStyleTextSell> | Đã bán 10+</WrapperStyleTextSell>
        </div>
        <div>
          <WrapperCurrentPrice>
            8.990.000 <sup>₫</sup>
          </WrapperCurrentPrice>
        </div>
        <WrapperCurrentAddress>
          <span>Giao đến </span>
          <span className="address">
            Q. Hoàn Kiếm, P. Hàng Trống, Hà Nội{" "}
          </span>{" "}
          -<span className="change-address"> Đổi địa chỉ</span>
        </WrapperCurrentAddress>
        <div style={{ marginTop: "20px" }}>
          <WrapperTextQuantity>Số Lượng</WrapperTextQuantity>
          <div style={{ marginTop: "10px" }}>
            <ButtonComponent
              icon={
                <WrapperIcon>
                  <MinusOutlined />
                </WrapperIcon>
              }
            />
            <WrapperInputNumber defaultValue={1} onChange={onChange} />
            <ButtonComponent
              icon={
                <WrapperIcon>
                  <PlusOutlined />
                </WrapperIcon>
              }
            />
          </div>
        </div>
        <div style={{ marginTop: "20px", display: "flex", gap: "20px" }}>
          <ButtonComponent
            buttonText="Chọn mua"
            styleButton={{
              backgroundColor: "rgb(255, 66, 78)",
              width: "220px",
              height: "48px",
              border: "none",
            }}
            styleTextButton={{
              color: "#fff",
              fontSize: "15px",
              fontWeight: "700",
            }}
          />
          <ButtonComponent
            buttonText="Mua trả sau"
            styleButton={{
              backgroundColor: "#fff",
              width: "220px",
              height: "48px",
              border: "1px solid rgb(13, 92, 182)",
            }}
            styleTextButton={{
              color: "rgb(13, 92, 182)",
              fontSize: "15px",
              fontWeight: "700",
            }}
          />
        </div>
      </Col>
    </Row>
  );
};

export default ProductDetailComponent;
