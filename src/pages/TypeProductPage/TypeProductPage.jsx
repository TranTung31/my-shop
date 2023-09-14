import { Col, Pagination, Row } from "antd";
import CardProduct from "../../components/CardProduct/CardProduct";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";
import { WrapperProducts } from "./styles";

const TypeProductPage = () => {
  return (
    <div style={{ width: "100%", backgroundColor: "rgb(239, 239, 239)" }}>
      <div style={{ width: "1285px", margin: "0 auto" }}>
        <Row style={{ paddingTop: "20px" }}>
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
      </div>
    </div>
  );
};

export default TypeProductPage;
