import { WrapperButton, WrapperHeader, WrapperUpload } from "./styles";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import TableComponent from "../TableComponent/TableComponent";
import { Button, Form } from "antd";
import { useEffect, useState } from "react";
import InputComponent from "../InputComponent/InputComponent";
import { getBase64 } from "../../utils";
import * as ProductService from "../../services/ProductService";
import useMutationHook from "../../hooks/useMutationHook";
import * as Message from "../../components/Message/Message";
import { useQuery } from "@tanstack/react-query";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { useSelector } from "react-redux";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import ModalComponent from "../ModalComponent/ModalComponent";

const AdminProduct = () => {
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [isRowSelected, setIsRowSelected] = useState("");
  const [isNameProduct, setIsNameProduct] = useState("");

  const user = useSelector((state) => state.user);

  const [stateProduct, setStateProduct] = useState({
    name: "",
    type: "",
    price: "",
    countInStock: "",
    rating: "",
    image: "",
  });

  const [stateDetailProduct, setStateDetailProduct] = useState({
    name: "",
    type: "",
    price: "",
    countInStock: "",
    rating: "",
    image: "",
  });

  const [form] = Form.useForm();

  const mutationUpdate = useMutationHook(({ id, data, access_token }) => {
    const res = ProductService.updateProduct(id, data, access_token);
    return res;
  });

  const mutationDelete = useMutationHook(({ id, access_token }) => {
    const res = ProductService.deleteProduct(id, access_token);
    return res;
  });

  const mutation = useMutationHook((data) =>
    ProductService.createProduct(data)
  );

  const { data, isSuccess } = mutation;

  const {
    data: dataUpdateProduct,
    isError: isErrorUpdateProduct,
    isSuccess: isSuccessUpdateProduct,
    isLoading: isLoadingUpdateProduct,
  } = mutationUpdate;

  const {
    data: dataDeleteProduct,
    isError: isErrorDeleteProduct,
    isSuccess: isSuccessDeleteProduct,
    isLoading: isLoadingDeleteProduct,
  } = mutationDelete;

  const getAllProduct = async () => {
    const res = await ProductService.getAllProduct();
    return res;
  };

  const queryGetAllProduct = useQuery({
    queryKey: ["products"],
    queryFn: getAllProduct,
  });

  const { isLoading: isLoadingProducts, data: products } = queryGetAllProduct;

  const dataProducts = products?.data?.map((product) => {
    return { ...product, key: product._id };
  });

  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      Message.success("Create product success!");
      setStateProduct({
        name: "",
        type: "",
        price: "",
        countInStock: "",
        rating: "",
        image: "",
      });
      form.resetFields();
      setIsOpenModalCreate(false);
    } else if (data?.status === "ERROR") {
      Message.error("Create product error!");
      setStateProduct({
        name: "",
        type: "",
        price: "",
        countInStock: "",
        rating: "",
        image: "",
      });
      form.resetFields();
      setIsOpenModalCreate(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isSuccessUpdateProduct && dataUpdateProduct?.status === "OK") {
      Message.success("Update product success!");
      setIsOpenModalEdit(false);
    } else if (isErrorUpdateProduct) {
      Message.error("Update product error!");
      setIsOpenModalEdit(false);
    }
  }, [isSuccessUpdateProduct]);

  useEffect(() => {
    if (isSuccessDeleteProduct && dataDeleteProduct?.status === "OK") {
      Message.success("Delete product success!");
      setIsOpenModalDelete(false);
    } else if (dataDeleteProduct?.status === "ERROR") {
      Message.success("Delete product error!");
      setIsOpenModalDelete(false);
    }
  }, [isSuccessDeleteProduct]);

  const showModal = () => {
    setIsOpenModalCreate(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsOpenModalCreate(false);
  };

  const onFinish = () => {
    mutation.mutate(stateProduct, {
      onSettled: () => {
        queryGetAllProduct.refetch();
      },
    });
  };

  const handleOnChangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProduct({
      ...stateProduct,
      image: file.preview,
    });
  };

  const handleOnChangeAvatarDetail = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateDetailProduct({
      ...stateDetailProduct,
      image: file.preview,
    });
  };

  const handleOnChange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnChangeDetail = (e) => {
    setStateDetailProduct({
      ...stateDetailProduct,
      [e.target.name]: e.target.value,
    });
  };

  const fetchGetDetailProduct = async () => {
    const res = await ProductService.getDetailProduct(isRowSelected);
    if (res?.data) {
      setStateDetailProduct({
        name: res?.data?.name,
        type: res?.data?.type,
        price: res?.data?.price,
        countInStock: res?.data?.countInStock,
        rating: res?.data?.rating,
        image: res?.data?.image,
      });
    }
    return res;
  };

  useEffect(() => {
    if (isRowSelected) {
      fetchGetDetailProduct();
    }
  }, [isRowSelected]);

  useEffect(() => {
    form.setFieldsValue(stateDetailProduct);
  }, [form, stateDetailProduct]);

  const handleGetDetailProduct = () => {
    setIsOpenModalEdit(true);
  };

  const handleUpdateProduct = () => {
    mutationUpdate.mutate(
      {
        id: isRowSelected,
        data: stateDetailProduct,
        access_token: user?.access_token,
      },
      {
        onSettled: () => {
          queryGetAllProduct.refetch();
        },
      }
    );
  };

  const handleDelete = () => {
    mutationDelete.mutate(
      { id: isRowSelected, access_token: user?.access_token },
      {
        onSettled: () => {
          queryGetAllProduct.refetch();
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

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Rating",
      dataIndex: "rating",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: renderIcons,
    },
  ];

  return (
    <div>
      <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
      <WrapperButton type="dashed" onClick={showModal}>
        Thêm <PlusOutlined />
      </WrapperButton>
      <ModalComponent
        title="Tạo sản phẩm mới"
        open={isOpenModalCreate}
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
          onFinish={onFinish}
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
              value={stateProduct.name}
              onChange={handleOnChange}
              name="name"
            />
          </Form.Item>

          <Form.Item
            label="Type"
            name="type"
            rules={[
              {
                required: true,
                message: "Please input your type!",
              },
            ]}
          >
            <InputComponent
              value={stateProduct.type}
              onChange={handleOnChange}
              name="type"
            />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: "Please input your price!",
              },
            ]}
          >
            <InputComponent
              value={stateProduct.price}
              onChange={handleOnChange}
              name="price"
            />
          </Form.Item>

          <Form.Item
            label="Count In Stock"
            name="countInStock"
            rules={[
              {
                required: true,
                message: "Please input your count in stock!",
              },
            ]}
          >
            <InputComponent
              value={stateProduct.countInStock}
              onChange={handleOnChange}
              name="countInStock"
            />
          </Form.Item>

          <Form.Item
            label="Rating"
            name="rating"
            rules={[
              {
                required: true,
                message: "Please input your rating!",
              },
            ]}
          >
            <InputComponent
              value={stateProduct.rating}
              onChange={handleOnChange}
              name="rating"
            />
          </Form.Item>

          <Form.Item
            label="Image"
            name="image"
            rules={[
              {
                required: true,
                message: "Please input your image!",
              },
            ]}
          >
            <WrapperUpload onChange={handleOnChangeAvatar} maxCount={1}>
              <Button className={stateProduct.image ? "btn-upload" : null}>
                Upload
              </Button>
              {stateProduct.image && (
                <img
                  src={stateProduct.image}
                  alt="avatar"
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    marginLeft: "20px",
                  }}
                />
              )}
            </WrapperUpload>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 20,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </ModalComponent>

      <ModalComponent
        title="Xóa sản phẩm"
        open={isOpenModalDelete}
        onCancel={() => setIsOpenModalDelete(false)}
        onOk={handleDelete}
      >
        <LoadingComponent isLoading={isLoadingDeleteProduct}>
          <div
            style={{ marginTop: "12px", fontWeight: 600, height: "50px" }}
          >{`Bạn có chắc chắn muốn xóa sản phẩm có name "${isNameProduct}" này không?`}</div>
        </LoadingComponent>
      </ModalComponent>

      <DrawerComponent
        open={isOpenModalEdit}
        onClose={() => setIsOpenModalEdit(false)}
        width="50%"
      >
        <LoadingComponent isLoading={isLoadingUpdateProduct}>
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
            onFinish={handleUpdateProduct}
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
                value={stateDetailProduct.name}
                onChange={handleOnChangeDetail}
                name="name"
              />
            </Form.Item>

            <Form.Item
              label="Type"
              name="type"
              rules={[
                {
                  required: true,
                  message: "Please input your type!",
                },
              ]}
            >
              <InputComponent
                value={stateDetailProduct.type}
                onChange={handleOnChangeDetail}
                name="type"
              />
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              rules={[
                {
                  required: true,
                  message: "Please input your price!",
                },
              ]}
            >
              <InputComponent
                value={stateDetailProduct.price}
                onChange={handleOnChangeDetail}
                name="price"
              />
            </Form.Item>

            <Form.Item
              label="Count In Stock"
              name="countInStock"
              rules={[
                {
                  required: true,
                  message: "Please input your count in stock!",
                },
              ]}
            >
              <InputComponent
                value={stateDetailProduct.countInStock}
                onChange={handleOnChangeDetail}
                name="countInStock"
              />
            </Form.Item>

            <Form.Item
              label="Rating"
              name="rating"
              rules={[
                {
                  required: true,
                  message: "Please input your rating!",
                },
              ]}
            >
              <InputComponent
                value={stateDetailProduct.rating}
                onChange={handleOnChangeDetail}
                name="rating"
              />
            </Form.Item>

            <Form.Item
              label="Image"
              name="image"
              rules={[
                {
                  required: true,
                  message: "Please input your image!",
                },
              ]}
            >
              <WrapperUpload onChange={handleOnChangeAvatarDetail} maxCount={1}>
                <Button
                  className={stateDetailProduct.image ? "btn-upload" : null}
                >
                  Upload
                </Button>
                {stateDetailProduct.image && (
                  <img
                    src={stateDetailProduct.image}
                    alt="avatar"
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginLeft: "20px",
                    }}
                  />
                )}
              </WrapperUpload>
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
        <TableComponent
          isLoading={isLoadingProducts}
          columns={columns}
          data={dataProducts}
          onRow={(record) => {
            return {
              onClick: (event) => {
                setIsRowSelected(record._id);
                setIsNameProduct(record.name);
              },
            };
          }}
        />
      </div>
    </div>
  );
};

export default AdminProduct;
