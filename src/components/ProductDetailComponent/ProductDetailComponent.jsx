import { Col, Image, Rate, Row } from "antd";
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
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { useState } from "react";
import * as ProductService from "../../services/ProductService";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";

const ProductDetailComponent = ({ id }) => {
  const [numberProduct, setNumberProduct] = useState(1);
  const user = useSelector((state) => state.user);

  const onChangeQuantityProduct = () => {
  };

  const fetchProductDetail = async () => {
    const res = await ProductService.getDetailProduct(id);
    return res.data;
  };

  const { data: product } = useQuery(["product-detail"], fetchProductDetail, {
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true,
  });

  const handleChangeNumberProduct = (type) => {
    if (type === "increase") {
      setNumberProduct((prev) => prev + 1);
    } else {
      if (numberProduct > 1) {
        setNumberProduct((prev) => prev - 1);
      } else {
        setNumberProduct(1);
      }
    }
  };

  return (
    <Row style={{ padding: "20px 10px 10px", backgroundColor: "#fff" }}>
      <Col span={10}>
        <Image
          src={product?.image}
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
      <Col span={14} style={{ padding: "0 16px 16px" }}>
        <WrapperStyleTextHeader>{product?.name}</WrapperStyleTextHeader>
        <div style={{ padding: "10px 0" }}>
          <Rate allowHalf defaultValue={product?.rating} value={product?.rating}/>
          {/* {renderStart(product?.rating)} */}
          <WrapperStyleTextSell> | Đã bán 10+</WrapperStyleTextSell>
        </div>
        <div>
          <WrapperCurrentPrice>
            {product?.price?.toLocaleString()} <sup>₫</sup>
          </WrapperCurrentPrice>
        </div>
        <WrapperCurrentAddress>
          <span>Giao đến </span>
          <span className="address">{user?.address} </span> -
          <span className="change-address"> Đổi địa chỉ</span>
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
              onClick={() => handleChangeNumberProduct("decrease")}
            />
            <WrapperInputNumber
              defaultValue={numberProduct}
              onChange={onChangeQuantityProduct}
              value={numberProduct}
            />
            <ButtonComponent
              icon={
                <WrapperIcon>
                  <PlusOutlined />
                </WrapperIcon>
              }
              onClick={() => handleChangeNumberProduct("increase")}
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
