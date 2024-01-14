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
import * as OrderService from "../../services/OrderService";
import { useEffect, useState } from "react";
import { convertPrice } from "../../utils";
import ContentOfTooltip from "./ContentOfTooltip";
import LoadingComponent from "../LoadingComponent/LoadingComponent";

const AdminHome = () => {
  const user = useSelector((state) => state.user);
  const [countOrder, setCountOrder] = useState(0);
  const [countUser, setCountUser] = useState(0);
  const [countProduct, setCountProduct] = useState(0);
  const [orderAll, setOrderAll] = useState(null);
  const [isLoadingOrder, setIsLoadingOrder] = useState(false);
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

  const getOrderAll = async (access_token) => {
    setIsLoadingOrder(true);
    const res = await OrderService.getAll(access_token);
    setOrderAll(res?.data);
    setIsLoadingOrder(false);
    return res;
  };

  useEffect(() => {
    getCountUser(user?.access_token);
    getCountProduct(user?.access_token);
    getCountOrder(user?.access_token);
    getOrderAll(user?.access_token);
  }, []);

  const totalPrice = orderAll?.reduce((total, item) => {
    return (total =
      total +
      (item?.isPaid === true && item?.isDelivered === true
        ? item?.totalPrice
        : 0));
  }, 0);

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <div>
        <Row gutter={16}>
          <Col span={6}>
            <Card
              title="Số lượng người dùng"
              bordered={true}
              headStyle={{ textAlign: "center", fontSize: "1.8rem" }}
              bodyStyle={{ textAlign: "center", fontSize: "1.8rem" }}
              style={{
                border: "2px solid #00B300",
                backgroundColor: "#B3FFCC",
              }}
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
              style={{
                border: "2px solid #E6E600",
                backgroundColor: "#FFFFCC",
              }}
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
              style={{
                border: "2px solid #00E6E6",
                backgroundColor: "#B3FFFF",
              }}
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
              style={{
                border: "2px solid #FF884D",
                backgroundColor: "#FFCCB3",
              }}
            >
              <span>
                <DollarOutlined /> {`${convertPrice(totalPrice) || 0} VND`}
              </span>
            </Card>
          </Col>
        </Row>
      </div>
      <LoadingComponent isLoading={isLoadingOrder}>
        <div style={{ width: "100%", height: "500px", marginTop: "30px" }}>
          <ContentOfTooltip dataOrder={orderAll} />
        </div>
      </LoadingComponent>
    </div>
  );
};

export default AdminHome;
