import React, { useMemo } from "react";
import {
  WrapperAllPrice,
  WrapperContentInfo,
  WrapperHeaderUser,
  WrapperInfoUser,
  WrapperItem,
  WrapperItemLabel,
  WrapperLabel,
  WrapperNameProduct,
  WrapperOrderDetailPage,
  WrapperProduct,
  WrapperStyleContent,
  WrapperStyleTitle,
} from "./styles";
import logo from "../../assets/images/logo.png";
import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import * as OrderService from "../../services/OrderService";
import { useQuery } from "@tanstack/react-query";
import { convertPrice } from "../../utils";
import Loading from "../../components/LoadingComponent/LoadingComponent";

const OrderDetailPage = () => {
  const params = useParams();
  const { id } = params;
  const location = useLocation();
  const { token } = location.state;

  const fetchOrderDetail = async () => {
    const res = await OrderService.getOrderDetail(id, token);
    return res.data;
  };

  const queryOrderDetail = useQuery(
    {
      queryKey: ["order-detail"],
      queryFn: fetchOrderDetail,
    },
    {
      enabled: id && token,
    }
  );

  const { isLoading, data } = queryOrderDetail;

  const priceMemo = useMemo(() => {
    const result = data?.orderItems?.reduce((total, item) => {
      return total + item.price * item.amount;
    }, 0);
    return result;
  }, [data]);

  return (
    <Loading isLoading={isLoading}>
      <div style={{ width: "100%", height: "100vh", background: "#f5f5fa" }}>
        <WrapperOrderDetailPage>
          <WrapperStyleTitle>Chi tiết đơn hàng</WrapperStyleTitle>
          <WrapperHeaderUser>
            <WrapperInfoUser>
              <WrapperLabel>Địa chỉ người nhận</WrapperLabel>
              <WrapperContentInfo>
                <div className="name-info">
                  {data?.shippingAddress?.fullName}
                </div>
                <div
                  className="address-info"
                  style={{ fontSize: "1.5rem", padding: "5px 0" }}
                >
                  <span>Địa chỉ: </span>{" "}
                  {`${data?.shippingAddress?.address} ${" "} ${
                    data?.shippingAddress?.city
                  }`}
                </div>
                <div style={{ fontSize: "1.5rem", padding: "5px 0" }}>
                  <span>Điện thoại: </span> {data?.shippingAddress?.phone}
                </div>
              </WrapperContentInfo>
            </WrapperInfoUser>
            <WrapperInfoUser>
              <WrapperLabel>Hình thức giao hàng</WrapperLabel>
              <WrapperContentInfo>
                <div style={{ fontSize: "1.5rem", marginTop: 0 }}>
                  <span className="name-delivery">FAST </span>Giao hàng tiết
                  kiệm
                </div>
                <div className="delivery-fee" style={{ fontSize: "1.5rem" }}>
                  <span>Phí giao hàng: </span>
                  {data?.shippingPrice}
                </div>
              </WrapperContentInfo>
            </WrapperInfoUser>
            <WrapperInfoUser>
              <WrapperLabel>Hình thức thanh toán</WrapperLabel>
              <WrapperContentInfo>
                <div style={{ fontSize: "1.5rem" }}>{data?.paymentMethod}</div>
                <div className="status-payment">
                  {data?.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
                </div>
              </WrapperContentInfo>
            </WrapperInfoUser>
          </WrapperHeaderUser>
          <WrapperStyleContent>
            <div
              style={{
                fontSize: "1.5rem",
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ width: "670px" }}>Sản phẩm</div>
              <WrapperItemLabel>Giá</WrapperItemLabel>
              <WrapperItemLabel>Số lượng</WrapperItemLabel>
              <WrapperItemLabel>Giảm giá</WrapperItemLabel>
            </div>
            {data?.orderItems?.map((item, index) => {
              return (
                <WrapperProduct>
                  <WrapperNameProduct>
                    <img
                      src={item?.image}
                      alt=""
                      style={{
                        width: "70px",
                        height: "70px",
                        objectFit: "cover",
                        border: "1px solid rgb(238, 238, 238)",
                        padding: "2px",
                      }}
                    />
                    <div
                      style={{
                        width: 260,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        marginLeft: "10px",
                        height: "70px",
                      }}
                    >
                      {item?.name}
                    </div>
                  </WrapperNameProduct>
                  <WrapperItem>{`${convertPrice(
                    item?.price
                  )} VND`}</WrapperItem>
                  <WrapperItem>{item?.amount}</WrapperItem>
                  <WrapperItem>
                    {item?.discount
                      ? `${convertPrice(
                          item?.price * item?.amount * (item?.discount / 100)
                        )} VND`
                      : "0 VND"}
                  </WrapperItem>
                </WrapperProduct>
              );
            })}

            <WrapperAllPrice>
              <WrapperItemLabel>Tạm tính</WrapperItemLabel>
              <WrapperItem>{`${convertPrice(priceMemo)} VND`}</WrapperItem>
            </WrapperAllPrice>
            <WrapperAllPrice>
              <WrapperItemLabel>Phí vận chuyển</WrapperItemLabel>
              <WrapperItem>
                {`${convertPrice(data?.shippingPrice) || 0} VND`}
              </WrapperItem>
            </WrapperAllPrice>
            <WrapperAllPrice>
              <WrapperItemLabel>Tổng cộng</WrapperItemLabel>
              <WrapperItem>
                <WrapperItem>{`${convertPrice(
                  data?.totalPrice
                )} VND`}</WrapperItem>
              </WrapperItem>
            </WrapperAllPrice>
          </WrapperStyleContent>
        </WrapperOrderDetailPage>
      </div>
    </Loading>
  );
};

export default OrderDetailPage;
