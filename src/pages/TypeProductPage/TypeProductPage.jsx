import { Col, Pagination, Row } from "antd";
import CardProduct from "../../components/CardProduct/CardProduct";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import { WrapperProducts } from "./styles";

const TypeProductPage = () => {
  return (
    <Row
      style={{
        padding: "20px 120px 0",
        backgroundColor: "rgb(239, 239, 239)",
      }}
    >
      <Col span={4}>
        <NavbarComponent />
      </Col>
      <Col span={20}>
        <WrapperProducts>
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
          <CardProduct />
        </WrapperProducts>
        <Pagination
          defaultCurrent={1}
          total={50}
          style={{ textAlign: "center", marginTop: "20px" }}
        />
      </Col>
    </Row>
  );
};

export default TypeProductPage;
