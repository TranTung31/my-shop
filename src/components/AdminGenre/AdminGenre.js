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
import * as GenreService from "../../services/GenreService";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import InputComponent from "../InputComponent/InputComponent";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import ModalComponent from "../ModalComponent/ModalComponent";
import TableComponent from "../TableComponent/TableComponent";
import { WrapperButton, WrapperHeader } from "./styles";

const AdminGenre = () => {
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [isRowSelected, setIsRowSelected] = useState("");
  const [isNameGenre, setIsNameGenre] = useState("");

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

  const [stateGenre, setStateGenre] = useState({
    name: "",
  });

  const [stateDetailGenre, setStateDetailGenre] = useState({
    name: "",
  });

  const [form] = Form.useForm();

  const mutationUpdate = useMutationHook(({ id, data, access_token }) => {
    const res = GenreService.updateGenre(id, data, access_token);
    return res;
  });

  const mutationDelete = useMutationHook(({ id, access_token }) => {
    const res = GenreService.deleteGenre(id, access_token);
    return res;
  });

  const mutationDeleteMany = useMutationHook(({ ids, access_token }) => {
    const res = GenreService.deleteManyGenre(ids, access_token);
    return res;
  });

  const mutationCreate = useMutationHook(({ data, access_token }) => {
    const res = GenreService.createGenre(data, access_token);
    return res;
  });

  const { data: dataCreateGenre, isSuccess: isSuccessCreateGenre } =
    mutationCreate;

  const {
    data: dataUpdateGenre,
    isSuccess: isSuccessUpdateGenre,
    isLoading: isLoadingUpdateGenre,
  } = mutationUpdate;

  const {
    data: dataDeleteGenre,
    isSuccess: isSuccessDeleteGenre,
    isLoading: isLoadingDeleteGenre,
  } = mutationDelete;

  const { data: dataDeleteManyGenre, isSuccess: isSuccessDeleteManyGenre } =
    mutationDeleteMany;

  const getAllGenre = async () => {
    const res = await GenreService.getAllGenre();
    return res;
  };

  const queryGetAllGenre = useQuery({
    queryKey: ["genre"],
    queryFn: getAllGenre,
  });

  const { isLoading: isLoadingGenre, data: genres } = queryGetAllGenre;

  const dataGenres = genres?.data?.map((genre) => {
    return { ...genre, key: genre._id };
  });

  useEffect(() => {
    if (isSuccessCreateGenre && dataCreateGenre?.status === "OK") {
      Message.success("Create genre success!");
      setStateGenre({
        name: "",
      });
      form.resetFields();
      setIsOpenModalCreate(false);
    } else if (dataCreateGenre?.status === "ERROR") {
      Message.error(dataCreateGenre?.message);
      setStateGenre({
        name: "",
      });
      form.resetFields();
      setIsOpenModalCreate(false);
    }
  }, [isSuccessCreateGenre]);

  useEffect(() => {
    if (isSuccessUpdateGenre && dataUpdateGenre?.status === "OK") {
      Message.success("Update genre success!");
      setIsOpenModalEdit(false);
    } else if (dataUpdateGenre?.status === "ERROR") {
      Message.error("Update genre error!");
      setIsOpenModalEdit(false);
    }
  }, [isSuccessUpdateGenre]);

  useEffect(() => {
    if (isSuccessDeleteGenre && dataDeleteGenre?.status === "OK") {
      Message.success("Delete genre success!");
      setIsOpenModalDelete(false);
    } else if (dataDeleteGenre?.status === "ERROR") {
      Message.success("Delete genre error!");
      setIsOpenModalDelete(false);
    }
  }, [isSuccessDeleteGenre]);

  useEffect(() => {
    if (isSuccessDeleteManyGenre && dataDeleteManyGenre?.status === "OK") {
      Message.success("Delete many genre success!");
    } else if (dataDeleteGenre?.status === "ERROR") {
      Message.success("Delete many genre error!");
    }
  }, [isSuccessDeleteManyGenre]);

  const showModal = () => {
    setIsOpenModalCreate(true);
  };

  const handleCancelModalCreate = () => {
    form.resetFields();
    setIsOpenModalCreate(false);
  };

  const newStateGenre = {
    name: stateGenre.name,
  };

  const handleCreateGenre = () => {
    mutationCreate.mutate(
      { data: newStateGenre, access_token: user?.access_token },
      {
        onSettled: () => {
          queryGetAllGenre.refetch();
        },
      }
    );
  };

  const handleOnChange = (e) => {
    setStateGenre({
      ...stateGenre,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnChangeDetail = (e) => {
    setStateDetailGenre({
      ...stateDetailGenre,
      [e.target.name]: e.target.value,
    });
  };

  const fetchGetDetailGenre = async () => {
    const res = await GenreService.getDetailGenre(isRowSelected);

    if (res?.data) {
      setStateDetailGenre({
        name: res?.data?.name,
      });
    }
    return res;
  };

  useEffect(() => {
    if (isRowSelected) {
      fetchGetDetailGenre();
    }
  }, [isRowSelected]);

  useEffect(() => {
    if (!isOpenModalCreate) {
      form.setFieldsValue(stateDetailGenre);
    } else {
      form.resetFields();
    }
  }, [form, stateDetailGenre, isOpenModalCreate]);

  const handleGetDetailPublisher = () => {
    setIsOpenModalEdit(true);
  };

  const handleUpdateGenre = () => {
    mutationUpdate.mutate(
      {
        id: isRowSelected,
        data: stateDetailGenre,
      },
      {
        onSettled: () => {
          queryGetAllGenre.refetch();
        },
      }
    );
  };

  const handleDeleteGenre = () => {
    mutationDelete.mutate(
      { id: isRowSelected, access_token: user?.access_token },
      {
        onSettled: () => {
          queryGetAllGenre.refetch();
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
      title: "Mã thể loại",
      dataIndex: "_id",
    },
    {
      title: "Tên thể loại",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Hành động",
      dataIndex: "action",
      render: renderIcons,
    },
  ];

  const handleDeleteManyPublisher = (ids) => {
    mutationDeleteMany.mutate(
      { ids: ids, access_token: user?.access_token },
      {
        onSettled: () => {
          queryGetAllGenre.refetch();
        },
      }
    );
  };

  return (
    <div>
      <WrapperHeader>Quản lý thể loại</WrapperHeader>
      <WrapperButton type="dashed" onClick={showModal}>
        Thêm <PlusOutlined />
      </WrapperButton>

      <ModalComponent
        title="Tạo thể loại mới"
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
          onFinish={handleCreateGenre}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input genre name!",
              },
            ]}
          >
            <InputComponent
              value={stateGenre.name}
              onChange={handleOnChange}
              name="name"
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
        title="Xóa thể loại"
        open={isOpenModalDelete}
        onCancel={() => setIsOpenModalDelete(false)}
        onOk={handleDeleteGenre}
      >
        <LoadingComponent isLoading={isLoadingDeleteGenre}>
          <div
            style={{ marginTop: "12px", fontWeight: 600, height: "50px" }}
          >{`Bạn có chắc chắn muốn xóa thể loại có name "${isNameGenre}" này không?`}</div>
        </LoadingComponent>
      </ModalComponent>

      <DrawerComponent
        open={isOpenModalEdit}
        title="Chi tiết thể loại"
        onClose={() => setIsOpenModalEdit(false)}
        width="50%"
      >
        <LoadingComponent isLoading={isLoadingUpdateGenre}>
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
            onFinish={handleUpdateGenre}
            autoComplete="off"
            form={form}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input genre name!",
                },
              ]}
            >
              <InputComponent
                value={stateDetailGenre.name}
                onChange={handleOnChangeDetail}
                name="name"
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
          isLoading={isLoadingGenre}
          columns={columns}
          data={dataGenres}
          handleDelete={handleDeleteManyPublisher}
          onRow={(record) => {
            return {
              onClick: (event) => {
                setIsRowSelected(record._id);
                setIsNameGenre(record.name);
              },
            };
          }}
        />
      </div>
    </div>
  );
};

export default AdminGenre;
