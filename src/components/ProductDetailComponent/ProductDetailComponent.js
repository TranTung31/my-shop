import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Image, InputNumber, Rate, Row } from "antd";
import { useEffect, useState } from "react";
import { Comments, FacebookProvider } from "react-facebook";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import * as Message from "../../components/Message/Message";
import useMutationHook from "../../hooks/useMutationHook";
import { addProductToCart, resetOrder } from "../../redux/slides/orderSlice";
import * as AuthorService from "../../services/AuthorService";
import * as ProductService from "../../services/ProductService";
import * as PublisherService from "../../services/PublisherService";
import { convertPrice, initFacebookSDK } from "../../utils/utils";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import LikeButtonComponent from "../LikeButtonComponent/LikeButtonComponent";
import {
  WrapperCurrentAddress,
  WrapperCurrentPrice,
  WrapperDescription,
  WrapperDetailBook,
  WrapperDetailBookAuthor,
  WrapperImageProductSmall,
  WrapperRating,
  WrapperStyleTextHeader,
  WrapperStyleTextSell,
  WrapperTextQuantity,
  WrapperTitleComment,
  WrapperTitleDescription,
  WrapperTitleRating,
} from "./styles";

const ProductDetailComponent = ({ id }) => {
  const [numberProduct, setNumberProduct] = useState(1);
  const [arrPublisher, setArrPublisher] = useState([]);
  const [arrAuthor, setArrAuthor] = useState([]);
  const [ratingValue, setRatingValue] = useState(1);
  const [product, setProduct] = useState([]);

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
            image: product?.image,
            amount: numberProduct,
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

  const mutationRating = useMutationHook(({ productId, userId, rating }) => {
    const res = ProductService.ratingProduct(productId, userId, rating);
    return res;
  });

  const {
    data: dataRating,
    isSuccess: isSuccessRating,
    isError: isErrorRating,
  } = mutationRating;

  useEffect(() => {
    if (dataRating?.status === "OK" && isSuccessRating) {
      Message.success("Đánh giá sản phẩm thành công!");
    } else if (isErrorRating) {
      Message.error("Đánh giá sản phẩm thất bại");
    }
  }, [isSuccessRating]);

  useEffect(() => {
    const fetchGetAllAuthor = async () => {
      const res = await AuthorService.getAllAuthor();
      setArrAuthor(res.data);
    };

    const fetchGetAllPublisher = async () => {
      const res = await PublisherService.getAllPublisher();
      setArrPublisher(res.data);
    };

    fetchGetAllPublisher();
    fetchGetAllAuthor();
    initFacebookSDK();
  }, []);

  useEffect(() => {
    const fetchProductDetail = async () => {
      const res = await ProductService.getDetailProduct(id);
      setProduct(res.data);
    };

    fetchProductDetail();
  }, [isSuccessRating]);

  const findUserRating = product?.ratings?.find(
    (item) => item.userId.toString() === user.id
  );

  useEffect(() => {
    setRatingValue(findUserRating?.rating);
  }, [findUserRating]);

  const publisherBook = arrPublisher.find(
    (item) => item._id === product?.publisherId
  );

  const authorBook = arrAuthor.find((item) => item._id === product?.authorId);

  const handleOnChangeRating = (value) => {
    setRatingValue(value);
  };

  const handleRatingProduct = () => {
    if (user?.id === "") {
      navigate("/sign-in", { state: location?.pathname });
    } else {
      if (
        window.confirm(
          `Bạn có chắc chắn muốn đánh giá sản phẩm này ${ratingValue} sao không?`
        ) === true
      ) {
        mutationRating.mutate({
          productId: id,
          userId: user?.id,
          rating: ratingValue,
        });
      }
    }
  };

  return (
    <Row style={{ padding: "20px 10px 10px", backgroundColor: "#fff" }}>
      <Col span={10}>
        <div style={{ display: "flex", gap: "10px" }}>
          <Col span={4} style={{ flex: "none" }}>
            <WrapperImageProductSmall
              style={{ width: "70px", height: "88px" }}
              src={product?.image}
              alt="image product small"
              preview={true}
            />
          </Col>
          <Image
            src={product?.image}
            alt="image product"
            style={{ width: "526px", height: "600px", objectFit: "cover" }}
            preview={false}
          />
        </div>
      </Col>
      <Col span={14} style={{ padding: "0 16px 16px 100px" }}>
        <WrapperStyleTextHeader>{product?.name}</WrapperStyleTextHeader>
        <div style={{ padding: "10px 0" }}>
          <Rate
            allowHalf
            defaultValue={product?.averageRating}
            value={product?.averageRating}
            disabled
          />
          <WrapperStyleTextSell>
            {" "}
            (Số lượng đánh giá: {product?.ratings?.length || 0}) | (Đã bán{" "}
            {`${product?.selled || 0}+`})
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
            <WrapperDetailBookAuthor
              className="author"
              onClick={() => navigate(`/product-author/${authorBook?._id}`)}
            >
              {authorBook?.name}
            </WrapperDetailBookAuthor>
          ) : (
            <span>Đang cập nhật</span>
          )}
        </WrapperDetailBook>
        <WrapperDetailBook>
          <span>Số trang: {product?.pageCount}</span>
        </WrapperDetailBook>
        <WrapperDetailBook>
          <span>Định dạng: {product?.format}</span>
        </WrapperDetailBook>
        <WrapperDetailBook>
          <span>Trọng lượng: {product?.weight}</span>
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
        {product?.countInStock !== 0 ? (
          <div>
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
          </div>
        ) : (
          <div style={{ marginTop: "20px" }}>
            <ButtonComponent
              buttonText="Tạm hết hàng"
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
          </div>
        )}
      </Col>
      <WrapperDescription>
        <WrapperTitleDescription>Mô tả sản phẩm</WrapperTitleDescription>
        <div style={{ marginTop: "10px", fontSize: "1.6rem" }}>
          {product?.description ? product?.description : "Đang cập nhật..."}
        </div>
      </WrapperDescription>
      <WrapperRating>
        <WrapperTitleRating>Đánh giá sản phẩm</WrapperTitleRating>
        <div style={{ marginTop: "5px" }}>
          <Rate
            onChange={handleOnChangeRating}
            defaultValue={ratingValue}
            value={ratingValue}
          />
          &nbsp; &nbsp;
          <ButtonComponent
            buttonText="Gửi đánh giá"
            onClick={handleRatingProduct}
          />
        </div>
      </WrapperRating>
      <WrapperTitleComment>Viết bình luận</WrapperTitleComment>
      <div style={{ width: "1270px" }}>
        <FacebookProvider appId="1473682613178203">
          <Comments href={`www.facebook.com/post/${id}`} />
        </FacebookProvider>
      </div>
    </Row>
  );
};

export default ProductDetailComponent;
