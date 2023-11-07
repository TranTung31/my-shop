import { WrapperButton, WrapperHeader, WrapperUpload } from "./styles";
import { PlusOutlined } from "@ant-design/icons";
import TableComponent from "../TableComponent/TableComponent";
import { Button, Form, Modal } from "antd";
import { useEffect, useState } from "react";
import InputComponent from "../InputComponent/InputComponent";
import { getBase64 } from "../../utils";
import * as ProductService from "../../services/ProductService";
import useMutationHook from "../../hooks/useMutationHook";
import * as Message from "../../components/Message/Message";

const AdminProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stateProduct, setStateProduct] = useState({
    name: "",
    type: "",
    price: "",
    countInStock: "",
    rating: "",
    image: "",
  });

  const mutation = useMutationHook((data) =>
    ProductService.createProduct(data)
  );

  const { data, isSuccess, isError } = mutation;

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
      setIsModalOpen(false);
    } else if (data?.status === "ERROR") {
      Message.error("Create product error!");
      setIsModalOpen(false);
    }
  }, [isSuccess]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    console.log(stateProduct);
    // setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = () => {
    console.log("finish: ", stateProduct);
    mutation.mutate(stateProduct);
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

  const handleOnChange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
      <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
      <WrapperButton type="dashed" onClick={showModal}>
        Thêm <PlusOutlined />
      </WrapperButton>
      <Modal
        title="Tạo sản phẩm mới"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
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
                message: "Please input your rating!",
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
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <div style={{ marginTop: "20px" }}>
        <TableComponent />
      </div>
    </div>
  );
};

export default AdminProduct;
