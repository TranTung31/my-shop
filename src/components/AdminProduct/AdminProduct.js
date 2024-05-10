import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Form, Select, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import * as Message from "../../components/Message/Message";
import useMutationHook from "../../hooks/useMutationHook";
import * as AuthorService from "../../services/AuthorService";
import * as GenreService from "../../services/GenreService";
import * as ProductService from "../../services/ProductService";
import * as PublisherService from "../../services/PublisherService";
import { getBase64 } from "../../utils/utils";
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
  const [author, setAuthor] = useState([]);
  const [isRowSelected, setIsRowSelected] = useState("");
  const [isNameProduct, setIsNameProduct] = useState("");
  const [typeProduct, setTypeProduct] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [pageValue, setPageValue] = useState(1);
  const [dataProductAdmin, setDataProductAdmin] = useState([]);
  const [totalProduct, setTotalProduct] = useState(10);
  const [isLoadingProduct, setIsLoadingProduct] = useState(false);

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
      description: "",
      formatBook: "",
      publisherID: "",
      genreID: "",
      authorID: "",
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
      description: "",
      formatBook: "",
      publisherID: "",
      genreID: "",
      authorID: "",
    };
  };

  const [stateProduct, setStateProduct] = useState(initialStateProduct());

  const [stateDetailProduct, setStateDetailProduct] = useState(
    initialStateDetailProduct()
  );

  const [formCreate] = Form.useForm();
  const [formUpdate] = Form.useForm();

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

  const mutationCreate = useMutationHook((data) => {
    const res = ProductService.createProduct(data);
    return res;
  });

  const { data: dataCreateProduct, isSuccess: isSuccessCreateProduct } =
    mutationCreate;

  const {
    data: dataUpdateProduct,
    isSuccess: isSuccessUpdateProduct,
    isLoading: isLoadingUpdateProduct,
  } = mutationUpdate;

  const {
    data: dataDeleteProduct,
    isSuccess: isSuccessDeleteProduct,
    isLoading: isLoadingDeleteProduct,
  } = mutationDelete;

  const { data: dataDeleteManyProduct, isSuccess: isSuccessDeleteManyProduct } =
    mutationDeleteMany;

  const getProductAdmin = async () => {
    setIsLoadingProduct(true);
    const res = await ProductService.getProductAdmin(pageValue, 10);
    setDataProductAdmin(res?.data);
    setTotalProduct(res?.totalProduct);
    setIsLoadingProduct(false);
  };

  useEffect(() => {
    getProductAdmin();
  }, [
    pageValue,
    isSuccessCreateProduct,
    isSuccessUpdateProduct,
    isSuccessDeleteProduct,
  ]);

  useEffect(() => {
    if (isSuccessCreateProduct && dataCreateProduct?.status === "OK") {
      Message.success("Tạo sản phẩm mới thành công!");
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
        description: "",
      });
      formCreate.resetFields();
      setIsOpenModalCreate(false);
    } else if (dataCreateProduct?.status === "ERROR") {
      Message.error("Tạo sản phẩm mới thất bại!");
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
        description: "",
      });
      formCreate.resetFields();
      setIsOpenModalCreate(false);
    }
  }, [isSuccessCreateProduct]);

  useEffect(() => {
    if (isSuccessUpdateProduct && dataUpdateProduct?.status === "OK") {
      Message.success("Cập nhật thông tin sản phẩm thành công!");
      setIsOpenModalEdit(false);
    } else if (dataUpdateProduct?.status === "ERROR") {
      Message.error("Cập nhật thông tin sản phẩm thất bại!");
      setIsOpenModalEdit(false);
    }
  }, [isSuccessUpdateProduct]);

  useEffect(() => {
    if (isSuccessDeleteProduct && dataDeleteProduct?.status === "OK") {
      Message.success("Xóa sản phẩm thành công!");
      setIsOpenModalDelete(false);
    } else if (dataDeleteProduct?.status === "ERROR") {
      Message.success("Xóa sản phẩm thất bại!");
      setIsOpenModalDelete(false);
    }
  }, [isSuccessDeleteProduct]);

  useEffect(() => {
    if (isSuccessDeleteManyProduct && dataDeleteManyProduct?.status === "OK") {
      Message.success("Xóa nhiều sản phẩm thành công!");
    } else if (dataDeleteProduct?.status === "ERROR") {
      Message.success("Xóa nhiều sản phẩm thất bại!");
    }
  }, [isSuccessDeleteManyProduct]);

  const showModal = () => {
    setIsOpenModalCreate(true);
  };

  const handleCancelModalCreate = () => {
    formCreate.resetFields();
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
    description: stateProduct.description,
    formatBook: stateProduct.formatBook,
    publisherID: stateProduct.publisherID,
    genreID: stateProduct.genreID,
    authorID: stateProduct.authorID,
  };

  const handleCreateProduct = async () => {
    await mutationCreate.mutate(newStateProduct);
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
        description: res?.data?.description,
        publisherID: res?.data?.publisherID,
        genreID: res?.data?.genreID,
        authorID: res?.data?.authorID,
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
    if (isOpenModalEdit) {
      formUpdate.setFieldsValue(stateDetailProduct);
    } else {
      formUpdate.resetFields();
    }
  }, [formUpdate, stateDetailProduct, isOpenModalEdit]);

  const handleGetDetailProduct = () => {
    setIsOpenModalEdit(true);
  };

  const handleUpdateProduct = () => {
    mutationUpdate.mutate({
      id: isRowSelected,
      data: stateDetailProduct,
      access_token: user?.access_token,
    });
  };

  const handleDelete = () => {
    mutationDelete.mutate({
      id: isRowSelected,
      access_token: user?.access_token,
    });
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
      title: "Tên sách",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Số trang",
      dataIndex: "numberOfBook",
    },
    {
      title: "Định dạng",
      dataIndex: "formatBook",
    },
    {
      title: "Giá tiền",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
      filters: [
        {
          text: ">= 50000",
          value: ">=",
        },
        {
          text: "< 50000",
          value: "<",
        },
      ],
      onFilter: (value, record) => {
        if (value === ">=") {
          return record?.price >= 50000;
        }
        return record?.price < 50000;
      },
    },
    {
      title: "% Giảm giá",
      dataIndex: "discount",
      sorter: (a, b) => a.discount - b.discount,
      filters: [
        {
          text: ">= 10",
          value: ">=",
        },
        {
          text: "< 10",
          value: "<",
        },
      ],
      onFilter: (value, record) => {
        if (value === ">=") {
          return record?.discount >= 10;
        }
        return record?.discount < 10;
      },
    },
    {
      title: "Đánh giá",
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
      title: "Hành động",
      dataIndex: "action",
      render: renderIcons,
    },
  ];

  const handleDeleteManyProduct = (ids) => {
    mutationDeleteMany.mutate({ ids: ids, access_token: user?.access_token });
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

  const handleOnChangeAuthor = (e) => {
    setStateProduct({
      ...stateProduct,
      authorID: e,
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

  const handleOnChangeDetailAuthor = (e) => {
    setStateDetailProduct({
      ...stateDetailProduct,
      authorID: e,
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

  const fetchAllAuthor = async () => {
    const res = await AuthorService.getAllAuthor(user?.access_token);
    if (res?.status === "OK") {
      setAuthor(res?.data);
    }
  };

  useEffect(() => {
    fetchAllPublisher();
  }, []);

  useEffect(() => {
    fetchAllGenre();
  }, []);

  useEffect(() => {
    fetchAllAuthor();
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

  const renderAuthor = () => {
    let result = author?.map((item, index) => {
      return {
        value: item._id,
        label: item.name,
      };
    });
    return result;
  };

  const handleOnChangePage = (page, pageSize) => {
    setPageValue(page);
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
            span: 8,
          }}
          wrapperCol={{
            span: 22,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={handleCreateProduct}
          autoComplete="off"
          form={formCreate}
        >
          <Form.Item
            label="Tên sách"
            name="name"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên sách!",
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
            label="Tác giả"
            name="authorID"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn tác giả!",
              },
            ]}
          >
            <Select
              name="author"
              value={stateProduct.authorID}
              onChange={handleOnChangeAuthor}
              style={{
                width: "100%",
              }}
              options={renderAuthor()}
            />
          </Form.Item>

          <Form.Item
            label="Số trang"
            name="numberOfBook"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số trang!",
              },
            ]}
          >
            <InputComponent
              value={stateProduct.numberOfBook}
              onChange={handleOnChange}
              name="numberOfBook"
              type="number"
            />
          </Form.Item>

          <Form.Item
            label="Định dạng"
            name="formatBook"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập định dạng sách!",
              },
            ]}
          >
            <InputComponent
              value={stateProduct.formatBook}
              onChange={handleOnChange}
              name="formatBook"
            />
          </Form.Item>

          {/* <Form.Item
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
              name="type"
              value={stateProduct.type}
              onChange={handleOnChangeType}
              style={{
                width: "100%",
              }}
              options={renderTypeProduct()}
            />
          </Form.Item> */}

          {/* {stateProduct.type === "add-type" && (
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
          )} */}

          <Form.Item
            label="Mô tả"
            name="description"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mô tả!",
              },
            ]}
          >
            <TextArea
              rows={4}
              name="description"
              value={stateProduct.description}
              onChange={handleOnChange}
            />
          </Form.Item>

          <Form.Item
            label="Nhà xuất bản"
            name="publisherID"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn nhà xuất bản!",
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
            label="Thể loại"
            name="genreID"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn thể loại!",
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

          <Form.Item
            label="Giá tiền"
            name="price"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập giá tiền!",
              },
            ]}
          >
            <InputComponent
              value={stateProduct.price}
              onChange={handleOnChange}
              name="price"
              type="number"
            />
          </Form.Item>

          <Form.Item
            label="Số lượng trong kho"
            name="countInStock"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số lượng trong kho!",
              },
            ]}
          >
            <InputComponent
              value={stateProduct.countInStock}
              onChange={handleOnChange}
              name="countInStock"
              type="number"
            />
          </Form.Item>

          <Form.Item
            label="% Giảm giá"
            name="discount"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập % giảm giá!",
              },
            ]}
          >
            <InputComponent
              value={stateProduct.discount}
              onChange={handleOnChange}
              name="discount"
              type="number"
            />
          </Form.Item>

          <Form.Item
            label="Số sao đánh giá"
            name="rating"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số sao đánh giá!",
              },
            ]}
          >
            <InputComponent
              value={stateProduct.rating}
              onChange={handleOnChange}
              name="rating"
              type="number"
            />
          </Form.Item>

          <Form.Item
            label="Hình ảnh"
            name="image"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn hình ảnh!",
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
              Tạo mới
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
          >{`Bạn có chắc chắn muốn xóa sản phẩm có tên "${isNameProduct}" này không?`}</div>
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
            form={formUpdate}
          >
            <Form.Item
              label="Tên sách"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên sách!",
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
              label="Tác giả"
              name="authorID"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn tác giả!",
                },
              ]}
            >
              <Select
                name="authorID"
                value={stateDetailProduct.authorID}
                onChange={handleOnChangeDetailAuthor}
                style={{
                  width: "100%",
                }}
                options={renderAuthor()}
              />
            </Form.Item>

            <Form.Item
              label="Số trang"
              name="numberOfBook"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số trang!",
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
              label="Định dạng"
              name="formatBook"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập định dạng sách!",
                },
              ]}
            >
              <InputComponent
                name="formatBook"
                value={stateDetailProduct.formatBook}
                onChange={handleOnChangeDetail}
              />
            </Form.Item>

            <Form.Item
              label="Mô tả"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mô tả!",
                },
              ]}
            >
              <TextArea
                rows={4}
                name="description"
                value={stateDetailProduct.description}
                onChange={handleOnChangeDetail}
              />
            </Form.Item>

            <Form.Item
              label="Nhà xuất bản"
              name="publisherID"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn nhà xuất bản!",
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
              label="Thể loại"
              name="genreID"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn thể loại!",
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
              label="Giá tiền"
              name="price"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập giá tiền!",
                },
              ]}
            >
              <InputComponent
                type="number"
                value={stateDetailProduct.price}
                onChange={handleOnChangeDetail}
                name="price"
              />
            </Form.Item>

            <Form.Item
              label="Số lượng trong kho"
              name="countInStock"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số lượng trong kho!",
                },
              ]}
            >
              <InputComponent
                type="number"
                value={stateDetailProduct.countInStock}
                onChange={handleOnChangeDetail}
                name="countInStock"
              />
            </Form.Item>

            <Form.Item
              label="% Giảm giá"
              name="discount"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập % giảm giá!",
                },
              ]}
            >
              <InputComponent
                type="number"
                value={stateDetailProduct.discount}
                onChange={handleOnChangeDetail}
                name="discount"
              />
            </Form.Item>

            <Form.Item
              label="Số sao đánh giá"
              name="rating"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số sao đánh giá!",
                },
              ]}
            >
              <InputComponent
                type="number"
                value={stateDetailProduct.rating}
                onChange={handleOnChangeDetail}
                name="rating"
              />
            </Form.Item>

            <Form.Item
              label="Hình ảnh"
              name="image"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn hình ảnh!",
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
                Cập nhật
              </Button>
            </Form.Item>
          </Form>
        </LoadingComponent>
      </DrawerComponent>

      <div style={{ marginTop: "20px" }}>
        <TableComponent
          isLoading={isLoadingProduct}
          columns={columns}
          data={dataProductAdmin}
          pageValue={pageValue}
          totalPagination={totalProduct}
          handleDelete={handleDeleteManyProduct}
          handleOnChangePage={handleOnChangePage}
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
