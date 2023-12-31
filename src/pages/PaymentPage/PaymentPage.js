import { Button, Form, Radio } from "antd";
import {
  WrapperCaculator,
  WrapperLeft,
  WrapperMethodDelivery,
  WrapperOrderPage,
  WrapperRadioContent,
  WrapperRadioText,
  WrapperRight,
  WrapperTitle,
  WrapperTotal,
  WrapperTotalPrice,
} from "./styles";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  removeMoreProduct,
  addOrderItemsSelected,
} from "../../redux/slides/orderSlice";
import { useEffect, useState } from "react";
import { convertPrice } from "../../utils";
import * as Message from "../../components/Message/Message";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import InputComponent from "../../components/InputComponent/InputComponent";
import useMutationHook from "../../hooks/useMutationHook";
import * as UserService from "../../services/UserService";
import * as PaymentService from "../../services/PaymentService";
import * as OrderService from "../../services/OrderService";
import { updateUser } from "../../redux/slides/userSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { PayPalButton } from "react-paypal-button-v2";

const PaymentPage = () => {
  const [checkedList, setCheckedList] = useState([]);
  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);
  const [value, setValue] = useState("FAST");
  const [valuePayment, setValuePayment] = useState("Thanh toán khi nhận hàng");
  const [stateUserDetail, setStateUserDetail] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });
  const [sdkReady, setSdkReady] = useState(false);

  const [form] = Form.useForm();

  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    priceMemo,
    priceDiscountMemo,
    priceDeliveryMemo,
    priceTotalMemo,
    orderItemsSelected,
  } = location.state;

  const mutationUpdate = useMutationHook(({ id, data, access_token }) => {
    const res = UserService.updateUser(id, data, access_token);
    return res;
  });

  const mutationPayment = useMutationHook(({ data, access_token }) => {
    const res = OrderService.createOrder(data, access_token);
    return res;
  });

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const { isSuccess, data } = mutationUpdate;
  const { isSuccess: isSuccessPayment, data: dataPayment } = mutationPayment;

  useEffect(() => {
    setStateUserDetail({
      name: user?.name,
      phone: user?.phone,
      address: user?.address,
      city: user?.city,
    });
  }, [user]);

  useEffect(() => {
    dispatch(addOrderItemsSelected({ checkedList }));
  }, [checkedList]);

  useEffect(() => {
    form.setFieldsValue(stateUserDetail);
  }, [form, stateUserDetail]);

  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      Message.success("Update user success!");
      dispatch(
        updateUser({
          ...data?.data,
          name: data?.data.name,
          phone: data?.data.phone,
          address: data?.data.address,
          city: data?.data.city,
          access_token: user?.access_token,
        })
      );
      setStateUserDetail({
        name: data?.data.name,
        phone: data?.data.phone,
        address: data?.data.address,
        city: data?.data.city,
      });
      setIsOpenModalUpdateInfo(false);
    } else if (data?.status === "ERROR") {
      Message.error(data?.message);
      setIsOpenModalUpdateInfo(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isSuccessPayment && dataPayment?.status === "OK") {
      const arrOrdered = [];
      orderItemsSelected?.forEach((item) => arrOrdered.push(item.product));
      dispatch(removeMoreProduct({ checkedList: arrOrdered }));
      Message.success("Đặt hàng thành công!");
      navigate("/order-success", {
        state: {
          orderItemsSelected,
          priceTotalMemo,
          paymentMethod: valuePayment,
          delivery: value,
        },
      });
    } else if (data?.status === "ERROR") {
      Message.error("Đặt hàng thất bại!");
    }
  }, [isSuccessPayment]);

  const handleBuyProduct = () => {
    mutationPayment.mutate({
      data: {
        orderItems: orderItemsSelected,
        fullName: user?.name,
        address: user?.address,
        city: user?.city,
        phone: user?.phone,
        paymentMethod: valuePayment,
        itemsPrice: priceMemo,
        shippingPrice: priceDeliveryMemo,
        totalPrice: priceTotalMemo,
        userId: user?.id,
      },
      access_token: user?.access_token,
    });
  };

  const handleOnChangeDetail = (e) => {
    setStateUserDetail({
      ...stateUserDetail,
      [e.target.name]: e.target.value,
    });
  };

  const handleCancel = () => {
    setIsOpenModalUpdateInfo(false);
  };

  const handleUpdateUser = () => {
    mutationUpdate.mutate({
      id: user?.id,
      data: stateUserDetail,
      access_token: user?.access_token,
    });
  };

  const handleChangeAddress = () => {
    setIsOpenModalUpdateInfo(true);
  };

  const onChangePayment = (e) => {
    setValuePayment(e.target.value);
  };

  const getConfig = async () => {
    const { data } = await PaymentService.getConfig();
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
    script.async = true;
    document.body.appendChild(script);
  };

  useEffect(() => {
    if (!window.paypal) {
      getConfig();
    } else {
      setSdkReady(true);
    }
  }, []);

  const onSuccessPaypal = (details, data) => {
    mutationPayment.mutate({
      data: {
        orderItems: orderItemsSelected,
        fullName: user?.name,
        address: user?.address,
        city: user?.city,
        phone: user?.phone,
        paymentMethod: valuePayment,
        itemsPrice: priceMemo,
        shippingPrice: priceDeliveryMemo,
        totalPrice: priceTotalMemo,
        userId: user?.id,
        isPaid: true,
        paidAt: details.update_time,
      },
      access_token: user?.access_token,
    });
  };

  return (
    <div style={{ backgroundColor: "#f5f5fa" }}>
      <WrapperOrderPage>
        <WrapperTitle>Thanh toán</WrapperTitle>
        <div style={{ display: "flex" }}>
          <div>
            <WrapperLeft>
              <div style={{ padding: "20px 10px" }}>
                <span style={{ fontSize: "1.5rem", fontWeight: 500 }}>
                  Chọn phương thức giao hàng
                </span>
                <WrapperMethodDelivery>
                  <Radio.Group
                    onChange={onChange}
                    value={value}
                    style={{ height: "100%" }}
                  >
                    <WrapperRadioContent>
                      <Radio value={`FAST`}>
                        <WrapperRadioText>FAST</WrapperRadioText> Giao hàng tiết
                        kiệm
                      </Radio>
                      <Radio value={`GO_JEK`}>
                        <WrapperRadioText>GO_JEK</WrapperRadioText> Giao hàng
                        tiết kiệm
                      </Radio>
                    </WrapperRadioContent>
                  </Radio.Group>
                </WrapperMethodDelivery>
              </div>

              <div style={{ padding: "20px 10px" }}>
                <span style={{ fontSize: "1.5rem", fontWeight: 500 }}>
                  Chọn hình thức thanh toán
                </span>
                <WrapperMethodDelivery>
                  <Radio.Group
                    onChange={onChangePayment}
                    value={valuePayment}
                    style={{ height: "100%" }}
                  >
                    <WrapperRadioContent>
                      <Radio value={"Thanh toán khi nhận hàng"}>
                        Thanh toán khi nhận hàng
                      </Radio>
                      <Radio value={"Thanh toán bằng Paypal"}>
                        Thanh toán bằng Paypal
                      </Radio>
                    </WrapperRadioContent>
                  </Radio.Group>
                </WrapperMethodDelivery>
              </div>
            </WrapperLeft>
          </div>

          <div>
            <WrapperRight>
              <div>
                Địa chỉ:{" "}
                <span
                  style={{ fontWeight: 500 }}
                >{`${user?.address}, ${user?.city}`}</span>{" "}
                <span
                  style={{ color: "#007fff", cursor: "pointer" }}
                  onClick={handleChangeAddress}
                >
                  Thay đổi
                </span>
              </div>

              <div style={{ padding: "20px 0 30px" }}>
                <WrapperCaculator>
                  <label>Tạm tính</label>
                  <div>{`${convertPrice(priceMemo) || 0} VND`}</div>
                </WrapperCaculator>
                <WrapperCaculator>
                  <label>Giảm giá</label>
                  <div>{`${convertPrice(priceDiscountMemo) || 0} VND`}</div>
                </WrapperCaculator>
                <WrapperCaculator>
                  <label>Phí giao hàng</label>
                  <div>{`${convertPrice(priceDeliveryMemo) || 0} VND`}</div>
                </WrapperCaculator>
              </div>

              <WrapperTotalPrice>
                <span>Tổng tiền</span>
                <div>
                  <WrapperTotal>{`${convertPrice(
                    priceTotalMemo || 0
                  )} VND`}</WrapperTotal>{" "}
                  <div>(Đã bao gồm VAT nếu có)</div>
                </div>
              </WrapperTotalPrice>
            </WrapperRight>
            <div style={{ paddingTop: "30px" }}>
              {valuePayment === "Thanh toán bằng Paypal" ? (
                <PayPalButton
                  amount={Math.ceil(priceTotalMemo / 24000)}
                  // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                  onSuccess={(details, data) => onSuccessPaypal(details, data)}
                  onError={() => {
                    alert("Payment error!");
                  }}
                />
              ) : (
                <ButtonComponent
                  buttonText="Đặt hàng"
                  onClick={handleBuyProduct}
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
              )}
            </div>
          </div>
        </div>
      </WrapperOrderPage>

      <ModalComponent
        title="Cập nhật thông tin giao hàng"
        open={isOpenModalUpdateInfo}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 20,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={handleUpdateUser}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <InputComponent
              value={stateUserDetail.name}
              onChange={handleOnChangeDetail}
              name="name"
            />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your phone!",
              },
            ]}
          >
            <InputComponent
              value={stateUserDetail.phone}
              onChange={handleOnChangeDetail}
              name="phone"
            />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: "Please input your address!",
              },
            ]}
          >
            <InputComponent
              value={stateUserDetail.address}
              onChange={handleOnChangeDetail}
              name="address"
            />
          </Form.Item>

          <Form.Item
            label="City"
            name="city"
            rules={[
              {
                required: true,
                message: "Please input your city!",
              },
            ]}
          >
            <InputComponent
              value={stateUserDetail.city}
              onChange={handleOnChangeDetail}
              name="city"
            />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 20,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </ModalComponent>
    </div>
  );
};

export default PaymentPage;
