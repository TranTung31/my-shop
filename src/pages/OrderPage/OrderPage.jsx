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
import { useDispatch, useSelector } from "react-redux";
import {
  removeProduct,
  removeMoreProduct,
  increaseProduct,
  decreaseProduct,
} from "../../redux/slides/orderSlice";
import { useState } from "react";

const OrderPage = () => {
  const order = useSelector((state) => state.order);
  const [checkedList, setCheckedList] = useState([]);

  const dispatch = useDispatch();

  const onChangeCheckBox = (e) => {
    if (e.target.checked) {
      const newCheckedList = [...checkedList, e.target.value];
      setCheckedList(newCheckedList);
    } else {
      const newCheckedList = checkedList.filter(
        (item) => item !== e.target.value
      );
      setCheckedList(newCheckedList);
    }
  };

  const onChangeCheckBoxAll = (e) => {
    if (e.target.checked) {
      let newCheckedList = [];
      order?.orderItems?.forEach((item) => newCheckedList.push(item.product));
      setCheckedList(newCheckedList);
    } else {
      setCheckedList([]);
    }
  };

  const handleOnChangeNumberProduct = (type, productId) => {
    if (type === "increase") {
      dispatch(increaseProduct({ productId }));
    } else {
      dispatch(decreaseProduct({ productId }));
    }
  };

  const handleDeleteProduct = (productId) => {
    dispatch(removeProduct({ productId }));
    setCheckedList([]);
  };

  const handleDeleteMoreProduct = () => {
    dispatch(removeMoreProduct({ checkedList }));
    setCheckedList([]);
  };
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
                  <Checkbox
                    onChange={onChangeCheckBoxAll}
                    checked={checkedList.length === order?.orderItems?.length}
                  >
                    Tất cả ({order?.orderItems?.length} sản phẩm)
                  </Checkbox>
                </div>
                <span>Đơn giá</span>
                <span>Số lượng</span>
                <span>Thành tiền</span>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDeleteMoreProduct()}
                >
                  {checkedList.length > 0 && <DeleteOutlined />}
                </div>
              </WrapperAllProduct>
            </WrapperLeft>

            {order?.orderItems?.map((item) => (
              <WrapperLeftProduct>
                <WrapperAllProduct>
                  <WrapperProduct>
                    <Checkbox
                      onChange={onChangeCheckBox}
                      checked={checkedList.includes(item.product)}
                      value={item.product}
                    ></Checkbox>
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
                      onClick={() =>
                        handleOnChangeNumberProduct("decrease", item.product)
                      }
                    >
                      <MinusOutlined />
                    </WrapperProductLeftButton>
                    <WrapperInputNumber
                      defaultValue={item.amount}
                      value={item.amount}
                      style={{ border: "none", margin: "auto", top: "1px" }}
                    />
                    <WrapperProductRightButton
                      onClick={() =>
                        handleOnChangeNumberProduct("increase", item.product)
                      }
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
