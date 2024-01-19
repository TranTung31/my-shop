import { Col, Image, Row } from "antd";
import {
  WrapperFooter,
  WrapperFooterColBody,
  WrapperFooterColHeading,
  WrapperFooterColImage,
  WrapperFooterContent,
  WrapperFooterCopyright,
} from "./styles";
import paypal from "../../assets/images/paypal.png";
import visa from "../../assets/images/visa.png";
import delivery from "../../assets/images/delivery.png";
import atm from "../../assets/images/atm.png";
import vnpay from "../../assets/images/vnpay.png";
import facebook from "../../assets/images/facebook.png";
import github from "../../assets/images/github.png";
import zalo from "../../assets/images/zalo.png";
import Link from "antd/es/typography/Link";

const FooterComponent = () => {
  return (
    <WrapperFooter>
      <WrapperFooterContent>
        <Row
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            padding: "10px",
          }}
        >
          <Col span={4}>
            <WrapperFooterColHeading>Hỗ trợ khách hàng</WrapperFooterColHeading>
            <WrapperFooterColBody>
              <div>
                Hotline: <b style={{ color: "rgb(56, 56, 61)" }}>0369554336</b>
              </div>
              <div>(1000 đ/phút, 8-21h kể cả T7, CN)</div>
            </WrapperFooterColBody>
            <WrapperFooterColBody>Các câu hỏi thường gặp</WrapperFooterColBody>
            <WrapperFooterColBody>Hướng dẫn đặt hàng</WrapperFooterColBody>
            <WrapperFooterColBody>Chính sách đổi trả</WrapperFooterColBody>
            <WrapperFooterColBody>Gửi yêu cầu hỗ trợ</WrapperFooterColBody>
          </Col>
          <Col span={4}>
            <WrapperFooterColHeading>Về TungBooks</WrapperFooterColHeading>
            <WrapperFooterColBody>Giới thiệu về TungBooks</WrapperFooterColBody>
            <WrapperFooterColBody>Tuyển dụng</WrapperFooterColBody>
            <WrapperFooterColBody>
              Chính sách bảo mật thanh toán
            </WrapperFooterColBody>
            <WrapperFooterColBody>
              Chính sách bảo mật thông tin cá nhân
            </WrapperFooterColBody>
          </Col>
          <Col span={4}>
            <WrapperFooterColHeading>
              Hợp tác và liên kết
            </WrapperFooterColHeading>
            <WrapperFooterColBody>
              Quy chế hoạt động Sàn GDTMĐT
            </WrapperFooterColBody>
            <WrapperFooterColBody>Bán hàng cùng TungBooks</WrapperFooterColBody>
          </Col>
          <Col span={4}>
            <WrapperFooterColHeading>
              Phương thức thanh toán
            </WrapperFooterColHeading>
            <WrapperFooterColBody>
              <WrapperFooterColImage>
                <Image preview={false} src={paypal} alt="paypal" />
              </WrapperFooterColImage>
              <WrapperFooterColImage>
                <Image preview={false} src={visa} alt="visa" />
              </WrapperFooterColImage>
              <WrapperFooterColImage>
                <Image preview={false} src={delivery} alt="delivery" />
              </WrapperFooterColImage>
              <WrapperFooterColImage>
                <Image preview={false} src={atm} alt="atm" />
              </WrapperFooterColImage>
              <WrapperFooterColImage>
                <Image preview={false} src={vnpay} alt="vnpay" />
              </WrapperFooterColImage>
            </WrapperFooterColBody>
          </Col>
          <Col span={4}>
            <WrapperFooterColHeading>
              Kết nối với chúng tôi
            </WrapperFooterColHeading>
            <WrapperFooterColBody>
              <WrapperFooterColImage>
                <Link
                  href="https://web.facebook.com/trantung3105"
                  target="_blank"
                >
                  <Image preview={false} src={facebook} alt="facebook" />
                </Link>
              </WrapperFooterColImage>
              <WrapperFooterColImage>
                <Link
                  href="https://github.com/TranTung31?tab=repositories"
                  target="_blank"
                >
                  <Image preview={false} src={github} alt="github" />
                </Link>
              </WrapperFooterColImage>
              <WrapperFooterColImage>
                <Link href="https://zalo.me/0369554336" target="_blank">
                  <Image preview={false} src={zalo} alt="zalo" />
                </Link>
              </WrapperFooterColImage>
            </WrapperFooterColBody>
          </Col>
        </Row>
      </WrapperFooterContent>
      <WrapperFooterCopyright>
        Copyright © 2024 by Trần Tùng with in VietNam (Powered by ReactJS & Ant
        Design)
      </WrapperFooterCopyright>
    </WrapperFooter>
  );
};

export default FooterComponent;
