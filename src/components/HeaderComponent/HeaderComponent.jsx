import { Badge, Col } from "antd";
import {
  WrapperCart,
  WrapperHeader,
  WrapperLogo,
  WrapperUser,
  WrapperUserAll,
  WrapperUserText,
} from "./styles";
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";

const HeaderComponent = () => {
  return (
    <>
      <div
        style={{
          width: "100%",
          backgroundColor: "#007fff",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <WrapperHeader>
          <Col span={6}>
            <WrapperLogo>My Shop</WrapperLogo>
          </Col>
          <Col span={12}>
            <ButtonInputSearch
              size="large"
              buttonText="Tìm kiếm"
              inputText="Vui lòng nhập"
            />
          </Col>
          <Col span={6}>
            <WrapperUserAll>
              <WrapperUser>
                <div style={{ fontSize: "30px", color: "#fff" }}>
                  <UserOutlined />
                </div>
                <WrapperUserText>
                  <span>Đăng nhập/Đăng ký</span>
                  <span>
                    Tài khoản <CaretDownOutlined />
                  </span>
                </WrapperUserText>
              </WrapperUser>
              <WrapperCart>
                <Badge count={5} size="small">
                  <div style={{ fontSize: "30px", color: "#fff" }}>
                    <ShoppingCartOutlined />
                  </div>
                </Badge>
                <span style={{ color: "#fff", marginLeft: "6px" }}>
                  Giỏ hàng
                </span>
              </WrapperCart>
            </WrapperUserAll>
          </Col>
        </WrapperHeader>
      </div>
    </>
  );
};

export default HeaderComponent;
