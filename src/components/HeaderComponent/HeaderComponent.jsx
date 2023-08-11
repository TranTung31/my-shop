import { Col } from "antd";
import { WrapperCart, WrapperHeader, WrapperLogo, WrapperUser, WrapperUserAll, WrapperUserText } from "./styles";
import Search from "antd/es/input/Search";
import { UserOutlined, CaretDownOutlined, ShoppingCartOutlined } from '@ant-design/icons';

const HeaderComponent = () => {
  return (
    <>
      <div>
        <WrapperHeader>
          <Col span={6}>
            <WrapperLogo>My Shop</WrapperLogo>
          </Col>
          <Col span={12}>
            <Search
              placeholder="input search text"
            //   onSearch={onSearch}
              enterButton
              style={{ width: 550 }}
            />
          </Col>
          <Col span={6}>
            <WrapperUserAll>
              <WrapperUser>
                <div style={{ fontSize: "30px", color: "#fff" }}><UserOutlined /></div>
                <WrapperUserText>
                  <span>Đăng nhập/Đăng ký</span>
                  <span>Tài khoản <CaretDownOutlined /></span>
                </WrapperUserText>
              </WrapperUser>
              <WrapperCart>
                <div style={{ fontSize: "30px", color: "#fff" }}><ShoppingCartOutlined /></div>
                <span style={{ color: "#fff", marginLeft: "6px" }}>Giỏ hàng</span>
              </WrapperCart>
            </WrapperUserAll>
          </Col>
        </WrapperHeader>
      </div>
    </>
  );
};

export default HeaderComponent;
