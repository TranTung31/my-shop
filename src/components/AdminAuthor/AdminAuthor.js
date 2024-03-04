import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Form, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import * as Message from "../../components/Message/Message";
import useMutationHook from "../../hooks/useMutationHook";
import * as ContactService from "../../services/ContactService";
import * as AuthorService from "../../services/AuthorService";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import InputComponent from "../InputComponent/InputComponent";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import ModalComponent from "../ModalComponent/ModalComponent";
import TableComponent from "../TableComponent/TableComponent";
import { WrapperButton, WrapperHeader } from "./styles";

const AdminAuthor = () => {
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [isRowSelected, setIsRowSelected] = useState("");

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [nameAuthor, setNameAuthor] = useState("");
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

  const [stateAuthor, setStateAuthor] = useState({
    name: "",
    bio: "",
  });

  const [stateDetailAuthor, setStateDetailAuthor] = useState({
    name: "",
    bio: "",
  });

  const [form] = Form.useForm();

  const mutationUpdate = useMutationHook(({ id, data, access_token }) => {
    const res = AuthorService.updateAuthor(id, data, access_token);
    return res;
  });

  const mutationDelete = useMutationHook(({ id, access_token }) => {
    const res = AuthorService.deleteAuthor(id, access_token);
    return res;
  });

  const mutationDeleteMany = useMutationHook(({ ids, access_token }) => {
    const res = AuthorService.deleteManyAuthor(ids, access_token);
    return res;
  });

  const mutationCreate = useMutationHook(({ data, access_token }) => {
    const res = AuthorService.createAuthor(data, access_token);
    return res;
  });

  const { data: dataCreateAuthor, isSuccess: isSuccessCreateAuthor } =
    mutationCreate;

  const {
    data: dataUpdateAuthor,
    isSuccess: isSuccessUpdateAuthor,
    isLoading: isLoadingUpdateAuthor,
  } = mutationUpdate;

  const {
    data: dataDeleteAuthor,
    isSuccess: isSuccessDeleteAuthor,
    isLoading: isLoadingDeleteAuthor,
  } = mutationDelete;

  const { data: dataDeleteManyContact, isSuccess: isSuccessDeleteManyContact } =
    mutationDeleteMany;

  const getAllAuthor = async () => {
    const res = await AuthorService.getAllAuthor();
    return res;
  };

  const queryGetAllAuthor = useQuery({
    queryKey: ["author"],
    queryFn: getAllAuthor,
  });

  const { isLoading: isLoadingAuthor, data: authors } = queryGetAllAuthor;

  const dataAuthors = authors?.data?.map((author) => {
    return { ...author, key: author._id };
  });

  useEffect(() => {
    if (isSuccessCreateAuthor && dataCreateAuthor?.status === "OK") {
      Message.success("Create author success!");
      setStateAuthor({
        name: "",
        bio: "",
      });
      form.resetFields();
      setIsOpenModalCreate(false);
    } else if (dataCreateAuthor?.status === "ERROR") {
      Message.error(dataCreateAuthor?.message);
      setStateAuthor({
        name: "",
        bio: "",
      });
      form.resetFields();
      setIsOpenModalCreate(false);
    }
  }, [isSuccessCreateAuthor]);

  useEffect(() => {
    if (isSuccessUpdateAuthor && dataUpdateAuthor?.status === "OK") {
      Message.success("Update author success!");
      setIsOpenModalEdit(false);
    } else if (dataUpdateAuthor?.status === "ERROR") {
      Message.error("Update author error!");
      setIsOpenModalEdit(false);
    }
  }, [isSuccessUpdateAuthor]);

  useEffect(() => {
    if (isSuccessDeleteAuthor && dataDeleteAuthor?.status === "OK") {
      Message.success("Delete author success!");
      setIsOpenModalDelete(false);
    } else if (dataDeleteAuthor?.status === "ERROR") {
      Message.success("Delete author error!");
      setIsOpenModalDelete(false);
    }
  }, [isSuccessDeleteAuthor]);

  useEffect(() => {
    if (isSuccessDeleteManyContact && dataDeleteManyContact?.status === "OK") {
      Message.success("Delete many contact success!");
    } else if (dataDeleteAuthor?.status === "ERROR") {
      Message.success("Delete many contact error!");
    }
  }, [isSuccessDeleteManyContact]);

  const showModal = () => {
    setIsOpenModalCreate(true);
  };

  const handleCancelModalCreate = () => {
    form.resetFields();
    setIsOpenModalCreate(false);
  };

  const newStateAuthor = {
    name: stateAuthor.name,
    bio: stateAuthor.bio,
  };

  const handleCreateAuthor = () => {
    mutationCreate.mutate(
      { data: newStateAuthor, access_token: user?.access_token },
      {
        onSettled: () => {
          queryGetAllAuthor.refetch();
        },
      }
    );
  };

  const handleOnChange = (e) => {
    setStateAuthor({
      ...stateAuthor,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnChangeDetail = (e) => {
    setStateDetailAuthor({
      ...stateDetailAuthor,
      [e.target.name]: e.target.value,
    });
  };

  const fetchGetDetailAuthor = async () => {
    const res = await AuthorService.getDetailAuthor(isRowSelected);

    if (res?.data) {
      setStateDetailAuthor({
        name: res?.data?.name,
        bio: res?.data?.bio,
      });
    }
  };

  useEffect(() => {
    if (isRowSelected) {
      fetchGetDetailAuthor();
    }
  }, [isRowSelected]);

  useEffect(() => {
    if (!isOpenModalCreate) {
      form.setFieldsValue(stateDetailAuthor);
    } else {
      form.resetFields();
    }
  }, [form, stateDetailAuthor, isOpenModalCreate]);

  const handleGetDetailAuthor = () => {
    setIsOpenModalEdit(true);
  };

  const handleUpdateAuthor = () => {
    mutationUpdate.mutate(
      {
        id: isRowSelected,
        data: stateDetailAuthor,
      },
      {
        onSettled: () => {
          queryGetAllAuthor.refetch();
        },
      }
    );
  };

  const handleDeleteAuthor = () => {
    mutationDelete.mutate(
      { id: isRowSelected, access_token: user?.access_token },
      {
        onSettled: () => {
          queryGetAllAuthor.refetch();
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
          onClick={handleGetDetailAuthor}
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
      title: "Mã tác giả",
      dataIndex: "_id",
    },
    {
      title: "Tên tác giả",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps('name'),
    },
    {
      title: "Tiểu sử",
      dataIndex: "bio",
    },
    {
      title: "Hành động",
      dataIndex: "action",
      render: renderIcons,
    },
  ];

  const handleDeleteManyAuthor = (ids) => {
    mutationDeleteMany.mutate(
      { ids: ids, access_token: user?.access_token },
      {
        onSettled: () => {
          queryGetAllAuthor.refetch();
        },
      }
    );
  };

  return (
    <div>
      <WrapperHeader>Quản lý tác giả</WrapperHeader>
      <WrapperButton type="dashed" onClick={showModal}>
        Thêm <PlusOutlined />
      </WrapperButton>

      <ModalComponent
        title="Tạo tác giả mới"
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
          onFinish={handleCreateAuthor}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Author name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input author name!",
              },
            ]}
          >
            <InputComponent
              value={stateAuthor.name}
              onChange={handleOnChange}
              name="name"
            />
          </Form.Item>

          <Form.Item
            label="Author bio"
            name="bio"
            rules={[
              {
                required: true,
                message: "Please input author bio!",
              },
            ]}
          >
            <TextArea
              rows={4}
              value={stateAuthor.bio}
              onChange={handleOnChange}
              name="bio"
            />
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
        title="Xóa tác giả"
        open={isOpenModalDelete}
        onCancel={() => setIsOpenModalDelete(false)}
        onOk={handleDeleteAuthor}
      >
        <LoadingComponent isLoading={isLoadingDeleteAuthor}>
          <div
            style={{ marginTop: "12px", fontWeight: 600, height: "50px" }}
          >{`Bạn có chắc chắn muốn xóa tác giả có tên "${nameAuthor}" này không?`}</div>
        </LoadingComponent>
      </ModalComponent>

      <DrawerComponent
        open={isOpenModalEdit}
        title="Chi tiết tác giả"
        onClose={() => setIsOpenModalEdit(false)}
        width="50%"
      >
        <LoadingComponent isLoading={isLoadingUpdateAuthor}>
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
            onFinish={handleUpdateAuthor}
            autoComplete="off"
            form={form}
          >
            <Form.Item
              label="Author name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input author name!",
                },
              ]}
            >
              <InputComponent
                value={stateDetailAuthor.name}
                onChange={handleOnChangeDetail}
                name="name"
              />
            </Form.Item>

            <Form.Item
              label="Author bio"
              name="bio"
              rules={[
                {
                  required: true,
                  message: "Please input author bio!",
                },
              ]}
            >
              <TextArea
                rows={4}
                value={stateDetailAuthor.bio}
                onChange={handleOnChangeDetail}
                name="bio"
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
        <TableComponent
          isLoading={isLoadingAuthor}
          columns={columns}
          data={dataAuthors}
          handleDelete={handleDeleteManyAuthor}
          onRow={(record) => {
            return {
              onClick: (event) => {
                setIsRowSelected(record._id);
                setNameAuthor(record.name);
              },
            };
          }}
        />
      </div>
    </div>
  );
};

export default AdminAuthor;
