import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Form, Space } from "antd";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import * as Message from "../../components/Message/Message";
import useMutationHook from "../../hooks/useMutationHook";
import * as PublisherService from "../../services/PublisherService";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import InputComponent from "../InputComponent/InputComponent";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import ModalComponent from "../ModalComponent/ModalComponent";
import TableComponent from "../TableComponent/TableComponent";
import { WrapperButton, WrapperHeader } from "./styles";

const AdminPublisher = () => {
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [isRowSelected, setIsRowSelected] = useState("");
  const [isNamePublisher, setIsNamePublisher] = useState("");

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

  const [statePublisher, setStatePublisher] = useState({
    name: "",
    address: "",
  });

  const [stateDetailPublisher, setStateDetailPublisher] = useState({
    name: "",
    address: "",
  });

  const [form] = Form.useForm();

  const mutationUpdate = useMutationHook(({ id, data, access_token }) => {
    const res = PublisherService.updatePublisher(id, data, access_token);
    return res;
  });

  const mutationDelete = useMutationHook(({ id, access_token }) => {
    const res = PublisherService.deletePublisher(id, access_token);
    return res;
  });

  const mutationDeleteMany = useMutationHook(({ ids, access_token }) => {
    const res = PublisherService.deleteManyPublisher(ids, access_token);
    return res;
  });

  const mutationCreate = useMutationHook(({ data, access_token }) => {
    const res = PublisherService.createPublisher(data, access_token);
    return res;
  });

  const { data: dataCreatePublisher, isSuccess: isSuccessCreatePublisher } =
    mutationCreate;

  const {
    data: dataUpdatePublisher,
    isSuccess: isSuccessUpdatePublisher,
    isLoading: isLoadingUpdatePublisher,
  } = mutationUpdate;

  const {
    data: dataDeletePublisher,
    isSuccess: isSuccessDeletePublisher,
    isLoading: isLoadingDeletePublisher,
  } = mutationDelete;

  const {
    data: dataDeleteManyPublisher,
    isSuccess: isSuccessDeleteManyPublisher,
  } = mutationDeleteMany;

  const getAllPublisher = async () => {
    const res = await PublisherService.getAllPublisher(user?.access_token);
    return res;
  };

  const queryGetAllPublisher = useQuery({
    queryKey: ["publisher"],
    queryFn: getAllPublisher,
  });

  const { isLoading: isLoadingPublisher, data: publishers } =
    queryGetAllPublisher;

  const dataPublishers = publishers?.data?.map((publisher) => {
    return { ...publisher, key: publisher._id };
  });

  useEffect(() => {
    if (isSuccessCreatePublisher && dataCreatePublisher?.status === "OK") {
      Message.success("Create publisher success!");
      setStatePublisher({
        name: "",
        address: "",
      });
      form.resetFields();
      setIsOpenModalCreate(false);
    } else if (dataCreatePublisher?.status === "ERROR") {
      Message.error(dataCreatePublisher?.message);
      setStatePublisher({
        name: "",
        address: "",
      });
      form.resetFields();
      setIsOpenModalCreate(false);
    }
  }, [isSuccessCreatePublisher]);

  useEffect(() => {
    if (isSuccessUpdatePublisher && dataUpdatePublisher?.status === "OK") {
      Message.success("Update publisher success!");
      setIsOpenModalEdit(false);
    } else if (dataUpdatePublisher?.status === "ERROR") {
      Message.error("Update publisher error!");
      setIsOpenModalEdit(false);
    }
  }, [isSuccessUpdatePublisher]);

  useEffect(() => {
    if (isSuccessDeletePublisher && dataDeletePublisher?.status === "OK") {
      Message.success("Delete publisher success!");
      setIsOpenModalDelete(false);
    } else if (dataDeletePublisher?.status === "ERROR") {
      Message.success("Delete publisher error!");
      setIsOpenModalDelete(false);
    }
  }, [isSuccessDeletePublisher]);

  useEffect(() => {
    if (isSuccessDeleteManyPublisher && dataDeleteManyPublisher?.status === "OK") {
      Message.success("Delete many publisher success!");
    } else if (dataDeletePublisher?.status === "ERROR") {
      Message.success("Delete many publisher error!");
    }
  }, [isSuccessDeleteManyPublisher]);

  const showModal = () => {
    setIsOpenModalCreate(true);
  };

  const handleCancelModalCreate = () => {
    form.resetFields();
    setIsOpenModalCreate(false);
  };

  const newStatePublisher = {
    name: statePublisher.name,
    address: statePublisher.address,
  };

  const handleCreatePublisher = () => {
    mutationCreate.mutate(
      { data: newStatePublisher, access_token: user?.access_token },
      {
        onSettled: () => {
          queryGetAllPublisher.refetch();
        },
      }
    );
  };

  const handleOnChange = (e) => {
    setStatePublisher({
      ...statePublisher,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnChangeDetail = (e) => {
    setStateDetailPublisher({
      ...stateDetailPublisher,
      [e.target.name]: e.target.value,
    });
  };

  const fetchGetDetailPublisher = async () => {
    const res = await PublisherService.getDetailPublisher(
      isRowSelected,
      user?.access_token
    );

    if (res?.data) {
      setStateDetailPublisher({
        name: res?.data?.name,
        address: res?.data?.address,
      });
    }
    return res;
  };

  useEffect(() => {
    if (isRowSelected) {
      fetchGetDetailPublisher();
    }
  }, [isRowSelected]);

  useEffect(() => {
    if (!isOpenModalCreate) {
      form.setFieldsValue(stateDetailPublisher);
    } else {
      form.resetFields();
    }
  }, [form, stateDetailPublisher, isOpenModalCreate]);

  const handleGetDetailPublisher = () => {
    setIsOpenModalEdit(true);
  };

  const handleUpdatePublisher = () => {
    mutationUpdate.mutate(
      {
        id: isRowSelected,
        data: stateDetailPublisher,
        access_token: user?.access_token,
      },
      {
        onSettled: () => {
          queryGetAllPublisher.refetch();
        },
      }
    );
  };

  const handleDeletePublisher = () => {
    mutationDelete.mutate(
      { id: isRowSelected, access_token: user?.access_token },
      {
        onSettled: () => {
          queryGetAllPublisher.refetch();
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
          onClick={handleGetDetailPublisher}
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
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: renderIcons,
    },
  ];

  const handleDeleteManyPublisher = (ids) => {
    mutationDeleteMany.mutate(
      { ids: ids, access_token: user?.access_token },
      {
        onSettled: () => {
          queryGetAllPublisher.refetch();
        },
      }
    );
  };

  return (
    <div>
      <WrapperHeader>Quản lý nhà xuất bản</WrapperHeader>
      <WrapperButton type="dashed" onClick={showModal}>
        Thêm <PlusOutlined />
      </WrapperButton>

      <ModalComponent
        title="Tạo nhà xuất bản mới"
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
          onFinish={handleCreatePublisher}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input publisher name!",
              },
            ]}
          >
            <InputComponent
              value={statePublisher.name}
              onChange={handleOnChange}
              name="name"
            />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: "Please input publisher address!",
              },
            ]}
          >
            <InputComponent
              value={statePublisher.address}
              onChange={handleOnChange}
              name="address"
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
        title="Xóa nhà xuất bản"
        open={isOpenModalDelete}
        onCancel={() => setIsOpenModalDelete(false)}
        onOk={handleDeletePublisher}
      >
        <LoadingComponent isLoading={isLoadingDeletePublisher}>
          <div
            style={{ marginTop: "12px", fontWeight: 600, height: "50px" }}
          >{`Bạn có chắc chắn muốn xóa nhà xuất bản có name "${isNamePublisher}" này không?`}</div>
        </LoadingComponent>
      </ModalComponent>

      <DrawerComponent
        open={isOpenModalEdit}
        title="Chi tiết nhà sản xuất"
        onClose={() => setIsOpenModalEdit(false)}
        width="50%"
      >
        <LoadingComponent isLoading={isLoadingUpdatePublisher}>
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
            onFinish={handleUpdatePublisher}
            autoComplete="off"
            form={form}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input publisher name!",
                },
              ]}
            >
              <InputComponent
                value={stateDetailPublisher.name}
                onChange={handleOnChangeDetail}
                name="name"
              />
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
              rules={[
                {
                  required: true,
                  message: "Please input publisher address!",
                },
              ]}
            >
              <InputComponent
                value={stateDetailPublisher.address}
                onChange={handleOnChangeDetail}
                name="address"
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
          isLoading={isLoadingPublisher}
          columns={columns}
          data={dataPublishers}
          handleDelete={handleDeleteManyPublisher}
          onRow={(record) => {
            return {
              onClick: (event) => {
                setIsRowSelected(record._id);
                setIsNamePublisher(record.name);
              },
            };
          }}
        />
      </div>
    </div>
  );
};

export default AdminPublisher;
