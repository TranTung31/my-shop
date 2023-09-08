import { Col, Image, Row } from "antd";
import imageProduct from "../../assets/images/imageProduct.webp";
import imageProductSmall from "../../assets/images/imageProductSmall.webp";
import { WrapperImageProductSmall } from "./styles";

const ProductDetailComponent = () => {
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
      <Col span={14}>abc</Col>
    </Row>
  );
};

export default ProductDetailComponent;
