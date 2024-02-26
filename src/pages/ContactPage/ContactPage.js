import {
  EnvironmentOutlined,
  PhoneOutlined,
  QuestionOutlined,
} from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import * as Message from "../../components/Message/Message";
import useMutationHook from "../../hooks/useMutationHook";
import * as ContactService from "../../services/ContactService";
import {
  WrapperContact,
  WrapperContactForm,
  WrapperContactItems,
  WrapperContactItemsContent,
  WrapperContactItemsIcon,
  WrapperContactItemsTitle,
  WrapperContactList,
  WrapperContactNavigate,
  WrapperContactNavigateHome,
} from "./styles";

function ContactPage() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  const [form] = Form.useForm();

  const user = useSelector((state) => state.user);

  const mutationCreate = useMutationHook(({ data, access_token }) => {
    const res = ContactService.createContact(data, access_token);
    return res;
  });

  const {
    data: dataCreate,
    isLoading: isLoadingCreate,
    isSuccess: isSuccessCreate,
  } = mutationCreate;

  useEffect(() => {
    if (isSuccessCreate && dataCreate?.status === "OK") {
      Message.success("Create contact success!");
      form.resetFields();
    }
  }, [isSuccessCreate]);

  const onFinish = () => {
    if (user.id !== "") {
      mutationCreate.mutate({
        data: { userName, email, address, content, userId: user?.id },
        access_token: user?.access_token,
      });
    } else {
      navigate("/sign-in");
    }
  };

  return (
    <div style={{ backgroundColor: "#f5f5fa" }}>
      <WrapperContact>
        <WrapperContactNavigate>
          <WrapperContactNavigateHome onClick={() => navigate("/")}>
            Trang chủ
          </WrapperContactNavigateHome>
          <span> -- Liên hệ</span>
        </WrapperContactNavigate>

        <div>
          <h2 style={{ margin: 0, paddingBottom: "20px" }}>Liên hệ</h2>

          <WrapperContactList>
            <WrapperContactItems>
              <WrapperContactItemsIcon>
                <EnvironmentOutlined />
              </WrapperContactItemsIcon>
              <WrapperContactItemsContent>
                <WrapperContactItemsTitle>Địa chỉ:</WrapperContactItemsTitle>
                <div>Hải Trung, Hải Hậu, Nam Định</div>
              </WrapperContactItemsContent>
            </WrapperContactItems>

            <WrapperContactItems>
              <WrapperContactItemsIcon>
                <QuestionOutlined />
              </WrapperContactItemsIcon>
              <WrapperContactItemsContent>
                <WrapperContactItemsTitle>
                  Gửi thắc mắc:
                </WrapperContactItemsTitle>
                <div>trantung310502@gmail.com</div>
              </WrapperContactItemsContent>
            </WrapperContactItems>

            <WrapperContactItems>
              <WrapperContactItemsIcon>
                <PhoneOutlined />
              </WrapperContactItemsIcon>
              <WrapperContactItemsContent>
                <WrapperContactItemsTitle>Điện thoại:</WrapperContactItemsTitle>
                <div>0369554336</div>
              </WrapperContactItemsContent>
            </WrapperContactItems>
          </WrapperContactList>

          <LoadingComponent isLoading={isLoadingCreate}>
            <WrapperContactForm>
              <Form
                name="basic"
                initialValues={{
                  remember: true,
                }}
                onFinish={() => onFinish()}
                onFinishFailed={() => {}}
                autoComplete="off"
                form={form}
              >
                <Form.Item
                  label="Họ và tên"
                  name="userName"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập họ và tên!",
                    },
                  ]}
                >
                  <Input onChange={(e) => setUserName(e.target.value)} />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập email!",
                    },
                  ]}
                >
                  <Input onChange={(e) => setEmail(e.target.value)} />
                </Form.Item>

                <Form.Item
                  label="Địa chỉ"
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập địa chỉ!",
                    },
                  ]}
                >
                  <Input onChange={(e) => setAddress(e.target.value)} />
                </Form.Item>

                <Form.Item
                  label="Nội dung"
                  name="content"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập nội dung!",
                    },
                  ]}
                >
                  <TextArea
                    rows={4}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </Form.Item>

                <Form.Item
                  style={{
                    textAlign: "center",
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    Gửi liên hệ
                  </Button>
                </Form.Item>
              </Form>
            </WrapperContactForm>
          </LoadingComponent>
        </div>
      </WrapperContact>
    </div>
  );
}

export default ContactPage;
