import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Form, Select, Space } from "antd";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import * as Message from "../../components/Message/Message";
import useMutationHook from "../../hooks/useMutationHook";
import * as ProductService from "../../services/ProductService";
import * as GenreService from "../../services/GenreService";
import * as PublisherService from "../../services/PublisherService";
import { convertPrice, getBase64 } from "../../utils";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import InputComponent from "../InputComponent/InputComponent";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import ModalComponent from "../ModalComponent/ModalComponent";
import TableComponent from "../TableComponent/TableComponent";
import { WrapperButton, WrapperHeader, WrapperUpload } from "./styles";

const AdminProduct = () => {
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [publisher, setPublisher] = useState([]);
  const [genre, setGenre] = useState([]);
  const [isRowSelected, setIsRowSelected] = useState("");
  const [isNameProduct, setIsNameProduct] = useState("");
  const [typeProduct, setTypeProduct] = useState([]);

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

  const initialStateProduct = () => {
    return {
      name: "",
      type: "",
      price: "",
      countInStock: "",
      discount: "",
      rating: "",
      image: "",
      newType: "",
      author: "",
      numberOfBook: "",
      formatBook: "",
      publisherID: "",
      genreID: "",
    };
  };

  const initialStateDetailProduct = () => {
    return {
      name: "",
      type: "",
      price: "",
      countInStock: "",
      discount: "",
      rating: "",
      image: "",
      author: "",
      numberOfBook: "",
      formatBook: "",
      publisherID: "",
      genreID: "",
    };
  };

  const [stateProduct, setStateProduct] = useState(initialStateProduct());

  const [stateDetailProduct, setStateDetailProduct] = useState(
    initialStateDetailProduct()
  );

  const [form] = Form.useForm();

  const mutationUpdate = useMutationHook(({ id, data, access_token }) => {
    const res = ProductService.updateProduct(id, data, access_token);
    return res;
  });

  const mutationDelete = useMutationHook(({ id, access_token }) => {
    const res = ProductService.deleteProduct(id, access_token);
    return res;
  });

  const mutationDeleteMany = useMutationHook(({ ids, access_token }) => {
    const res = ProductService.deleteManyProduct(ids, access_token);
    return res;
  });

  const mutation = useMutationHook((data) => {
    const res = ProductService.createProduct(data);
    return res;
  });

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

  const {
    data: dataDeleteManyProduct,
    isError: isErrorDeleteManyProduct,
    isSuccess: isSuccessDeleteManyProduct,
    isLoading: isLoadingDeleteManyProduct,
  } = mutationDeleteMany;

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
    return { ...product, key: product._id, price: convertPrice(product.price) };
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
        author: "",
        numberOfBook: "",
        formatBook: "",
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
        author: "",
        numberOfBook: "",
        formatBook: "",
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

  useEffect(() => {
    if (isSuccessDeleteManyProduct && dataDeleteManyProduct?.status === "OK") {
      Message.success("Delete many product success!");
    } else if (dataDeleteProduct?.status === "ERROR") {
      Message.success("Delete many product error!");
    }
  }, [isSuccessDeleteManyProduct]);

  const showModal = () => {
    setIsOpenModalCreate(true);
  };

  const handleCancelModalCreate = () => {
    form.resetFields();
    setIsOpenModalCreate(false);
  };

  const newStateProduct = {
    name: stateProduct.name,
    type:
      stateProduct?.type === "add-type"
        ? stateProduct?.newType
        : stateProduct?.type,
    price: stateProduct.price,
    countInStock: stateProduct.countInStock,
    discount: stateProduct.discount,
    rating: stateProduct.rating,
    image: stateProduct.image,
    author: stateProduct.author,
    numberOfBook: stateProduct.numberOfBook,
    formatBook: stateProduct.formatBook,
    publisherID: stateProduct.publisherID,
    genreID: stateProduct.genreID,
  };

  const handleCreateProduct = () => {
    mutation.mutate(newStateProduct, {
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
        discount: res?.data?.discount,
        rating: res?.data?.rating,
        image: res?.data?.image,
        author: res?.data?.author,
        numberOfBook: res?.data?.numberOfBook,
        formatBook: res?.data?.formatBook,
        publisherID: res?.data?.publisherID,
        genreID: res?.data?.genreID,
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
    if (!isOpenModalCreate) {
      form.setFieldsValue(stateDetailProduct);
    } else {
      form.resetFields();
    }
  }, [form, stateDetailProduct, isOpenModalCreate]);

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
      title: "Name",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Author",
      dataIndex: "author",
    },
    {
      title: "Number of book",
      dataIndex: "numberOfBook",
    },
    {
      title: "Format book",
      dataIndex: "formatBook",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Price",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
      filters: [
        {
          text: ">= 300000",
          value: ">=",
        },
        {
          text: "< 300000",
          value: "<",
        },
      ],
      onFilter: (value, record) => {
        if (value === ">=") {
          return record?.price >= 300000;
        }
        return record?.price < 300000;
      },
    },
    {
      title: "Discount",
      dataIndex: "discount",
      sorter: (a, b) => a.discount - b.discount,
      filters: [
        {
          text: ">= 5",
          value: ">=",
        },
        {
          text: "< 5",
          value: "<",
        },
      ],
      onFilter: (value, record) => {
        if (value === ">=") {
          return record?.discount >= 5;
        }
        return record?.discount < 5;
      },
    },
    {
      title: "Rating",
      dataIndex: "rating",
      sorter: (a, b) => a.rating - b.rating,
      filters: [
        {
          text: ">= 3",
          value: ">=",
        },
        {
          text: "< 3",
          value: "<",
        },
      ],
      onFilter: (value, record) => {
        if (value === ">=") {
          return record?.rating >= 3;
        }
        return record?.rating < 3;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: renderIcons,
    },
  ];

  const handleDeleteManyProduct = (ids) => {
    mutationDeleteMany.mutate(
      { ids: ids, access_token: user?.access_token },
      {
        onSettled: () => {
          queryGetAllProduct.refetch();
        },
      }
    );
  };

  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllType();
    if (res?.status === "OK") {
      setTypeProduct(res?.data);
    }
    return res.data;
  };

  useEffect(() => {
    fetchAllTypeProduct();
  }, [stateProduct]);

  const handleOnChangeType = (e) => {
    setStateProduct({
      ...stateProduct,
      type: e,
    });
  };

  const handleOnChangePublisher = (e) => {
    setStateProduct({
      ...stateProduct,
      publisherID: e,
    });
  };

  const handleOnChangeGenre = (e) => {
    setStateProduct({
      ...stateProduct,
      genreID: e,
    });
  };

  const handleOnChangeDetailPublisher = (e) => {
    setStateDetailProduct({
      ...stateDetailProduct,
      publisherID: e,
    });
  };

  const handleOnChangeDetailGenre = (e) => {
    setStateDetailProduct({
      ...stateDetailProduct,
      genreID: e,
    });
  };

  const fetchAllPublisher = async () => {
    const res = await PublisherService.getAllPublisher();
    if (res?.status === "OK") {
      setPublisher(res?.data);
    }
  };

  const fetchAllGenre = async () => {
    const res = await GenreService.getAllGenre();
    if (res?.status === "OK") {
      setGenre(res?.data);
    }
  };

  useEffect(() => {
    fetchAllPublisher();
  }, []);

  useEffect(() => {
    fetchAllGenre();
  }, []);

  const renderTypeProduct = () => {
    let result = typeProduct.map((type) => {
      return {
        value: type,
        label: type,
      };
    });
    result.push({
      value: "add-type",
      label: "Thêm type",
    });
    return result;
  };

  const renderPublisher = () => {
    let result = publisher?.map((item, index) => {
      return {
        value: item._id,
        label: item.name,
      };
    });
    return result;
  };

  const renderGenre = () => {
    let result = genre?.map((item, index) => {
      return {
        value: item._id,
        label: item.name,
      };
    });
    return result;
  };

  return (
    <div>
      <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
      <WrapperButton type="dashed" onClick={showModal}>
        Thêm <PlusOutlined />
      </WrapperButton>

      <ModalComponent
        title="Tạo sản phẩm mới"
        open={isOpenModalCreate}
        onCancel={handleCancelModalCreate}
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
          onFinish={handleCreateProduct}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input book name!",
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
            label="Author"
            name="author"
            rules={[
              {
                required: true,
                message: "Please input book author!",
              },
            ]}
          >
            <InputComponent
              value={stateProduct.author}
              onChange={handleOnChange}
              name="author"
            />
          </Form.Item>

          <Form.Item
            label="Number of book"
            name="numberOfBook"
            rules={[
              {
                required: true,
                message: "Please input number of book!",
              },
            ]}
          >
            <InputComponent
              value={stateProduct.numberOfBook}
              onChange={handleOnChange}
              name="numberOfBook"
            />
          </Form.Item>

          <Form.Item
            label="Format book"
            name="formatBook"
            rules={[
              {
                required: true,
                message: "Please input format book!",
              },
            ]}
          >
            <InputComponent
              value={stateProduct.formatBook}
              onChange={handleOnChange}
              name="formatBook"
            />
          </Form.Item>

          <Form.Item
            label="Type"
            name="type"
            rules={[
              {
                required: true,
                message: "Please input book type!",
              },
            ]}
          >
            <Select
              // mode="multiple"
              name="type"
              value={stateProduct.type}
              onChange={handleOnChangeType}
              style={{
                width: "100%",
              }}
              options={renderTypeProduct()}
            />
          </Form.Item>

          <Form.Item
            label="Publisher"
            name="publisherID"
            rules={[
              {
                required: true,
                message: "Please input book publisher!",
              },
            ]}
          >
            <Select
              name="publisherID"
              value={stateProduct.publisherID}
              onChange={handleOnChangePublisher}
              style={{
                width: "100%",
              }}
              options={renderPublisher()}
            />
          </Form.Item>

          <Form.Item
            label="Genre"
            name="genreID"
            rules={[
              {
                required: true,
                message: "Please input book genre!",
              },
            ]}
          >
            <Select
              name="genre"
              value={stateProduct.genreID}
              onChange={handleOnChangeGenre}
              style={{
                width: "100%",
              }}
              options={renderGenre()}
            />
          </Form.Item>

          {stateProduct.type === "add-type" && (
            <Form.Item
              label="New Type"
              name="newType"
              rules={[
                {
                  required: true,
                  message: "Please input your new type!",
                },
              ]}
            >
              <InputComponent
                value={stateProduct.newType}
                onChange={handleOnChange}
                name="newType"
              />
            </Form.Item>
          )}

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
            label="Discount"
            name="discount"
            rules={[
              {
                required: true,
                message: "Please input your discount!",
              },
            ]}
          >
            <InputComponent
              value={stateProduct.discount}
              onChange={handleOnChange}
              name="discount"
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
                  message: "Please input book name!",
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
              label="Author"
              name="author"
              rules={[
                {
                  required: true,
                  message: "Please input book author!",
                },
              ]}
            >
              <InputComponent
                value={stateDetailProduct.author}
                onChange={handleOnChangeDetail}
                name="author"
              />
            </Form.Item>

            <Form.Item
              label="Number of book"
              name="numberOfBook"
              rules={[
                {
                  required: true,
                  message: "Please input number of book!",
                },
              ]}
            >
              <InputComponent
                type="number"
                value={stateDetailProduct.numberOfBook}
                onChange={handleOnChangeDetail}
                name="numberOfBook"
              />
            </Form.Item>

            <Form.Item
              label="Format book"
              name="formatBook"
              rules={[
                {
                  required: true,
                  message: "Please input format book!",
                },
              ]}
            >
              <InputComponent
                value={stateDetailProduct.formatBook}
                onChange={handleOnChangeDetail}
                name="formatBook"
              />
            </Form.Item>

            <Form.Item
              label="Type"
              name="type"
              rules={[
                {
                  required: true,
                  message: "Please input book type!",
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
              label="Publisher"
              name="publisherID"
              rules={[
                {
                  required: true,
                  message: "Please input book publisher!",
                },
              ]}
            >
              <Select
                name="publisherID"
                value={stateDetailProduct.publisherID}
                onChange={handleOnChangeDetailPublisher}
                style={{
                  width: "100%",
                }}
                options={renderPublisher()}
              />
            </Form.Item>

            <Form.Item
              label="Genre"
              name="genreID"
              rules={[
                {
                  required: true,
                  message: "Please input book genre!",
                },
              ]}
            >
              <Select
                name="genreID"
                value={stateDetailProduct.genreID}
                onChange={handleOnChangeDetailGenre}
                style={{
                  width: "100%",
                }}
                options={renderGenre()}
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
              label="Discount"
              name="discount"
              rules={[
                {
                  required: true,
                  message: "Please input your discount!",
                },
              ]}
            >
              <InputComponent
                value={stateDetailProduct.discount}
                onChange={handleOnChangeDetail}
                name="discount"
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
          handleDelete={handleDeleteManyProduct}
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
