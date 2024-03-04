import React, { useEffect, useState } from "react";
import Loading from "../../components/LoadingComponent/LoadingComponent";
import { useQuery } from "@tanstack/react-query";
import * as OrderService from "../../services/OrderService";
import { convertDate, convertPrice } from "../../utils";
import {
  WrapperItemOrder,
  WrapperListOrder,
  WrapperHeaderItem,
  WrapperFooterItem,
  WrapperContainer,
  WrapperStatus,
  WrapperMyOrderPage,
  WrapperStyleTitle,
  WrapperStatusTitle,
  WrapperStatusContent,
} from "./styles";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useLocation, useNavigate } from "react-router-dom";
import useMutationHook from "../../hooks/useMutationHook";
import { useSelector } from "react-redux";
import * as Message from "../../components/Message/Message";

const MyOrderPage = () => {
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const { id, token } = location.state;
  const fetchAllOrder = async () => {
    const res = await OrderService.getOrder(id, token);
    return res.data;
  };

  const queryOrder = useQuery(
    { queryKey: ["orders"], queryFn: fetchAllOrder },
    {
      enabled: id && token,
    }
  );
  const { isLoading, data } = queryOrder;

  const handleOrderDetail = (id) => {
    navigate(`/order-detail/${id}`, {
      state: {
        token: token,
      },
    });
  };

  const renderOrder = (orderItems) => {
    return orderItems?.map((order, index) => {
      return (
        <WrapperHeaderItem key={index}>
          <img
            src={order?.image}
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
              fontSize: "1.6rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              marginLeft: "10px",
            }}
          >
            {order?.name}
          </div>
          <span
            style={{
              fontSize: "1.6rem",
              fontWeight: "bold",
              color: "rgb(255, 66, 78)",
              marginLeft: "auto",
            }}
          >
            {`${convertPrice(order?.price)}₫`}
          </span>
        </WrapperHeaderItem>
      );
    });
  };

  const mutationDelete = useMutationHook(({ id, access_token, orderItems }) => {
    const res = OrderService.deleteOrder(id, access_token, orderItems);
    return res;
  });

  const {
    data: dataDelete,
    isSuccess: isSuccessDelete,
    isError: isErrorDelete,
    isLoading: isLoadingDelete,
  } = mutationDelete;

  useEffect(() => {
    if (isSuccessDelete) {
      Message.success("Xóa đơn hàng thành công!");
    } else if (isErrorDelete && dataDelete?.status === "ERROR") {
      Message.error("Xóa đơn hàng thất bại!");
    }
  }, [isSuccessDelete]);

  const handleDeleteOrder = (order) => {
    const orderId = order?._id;
    if (window.confirm(`Bạn có muốn xóa đơn hàng có mã DH${orderId} không?`)) {
      mutationDelete.mutate(
        {
          id: orderId,
          access_token: user?.access_token,
          orderItems: order?.orderItems,
        },
        {
          onSuccess: () => {
            queryOrder.refetch();
          },
        }
      );
    }
  };

  return (
    <Loading isLoading={isLoading || isLoadingDelete}>
      <WrapperContainer>
        <WrapperMyOrderPage>
          <WrapperStyleTitle>Đơn hàng của tôi</WrapperStyleTitle>
          <WrapperListOrder>
            {data
              ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              ?.map((item, index) => {
                return (
                  <WrapperItemOrder key={item?._id}>
                    <WrapperStatus>
                      <WrapperStatusTitle>Trạng thái</WrapperStatusTitle>
                      <WrapperStatusContent>
                        <span>Mã đơn hàng: </span>
                        <span>{`DH${item?._id}`}</span>
                      </WrapperStatusContent>
                      <WrapperStatusContent>
                        <span>Giao hàng: </span>
                        <span>
                          {`${
                            item?.isDelivered
                              ? "Đã giao hàng"
                              : "Chưa giao hàng"
                          }`}
                        </span>
                      </WrapperStatusContent>
                      <WrapperStatusContent>
                        <span>Thanh toán: </span>
                        <span>
                          {`${
                            item?.isPaid ? "Đã thanh toán" : "Chưa thanh toán"
                          }`}
                        </span>
                      </WrapperStatusContent>
                      <WrapperStatusContent>
                        <span>Ngày đặt: </span>
                        <span>{convertDate(item?.createdAt)}</span>
                      </WrapperStatusContent>
                    </WrapperStatus>
                    {renderOrder(item?.orderItems)}
                    <WrapperFooterItem>
                      <div>
                        <span
                          style={{
                            fontSize: "1.6rem",
                            color: "rgb(255, 66, 78)",
                            fontWeight: "bold",
                          }}
                        >
                          Tổng tiền:{" "}
                        </span>
                        <span
                          style={{
                            fontSize: "1.6rem",
                            color: "rgb(255, 66, 78)",
                            fontWeight: 700,
                          }}
                        >
                          {`${convertPrice(item?.totalPrice)}₫`}
                        </span>
                      </div>
                      <div style={{ display: "flex", gap: "10px" }}>
                        {item?.isDelivered ? null : (
                          <ButtonComponent
                            onClick={() => handleDeleteOrder(item)}
                            size={40}
                            styleButton={{
                              height: "36px",
                              border: "1px solid rgb(11, 116, 229)",
                              borderRadius: "4px",
                            }}
                            buttonText="Hủy đơn hàng"
                            styleTextButton={{
                              color: "rgb(11, 116, 229)",
                              fontSize: "14px",
                            }}
                          ></ButtonComponent>
                        )}
                        <ButtonComponent
                          onClick={() => handleOrderDetail(item?._id)}
                          size={40}
                          styleButton={{
                            height: "36px",
                            border: "1px solid rgb(11, 116, 229)",
                            borderRadius: "4px",
                          }}
                          buttonText="Xem chi tiết"
                          styleTextButton={{
                            color: "rgb(11, 116, 229)",
                            fontSize: "14px",
                          }}
                        ></ButtonComponent>
                      </div>
                    </WrapperFooterItem>
                  </WrapperItemOrder>
                );
              })}
          </WrapperListOrder>
        </WrapperMyOrderPage>
      </WrapperContainer>
    </Loading>
  );
};

export default MyOrderPage;
