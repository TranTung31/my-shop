import { WrapperHeader } from "./styles";
import TableComponent from "../TableComponent/TableComponent";
import { Button, Form, Select, Space } from "antd";
import { useEffect, useRef, useState } from "react";
import ModalComponent from "../ModalComponent/ModalComponent";
import InputComponent from "../InputComponent/InputComponent";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { useSelector } from "react-redux";
import * as OrderService from "../../services/OrderService";
import useMutationHook from "../../hooks/useMutationHook";
import * as Message from "../../components/Message/Message";
import { useQuery } from "@tanstack/react-query";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { convertPrice } from "../../utils";
import PieChartComponent from "./PieChartComponent";

const AdminOrder = () => {
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [isRowSelected, setIsRowSelected] = useState("");
  const [typeDelivered, setTypeDelivered] = useState(["true", "false"]);
  const [isCodeOrder, setIsCodeOrder] = useState("");

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const user = useSelector((state) => state.user);

  const [stateOrderDetail, setStateOrderDetail] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    deliveryMethod: "",
    isDelivered: false,
  });

  const stateOrderDetailPut = {
    shippingAddress: {
      fullName: stateOrderDetail.fullName,
      phone: stateOrderDetail.phone,
      address: stateOrderDetail.address,
      city: stateOrderDetail.city,
    },
    deliveryMethod: stateOrderDetail.deliveryMethod,
    isDelivered: stateOrderDetail.isDelivered,
  };

  const [form] = Form.useForm();

  const mutationUpdate = useMutationHook(({ id, data, access_token }) => {
    const res = OrderService.updateOrder(id, data, access_token);
    return res;
  });

  const mutationDelete = useMutationHook(({ id, access_token, orderItems }) => {
    const res = OrderService.deleteOrder(id, access_token, orderItems);
    return res;
  });

  const mutationDeleteMany = useMutationHook(({ ids, access_token }) => {
    const res = OrderService.deleteManyOrder(ids, access_token);
    return res;
  });

  const {
    data: dataUpdateOrder,
    isError: isErrorUpdateOrder,
    isSuccess: isSuccessUpdateOrder,
    isLoading: isLoadingUpdateOrder,
  } = mutationUpdate;

  const {
    data: dataDeleteOrder,
    isError: isErrorDeleteOrder,
    isSuccess: isSuccessDeleteOrder,
    isLoading: isLoadingDeleteOrder,
  } = mutationDelete;

  const {
    data: dataDeleteManyOrder,
    isError: isErrorDeleteManyOrder,
    isSuccess: isSuccessDeleteManyOrder,
    isLoading: isLoadingDeleteManyOrder,
  } = mutationDeleteMany;

  const getAll = async () => {
    const res = await OrderService.getAllOrder(user?.access_token);
    return res;
  };

  const queryGetAllOrder = useQuery({
    queryKey: ["order"],
    queryFn: getAll,
  });

  const { isLoading: isLoadingProducts, data: orders } = queryGetAllOrder;

  const dataOrder = orders?.data?.map((order) => {
    return {
      ...order,
      key: order._id,
      codeOrder: `DH${order._id}`,
      userName: order.shippingAddress.fullName,
      phone: order.shippingAddress.phone,
      address: order.shippingAddress.address,
      city: order.shippingAddress.city,
      isPaid: order.isPaid ? "Đã thanh toán" : "Chưa thanh toán",
      isDelivered: order.isDelivered ? "Đã giao hàng" : "Chưa giao hàng",
      orderItems: order.orderItems,
      totalPrice: convertPrice(order.totalPrice),
      paymentMethod: order.paymentMethod,
      orderItemsLength: order.orderItems.length,
      deliveryMethod: order.deliveryMethod,
    };
  });

  useEffect(() => {
    if (isSuccessUpdateOrder && dataUpdateOrder?.status === "OK") {
      Message.success("Update order success!");
      setIsOpenModalEdit(false);
    }
    if (isErrorUpdateOrder) {
      Message.error("Update order error!");
      setIsOpenModalEdit(false);
    }
  }, [isSuccessUpdateOrder]);

  useEffect(() => {
    if (isSuccessDeleteOrder && dataDeleteOrder?.status === "OK") {
      Message.success("Delete order success!");
      setIsOpenModalDelete(false);
    } else if (dataDeleteOrder?.status === "ERROR") {
      Message.success("Delete order error!");
      setIsOpenModalDelete(false);
    }
  }, [isSuccessDeleteOrder]);

  useEffect(() => {
    if (isSuccessDeleteManyOrder && dataDeleteManyOrder?.status === "OK") {
      Message.success("Delete many order success!");
    } else if (dataDeleteManyOrder?.status === "ERROR") {
      Message.success("Delete many order error!");
    }
  }, [isSuccessDeleteManyOrder]);

  const handleOnChangeDetail = (e) => {
    setStateOrderDetail({
      ...stateOrderDetail,
      [e.target.name]: e.target.value,
    });
  };

  const fetchGetDetailOrder = async () => {
    const res = await OrderService.getOrderDetail(
      isRowSelected,
      user?.access_token
    );
    if (res?.data) {
      setStateOrderDetail({
        fullName: res?.data?.shippingAddress?.fullName,
        phone: res?.data?.shippingAddress?.phone,
        address: res?.data?.shippingAddress?.address,
        city: res?.data?.shippingAddress?.city,
        deliveryMethod: res?.data?.deliveryMethod,
        isDelivered: res?.data?.isDelivered,
      });
    }
    return res;
  };

  useEffect(() => {
    if (isRowSelected) {
      fetchGetDetailOrder();
    }
  }, [isRowSelected]);

  useEffect(() => {
    form.setFieldsValue(stateOrderDetail);
  }, [form, stateOrderDetail]);

  const handleGetDetailProduct = () => {
    setIsOpenModalEdit(true);
  };

  const handleUpdateOrder = () => {
    mutationUpdate.mutate(
      {
        id: isRowSelected,
        data: stateOrderDetailPut,
        access_token: user?.access_token,
      },
      {
        onSettled: () => {
          queryGetAllOrder.refetch();
        },
      }
    );
  };

  const orderFind = dataOrder?.find((item) => isRowSelected === item.key);

  const handleDelete = () => {
    mutationDelete.mutate(
      {
        id: isRowSelected,
        access_token: user?.access_token,
        orderItems: orderFind?.orderItems,
      },
      {
        onSettled: () => {
          queryGetAllOrder.refetch();
        },
      }
    );
  };

  const renderIcons = () => {
    return (
      <div>
        <DeleteOutlined
          style={{
            fontSize: "26px",
            color: "red",
            cursor: "pointer",
            marginRight: "10px",
          }}
          onClick={() => setIsOpenModalDelete(true)}
        />
        <EditOutlined
          style={{ fontSize: "26px", color: "orange", cursor: "pointer" }}
          onClick={handleGetDetailProduct}
        />
      </div>
    );
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns = [
    {
      title: "Code order",
      dataIndex: "codeOrder",
    },
    {
      title: "User name",
      dataIndex: "userName",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "City",
      dataIndex: "city",
    },
    {
      title: "Paided",
      dataIndex: "isPaid",
    },
    {
      title: "Delivered",
      dataIndex: "isDelivered",
    },
    {
      title: "Payment method",
      dataIndex: "paymentMethod",
    },
    {
      title: "Delivery method",
      dataIndex: "deliveryMethod",
    },
    {
      title: "Total price",
      dataIndex: "totalPrice",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: renderIcons,
    },
  ];

  const handleDeleteManyOrder = (ids) => {
    mutationDeleteMany.mutate(
      { ids: ids, access_token: user?.access_token },
      {
        onSettled: () => {
          queryGetAllOrder.refetch();
        },
      }
    );
  };

  const handleOnChangeDelivered = (e) => {
    setStateOrderDetail({
      ...stateOrderDetail,
      isDelivered: e,
    });
  };

  const renderTypeProduct = () => {
    let result = typeDelivered.map((type) => {
      return {
        value: type,
        label: type,
      };
    });
    return result;
  };

  return (
    <div>
      <WrapperHeader>Quản lý đơn hàng</WrapperHeader>

      <div style={{ width: "200px", height: "200px" }}>
        <PieChartComponent dataChart={orders?.data} />
      </div>

      <ModalComponent
        title="Xóa đơn hàng"
        open={isOpenModalDelete}
        onCancel={() => setIsOpenModalDelete(false)}
        onOk={handleDelete}
      >
        <LoadingComponent isLoading={isLoadingDeleteOrder}>
          <div
            style={{ marginTop: "12px", fontWeight: 600, height: "50px" }}
          >{`Bạn có chắc chắn muốn xóa đơn hàng có mã "${isCodeOrder}" này không?`}</div>
        </LoadingComponent>
      </ModalComponent>

      <DrawerComponent
        title="Thông tin đơn hàng"
        open={isOpenModalEdit}
        onClose={() => setIsOpenModalEdit(false)}
        width="50%"
      >
        <LoadingComponent isLoading={isLoadingUpdateOrder}>
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
            onFinish={handleUpdateOrder}
            autoComplete="off"
            form={form}
          >
            <Form.Item
              label="User name"
              name="fullName"
              rules={[
                {
                  required: true,
                  message: "Please input your user name!",
                },
              ]}
            >
              <InputComponent
                value={stateOrderDetail.fullName}
                onChange={handleOnChangeDetail}
                name="fullName"
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
                value={stateOrderDetail.phone}
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
                value={stateOrderDetail.address}
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
                value={stateOrderDetail.city}
                onChange={handleOnChangeDetail}
                name="city"
              />
            </Form.Item>

            <Form.Item
              label="Delivery method"
              name="deliveryMethod"
              rules={[
                {
                  required: true,
                  message: "Please input your deliveryMethod!",
                },
              ]}
            >
              <InputComponent
                value={stateOrderDetail.deliveryMethod}
                onChange={handleOnChangeDetail}
                name="deliveryMethod"
              />
            </Form.Item>

            <Form.Item
              label="Delivered"
              name="isDelivered"
              rules={[
                {
                  required: true,
                  message: "Please input your delivered!",
                },
              ]}
            >
              <Select
                name="isDelivered"
                value={stateOrderDetail.isDelivered}
                onChange={handleOnChangeDelivered}
                style={{
                  width: "100%",
                }}
                options={renderTypeProduct()}
              />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 21,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Form.Item>
          </Form>
        </LoadingComponent>
      </DrawerComponent>

      <div style={{ marginTop: "20px" }}>
        <LoadingComponent isLoading={isLoadingDeleteManyOrder}>
          <TableComponent
            isLoading={isLoadingProducts}
            columns={columns}
            data={dataOrder}
            handleDelete={handleDeleteManyOrder}
            onRow={(record) => {
              return {
                onClick: (event) => {
                  setIsRowSelected(record._id);
                  setIsCodeOrder(record.codeOrder);
                },
              };
            }}
          />
        </LoadingComponent>
      </div>
    </div>
  );
};

export default AdminOrder;
