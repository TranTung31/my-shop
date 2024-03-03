import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Col, Image, InputNumber, Rate, Row } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import * as Message from "../../components/Message/Message";
import { addProductToCart, resetOrder } from "../../redux/slides/orderSlice";
import * as ProductService from "../../services/ProductService";
import * as PublisherService from "../../services/PublisherService";
import * as AuthorService from "../../services/AuthorService";
import { convertPrice, initFacebookSDK } from "../../utils";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import CommentComponent from "../CommentComponent/CommentComponent";
import LikeButtonComponent from "../LikeButtonComponent/LikeButtonComponent";
import {
  WrapperCurrentAddress,
  WrapperCurrentPrice,
  WrapperDescription,
  WrapperDetailBook,
  WrapperImageProductSmall,
  WrapperStyleTextHeader,
  WrapperStyleTextSell,
  WrapperTextQuantity,
  WrapperTitleComment,
  WrapperTitleDescription,
} from "./styles";

const ProductDetailComponent = ({ id }) => {
  const [numberProduct, setNumberProduct] = useState(1);
  const [arrPublisher, setArrPublisher] = useState([]);
  const [arrAuthor, setArrAuthor] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);

  useEffect(() => {
    if (order?.isSuccessOrder) {
      Message.success("Thêm vào giỏ hàng thành công!");
    }
    return () => {
      dispatch(resetOrder());
    };
  }, [order?.isSuccessOrder]);

  const onChangeQuantityProduct = () => {};

  const fetchProductDetail = async () => {
    const res = await ProductService.getDetailProduct(id);
    return res.data;
  };

  const { data: product } = useQuery(["product-detail"], fetchProductDetail, {
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true,
  });

  const handleChangeNumberProduct = (type, check) => {
    if (type === "increase") {
      if (!check) {
        setNumberProduct((prev) => prev + 1);
      } else {
        alert("Số lượng sản phẩm trong kho đã hết!");
      }
    } else {
      if (numberProduct > 1) {
        setNumberProduct((prev) => prev - 1);
      } else {
        setNumberProduct(1);
      }
    }
  };

  const orderRedux = order?.orderItems?.find(
    (item) => item.product === product?._id
  );

  const handleAddProductToCart = () => {
    if (user?.id === "") {
      navigate("/sign-in", { state: location?.pathname });
    } else {
      if (
        orderRedux?.amount + numberProduct <= orderRedux?.countInStock ||
        !orderRedux
      ) {
        dispatch(
          addProductToCart({
            name: product?.name,
            amount: numberProduct,
            image: product?.image,
            price: product?.price,
            discount: product?.discount,
            product: product?._id,
            countInStock: product?.countInStock,
          })
        );
      } else {
        Message.error("Số lượng sản phẩm trong kho đã hết!");
      }
    }
  };

  useEffect(() => {
    initFacebookSDK();
  }, []);

  const handleBuyProduct = () => {
    if (user?.id === "") {
      navigate("/sign-in", { state: location?.pathname });
    } else {
      if (
        orderRedux?.amount + numberProduct <= orderRedux?.countInStock ||
        !orderRedux
      ) {
        dispatch(
          addProductToCart({
            name: product?.name,
            amount: numberProduct,
            image: product?.image,
            price: product?.price,
            discount: product?.discount,
            product: product?._id,
            countInStock: product?.countInStock,
          })
        );
        navigate("/order");
      } else {
        Message.error("Số lượng sản phẩm trong kho đã hết!");
      }
    }
  };

  const fetchGetAllPublisher = async () => {
    const res = await PublisherService.getAllPublisher();
    setArrPublisher(res.data);
  };

  useEffect(() => {
    fetchGetAllPublisher();
  }, []);

  const publisherBook = arrPublisher.find(
    (item) => item._id === product?.publisherID
  );

  const fetchGetAllAuthor = async () => {
    const res = await AuthorService.getAllAuthor();
    setArrAuthor(res.data);
  };

  useEffect(() => {
    fetchGetAllAuthor();
  }, []);

  const authorBook = arrAuthor.find((item) => item._id === product?.authorID);

  return (
    <Row style={{ padding: "20px 10px 10px", backgroundColor: "#fff" }}>
      <Col span={10}>
        <Image
          src={product?.image}
          alt="image product"
          style={{ width: "526px", height: "600px" }}
          preview={false}
        />
        <div style={{ marginTop: "20px" }}>
          <Row style={{ display: "flex", justifyContent: "space-between" }}>
            <Col span={4} style={{ flex: "none" }}>
              <WrapperImageProductSmall
                style={{ width: "70px", height: "88px" }}
                src={product?.image}
                alt="image product small"
                preview={true}
              />
            </Col>
            <Col span={4} style={{ flex: "none" }}>
              <WrapperImageProductSmall
                style={{ width: "70px", height: "88px" }}
                src={product?.image}
                alt="image product small"
                preview={true}
              ></WrapperImageProductSmall>
            </Col>
            <Col span={4} style={{ flex: "none" }}>
              <WrapperImageProductSmall
                style={{ width: "70px", height: "88px" }}
                src={product?.image}
                alt="image product small"
                preview={true}
              ></WrapperImageProductSmall>
            </Col>
            <Col span={4} style={{ flex: "none" }}>
              <WrapperImageProductSmall
                style={{ width: "70px", height: "88px" }}
                src={product?.image}
                alt="image product small"
                preview={true}
              ></WrapperImageProductSmall>
            </Col>
            <Col span={4} style={{ flex: "none" }}>
              <WrapperImageProductSmall
                style={{ width: "70px", height: "88px" }}
                src={product?.image}
                alt="image product small"
                preview={true}
              ></WrapperImageProductSmall>
            </Col>
            <Col span={4} style={{ flex: "none" }}>
              <WrapperImageProductSmall
                style={{ width: "70px", height: "88px" }}
                src={product?.image}
                alt="image product small"
                preview={true}
              ></WrapperImageProductSmall>
            </Col>
          </Row>
        </div>
      </Col>
      <Col span={14} style={{ padding: "0 16px 16px" }}>
        <WrapperStyleTextHeader>{product?.name}</WrapperStyleTextHeader>
        <div style={{ padding: "10px 0" }}>
          <Rate
            allowHalf
            defaultValue={product?.rating}
            value={product?.rating}
          />
          {/* {renderStart(product?.rating)} */}
          <WrapperStyleTextSell>
            {" "}
            | Đã bán {`${product?.selled || 10}+`}
          </WrapperStyleTextSell>
        </div>
        <div>
          <WrapperCurrentPrice>
            {convertPrice(
              product?.price - product?.price * (product?.discount / 100)
            )}{" "}
            <sup>₫</sup> &nbsp;
            <s style={{ color: "#ccc" }}>
              {convertPrice(product?.price)} <sup>₫</sup>
            </s>{" "}
            &nbsp;
            <span style={{ color: "#000", fontSize: "1.6rem" }}>
              (Bạn đã tiết kiệm được {product?.discount}%)
            </span>
          </WrapperCurrentPrice>
        </div>
        <WrapperDetailBook>
          <span>Mã sách: {product?._id}</span>
        </WrapperDetailBook>
        <WrapperDetailBook>
          <span>Tác giả: </span>
          {authorBook?.name ? (
            <span
              className="author"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/product-author/${authorBook?._id}`)}
            >
              {authorBook?.name}
            </span>
          ) : (
            <span>Đang cập nhật</span>
          )}
        </WrapperDetailBook>
        <WrapperDetailBook>
          <span>Số trang: {product?.numberOfBook}</span>
        </WrapperDetailBook>
        <WrapperDetailBook>
          <span>Định dạng: {product?.formatBook}</span>
        </WrapperDetailBook>
        <WrapperDetailBook>
          <span>Nhà xuất bản: {publisherBook?.name}</span>
        </WrapperDetailBook>
        <WrapperCurrentAddress>
          <span>Giao đến: </span>
          <span className="address">
            {user?.address && user?.city
              ? `${user?.address}, ${user.city}`
              : "Vui lòng đăng nhập"}
          </span>{" "}
          {user?.id ? (
            <span
              className="change-address"
              onClick={() => navigate("/user-detail")}
            >
              {" "}
              Đổi địa chỉ
            </span>
          ) : null}
        </WrapperCurrentAddress>
        <LikeButtonComponent
          dataHref={
            process.env.REACT_APP_CHECK_LOCAL
              ? "https://developers.facebook.com/docs/plugins/"
              : window.location.href
          }
        />
        <div style={{ marginTop: "20px" }}>
          <WrapperTextQuantity>Số Lượng</WrapperTextQuantity>
          <div style={{ marginTop: "10px" }}>
            <Button
              onClick={() => handleChangeNumberProduct("decrease")}
              icon={<MinusOutlined />}
            />
            <InputNumber
              defaultValue={numberProduct}
              onChange={onChangeQuantityProduct}
              value={numberProduct}
              min={1}
              max={product?.countInStock}
              style={{ width: "40px", margin: "0px 5px" }}
            />
            <Button
              onClick={() =>
                handleChangeNumberProduct(
                  "increase",
                  numberProduct === product?.countInStock
                )
              }
              icon={<PlusOutlined />}
            />
          </div>
        </div>
        <div style={{ marginTop: "20px", display: "flex", gap: "20px" }}>
          <ButtonComponent
            buttonText="Thêm vào giỏ"
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
            onClick={handleAddProductToCart}
          />
          <ButtonComponent
            onClick={handleBuyProduct}
            buttonText="Mua ngay"
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
      <WrapperDescription>
        <WrapperTitleDescription>Mô tả sản phẩm</WrapperTitleDescription>
        <div style={{ marginTop: "10px", fontSize: "1.6rem" }}>
          {product?.description ? product?.description : "Đang cập nhật..."}
        </div>
      </WrapperDescription>
      <WrapperTitleComment>Viết bình luận</WrapperTitleComment>
      <CommentComponent
        dataHref={
          process.env.REACT_APP_CHECK_LOCAL || true
            ? "https://developers.facebook.com/docs/plugins/comments#configurator"
            : window.location.href
        }
        width={1270}
      />
    </Row>
  );
};

export default ProductDetailComponent;
