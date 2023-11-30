import { Checkbox, Image } from "antd";
import {
  WrapperAllProduct,
  WrapperCaculator,
  WrapperLeft,
  WrapperLeftProduct,
  WrapperOrderPage,
  WrapperProduct,
  WrapperProductLeftButton,
  WrapperProductName,
  WrapperProductRightButton,
  WrapperRight,
  WrapperTitle,
  WrapperTotal,
  WrapperTotalPrice,
} from "./styles";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { WrapperInputNumber } from "../../components/ProductDetailComponent/styles";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeProduct } from "../../redux/slides/orderSlice";

const OrderPage = () => {
  const order = useSelector((state) => state.order);

  const dispatch = useDispatch();

  const [numberProduct, setNumberProduct] = useState(1);

  const onCheckBox = () => {};

  const handleOnChangeNumberProduct = (type) => {
    if (type === "decrease") {
      if (numberProduct > 1) {
        setNumberProduct((prev) => prev - 1);
      }
    } else {
      setNumberProduct((prev) => prev + 1);
    }
  };

  const handleDeleteProduct = (productId) => {
    dispatch(removeProduct({productId}))
  };

  const handleOnChangeProduct = () => {};
  return (
    <div style={{ backgroundColor: "#f5f5fa" }}>
      <WrapperOrderPage>
        <WrapperTitle>Giỏ hàng</WrapperTitle>
        <div style={{ display: "flex" }}>
          <div>
            <WrapperLeft>
              <span style={{ fontSize: "1.5rem", fontWeight: 500 }}>
                Phí giao hàng
              </span>
              <WrapperAllProduct>
                <div style={{ width: "300px" }}>
                  <Checkbox onChange={onCheckBox}>Tất cả (0 sản phẩm)</Checkbox>
                </div>
                <span>Đơn giá</span>
                <span>Số lượng</span>
                <span>Thành tiền</span>
                <div>
                  <DeleteOutlined />
                </div>
              </WrapperAllProduct>
            </WrapperLeft>

            {order?.orderItems?.map((item) => (
              <WrapperLeftProduct>
                <WrapperAllProduct>
                  <WrapperProduct>
                    <Checkbox onChange={onCheckBox}></Checkbox>
                    <div style={{ paddingLeft: "8px" }}>
                      <Image
                        src={item.image}
                        alt="image"
                        width={60}
                        height={60}
                      />
                    </div>
                    <WrapperProductName>{item.name}</WrapperProductName>
                  </WrapperProduct>

                  <span>{item.price.toLocaleString()}</span>

                  <div style={{ border: "1px solid #ccc" }}>
                    <WrapperProductLeftButton
                      onClick={() => handleOnChangeNumberProduct("decrease")}
                    >
                      <MinusOutlined />
                    </WrapperProductLeftButton>
                    <WrapperInputNumber
                      defaultValue={item.amount}
                      value={item.amount}
                      onChange={handleOnChangeProduct}
                      style={{ border: "none", margin: "auto", top: "1px" }}
                    />
                    <WrapperProductRightButton
                      onClick={() => handleOnChangeNumberProduct("increase")}
                    >
                      <PlusOutlined />
                    </WrapperProductRightButton>
                  </div>

                  <span>{(item.price * item.amount).toLocaleString()}</span>

                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDeleteProduct(item.product)}
                  >
                    <DeleteOutlined />
                  </div>
                </WrapperAllProduct>
              </WrapperLeftProduct>
            ))}
          </div>

          <div>
            <WrapperRight>
              <div>
                Địa chỉ: <span style={{ fontWeight: 500 }}>Hà Nội</span>{" "}
                <span style={{ color: "#007fff" }}>Thay đổi</span>
              </div>

              <div style={{ padding: "20px 0 30px" }}>
                <WrapperCaculator>
                  <label>Tạm tính</label>
                  <div>0 VND</div>
                </WrapperCaculator>
                <WrapperCaculator>
                  <label>Giảm giá</label>
                  <div>0 VND</div>
                </WrapperCaculator>
                <WrapperCaculator>
                  <label>Phí giao hàng</label>
                  <div>0 VND</div>
                </WrapperCaculator>
              </div>

              <WrapperTotalPrice>
                <span>Tổng tiền</span>
                <div>
                  <WrapperTotal>0 VND</WrapperTotal>{" "}
                  <div>(Đã bao gồm VAT nếu có)</div>
                </div>
              </WrapperTotalPrice>
            </WrapperRight>
            <div style={{ paddingTop: "30px" }}>
              <ButtonComponent
                buttonText="Mua hàng"
                styleButton={{
                  backgroundColor: "rgb(255, 66, 78)",
                  width: "350px",
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
          </div>
        </div>
      </WrapperOrderPage>
    </div>
  );
};

export default OrderPage;
