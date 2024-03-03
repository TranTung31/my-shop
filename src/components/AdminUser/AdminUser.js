import {
  DeleteOutlined,
  PlusOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Form, Select, Space } from "antd";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import * as Message from "../../components/Message/Message";
import useMutationHook from "../../hooks/useMutationHook";
import * as UserService from "../../services/UserService";
import { getBase64 } from "../../utils";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import InputComponent from "../InputComponent/InputComponent";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import ModalComponent from "../ModalComponent/ModalComponent";
import TableComponent from "../TableComponent/TableComponent";
import { WrapperButton, WrapperHeader, WrapperUpload } from "./styles";

const AdminUser = () => {
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [isRowSelected, setIsRowSelected] = useState("");
  const [isNameUser, setIsNameUser] = useState("");

  const [searchText, setSearchText] = useState("");
  const [typeBoolean, setTypeBoolean] = useState(["true", "false"]);
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

  const [stateUserDetail, setStateUserDetail] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    isAdmin: false,
    avatar: "",
  });

  const [stateUser, setStateUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [form] = Form.useForm();
  const [form1] = Form.useForm();

  const mutationCreate = useMutationHook(({ data }) => {
    const res = UserService.signupUser(data);
    return res;
  });

  const mutationUpdate = useMutationHook(({ id, data, access_token }) => {
    const res = UserService.updateUser(id, data, access_token);
    return res;
  });

  const mutationDelete = useMutationHook(({ id, access_token }) => {
    const res = UserService.deleteUser(id, access_token);
    return res;
  });

  const mutationDeleteMany = useMutationHook(({ ids, access_token }) => {
    const res = UserService.deleteManyUser(ids, access_token);
    return res;
  });

  const {
    data: dataCreateUser,
    isSuccess: isSuccessCreateUser,
    isLoading: isLoadingCreateUser,
  } = mutationCreate;

  const {
    data: dataUpdateUser,
    isError: isErrorUpdateUser,
    isSuccess: isSuccessUpdateUser,
    isLoading: isLoadingUpdateUser,
  } = mutationUpdate;

  const {
    data: dataDeleteUser,
    isError: isErrorDeleteUser,
    isSuccess: isSuccessDeleteUser,
    isLoading: isLoadingDeleteUser,
  } = mutationDelete;

  const {
    data: dataDeleteManyUser,
    isError: isErrorDeleteManyUser,
    isSuccess: isSuccessDeleteManyUser,
    isLoading: isLoadingDeleteManyUser,
  } = mutationDeleteMany;

  const getAllUser = async () => {
    const res = await UserService.getAllUser(user?.access_token);
    return res;
  };

  const queryGetAllUser = useQuery({
    queryKey: ["users"],
    queryFn: getAllUser,
  });

  const { isLoading: isLoadingProducts, data: users } = queryGetAllUser;

  const dataUsers = users?.data?.map((user) => {
    return { ...user, key: user._id, isAdmin: user.isAdmin ? "TRUE" : "FALSE" };
  });

  useEffect(() => {
    if (isSuccessCreateUser && dataCreateUser?.status === "OK") {
      Message.success("Create user success!");
      form1.resetFields();
      setStateUser({
        email: "",
        password: "",
        confirmPassword: "",
      });
      setIsOpenModalCreate(false);
    } else if (dataCreateUser?.status === "ERROR") {
      Message.error(`${dataCreateUser?.message}`);
      form1.resetFields();
      setStateUser({
        email: "",
        password: "",
        confirmPassword: "",
      });
      setIsOpenModalCreate(false);
    }
  }, [isSuccessCreateUser]);

  useEffect(() => {
    if (isSuccessUpdateUser && dataUpdateUser?.status === "OK") {
      Message.success("Update user success!");
      setIsOpenModalEdit(false);
    } else if (isErrorUpdateUser) {
      Message.error("Update user error!");
      setIsOpenModalEdit(false);
    }
  }, [isSuccessUpdateUser]);

  useEffect(() => {
    if (isSuccessDeleteUser && dataDeleteUser?.status === "OK") {
      Message.success("Delete user success!");
      setIsOpenModalDelete(false);
    } else if (dataDeleteUser?.status === "ERROR") {
      Message.success("Delete user error!");
      setIsOpenModalDelete(false);
    }
  }, [isSuccessDeleteUser]);

  useEffect(() => {
    if (isSuccessDeleteManyUser && dataDeleteManyUser?.status === "OK") {
      Message.success("Delete many user success!");
    } else if (dataDeleteManyUser?.status === "ERROR") {
      Message.success("Delete many user error!");
    }
  }, [isSuccessDeleteManyUser]);

  const handleCancelModalCreate = () => {
    form.resetFields();
    setIsOpenModalCreate(false);
  };

  const handleOnChangeAvatarDetail = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateUserDetail({
      ...stateUserDetail,
      avatar: file.preview,
    });
  };

  const handleOnChange = (e) => {
    setStateUser({
      ...stateUser,
      [e.target.name]: e.target.value,
    });
  };

  console.log(dataCreateUser);

  const handleOnChangeDetail = (e) => {
    setStateUserDetail({
      ...stateUserDetail,
      [e.target.name]: e.target.value,
    });
  };

  const fetchGetDetailUser = async () => {
    const res = await UserService.getDetailUser(
      isRowSelected,
      user?.access_token
    );
    if (res?.data) {
      setStateUserDetail({
        name: res?.data?.name,
        email: res?.data?.email,
        phone: res?.data?.phone,
        address: res?.data?.address,
        isAdmin: String(res?.data?.isAdmin),
        avatar: res?.data?.avatar,
      });
    }
    return res;
  };

  useEffect(() => {
    if (isRowSelected) {
      fetchGetDetailUser();
    }
  }, [isRowSelected]);

  useEffect(() => {
    form.setFieldsValue(stateUserDetail);
  }, [form, stateUserDetail]);

  const handleGetDetailProduct = () => {
    setIsOpenModalEdit(true);
  };

  const handleCreateUser = () => {
    mutationCreate.mutate(
      { data: stateUser },
      {
        onSettled: () => {
          queryGetAllUser.refetch();
        },
      }
    );
  };

  const handleUpdateUser = () => {
    mutationUpdate.mutate(
      {
        id: isRowSelected,
        data: stateUserDetail,
        access_token: user?.access_token,
      },
      {
        onSettled: () => {
          queryGetAllUser.refetch();
        },
      }
    );
  };

  const handleDelete = () => {
    mutationDelete.mutate(
      { id: isRowSelected, access_token: user?.access_token },
      {
        onSettled: () => {
          queryGetAllUser.refetch();
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

  const renderTypeBoolean = () => {
    return typeBoolean.map((type) => ({
      label: type,
      value: type,
    }));
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
      sorter: (a, b) => a?.name?.length - b?.name?.length,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email?.length - b.email?.length,
      ...getColumnSearchProps("email"),
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      ...getColumnSearchProps("address"),
    },
    {
      title: "Admin",
      dataIndex: "isAdmin",
      filters: [
        {
          text: "True",
          value: true,
        },
        {
          text: "False",
          value: false,
        },
      ],
      onFilter: (value, record) => {
        if (value === true) {
          return record?.isAdmin === "TRUE";
        }
        return record?.isAdmin === "FALSE";
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: renderIcons,
    },
  ];

  const handleDeleteManyUser = (ids) => {
    mutationDeleteMany.mutate(
      { ids: ids, access_token: user?.access_token },
      {
        onSettled: () => {
          queryGetAllUser.refetch();
        },
      }
    );
  };

  const handleOnChangeIsAdmin = (e) => {
    setStateUserDetail({
      ...stateUserDetail,
      isAdmin: e,
    });
  };

  return (
    <div>
      <WrapperHeader>Quản lý người dùng</WrapperHeader>

      <WrapperButton type="dashed" onClick={() => setIsOpenModalCreate(true)}>
        Thêm <PlusOutlined />
      </WrapperButton>

      <ModalComponent
        title="Tạo người dùng mới"
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
          onFinish={handleCreateUser}
          autoComplete="off"
          form={form1}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <InputComponent
              value={stateUser.email}
              onChange={handleOnChange}
              name="email"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input password!",
              },
            ]}
          >
            <InputComponent
              value={stateUser.password}
              onChange={handleOnChange}
              name="password"
            />
          </Form.Item>

          <Form.Item
            label="Confirm password"
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Please input confirm password!",
              },
            ]}
          >
            <InputComponent
              value={stateUser.confirmPassword}
              onChange={handleOnChange}
              name="confirmPassword"
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
        title="Xóa người dùng"
        open={isOpenModalDelete}
        onCancel={() => setIsOpenModalDelete(false)}
        onOk={handleDelete}
      >
        <LoadingComponent isLoading={isLoadingDeleteUser}>
          <div
            style={{ marginTop: "12px", fontWeight: 600, height: "50px" }}
          >{`Bạn có chắc chắn muốn xóa người dùng có tên "${isNameUser}" này không?`}</div>
        </LoadingComponent>
      </ModalComponent>

      <DrawerComponent
        title="Thông tin người dùng"
        open={isOpenModalEdit}
        onClose={() => setIsOpenModalEdit(false)}
        width="50%"
      >
        <LoadingComponent isLoading={isLoadingUpdateUser}>
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
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <InputComponent
                value={stateUserDetail.email}
                onChange={handleOnChangeDetail}
                name="email"
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
                type="number"
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
              label="Role admin"
              name="isAdmin"
              rules={[
                {
                  required: true,
                  message: "Please input your role admin!",
                },
              ]}
            >
              <Select
                name="isAdmin"
                value={stateUserDetail?.isAdmin}
                onChange={handleOnChangeIsAdmin}
                style={{
                  width: "100%",
                }}
                options={renderTypeBoolean()}
              />
            </Form.Item>

            <Form.Item
              label="Avatar"
              name="avatar"
              rules={[
                {
                  required: true,
                  message: "Please input your avatar!",
                },
              ]}
            >
              <WrapperUpload onChange={handleOnChangeAvatarDetail} maxCount={1}>
                <Button
                  className={stateUserDetail.avatar ? "btn-upload" : null}
                >
                  Upload
                </Button>
                {stateUserDetail.avatar && (
                  <img
                    src={stateUserDetail.avatar}
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
          data={dataUsers}
          handleDelete={handleDeleteManyUser}
          onRow={(record) => {
            return {
              onClick: (event) => {
                setIsRowSelected(record._id);
                setIsNameUser(record.name);
              },
            };
          }}
        />
      </div>
    </div>
  );
};

export default AdminUser;
