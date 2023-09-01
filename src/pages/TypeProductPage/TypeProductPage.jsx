import { Col, Row } from "antd";
import CardProduct from "../../components/CardProduct/CardProduct";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";

const TypeProductPage = () => {
  return (
    <Row
      style={{
        padding: "20px 120px 0",
        backgroundColor: "rgb(239, 239, 239)",
        height: "1000px",
      }}
    >
      <Col span={4}>
        <NavbarComponent />
      </Col>
      <Col span={20}>
        <CardProduct />
      </Col>
    </Row>
  );
};

export default TypeProductPage;
