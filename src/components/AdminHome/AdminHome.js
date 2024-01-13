import { Card, Col, Row } from "antd";
import {
  UserOutlined,
  AppstoreOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import * as UserService from "../../services/UserService";
import * as ProductService from "../../services/ProductService";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import * as OrderService from "../../services/OrderService";
import { useEffect, useState } from "react";

const AdminHome = () => {
  const user = useSelector((state) => state.user);

  const [countOrder, setCountOrder] = useState(0);
  const [countUser, setCountUser] = useState(0);
  const [countProduct, setCountProduct] = useState(0);

  const getCountUser = async (access_token) => {
    const res = await UserService.getCountUser(access_token);
    setCountUser(res?.data);
    return res;
  };

  const getCountProduct = async (access_token) => {
    const res = await ProductService.getCountProduct(access_token);
    setCountProduct(res?.data);
    return res;
  };

  const getCountOrder = async (access_token) => {
    const res = await OrderService.getCountOrder(access_token);
    setCountOrder(res?.data);
    return res;
  };

  useEffect(() => {
    getCountUser(user?.access_token);
    getCountProduct(user?.access_token);
    getCountOrder(user?.access_token);
  }, []);

  return (
    <div>
      <Row gutter={16}>
        <Col span={6}>
          <Card
            title="Số lượng người dùng"
            bordered={true}
            headStyle={{ textAlign: "center", fontSize: "1.8rem" }}
            bodyStyle={{ textAlign: "center", fontSize: "1.8rem" }}
            style={{ border: "2px solid #00B300", backgroundColor: "#B3FFCC" }}
          >
            <span>
              <UserOutlined /> {countUser}
            </span>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            title="Số lượng sản phẩm"
            bordered={true}
            headStyle={{ textAlign: "center", fontSize: "1.8rem" }}
            bodyStyle={{ textAlign: "center", fontSize: "1.8rem" }}
            style={{ border: "2px solid #E6E600", backgroundColor: "#FFFFCC" }}
          >
            <span>
              <AppstoreOutlined /> {countProduct}
            </span>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            title="Số lượng đơn hàng"
            bordered={true}
            headStyle={{ textAlign: "center", fontSize: "1.8rem" }}
            bodyStyle={{ textAlign: "center", fontSize: "1.8rem" }}
            style={{ border: "2px solid #00E6E6", backgroundColor: "#B3FFFF" }}
          >
            <span>
              <ShoppingCartOutlined /> {countOrder}
            </span>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            title="Tổng doanh thu"
            bordered={true}
            headStyle={{ textAlign: "center", fontSize: "1.8rem" }}
            bodyStyle={{ textAlign: "center", fontSize: "1.8rem" }}
            style={{ border: "2px solid #FF884D", backgroundColor: "#FFCCB3" }}
          >
            <span>
              <DollarOutlined />
              10 VND
            </span>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminHome;
